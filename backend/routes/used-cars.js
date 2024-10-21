import express from "express";
import { getCars, getCarsByLocation } from "../services/cars-services.js";

const router = express.Router();

// Get all used cars
router.get("/cars", async (req, res) => {
  getCars()
    .then((cars) => res.json(cars))
    .catch((error) => res.status(500).json({ message: error.message }));
});

// Get used cars by location
router.get("/location/:location", async (req, res) => {
  getCarsByLocation(req.params.location)
    .then((cars) => res.json(cars))
    .catch((error) => res.status(500).json({ message: error.message }));
});

export default router;
