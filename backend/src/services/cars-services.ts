import Car from "../models/car-model";
import { Request } from "express";
import path from "path";
import { v2 as cloudinary } from "cloudinary";
import { CloudinaryStorage } from "multer-storage-cloudinary";
import { UserContext } from "../util/auth";
import multer from "multer";
import dotenv from "dotenv";
import { Types } from "mongoose";
import { User } from "../models/user-model";

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
  creator: Types.ObjectId;
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

export const addCar = async (req: Request, user: UserContext | undefined): Promise<CarType> => {
  if (!user) {
    return Promise.reject({ message: "User not found", status: 404 });
  }
  const creator = user._id;
  const username = await User.findById(creator);

  if (!username) {
    return Promise.reject({ message: "User not found", status: 404 });
  }

  try {
    const imageUrls: string[] = req.files ? (req.files as Express.Multer.File[]).map((file: any) => file.path) : [];
    req.body.images = imageUrls;

    const { carMake, carModel, year, price, mileage, location, contactCell, contactEmail, description } = req.body;

    const newCar = new Car({
      creator,
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
    const savedCar = await newCar.save();

    // add car post to user
    username.carPosts.push(newCar._id as Types.ObjectId);
    await username.save();
    return savedCar;

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

export const deleteCar = async (user: UserContext | undefined, id: string): Promise<void> => {
  if (!user) {
    return Promise.reject({ message: "User not found", status: 404 });
  }
  const creator = user._id;
  const username = await User.findById(creator);

  if (!username) {
    return Promise.reject({ message: "User not found", status: 404 });
  }

  try {
    const car = await Car.findById(id);
    if (!car) {
      throw {
        message: "Car not found",
        status: 404,
      };
    }

    if (car.images && car.images.length > 0) {
      const deletePromises = car.images.map((imageUrl) => {
        const publicId = path.basename(imageUrl, path.extname(imageUrl));
        return cloudinary.uploader.destroy(publicId);
      });

      await Promise.all(deletePromises);
    }

    // Remove the car entry from MongoDB
    await Car.findByIdAndDelete(id);

    // remove car post from user
    username.carPosts = username.carPosts.filter((postId) => postId.toString() !== id);
    await username.save();

  } catch (error: any) {
    throw {
      message: error.message || "Error deleting car",
      status: 500,
    };
  }
};
