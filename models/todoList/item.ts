import mongoose, { Schema } from 'mongoose';

const itemSchema = new Schema(
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
  { timestamps: true }
);

export default mongoose.models.Item || mongoose.model('Item', itemSchema);
