import { Schema, model } from 'mongoose';

const carSchema = new Schema(
  {
    carMake: {
      type: String,
      required: true,
    },
    carModel: {
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
      required: false,
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

const Car = model('Car', carSchema);

export default Car;
