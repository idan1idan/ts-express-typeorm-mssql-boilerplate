import { createConnection } from 'typeorm';

export default async function sqlConnection(): Promise<void> {
    try {
        console.log('Creating connection...🍦')
        const connection = await createConnection({
            type: 'mssql',
            port: 3306,
            host: 'localhost\\SQLEXPRESS',
            database: 'master',
            username: "sa",
            password: "",
        })
        console.log('Connecting...🍕')
        await connection.connect()
    } catch (error) {
        console.log(error)
    }

}