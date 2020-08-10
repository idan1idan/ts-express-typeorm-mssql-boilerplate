import { get, controller, post, use, bodyValidator } from './Decorators';
import { Request, Response, NextFunction } from 'express';
import { getConnection } from 'typeorm';
import { User } from '../entity/User';

interface IPostLogin {
    firstName: string,
    lastName: string
    age: string
}

@controller('/auth')
class LoginController {
    @get('/login')
    getLogin(req: Request, res: Response) {
        res.send(`You're logged in`)
    }

    @post('/login')
    @bodyValidator('firstName', 'lastName', 'age')
    async postUser(req: Request, res: Response, next: NextFunction) {
        try {
            const { firstName, lastName, age }: IPostLogin = req.body
            const userRepo = getConnection().getRepository(User);
            const user = await userRepo.create({ firstName, lastName, age });
            const result = await userRepo.save(user);
            res.status(201).send(result)
        } catch (error) {
            next(error);
        }
    }
}
export default LoginController
