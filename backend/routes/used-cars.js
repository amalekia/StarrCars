import express from "express";
import { getCars, getCarsByLocation, addCar } from "../services/cars-services.js";

const router = express.Router();

// Get all used cars
router.get("/cars", async (req, res) => {
  getCars()
    .then((cars) => res.status(200).json(cars))
    .catch((error) => res.status(error.status).json({ message: error.message }));
});

// Get used cars by location
router.get("/location/:location", async (req, res) => {
  getCarsByLocation(req.params.location)
    .then((cars) => res.status(200).json(cars))
    .catch((error) => res.status(error.status).json({ message: error.message }));
});

// Sell your car (create a new car listing)
router.post("/sellcar", async (req, res) => {
  addCar(req.body.make, req.body.model, req.body.year, req.body.price, req.body.color, req.body.mileage)
    .then((newCar) => res.status(201).json(newCar))
    .catch((error) => res.status(error.status).json({ message: error.message }));
});

export default router;
