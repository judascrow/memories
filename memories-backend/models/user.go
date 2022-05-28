package models

import (
	"time"
)

type User struct {
	ID        uint      `json:"id" gorm:"primaryKey"`
	Email     string    `json:"email" gorm:"SIZE:100;UNIQUE;NOT NULL"`
	FirstName string    `json:"first_name" gorm:"SIZE:50;NOT NULL"`
	LastName  string    `json:"last_name" gorm:"SIZE:50;NOT NULL"`
	Password  string    `json:"-" gorm:"SIZE:255;NOT NULL"`
	CreatedAt time.Time `json:"-"`
	UpdatedAt time.Time `json:"-"`
}

func (u User) Serialize() map[string]interface{} {

	return map[string]interface{}{
		"id":    u.ID,
		"name":  u.FirstName + " " + u.LastName,
		"email": u.Email,
	}
}
