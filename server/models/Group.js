import mongoose from 'mongoose';

const { Schema } = mongoose;

const GroupSchema = new Schema(
  {
    name: {
      type: String,
      required: true
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
          required: true
        },
        username: {
          type: String
        },
        password: {
          type: String,
          required: true
        },
        url: {
          type: String
        }
      }
    ]
  },
  { timestamps: true }
)

export const Group = mongoose.model('group', GroupSchema);