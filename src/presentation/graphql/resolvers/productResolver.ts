import ProductService from '../../../application/services/productService';

const productService = new ProductService();

interface GetProductsArgs {
    limit: number;
    offset: number;
    productName: string;
}

interface GetProductArgs {
    id: number;
}

const productResolver = {
    getProducts: async ({ limit, offset, productName }: GetProductsArgs) => {
        try {
            return await productService.getProducts(limit, offset, productName);
        } catch (error) {
            console.error('Error fetching products:', error);
            throw new Error('Failed to fetch products'); // Rethrow the error or throw a new error
        }
    },
    getProduct: async ({ id }: GetProductArgs) => {
        try {
            return await productService.getProductById(id);
        } catch (error) {
            console.error('Error fetching product:', error);
            throw new Error('Failed to fetch product'); // Rethrow the error or throw a new error
        }
    },
};

export default productResolver;
