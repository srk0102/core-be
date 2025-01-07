import { Schema } from 'mongoose'

const LegerSchema = new Schema({
  crateId: {
    type: Array,
    required: true,
    index: true
  },
  facetId: {
    type: Array,
    required: true,
    index: true
  },
  userId: {
    type: String,
    required: true,
    index: true
  },
  orgId: {
    type: String,
    required: true,
    index: true
  }
},
  {
    timestamps: true,
  });

export const LEDGER = mongoose.model('ledger', LegerSchema);
