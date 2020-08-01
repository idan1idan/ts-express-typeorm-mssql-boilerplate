import { get, controller, post, use, bodyValidator } from './Decorators';
import { Request, Response, NextFunction } from 'express';

function logger(req: Request, res: Response, next: NextFunction) {
    return;
}

interface IPostLogin {
    userName: string,
    password: string
}

@controller('/auth')
class LoginController {
    @get('/login')
    @use(logger)
    getLogin(req: Request, res: Response) {
        res.send(`You're logged in`)
    }

    @post('/login')
    @bodyValidator('userName', 'password')
    postUser(req: Request, res: Response) {
        const { userName, password }: IPostLogin = req.body
        res.json({
            userName,
            password
        })
    }
}
export default LoginController