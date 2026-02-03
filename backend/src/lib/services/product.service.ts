import { productRepository } from "../repositories/product.repository";

class ProductService {
  async getAllProducts() {
    return productRepository.findAll();
  }
}

export const productService = new ProductService();