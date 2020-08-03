import Server from './Server';
import 'reflect-metadata';

const server = new Server()
const PORT = process.env.PORT || 5000;
server.listen(PORT, () => {
    console.log(PORT);
    server.sqlConnect();
})