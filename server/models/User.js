import mongoose from 'mongoose';

const { Schema } = mongoose;

const UserSchema = new Schema(
  {
    username: {
      type: String,
      required: true,
      unique: true,
      trim: true,
      minlength: 2,
      maxlength: 16
    },
    password: {
      type: String,
      required: true,
      trim: true,
      minlength: 8,
      maxlength: 64
    },
  },
  { timeStamps: true }
);

export const User = mongoose.model('users', UserSchema);