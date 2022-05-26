package models

import (
	"strings"
	"time"

	"github.com/gofiber/fiber/v2"
)

type Post struct {
	ID        uint      `json:"id" gorm:"primaryKey"`
	CreatedAt time.Time `json:"created_at" gorm:"primaryKey"`
	UpdatedAt time.Time `json:"updated_at" gorm:"primaryKey"`
	Title     string    `json:"title" gorm:"SIZE:100;NOT NULL"`
	Message   string    `json:"message" gorm:"SIZE:500;DEFAULT:NULL"`
	Image     string    `json:"image" gorm:"SIZE:255;DEFAULT:NULL"`
	Tags      string    `json:"tags" gorm:"SIZE:255;DEFAULT:NULL"`
	Creator   string    `json:"creator" gorm:"SIZE:200;DEFAULT:NULL"`
	UserID    uint      `json:"user_id" gorm:"type:int(11);NOT NULL"`
	User      User      `json:"user"`
}

func (p Post) Serialize(c *fiber.Ctx) map[string]interface{} {

	var likes [3]int
	likes[0] = 1
	likes[1] = 2
	likes[2] = 3

	var comments [3]string
	comments[0] = "John: test comments"
	comments[1] = "John: test comments"
	comments[2] = "John: test comments"

	replaceAllFlag := -1

	return map[string]interface{}{
		"id":         p.ID,
		"created_at": p.CreatedAt,
		"updated_at": p.UpdatedAt,
		"title":      p.Title,
		"message":    p.Message,
		"image":      c.BaseURL() + strings.Replace(p.Image, "\\", "/", replaceAllFlag),
		"tags":       strings.Split(p.Tags, ","),
		"creator":    p.Creator,
		"user_id":    p.UserID,
		"user":       p.User,
		"likes":      likes,
		"comments":   comments,
	}
}
