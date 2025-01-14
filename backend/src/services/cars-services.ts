import Car from "../models/car-model";

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

export const addCar = async (
  carMake: string,
  carModel: string,
  year: number,
  price: number,
  mileage: number,
  location: string,
  contactCell: string,
  contactEmail: string,
  images?: string[],
  description?: string
): Promise<CarType> => {
  try {
    const newCar = new Car({
      carMake,
      carModel,
      year,
      price,
      mileage,
      location,
      contactCell,
      contactEmail,
      images,
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
    await Car.findByIdAndDelete(id);
  } catch (error: any) {
    throw {
      message: error.message,
      status: 404,
    };
  }
};
