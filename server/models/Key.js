import mongoose from 'mongoose';

const { Schema } = mongoose;

const KeySchema = new Schema(
  {
    title: {
      type: String,
      required: true,
      maxlength: 64
    },
    username: {
      type: String,
      maxlength: 64
    },
    password: {
      type: String,
      required: true,
      minlength: 8,
      maxlength: 64
    },
    url: {
      type: String,
      maxlength: 64
    },
    createdBy: {
      type: mongoose.SchemaTypes.ObjectId,
      ref: 'users',
      required: true
    },
    inGroups: {
      type: mongoose.SchemaTypes.ObjectId,
      ref: 'groups',
      required: true
    }
  },
  { timestamps: true }
);

export const Key = mongoose.model('key', KeySchema);