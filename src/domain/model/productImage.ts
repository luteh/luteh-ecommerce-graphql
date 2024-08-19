class ProductImage {
    id: number | null;
    imageUrl: string;

    constructor(id: number | null, imageUrl: string) {
        this.id = id;
        this.imageUrl = imageUrl;
    }
}

export default ProductImage;
