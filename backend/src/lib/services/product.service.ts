import { productRepository } from "../repositories/product.repository";

class ProductService {
  async getAllProducts() {
    return productRepository.findAll();
  }

  async getProductById(id: number) {
    return productRepository.findById(id);
  }
}

export const productService = new ProductService();