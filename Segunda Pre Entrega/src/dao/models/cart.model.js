import mongoose from "mongoose";
import mongoosePaginate from "mongoose-paginate-v2";

const productSchema = new mongoose.Schema(
  {
    product: { type: mongoose.Schema.Types.ObjectId, ref: "products" },
  },
  { _id: false }
);

const cartSchema = new mongoose.Schema(
  {
    cid: { type: String, required: true, unique: true },
    products: { type: [productSchema], default: [] },
  },
  { timestamps: true }
);

cartSchema.pre("getById", function () {
  this.populate("products.product");
});

cartSchema.plugin(mongoosePaginate);

export default mongoose.model("carts", cartSchema);
