import mongoose from "mongoose";

const ReviewSchema = new mongoose.Schema(
  {
    rating: Number,
    comment: String,
    date: String,
    reviewerName: String,
    reviewerEmail: String,
  },
  { _id: false }
);

const DimensionSchema = new mongoose.Schema(
  {
    width: Number,
    height: Number,
    depth: Number,
  },
  { _id: false }
);

const MetaSchema = new mongoose.Schema(
  {
    createdAt: String,
    updatedAt: String,
    barcode: String,
    qrCode: String,
  },
  { _id: false }
);

const ProductSchema = new mongoose.Schema(
  {
    id: Number,
    title: String,
    description: String,
    category: String,
    price: Number,
    discountPercentage: Number,
    rating: Number,
    stock: Number,

    tags: [String],
    brand: String,
    sku: String,
    weight: Number,

    dimensions: DimensionSchema,

    warrantyInformation: String,
    shippingInformation: String,
    availabilityStatus: String,

    reviews: [ReviewSchema],

    returnPolicy: String,
    minimumOrderQuantity: Number,

    meta: MetaSchema,

    images: [String],
    thumbnail: String,
  },
  { timestamps: true }
);

export const ProductModel =
  mongoose.models.Product ||
  mongoose.model("Product", ProductSchema);