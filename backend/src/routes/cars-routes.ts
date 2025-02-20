import express, { Request, Response } from "express";
import {
  getCars,
  getCarsByLocation,
  addCar,
  deleteCar,
  getCarsByMakeAndModel,
  getCarById,
  getCarsByUserId,
  upload,
} from "../services/cars-services";
import { auth, AuthRequest } from "../util/auth";

const router = express.Router();

// Get used cars for sale
router.get("/", async (req: Request, res: Response) => {
  const location = req.query.location as string;
  if (location) {
    getCarsByLocation(location)
      .then((cars) => res.status(200).json(cars))
      .catch((error) =>
        res.status(error.status || 500).json({ message: error.message || "Internal Server Error" })
      );
  } else {
    getCars()
      .then((cars) => res.status(200).json(cars))
      .catch((error) =>
        res.status(error.status || 500).json({ message: error.message || "Internal Server Error" })
      );
  }
});

// Sell your car (create a new car listing)
router.post("/sellcar", upload, async (req: Request, res: Response) => {
  try {
    const newCar = await addCar(req);
    res.status(201).json(newCar);
  } catch (error) {
    const err = error as { status?: number; message?: string };
    res.status(err.status || 500).json({ message: err.message || "Internal Server Error" });
  }
});

// Delete car by id
router.delete("/:id", async (req: Request, res: Response) => {
  deleteCar(req.body.userId, req.params.id) 
    .then(() => res.status(204).send())
    .catch((error) =>
      res.status(error.status).json({ message: error.message })
    );
});

// Find cars by make and model
router.get("/:make/:model", async (req: Request, res: Response) => {
  const make = req.params.make;
  const model = req.params.model;

  getCarsByMakeAndModel(make, model)
    .then((cars) => res.status(200).json(cars))
    .catch((error) =>
      res.status(error.status).json({ message: error.message })
    );
});

// Get car by id
router.get("/:id", async (req: Request, res: Response) => {
  getCarById(req.params.id)
    .then((car) => res.status(200).json(car))
    .catch((error) =>
      res.status(error.status).json({ message: error.message })
    );
});

router.post("/user-car-posts", auth, async (req: AuthRequest, res: Response) => {
  try {
    const { userId } = req.body;

    if (!userId) {
      res.status(400).json({ message: "User ID is required." });
    }

    const carPosts = await getCarsByUserId(userId);
    res.status(200).json(carPosts);
  } catch (error) {
    console.error("Error fetching user car posts:", error);
    res.status(500).json({ message: "Failed to fetch car posts." });
  }
});

export default router;
