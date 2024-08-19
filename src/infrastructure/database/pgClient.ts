import { Pool } from 'pg';
import { db } from '../../config/env';

const pool = new Pool(db);

export default pool;
