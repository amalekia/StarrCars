import { Car } from '../models/car-model';

export const getCars = async () => {
    const cars = await Car.find().limit(20);
    return cars;
}

export const addCar = async (make, model, year, price, color, mileage) => {
    const car = new Car({
        make,
        model,
        year,
        price,
        color,
        mileage
    })
    newCar = await car.save();
    return newCar;
}