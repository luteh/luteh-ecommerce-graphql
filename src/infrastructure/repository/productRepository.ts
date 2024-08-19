import Product from '../../domain/model/product';
import ProductDetail from '../../domain/model/productDetail';
import pool from '../database/pgClient';

class ProductRepository {
    async findAllProducts(
        limit: number,
        offset: number,
        productName: string = '',
    ): Promise<Product[]> {
        const result = await pool.query(
            `
SELECT 
    p.id,
    p."name",
    p.description,
    p.price,
    p.stock,
    p.thumbnail_image_url,
    s.shop_name,
    AVG(r.rating) AS average_rating,
    COUNT(r.rating) AS review_count
FROM 
    products p
JOIN 
    shops s ON p.shop_id = s.id
LEFT JOIN 
    reviews r ON p.id = r.product_id
WHERE 
	p."name" ILIKE $3
GROUP BY 
    p.id, s.id
ORDER BY  
    p.id
limit $1 offset $2`,
            [limit, offset, `%${productName}%`],
        );
        return result.rows.map(
            (row: any) =>
                new Product(
                    row.id,
                    row.description,
                    row.name,
                    row.price,
                    row.stock,
                    row.shop_name,
                    row.thumbnail_image_url,
                    row.average_rating,
                    row.review_count,
                ),
        );
    }

    async findProductById(id: number): Promise<ProductDetail | null> {
        const result = await pool.query(
            `
SELECT 
    p.id,
    p."name",
    p.description,
    p.price,
    p.stock,
    p.thumbnail_image_url,
    s.shop_name,
    AVG(r.rating) AS average_rating,
    COUNT(r.rating) AS review_count,
    ARRAY_AGG(pi.image_url) AS images
FROM
    products p
JOIN 
    shops s ON p.shop_id = s.id
LEFT JOIN 
    reviews r ON p.id = r.product_id
LEFT JOIN 
    product_images pi ON p.id = pi.product_id
WHERE 
	p.id = $1
GROUP BY 
    p.id, s.id`,
            [id],
        );
        const product = result.rows[0];
        return product
            ? new ProductDetail(
                  product.id,
                  product.description,
                  product.name,
                  product.price,
                  product.stock,
                  product.shop_name,
                  product.thumbnail_image_url,
                  product.average_rating,
                  product.review_count,
                  product.images,
              )
            : null;
    }

    async count(productName: string = ''): Promise<number> {
        const result = await pool.query(
            'SELECT COUNT(*) FROM products p WHERE p.name ILIKE $1',
            [`%${productName}%`],
        );
        return parseInt(result.rows[0].count, 10);
    }
}

export default ProductRepository;
