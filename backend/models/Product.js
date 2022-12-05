import mongoose from 'mongoose'

const productSchema = mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, 'Vui lòng nhập tên'],
      minLength: [3, 'Vui lòng nhập tên có ít nhất 3 ký tự'],
      trim: true,
    },
    sku: {
      type: String,
      required: [true, 'Vui lòng nhập mã sản phẩm'],
      trim: true,
    },
    category: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Category',
      required: [true, 'Vui lòng nhập danh mục'],
    },
    price: {
      type: Number,
      required: [true, 'Vui lòng nhập giá'],
      min: [0, 'Giá phải là một số dương!'],
    },
    description: {
      type: String,
      required: [true, 'Vui lòng nhập mô tả'],
      minLength: [10, 'Vui lòng nhập mô tả với ít nhất 10 ký tự'],
      trim: true,
    },
    image: {
      type: String,
      required: [true, 'Hình ảnh được yêu cầu'],
    },
    discount: {
      type: Number,
      default: 0
    },
    new: {
      type: Boolean,
      default: true
    },
    saleCount: {
      type: Number,
      default: 0
    },
    ratings: {
      type: Number,
      default: 0,
    },
    Stock: {
      type: Number,
      required: [true, "Vui lòng nhập kho sản phẩm"],
      maxLength: [4, "Số lượng không được vượt quá 4 ký tự"],
      default: 1,
    },
    numOfReviews: {
      type: Number,
      default: 0,
    },
    variation: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Variation',
        required: true,
      }
    ],
    reviews: [
      {
        user: {
          type: mongoose.Schema.Types.ObjectId,
          ref: "User",
          required: true,
        },
        name: {
          type: String,
          // required: true,
        },
        rating: {
          type: Number,
          required: true,
        },
        comment: {
          type: String,
          required: true,
        },
      },
    ],
    createdAt: {
      type: Date,
      default: Date.now,
    },
  },
  { timestamps: true }
)

const Product = mongoose.model('Product', productSchema)

export default Product
