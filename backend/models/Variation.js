import mongoose from 'mongoose'

const variationSchema = mongoose.Schema(
  {
    color: {
      type: String,
      required: true,
    },
    size: [
      {
        name: {
          type: String,
          required: true,
        },
        stock: {
          type: Number,
          required: true,
        }
      }
    ]
  },
  { timestamps: true }
)

const Variation = mongoose.model('Variation', variationSchema)

export default Variation
