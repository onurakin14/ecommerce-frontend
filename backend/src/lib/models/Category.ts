import { model, models, Schema } from "mongoose";

const categorySchema = new Schema({
    slug: String,
    name: String,
    url: String
});

const Category = models.Category || model("Category", categorySchema);
export default Category;