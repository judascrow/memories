package controllers

import (
	"errors"
	"memories-backend/database"
	"memories-backend/middlewares"
	"memories-backend/models"
	"time"

	"memories-backend/config"

	"github.com/gofiber/fiber/v2"
	"github.com/golang-jwt/jwt"
	"gorm.io/gorm"
)

type registerRequest struct {
	Email     string `json:"email"`
	Password  string `json:"password" `
	FirstName string `json:"first_name"`
	LastName  string `json:"last_name"`
}

type loginRequest struct {
	Email    string `json:"email"`
	Password string `json:"password"`
}

func getUserByEmail(e string) (*models.User, error) {
	db := database.DB
	var user models.User
	if err := db.Where(&models.User{Email: e}).Find(&user).Error; err != nil {
		if errors.Is(err, gorm.ErrRecordNotFound) {
			return nil, nil
		}
		return nil, err
	}
	return &user, nil
}

func Register(c *fiber.Ctx) error {
	db := database.DB

	req := new(registerRequest)
	if err := c.BodyParser(req); err != nil {
		return c.Status(fiber.StatusBadRequest).JSON(fiber.Map{"message": "Review your input", "data": nil})
	}

	hash, err := middlewares.HashPassword(req.Password)
	if err != nil {
		return c.Status(fiber.StatusBadRequest).JSON(fiber.Map{"message": "Couldn't hash password", "data": nil})

	}

	user := models.User{
		Email:     req.Email,
		Password:  hash,
		FirstName: req.FirstName,
		LastName:  req.LastName,
	}

	if err := db.Create(&user).Error; err != nil {
		return c.Status(fiber.StatusInternalServerError).JSON(fiber.Map{"message": "Couldn't create user", "data": nil})
	}

	return c.Status(fiber.StatusCreated).JSON(fiber.Map{"message": "Register successfully", "data": req})
}

func Login(c *fiber.Ctx) error {

	var req loginRequest

	if err := c.BodyParser(&req); err != nil {
		return c.Status(fiber.StatusBadRequest).JSON(fiber.Map{"message": "Error on login request", "data": err})
	}

	user, err := getUserByEmail(req.Email)
	if err != nil {
		return c.Status(fiber.StatusUnauthorized).JSON(fiber.Map{"message": "Error on email", "data": err})
	}

	if user.Email == "" {
		return c.Status(fiber.StatusUnauthorized).JSON(fiber.Map{"message": "User not found", "data": err})
	}

	if !middlewares.CheckPasswordHash(req.Password, user.Password) {
		return c.Status(fiber.StatusUnauthorized).JSON(fiber.Map{"message": "Invalid password", "data": nil})
	}

	token := jwt.New(jwt.SigningMethodHS256)

	claims := token.Claims.(jwt.MapClaims)
	claims["email"] = user.Email
	claims["creator"] = user.FirstName + " " + user.LastName
	claims["userID"] = user.ID
	claims["exp"] = time.Now().Add(time.Hour * 72).Unix()

	t, err := token.SignedString([]byte(config.Config("SECRET")))
	if err != nil {
		return c.Status(fiber.StatusInternalServerError).JSON(fiber.Map{"message": err.Error(), "data": nil})
	}

	return c.JSON(fiber.Map{"message": "Login successfully", "token": t, "result": user.Serialize()})
}
