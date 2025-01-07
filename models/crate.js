import { Schema } from 'mongoose'

const CrateSchema = new Schema({
  fileName: {
    type: String,
    required: true,
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
  },
  fileUrl: {
    type: String,
    required: true
  },
  fileSize: {
    type: Number,
    required: true,
  },
  fileType: {
    type: String,
    required: true,
  },
  ledgerId: {
    type: String,
    required: true,
    index: true
  },
  meta: {
    type: mongoose.Schema.Types.Mixed,
    default: {},
  }
},
  {
    timestamps: true,
  });

export const CRATE = mongoose.model('crate', CrateSchema);
