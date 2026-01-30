import { ProductModel } from "../models/Product";

class ProductRepository {
  async findAll() {
    return ProductModel.find().lean();
  }
}

export const productRepository = new ProductRepository();