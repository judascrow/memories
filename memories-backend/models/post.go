package models

import "time"

type Post struct {
	ID        uint      `json:"id" gorm:"primaryKey"`
	CreatedAt time.Time `json:"created_at" gorm:"primaryKey"`
	UpdatedAt time.Time `json:"updated_at" gorm:"primaryKey"`
	Title     string    `json:"title" gorm:"SIZE:100;NOT NULL"`
	Message   string    `json:"message" gorm:"SIZE:500"`
	Image     string    `json:"image" gorm:"SIZE:255"`
	Tags      string    `json:"tags" gorm:"SIZE:255"`
	UserID    uint      `json:"user_id" gorm:"type:int(11)"`
	User      User      `json:"user" `
}
