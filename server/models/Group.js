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
    },
    keys: [
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
          maxlength: 64
        },
        url: {
          type: String,
          maxlength: 64
        }
      }
    ]
  },
  { timestamps: true }
)

export const Group = mongoose.model('group', GroupSchema);