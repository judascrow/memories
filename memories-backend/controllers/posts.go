package controllers

import (
	"memories-backend/database"
	"memories-backend/models"
	"memories-backend/utils"
	"os"
	"path/filepath"

	"github.com/gofiber/fiber/v2"
	jwtv4 "github.com/golang-jwt/jwt/v4"
)

func CreatePost(c *fiber.Ctx) error {
	token := c.Locals("user").(*jwtv4.Token)
	claims := token.Claims.(jwtv4.MapClaims)

	type PostRequest struct {
		Title   string `json:"title" form:"title"`
		Message string `json:"message" form:"message"`
		Tags    string `json:"tags"  form:"tags"`
	}

	image, err := c.FormFile("image")
	if err != nil {
		return c.Status(400).JSON(fiber.Map{
			"message": "upload file validate error",
			"error":   err.Error(),
		})
	}

	if image.Size > 3000000 {
		return c.Status(400).JSON(fiber.Map{
			"message": "ขนาดไฟล์ต้องไม่เกิน 3 MB",
			"error":   "Bad Request",
		})
	}

	if image.Header["Content-Type"][0] != "image/jpeg" && image.Header["Content-Type"][0] != "image/png" {
		return c.Status(400).JSON(fiber.Map{
			"success": false,
			"message": "เอกสารที่อัพโหลดต้องเป็นไฟล์ชนิด jpg หรือ png เท่านั้น",
			"error":   "Bad Request",
		})
	}

	db := database.DB
	postReq := new(PostRequest)
	if err := c.BodyParser(postReq); err != nil {
		return c.Status(fiber.StatusInternalServerError).JSON(fiber.Map{"message": "Couldn't create product", "data": err})
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

	postRes.Image = utils.ResponseImage(postRes.Image)

	return c.JSON(fiber.Map{"message": "Created Post", "data": postRes})
}
