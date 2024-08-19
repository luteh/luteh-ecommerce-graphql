import UserService from '../../../application/services/userService';

const userService = new UserService();

interface GetUserArgs {
    id: number;
}

interface GetUsersArgs {
    limit: number;
    offset: number;
}

interface CreateUserArgs {
    email: string;
    password: string;
    name: string;
    phone: string;
    role_id: number;
}

interface UpdateUserArgs {
    id: number;
    email: string;
    password: string;
}

interface DeleteUserArgs {
    id: number;
}

interface LoginArgs {
    email: string;
    password: string;
}

const userResolver = {
    getUser: async ({ id }: GetUserArgs) => await userService.getUser(id),
    getUsers: async ({ limit, offset }: GetUsersArgs) =>
        await userService.getUsers(limit, offset),
    createUser: async ({
        email,
        password,
        name,
        phone,
        role_id,
    }: CreateUserArgs) =>
        await userService.createUser(email, password, name, phone, role_id),
    updateUser: async ({ id, email, password }: UpdateUserArgs) =>
        await userService.updateUser(id, email, password),
    deleteUser: async ({ id }: DeleteUserArgs) =>
        await userService.deleteUser(id),
    login: async ({ email, password }: LoginArgs) =>
        await userService.login(email, password),
    getRoles: async () => await userService.getRoles(),
};

export default userResolver;
