import Product from '../../domain/model/product';
import ProductDetail from '../../domain/model/productDetail';
import ProductRepository from '../../infrastructure/repository/productRepository';

class ProductService {
    private productRepository: ProductRepository;

    constructor() {
        this.productRepository = new ProductRepository();
    }

    async getProducts(
        limit: number,
        offset: number,
        productName: string,
    ): Promise<{ products: Product[]; totalCount: number }> {
        const products = await this.productRepository.findAllProducts(
            limit,
            offset,
            productName,
        );
        const totalCount = await this.productRepository.count(productName);
        return { products, totalCount };
    }

    async getProductById(id: number): Promise<ProductDetail | null> {
        const product = await this.productRepository.findProductById(id);
        return product;
    }
}

export default ProductService;
