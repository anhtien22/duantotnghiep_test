import mongoose from 'mongoose'

const productSchema = mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, 'name is a required field'],
      minLength: [3, 'Please enter a name with atleast 3 characters'],
      trim: true,
    },
    sku: {
      type: String,
      required: [true, 'sku is a required field'],
      trim: true,
    },
    category: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Category',
      required: [true, 'category is a required field'],
    },
    price: {
      type: Number,
      required: [true, 'price is a required field'],
      min: [0, 'Price must be a positive number!'],
    },
    description: {
      type: String,
      required: [true, 'description is a required field'],
      minLength: [10, 'Please enter a description with atleast 10 characters'],
      trim: true,
    },
    image: {
      type: String,
      required: [true, 'image is required'],
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
      maxLength: [4, "Cổ phiếu không được vượt quá 4 ký tự"],
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
