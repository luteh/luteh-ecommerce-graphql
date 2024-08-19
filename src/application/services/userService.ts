import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import UserRepository from '../../infrastructure/repository/userRepository';
import { jwtSecret } from '../../config/env';
import User from '../../domain/model/user';
import Role from '../../domain/model/role';

class UserService {
    private userRepository: UserRepository;

    constructor() {
        this.userRepository = new UserRepository();
    }

    async getUser(id: number): Promise<User | null> {
        return await this.userRepository.findById(id);
    }

    async getUsers(
        limit: number,
        offset: number,
    ): Promise<{ users: User[]; totalCount: number }> {
        const users = await this.userRepository.findAll(limit, offset);
        const totalCount = await this.userRepository.count();
        return { users, totalCount };
    }

    async createUser(
        email: string,
        password: string,
        name: string,
        phone: string,
        role_id: number,
    ): Promise<User> {
        const hashedPassword = await bcrypt.hash(password, 10);
        const user: User = {
            id: null,
            email,
            password: hashedPassword,
            name,
            phone,
            role_id,
        };
        return await this.userRepository.create(user);
    }

    async updateUser(
        id: number,
        email?: string,
        password?: string,
    ): Promise<User> {
        const user = await this.userRepository.findById(id);
        if (!user) throw new Error('User not found');

        user.email = email || user.email;
        user.password = password
            ? await bcrypt.hash(password, 10)
            : user.password;

        return await this.userRepository.update(user);
    }

    async deleteUser(id: number): Promise<string> {
        const user = await this.userRepository.findById(id);
        if (!user) throw new Error('User not found');

        await this.userRepository.delete(id);
        return `User with ID ${id} deleted`;
    }

    async login(email: string, password: string): Promise<string> {
        const user = await this.userRepository.findByEmail(email);
        if (!user) throw new Error('Invalid credentials');

        const isPasswordValid = await bcrypt.compare(password, user.password);
        if (!isPasswordValid) throw new Error('Invalid credentials');

        const token = jwt.sign(
            { userId: user.id, email: user.email },
            jwtSecret,
            { expiresIn: '1h' },
        );
        return token;
    }

    async getRoles(): Promise<Role[]> {
        const roles = await this.userRepository.findAllRoles();
        return roles;
    }
}

export default UserService;
