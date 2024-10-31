import Car from "../models/car-model.js";

export const getCars = async () => {
  const cars = await Car.find();
  return cars;
};

export const addCar = async (make, model, year, price, color, mileage) => {
  const car = new Car({
    make,
    model,
    year,
    price,
    color,
    mileage,
  });
  newCar = await car.save();
  return newCar;
};

export const getCarsByLocation = async (location) => {
  const cars = await Car.find({ location });
  return cars;
};
