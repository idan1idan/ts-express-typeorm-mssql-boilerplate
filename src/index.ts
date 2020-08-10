import Server from './Server';
import "reflect-metadata";
import { createConnection, Connection } from "typeorm";


async function init(PORT: string | number | undefined) {
    try {
        console.log("Connecting to the database 💿💿💿")
        const connection = await createConnection();
        if (PORT) {
            console.log("Running server 😀😀😀")
            const server = new Server()
            server.listen(PORT, () => {
                console.log(`Running on port: ${PORT} 😁😁😁`)
            })
        } else {
            throw new Error('Port wasn\'t provided shutting down 😴😴😴')
        }

    } catch (error) {
        console.log('Something went wrong 😢😢😢', error)
    }

}


const PORT = process.env.PORT || 5000;

init(PORT)
