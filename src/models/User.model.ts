// src/database/User.ts
import mongoose, { Document, Schema } from "mongoose";

export interface IUser extends Document {
  _id: mongoose.Types.ObjectId;
  username: string;
  password: string;
  tokens: string[];
  refreshTokens: string[];
}

const userSchema: Schema = new Schema({
  username: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
  tokens: [
    {
      type: String,
    },
  ],
  refreshTokens: [
    {
      type: String,
    },
  ],
});

export default mongoose.model<IUser>("User", userSchema);
