package models

import "time"

type User struct {
	ID        uint      `json:"id" gorm:"primaryKey"`
	CreatedAt time.Time `json:"-" gorm:"primaryKey"`
	UpdatedAt time.Time `json:"-" gorm:"primaryKey"`
	Email     string    `json:"email" gorm:"SIZE:100;UNIQUE;NOT NULL"`
	Password  string    `json:"-" gorm:"SIZE:255;NOT NULL"`
	FirstName string    `json:"first_name" gorm:"SIZE:50"`
	LastName  string    `json:"last_name" gorm:"SIZE:50"`
}
