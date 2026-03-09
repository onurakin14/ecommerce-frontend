import { productRepository } from "../repositories/product.repository";

class ProductService {
  async getAllProducts() {
    return productRepository.findAll();
  }

  async getProductById(id: number) {
    return productRepository.findById(id);
  }

  async getProductsByIds(ids: number[]) {
    return productRepository.findByIds(ids);
  }
}

export const productService = new ProductService();