import { ProductModel } from "../models/Product";

class ProductRepository {
  async findAll() {
    return ProductModel.find().lean();
  }

  async findById(id: number) {
    return ProductModel.findOne({ id }).lean();
  }
}

export const productRepository = new ProductRepository();