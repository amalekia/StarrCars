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
    color: {
      type: String,
      required: false,
    },
    mileage: {
      type: Number,
      required: false,
    },
  },
  {
    collection: 'used-cars',
  }
);

const Car = model('Car', carSchema);

export default Car;
