package models

import (
	"time"
)

type Model struct {
	ID        uint      `json:"id" gorm:"primaryKey"`
	CreatedAt time.Time `json:"created_at" gorm:"primaryKey"`
	UpdatedAt time.Time `json:"updated_at" gorm:"primaryKey"`
	// DeletedAt gorm.DeletedAt `json:"deleted_at" gorm:"index"`
}
