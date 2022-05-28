package routes

import (
	"memories-backend/controllers"
	"memories-backend/middlewares"

	"github.com/gofiber/fiber/v2"
)

func SetupRoutes(app *fiber.App) {

	app.Static("/uploads", "./uploads")

	apiV1 := app.Group("/api/v1")

	apiV1.Get("/healthcheck", controllers.Healthcheck)

	auth := apiV1.Group("/auth")
	auth.Post("/register", controllers.Register)
	auth.Post("/login", controllers.Login)

	posts := apiV1.Group("/posts")
	posts.Post("", middlewares.Protected(), controllers.CreatePost)
	posts.Get("", controllers.GetAllPosts)
	posts.Get("/:id", controllers.GetPost)
	posts.Put("/:id", middlewares.Protected(), controllers.UpdatePost)
	posts.Delete("/:id", middlewares.Protected(), controllers.DeletePost)
	posts.Patch("/:id/like", middlewares.Protected(), controllers.LikePost)
	posts.Patch("/:id/comment", middlewares.Protected(), controllers.CommentPost)
	posts.Delete("/:id/comment/:cid", middlewares.Protected(), controllers.DeleteComment)
}
