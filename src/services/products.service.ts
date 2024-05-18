import { InternalException, NotFoundException } from "../exceptions";
import { Products } from "../models/products.model";

export class ProductService {
  static async getAllProducts(): Promise<Products[]> {
    try {
      const products = await Products.find();
      if (products.length === 0)
        throw new NotFoundException("Produtos não encontrados.");

      return products;
    } catch (error) {
      console.error(error);
      if (error instanceof NotFoundException) throw error;
      throw new InternalException("Erro ao consultar tabela de produtos.");
    }
  }

  static async getProductById(productId: string): Promise<Products> {
    try {
      const products = await Products.findOneBy({ id: productId });
      if (!products) throw new NotFoundException("Produto não encontrado.");

      return products;
    } catch (error) {
      console.error(error);
      if (error instanceof NotFoundException) throw error;
      throw new InternalException("Erro ao consultar tabela de produtos.");
    }
  }

  static async createProduct(productData: Products): Promise<Products> {
    try {
      const product = Products.create({
        name: productData.name,
        description: productData.description,
        value: productData.value,
        imageUrl: productData.imageUrl,
      });

      const newProduct = Products.save(product);

      return newProduct;
    } catch (error) {
      if (error instanceof NotFoundException) throw error;
      else
        throw new InternalException(`Erro ao criar produto: ${error.message}`);
    }
  }

  static async updateProduct(
    productId: string,
    productData: Products
  ): Promise<Products> {
    try {
      const product = await Products.findOneBy({ id: productId });
      if (!product) throw new NotFoundException("Produto não encontrado.");

      const updatedProduct = Products.merge(product, productData);
      await Products.save(updatedProduct);

      return updatedProduct;
    } catch (error) {
      if (error instanceof NotFoundException) throw error;
      throw new InternalException(`Erro ao criar produto: ${error.message}`);
    }
  }

  static async deleteProduct(productId: string): Promise<void> {
    try {
      await Products.delete({ id: productId });
    } catch (error) {
      if (error instanceof NotFoundException) throw error;
      throw new InternalException(`Erro ao deletar produto: ${error.message}`);
    }
  }
}
