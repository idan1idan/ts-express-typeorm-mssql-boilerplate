import express, { Application } from 'express';
import cors from 'cors';
import morgan from 'morgan';
import helmet from 'helmet';
import dotenv from 'dotenv';



type port = string | number;


class Server {
    public server: Application;
    constructor() {
        this.server = express()
        this.server.use(morgan('dev'))
        this.server.use(helmet())
        this.server.use(cors())
        dotenv.config();
    }

    listen(port: port, callBack: () => void) {
        this.server.listen(port, callBack)
    }
}

export default Server;