package controllers

import (
	"math"
	"memories-backend/database"
	"memories-backend/models"
	"memories-backend/utils"
	"os"
	"path/filepath"
	"strconv"

	"github.com/gofiber/fiber/v2"
	jwtv4 "github.com/golang-jwt/jwt/v4"
)

type postRequest struct {
	Title   string `json:"title" form:"title"`
	Message string `json:"message" form:"message"`
	Tags    string `json:"tags"  form:"tags"`
}

func CreatePost(c *fiber.Ctx) error {
	token := c.Locals("user").(*jwtv4.Token)
	claims := token.Claims.(jwtv4.MapClaims)
	if claims["userID"] == "" {
		return c.Status(400).JSON(fiber.Map{
			"message": "token is expired",
		})
	}

	image, err := c.FormFile("image")
	if err != nil {
		return c.Status(400).JSON(fiber.Map{
			"message": "upload file validate error",
		})
	}

	if image.Size > 3000000 {
		return c.Status(400).JSON(fiber.Map{
			"message": "ขนาดไฟล์ต้องไม่เกิน 3 MB",
		})
	}

	if image.Header["Content-Type"][0] != "image/jpeg" && image.Header["Content-Type"][0] != "image/png" {
		return c.Status(400).JSON(fiber.Map{
			"message": "เอกสารที่อัพโหลดต้องเป็นไฟล์ชนิด jpg หรือ png เท่านั้น",
		})
	}

	db := database.DB
	postReq := new(postRequest)
	if err := c.BodyParser(postReq); err != nil {
		return c.Status(fiber.StatusInternalServerError).JSON(fiber.Map{"message": "Couldn't create post", "data": nil})
	}

	postImage := ""
	if image != nil {
		nameFile := utils.RandomString(16) + ".png"
		dirPath := filepath.Join(".", "uploads")
		filePath := filepath.Join(dirPath, nameFile)
		if _, err = os.Stat(dirPath); os.IsNotExist(err) {
			err = os.MkdirAll(dirPath, os.ModeDir)
			if err != nil {
				return c.Status(500).JSON(fiber.Map{
					"message": "create directory failed",
					"error":   err.Error(),
				})
			}
		}
		if err := c.SaveFile(image, filePath); err != nil {
			return c.Status(400).JSON(fiber.Map{
				"message": "Upload Failed",
				"error":   err.Error(),
			})
		}

		postImage = string(filepath.Separator) + filePath
	}

	post := models.Post{
		Title:   postReq.Title,
		Message: postReq.Message,
		Tags:    postReq.Tags,
		Image:   postImage,
		Creator: claims["creator"].(string),
		UserID:  uint(claims["userID"].(float64)),
	}

	err = db.Create(&post).Error
	if err != nil {
		return c.Status(500).JSON(fiber.Map{
			"message": "Create Post Failed",
			"error":   err.Error(),
		})
	}

	postRes := models.Post{}
	db.Preload("User").Find(&postRes, post.ID)

	return c.Status(fiber.StatusCreated).JSON(fiber.Map{"message": "Created Post", "data": postRes.Serialize(c)})
}

func GetAllPosts(c *fiber.Ctx) error {
	var count int64
	db := database.DB

	page, _ := strconv.Atoi(c.Query("page", ""))
	if page == 0 {
		page = 1
	}
	pageSize := 8
	offset := (page - 1) * pageSize

	search := c.Query("search", "")

	var posts []models.Post

	quertCount := db.Model(&models.Post{})
	query := db.Preload("User").Offset(offset).Limit(pageSize)
	if search != "" {
		quertCount = quertCount.Where("title Like ?", "%"+search+"%").Or("message Like ?", "%"+search+"%").Or("tags Like ?", "%"+search+"%").Or("creator Like ?", "%"+search+"%")
		query = query.Where("title Like ?", "%"+search+"%").Or("message Like ?", "%"+search+"%").Or("tags Like ?", "%"+search+"%").Or("creator Like ?", "%"+search+"%")
	}

	err := quertCount.Count(&count).Error
	if err != nil {
		return c.JSON(fiber.Map{"message": err.Error()})
	}
	err = query.Find(&posts).Error
	if err != nil {
		return c.JSON(fiber.Map{"message": err.Error()})
	}

	numberOfPages := int(math.Ceil(float64(count) / float64(pageSize)))

	// Serialize
	length := len(posts)
	postsSerialized := make([]map[string]interface{}, length)
	for i := 0; i < length; i++ {
		postsSerialized[i] = posts[i].Serialize(c)
	}

	return c.JSON(fiber.Map{"data": postsSerialized, "currentPage": page, "numberOfPages": numberOfPages})
}

func GetPost(c *fiber.Ctx) error {
	id := c.Params("id")
	db := database.DB
	var post models.Post
	db.Find(&post, id)
	if post.Title == "" {
		return c.Status(404).JSON(fiber.Map{"status": "error", "message": "No post found with ID", "data": nil})

	}
	return c.JSON(post.Serialize(c))
}
