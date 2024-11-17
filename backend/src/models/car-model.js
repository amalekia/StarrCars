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
    location: {
      type: String,
      required: true,
    },
    mileage: {
      type: Number,
      required: false,
    },
    contactCell: {
      type: String,
      required: true,
    },
    contactEmail: {
      type: String,
      required: true,
    },
  },
  {
    collection: 'used-cars',
  }
);

const Car = model('Car', carSchema);

export default Car;
