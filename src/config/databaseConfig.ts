import { registerAs } from "@nestjs/config";


export default registerAs("database", ()=>({
    host: process.env.DATABASE_HOST || '',
    port: parseInt(process.env.DATABASE_PORT, 10) || 3306,
    name: process.env.DATABASE_NAME,
    username : process.env.DATABASE_USER || 'root',
    password : process.env.DATABASE_PASS || ''
}))