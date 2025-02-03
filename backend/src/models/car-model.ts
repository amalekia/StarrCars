import { Schema, model, Document, Types } from 'mongoose';

export interface ICar extends Document {
  creator: Types.ObjectId;
  carMake: string;
  carModel: string;
  color: string;
  year: number;
  price: number;
  mileage: number;
  location: string;
  contactCell: string;
  contactEmail: string;
  images?: string[];
  description?: string;
}

const carSchema = new Schema<ICar>(
  {
    creator: {
      type: Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },
    carMake: {
      type: String,
      required: true,
    },
    carModel: {
      type: String,
      required: true,
    },
    color: {
      type: String,
      required: true,
    },
    year: {
      type: Number,
      required: true,
    },
    price: {
      type: Number,
      required: true,
    },
    mileage: {
      type: Number,
      required: true,
    },
    location: {
      type: String,
      required: true,
    },
    contactCell: {
      type: String,
      required: true,
    },
    contactEmail: {
      type: String,
      required: true,
    },
    images: {
      type: [String],
      required: false,
    },
    description: {
      type: String,
      required: false,
    },
  },
  {
    collection: "used-cars",
  }
);

const Car = model<ICar>('Car', carSchema);

export default Car;
