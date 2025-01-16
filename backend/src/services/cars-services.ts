import Car from "../models/car-model";
import { Request } from "express";
import fs from "fs";
import path from "path";
import { v2 as cloudinary } from "cloudinary";
import { CloudinaryStorage } from "multer-storage-cloudinary";
import multer from "multer";
import dotenv from "dotenv";

dotenv.config();

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME!,
  api_key: process.env.CLOUDINARY_API_KEY!,
  api_secret: process.env.CLOUDINARY_API_SECRET!,
});

const storage = new CloudinaryStorage({
  cloudinary,
  params: {
    public_id: (req, file) => `starrcars-${Date.now()}-${file.originalname}`, // Generate unique image names
  },
});

const upload = multer({ storage }).array("images", 10);

export { cloudinary, upload };

interface CarType {
  carMake: string;
  carModel: string;
  year: number;
  price: number;
  mileage: number;
  location: string;
  contactCell: string;
  contactEmail: string;
  images?: string[];
  description?: string;
}

export const getCars = async (): Promise<CarType[]> => {
  const cars = await Car.find();
  return cars;
};

export const addCar = async (req: Request): Promise<CarType> => {
  try {
    const imageUrls: string[] = req.files ? (req.files as Express.Multer.File[]).map((file: any) => file.path) : [];
    req.body.images = imageUrls;

    const { carMake, carModel, year, price, mileage, location, contactCell, contactEmail, description } = req.body;

    const newCar = new Car({
      carMake,
      carModel,
      year: Number(year),
      price: Number(price),
      mileage: Number(mileage),
      location,
      contactCell,
      contactEmail,
      images: imageUrls,
      description,
    });

    // Save the new car to the database
    return await newCar.save();
  } catch (error: any) {
    throw {
      message: error.message,
      status: 400, // Or another appropriate status code
    };
  }
};

export const getCarsByLocation = async (location: string): Promise<CarType[]> => {
  const cars = await Car.find({ location });
  return cars;
};

export const getCarsByMakeAndModel = async (make: string, model: string): Promise<CarType[]> => {
  const cars = await Car.find({ carMake: make, carModel: model });
  return cars;
};

export const getCarById = async (id: string): Promise<CarType | null> => {
  const car = await Car.findById(id);
  return car;
};

export const deleteCar = async (id: string): Promise<void> => {
  try {
    const car = await Car.findById(id);
    if (!car) {
      throw {
        message: "Car not found",
        status: 404,
      };
    }

    if (car.images && car.images.length > 0) {
      car.images.forEach((imagePath) => {
        const filePath = path.join(__dirname, "..", imagePath); // Adjust path based on server structure

        fs.unlink(filePath, (err) => {
          if (err) {
            console.error(`Failed to delete image: ${imagePath}`, err);
          }
        });
      });
    }

    // Remove the car entry from MongoDB
    await Car.findByIdAndDelete(id);
  } catch (error: any) {
    throw {
      message: error.message || "Error deleting car",
      status: 500,
    };
  }
};
