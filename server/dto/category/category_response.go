package categorysdto

import "dumbflix/models"

type CategoryResponse struct {
	ID     int                 `json:"id" gorm:"primary_key:auto_increment"`
	Name   string              `json:"name" form:"name" validate:"required"`
	Film   int                 `json:"film_id"`
	FilmID models.FilmResponse `json:"film"`
}
