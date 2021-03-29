import mongoose, { Schema } from 'mongoose';

const itemSchema = (collectionName: string) =>
  new Schema(
    {
      title: {
        type: String,
        required: true,
      },
      description: {
        type: String,
      },
      creating: {
        type: Boolean,
      },
    },
    { timestamps: true, collection: collectionName }
  );

export const ToDo =
  mongoose.models['To Do'] || mongoose.model('To Do', itemSchema('To Do'));

export const InProgress =
  mongoose.models['In Progress'] ||
  mongoose.model('In Progress', itemSchema('In Progress'));

export const Done =
  mongoose.models['Done'] || mongoose.model('Done', itemSchema('Done'));
