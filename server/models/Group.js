import mongoose from 'mongoose';

const { Schema } = mongoose;

const GroupSchema = new Schema(
  {
    name: {
      type: String,
      required: true,
      minlength: 1,
      maxlength: 32
    },
    createdBy: {
      type: mongoose.SchemaTypes.ObjectId,
      ref: 'users',
      required: true
    }
  },
  { timestamps: true }
)

export const Group = mongoose.model('group', GroupSchema);