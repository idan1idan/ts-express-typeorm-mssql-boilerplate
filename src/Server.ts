import express, { Application } from 'express';
import cors from 'cors';
import morgan from 'morgan';
import helmet from 'helmet';
import dotenv from 'dotenv';
import './Controllers/LoginController';
import { AppRouter } from './AppRouter';

type port = string | number;


class Server {
    public server: Application;
    constructor() {
        this.server = express()
        this.server.use(express.json());
        // this.server.use(morgan('dev'))
        // this.server.use(helmet())
        // this.server.use(cors())
        // dotenv.config();
        this.server.use(AppRouter.getInstance())
    }

    listen(port: port, callBack: () => void) {
        this.server.listen(port, callBack)
    }
}

export default Server;