import pool from '../database/pgClient';
import User from '../../domain/model/user';
import Role from '../../domain/model/role';

class UserRepository {
    async findById(id: number): Promise<User | null> {
        const result = await pool.query('SELECT * FROM users WHERE id = $1', [
            id,
        ]);
        const user = result.rows[0];
        return user
            ? new User(
                  user.id,
                  user.email,
                  user.password,
                  user.name,
                  user.phone,
                  user.role_id,
                  user.createdAt,
                  user.updatedAt,
              )
            : null;
    }

    async findAll(limit: number, offset: number): Promise<User[]> {
        const result = await pool.query(
            'SELECT * FROM users LIMIT $1 OFFSET $2',
            [limit, offset],
        );
        return result.rows.map(
            (row: any) =>
                new User(
                    row.id,
                    row.email,
                    row.password,
                    row.name,
                    row.phone,
                    row.role_id,
                    row.createdAt,
                    row.updatedAt,
                ),
        );
    }

    async count(): Promise<number> {
        const result = await pool.query('SELECT COUNT(*) FROM users');
        return parseInt(result.rows[0].count, 10);
    }

    async create(user: User): Promise<User> {
        const result = await pool.query(
            'INSERT INTO users (email, password, name, phone, role_id) VALUES ($1, $2, $3, $4, $5) RETURNING *',
            [user.email, user.password, user.name, user.phone, user.role_id],
        );
        const createdUser = result.rows[0];
        return new User(
            createdUser.id,
            createdUser.email,
            createdUser.password,
            createdUser.name,
            createdUser.phone,
            createdUser.role_id,
            createdUser.createdAt,
            createdUser.updatedAt,
        );
    }

    async update(user: User): Promise<User> {
        const result = await pool.query(
            'UPDATE users SET email = $1, password = $2 WHERE id = $3 RETURNING *',
            [user.email, user.password, user.id],
        );
        const updatedUser = result.rows[0];
        return new User(
            updatedUser.id,
            updatedUser.email,
            updatedUser.password,
            updatedUser.name,
            updatedUser.phone,
            updatedUser.role_id,
            updatedUser.createdAt,
            updatedUser.updatedAt,
        );
    }

    async delete(id: number): Promise<void> {
        await pool.query('DELETE FROM users WHERE id = $1', [id]);
    }

    async findByEmail(email: string): Promise<User | null> {
        const result = await pool.query(
            'SELECT * FROM users WHERE email = $1',
            [email],
        );
        const user = result.rows[0];
        return user
            ? new User(
                  user.id,
                  user.email,
                  user.password,
                  user.name,
                  user.phone,
                  user.role_id,
                  user.createdAt,
                  user.updatedAt,
              )
            : null;
    }

    async findAllRoles(): Promise<Role[]> {
        const result = await pool.query('SELECT * FROM roles');
        return result.rows.map(
            (row: any) => new Role(row.role_id, row.role_name),
        );
    }
}

export default UserRepository;
