class Shop {
    id: number | null;
    description: string;
    name: string;

    constructor(
        id: number | null,
        description: string,
        name: string,
    ) {
        this.id = id;
        this.description = description;
        this.name = name;
    }
}

export default Shop;
