import mongoose from 'mongoose'

const brandSchema = mongoose.Schema(
  {
    local: {
      type: String,
      required: [true, 'Vui lòng nhập thương hiệu!'],
      minLength: [3, 'Vui lòng nhập phải dài ít nhất 3 ký tự'],
      trim: true,
    },
    image: {
      type: String,
      // required: true,
    },
  },
  { timestamps: true }
)

const Brand = mongoose.model('Brand', brandSchema)

export default Brand
