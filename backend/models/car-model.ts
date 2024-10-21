import { Document, Schema, model } from "mongoose";

export interface Car extends Document {
    carMake: string;
    carModel: string;
    year: number;
    price: number;
    color: string;
    mileage: number;
}

const carSchema = new Schema<Car>({
    carMake: {
        type: String,
        required: true
    },
    carModel: {
        type: String,
        required: true
    },
    year: {
        type: Number,
        required: true
    },
    price: {
        type: Number,
        required: true
    },
    color: {
        type: String,
        required: false
    },
    mileage: {
        type: Number,
        required: false
    }
}, {
    collection: "used-cars"
});

export const Car = model<Car>("Car", carSchema);