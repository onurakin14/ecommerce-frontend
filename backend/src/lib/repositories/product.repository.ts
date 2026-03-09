import { ProductModel } from "../models/Product";

class ProductRepository {
  async findAll() {
    return ProductModel.find().lean();
  }

  async findById(id: number) {
    return ProductModel.findOne({ id }).lean();
  }

  // Birden fazla ID alan ürünleri bul.Whislist'teki ürünleri çekmek için 
  async findByIds(ids: number[]) {
    return ProductModel.find({ id: { $in: ids } }).lean(); 
  }
}

export const productRepository = new ProductRepository();