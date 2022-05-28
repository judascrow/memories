package models

import (
	"strings"
	"time"

	"github.com/gofiber/fiber/v2"
)

type Post struct {
	ID        uint      `json:"id" gorm:"primaryKey"`
	CreatedAt time.Time `json:"created_at"`
	UpdatedAt time.Time `json:"updated_at"`
	Title     string    `json:"title" gorm:"SIZE:100;NOT NULL"`
	Message   string    `json:"message" gorm:"SIZE:500;DEFAULT:NULL"`
	Image     string    `json:"image" gorm:"SIZE:255;DEFAULT:NULL"`
	Tags      string    `json:"tags" gorm:"SIZE:255;DEFAULT:NULL"`
	// Creator   string    `json:"creator" gorm:"SIZE:200;DEFAULT:NULL"`
	UserID   uint      `json:"user_id" gorm:"type:int(11);NOT NULL"`
	User     User      `json:"user"`
	Likes    []Like    `json:"likes"`
	Comments []Comment `json:"comments"`
}

type Like struct {
	ID     uint `json:"-" gorm:"primaryKey"`
	PostID uint `json:"-" gorm:"type:int(11);uniqueIndex:idx_like;NOT NULL"`
	UserID uint `json:"user_id" gorm:"type:int(11);uniqueIndex:idx_like;NOT NULL"`
}

type Comment struct {
	ID          uint      `json:"id" gorm:"primaryKey"`
	PostID      uint      `json:"-" gorm:"type:int(11);NOT NULL"`
	UserID      uint      `json:"user_id" gorm:"type:int(11);NOT NULL"`
	CommentText string    `json:"comment_text" gorm:"SIZE:255;DEFAULT:NULL"`
	CreatedAt   time.Time `json:"created_at"`
}

func (p Post) Serialize(c *fiber.Ctx) map[string]interface{} {
	var tags []string
	if p.Tags != "" {
		for _, v := range strings.Split(p.Tags, ",") {
			if strings.TrimSpace(v) != "" {
				tags = append(tags, strings.TrimSpace(v))
			}
		}
	}

	likes := make([]int, 0)
	for _, v := range p.Likes {
		likes = append(likes, int(v.UserID))
	}

	// comments := make([]string, 0)
	// for _, v := range p.Comments {
	// 	comments = append(comments, v.CommentText)
	// }

	replaceAllFlag := -1

	return map[string]interface{}{
		"id":         p.ID,
		"created_at": p.CreatedAt,
		"updated_at": p.UpdatedAt,
		"title":      p.Title,
		"message":    p.Message,
		"image":      c.BaseURL() + strings.Replace(p.Image, "\\", "/", replaceAllFlag),
		"tags":       tags,
		// "creator":    p.Creator,
		"user_id":  p.UserID,
		"user":     p.User,
		"likes":    likes,
		"comments": p.Comments,
	}
}
