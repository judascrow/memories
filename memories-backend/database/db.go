package database

import (
	"fmt"
	"log"
	"strings"

	"memories-backend/config"

	"gorm.io/driver/mysql"
	"gorm.io/gorm"
)

var (
	DB *gorm.DB
)

func ConnectDB() {
	var err error
	dsn := fmt.Sprintf("%s:%s@tcp(%s:%s)/%s?charset=utf8mb4&parseTime=True&loc=Local", config.Config("DB_USER"), config.Config("DB_PASSWORD"), config.Config("DB_HOST"), config.Config("DB_PORT"), config.Config("DB_NAME"))
	db, err := gorm.Open(mysql.Open(dsn), &gorm.Config{})

	if err != nil {
		log.Println(strings.Repeat("!", 40))
		log.Println("☹️  Could Not Establish Mysql DB Connection")
		log.Println(strings.Repeat("!", 40))
		log.Fatal(err)
	}

	log.Println(strings.Repeat("-", 40))
	log.Println("😀 Connected To Mysql DB")
	log.Println(strings.Repeat("-", 40))

	DB = db
}
