package controllers

import (
	"math"
	"memories-backend/database"
	"memories-backend/middlewares"
	"memories-backend/models"
	"memories-backend/utils"
	"os"
	"path/filepath"
	"strconv"
	"strings"

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
		return c.Status(fiber.StatusBadRequest).JSON(fiber.Map{
			"message": "token is expired",
		})
	}

	image, err := c.FormFile("image")
	if err != nil {
		return c.Status(fiber.StatusBadRequest).JSON(fiber.Map{
			"message": "upload file validate error",
		})
	}

	if image.Size > 3000000 {
		return c.Status(fiber.StatusBadRequest).JSON(fiber.Map{
			"message": "ขนาดไฟล์ต้องไม่เกิน 3 MB",
		})
	}

	if image.Header["Content-Type"][0] != "image/jpeg" && image.Header["Content-Type"][0] != "image/png" {
		return c.Status(fiber.StatusBadRequest).JSON(fiber.Map{
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
				return c.Status(fiber.StatusInternalServerError).JSON(fiber.Map{
					"message": "create directory failed",
					"error":   err.Error(),
				})
			}
		}
		if err := c.SaveFile(image, filePath); err != nil {
			return c.Status(fiber.StatusInternalServerError).JSON(fiber.Map{
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
		return c.Status(fiber.StatusInternalServerError).JSON(fiber.Map{
			"message": "Post Create Failed",
			"error":   err.Error(),
		})
	}

	postRes := models.Post{}
	db.Preload("User").Find(&postRes, post.ID)

	return c.Status(fiber.StatusCreated).JSON(fiber.Map{"message": "Post successfully created", "data": postRes.Serialize(c)})
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
	query := db.Preload("User").Preload("Likes").Offset(offset).Limit(pageSize)
	if search != "" {
		quertCount = quertCount.Where("title Like ?", "%"+search+"%").Or("message Like ?", "%"+search+"%").Or("tags Like ?", "%"+search+"%").Or("creator Like ?", "%"+search+"%")
		query = query.Where("title Like ?", "%"+search+"%").Or("message Like ?", "%"+search+"%").Or("tags Like ?", "%"+search+"%").Or("creator Like ?", "%"+search+"%")
	}

	err := quertCount.Count(&count).Error
	if err != nil {
		return c.Status(fiber.StatusInternalServerError).JSON(fiber.Map{"message": err.Error()})
	}
	err = query.Find(&posts).Error
	if err != nil {
		return c.Status(fiber.StatusNotFound).JSON(fiber.Map{"message": err.Error()})
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
	db.Preload("User").Preload("Likes").Find(&post, id)
	if post.Title == "" {
		return c.Status(fiber.StatusNotFound).JSON(fiber.Map{"status": "error", "message": "No post found with ID", "data": nil})

	}
	return c.JSON(post.Serialize(c))
}

func UpdatePost(c *fiber.Ctx) error {
	postReq := new(postRequest)
	if err := c.BodyParser(postReq); err != nil {
		return c.Status(fiber.StatusBadRequest).JSON(fiber.Map{"message": "Review your input", "data": err.Error()})
	}
	id := c.Params("id")
	token := c.Locals("user").(*jwtv4.Token)

	db := database.DB
	var post models.Post
	db.First(&post, id)

	if !middlewares.ValidToken(token, post.UserID) {
		return c.Status(fiber.StatusBadRequest).JSON(fiber.Map{"message": "Invalid token id", "data": nil})
	}

	image, _ := c.FormFile("image")

	postImage := post.Image
	if image != nil {
		if image.Size > 3000000 {
			return c.Status(fiber.StatusBadRequest).JSON(fiber.Map{
				"message": "ขนาดไฟล์ต้องไม่เกิน 3 MB",
			})
		}

		if image.Header["Content-Type"][0] != "image/jpeg" && image.Header["Content-Type"][0] != "image/png" {
			return c.Status(fiber.StatusBadRequest).JSON(fiber.Map{
				"message": "เอกสารที่อัพโหลดต้องเป็นไฟล์ชนิด jpg หรือ png เท่านั้น",
			})
		}

		nameFile := utils.RandomString(16) + ".png"
		dirPath := filepath.Join(".", "uploads")
		filePath := filepath.Join(dirPath, nameFile)
		if _, err := os.Stat(dirPath); os.IsNotExist(err) {
			err = os.MkdirAll(dirPath, os.ModeDir)
			if err != nil {
				return c.Status(fiber.StatusInternalServerError).JSON(fiber.Map{
					"message": "create directory failed",
					"error":   err.Error(),
				})
			}
		}
		if err := c.SaveFile(image, filePath); err != nil {
			return c.Status(fiber.StatusInternalServerError).JSON(fiber.Map{
				"message": "Upload Failed",
				"error":   err.Error(),
			})
		}

		oldImage := strings.Split(post.Image, "\\")
		if len(oldImage) > 2 {
			// fmt.Println(oldImage[0], oldImage[1], oldImage[2])
			os.Remove("./uploads/" + oldImage[2])
		}

		postImage = string(filepath.Separator) + filePath
	}

	postUpdate := models.Post{
		Title:   postReq.Title,
		Message: postReq.Message,
		Tags:    postReq.Tags,
		Image:   postImage,
	}

	db.Model(&post).Updates(postUpdate)

	return c.JSON(fiber.Map{"message": "Post successfully updated", "data": post.Serialize(c)})
}

func DeletePost(c *fiber.Ctx) error {
	id := c.Params("id")
	db := database.DB

	var post models.Post
	db.First(&post, id)
	if post.Title == "" {
		return c.Status(fiber.StatusNotFound).JSON(fiber.Map{"message": "No post found with ID", "data": nil})

	}

	token := c.Locals("user").(*jwtv4.Token)
	if !middlewares.ValidToken(token, post.UserID) {
		return c.Status(fiber.StatusBadRequest).JSON(fiber.Map{"message": "Invalid token id", "data": nil})
	}

	db.Delete(&post)
	return c.JSON(fiber.Map{"status": "success", "message": "Post successfully deleted", "data": nil})
}

func LikePost(c *fiber.Ctx) error {
	id := c.Params("id")
	token := c.Locals("user").(*jwtv4.Token)
	claims := token.Claims.(jwtv4.MapClaims)
	if claims["userID"] == "" {
		return c.Status(fiber.StatusBadRequest).JSON(fiber.Map{
			"message": "token is expired",
		})
	}
	userID := uint(claims["userID"].(float64))

	db := database.DB
	var post models.Post
	var like models.Like
	db.First(&post, id)
	if post.Title == "" {
		return c.Status(fiber.StatusNotFound).JSON(fiber.Map{"message": "No post found with ID", "data": nil})

	}

	var count int64
	db.Where("post_id = ?", post.ID).Where("user_id = ?", userID).Model(&like).Count(&count)
	if count == 0 {
		likeCreate := models.Like{
			PostID: post.ID,
			UserID: userID,
		}
		db.Create(&likeCreate)
	} else {
		db.Where("post_id = ?", post.ID).Where("user_id = ?", userID).Delete(&like)
	}

	return c.JSON(fiber.Map{"message": "Liked post successfully", "data": nil})
}
