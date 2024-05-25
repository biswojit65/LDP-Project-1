import {Pool} from 'pg';
import {drizzle} from 'drizzle-orm/node-postgres';
import {env} from '../config/env'

//defining database conection properties
const pool=new Pool({
    connectionString:env.DATABASE_CONNECTION,
    ssl : true
})

export const database=drizzle(pool);

