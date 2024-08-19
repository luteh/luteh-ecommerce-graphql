class Product {
    id: number | null;
    description: string;
    name: string;
    price: number;
    stock: number;
    shopName: string;
    thumbnailImageUrl: string;
    rating: number | null;
    ratingCount: number | null;

    constructor(
        id: number | null,
        description: string,
        name: string,
        price: number,
        stock: number,
        shopName: string,
        thumbnailImageUrl: string,
        rating: number,
        ratingCount: number,
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
    }
}

export default Product;
