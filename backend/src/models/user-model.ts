import { Document, Schema, model, Types } from "mongoose";
import validator from "validator";

export interface User extends Document {
  _id: string;
  name: string;
  email: string;
  password: string;
  carPosts: Types.ObjectId[];
}

const UserSchema = new Schema<User>(
  {
    name: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
      validate: validator.isEmail,
    },
    password: {
      type: String,
      required: true,
    },
    carPosts: [
      {
        type: Schema.Types.ObjectId,
        ref: "CarPost",
      },
    ],
  },
  { collection: "users" }
);

export const User = model<User>("User", UserSchema);