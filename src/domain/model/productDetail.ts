class ProductDetail {
    id: number;
    description: string;
    name: string;
    price: number;
    stock: number;
    shopName: string;
    thumbnailImageUrl: string;
    rating: number | null;
    ratingCount: number | null;
    productImageUrls?: string[];

    constructor(
        id: number,
        description: string,
        name: string,
        price: number,
        stock: number,
        shopName: string,
        thumbnailImageUrl: string,
        rating: number,
        ratingCount: number,
        productImageUrls?: string[],
    ) {
        this.id = id;
        this.description = description;
        this.name = name;
        this.price = price;
        this.stock = stock;
        this.shopName = shopName;
        this.thumbnailImageUrl = thumbnailImageUrl;
        this.rating = rating;
        this.ratingCount = ratingCount;
        this.productImageUrls = productImageUrls;
    }
}

export default ProductDetail;
