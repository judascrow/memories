package main

import (
	"fmt"

	"github.com/gofiber/fiber/v2"
	"github.com/gofiber/fiber/v2/middleware/cors"
	"github.com/gofiber/fiber/v2/middleware/favicon"
	"github.com/gofiber/fiber/v2/middleware/logger"
	"github.com/gofiber/fiber/v2/middleware/recover"

	"memories-backend/config"
	"memories-backend/database"
	"memories-backend/models"
	"memories-backend/routes"
)

func main() {
	app := fiber.New()

	database.ConnectDB()
	database.DB.AutoMigrate(&models.User{}, &models.Post{}, &models.Like{}, &models.Comment{})

	app.Use(cors.New())
	app.Use(favicon.New())
	app.Use(logger.New())
	app.Use(recover.New())

	routes.SetupRoutes(app)

	port := fmt.Sprintf(":%s", config.Config("SERVER_PORT"))
	app.Listen(port)
}
