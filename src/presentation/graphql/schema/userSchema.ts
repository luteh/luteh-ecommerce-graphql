import { buildSchema } from 'graphql';

const schema = buildSchema(`
    type User {
        id: ID!
        email: String!
        name: String!
        phone: String!
        role_id: Int!
        createdAt: String!
        updatedAt: String!
    }

    type PaginatedUsers {
        users: [User]
        totalCount: Int
    }

    type Role {
        id: ID!
        name: String!
    }

    type Product {
        id: ID!
        description: String!
        name: String!
        price: Float!
        stock: Int!
        shopName: String!
        thumbnailImageUrl: String!
        rating: Float
        ratingCount: Int
    }

    type ProductDetail {
        id: ID!
        description: String!
        name: String!
        price: Float!
        stock: Int!
        shopName: String!
        thumbnailImageUrl: String!
        rating: Float
        ratingCount: Int
        productImageUrls: [String]
    }

    type PaginatedProducts {
        products: [Product]
        totalCount: Int
    }

    type Query {
        getUser(id: ID!): User
        getUsers(limit: Int, offset: Int): PaginatedUsers
        getRoles: [Role]

        getProducts(limit: Int, offset: Int, productName: String): PaginatedProducts
        getProduct(id: ID!): ProductDetail
    }

    type Mutation {
        createUser(email: String!, password: String!, name: String!, phone: String!, role_id: Int!): User
        updateUser(id: ID!, email: String, password: String): User
        deleteUser(id: ID!): String
        login(email: String!, password: String!): String
    }
`);

export default schema;
