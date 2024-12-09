import Car from "../models/car-model.js";

export const getCars = async () => {
  const cars = await Car.find();
  return cars;
};

export const addCar = async (
  carMake,
  carModel,
  year,
  price,
  mileage,
  location,
  contactCell,
  contactEmail
) => {
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
    });

    // Save the new car to the database
    return await newCar.save();
  } catch (error) {
    throw {
      message: error.message,
      status: 400, // Or another appropriate status code
    };
  }
};

export const getCarsByLocation = async (location) => {
  const cars = await Car.find({ location });
  return cars;
};

export const getCarsByMakeAndModel = async (make, model) => {
  const cars = await Car.find({ carMake: make, carModel: model });
  return cars;
};

export const deleteCar = async (id) => {
  try {
    await Car.findByIdAndDelete(id);
  } catch (error) {
    throw {
      message: error.message,
      status: 404,
    };
  }
}
