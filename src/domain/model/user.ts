class User {
    id: number | null;
    email: string;
    password: string;
    name: string;
    phone: string;
    role_id: number;
    createdAt?: Date;
    updatedAt?: Date;

    constructor(
        id: number | null,
        email: string,
        password: string,
        name: string,
        phone: string,
        role_id: number,
        createdAt?: Date,
        updatedAt?: Date,
    ) {
        this.id = id;
        this.email = email;
        this.password = password;
        this.name = name;
        this.phone = phone;
        this.role_id = role_id;
        this.createdAt = createdAt;
        this.updatedAt = updatedAt;
    }
}

export default User;
