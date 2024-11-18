import express from "express";
import {
  getCars,
  getCarsByLocation,
  addCar,
} from "../services/cars-services.js";

const router = express.Router();

// Get all used cars
router.get("/", async (req, res) => {
  getCars()
    .then((cars) => res.status(200).json(cars))
    .catch((error) =>
      res.status(error.status).json({ message: error.message })
    );
});

// Get used cars by location
router.get("/location/:location", async (req, res) => {
  getCarsByLocation(req.params.location)
    .then((cars) => res.status(200).json(cars))
    .catch((error) =>
      res.status(error.status).json({ message: error.message })
    );
});

// Sell your car (create a new car listing)
router.post("/sellcar", async (req, res) => {
  addCar(
    req.body.carMake,
    req.body.carModel,
    req.body.year,
    req.body.price,
    req.body.mileage,
    req.body.location,
    req.body.contactCell,
    req.body.contactEmail
  )
    .then((newCar) => res.status(201).json(newCar))
    .catch((error) => {
      const statusCode = error.status || 500;
      res
        .status(statusCode)
        .json({ message: error.message || "Internal Server Error" });
    });
});

export default router;
