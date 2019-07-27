import mongoose from 'mongoose';

const { Schema } = mongoose;

const KeySchema = new Schema(
  {
    value: {
      type: String,
      required: true,
      minlength: 8,
      maxlength: 64
    },
    createdBy: {
      type: mongoose.SchemaTypes.ObjectId,
      ref: 'users',
      required: true
    }
  }
);

export const Key = mongoose.model('key', KeySchema);