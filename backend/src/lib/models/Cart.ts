import { model, models, Schema } from "mongoose";

const cartSchema = new Schema({
    id: Number,
    products: [],
    total: Number,
    discountedTotal: Number,
    userId: Number,
    totalProducts: Number,
    totalQuantity: Number
});

const Cart = models.Cart || model("Cart", cartSchema);
export default Cart;