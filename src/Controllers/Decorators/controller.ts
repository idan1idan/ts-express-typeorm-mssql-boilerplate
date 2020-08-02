import 'reflect-metadata';
import { methods } from './methods';
import { metaDataKeys } from './metaDataKeys';
import { AppRouter } from '../../AppRouter';
import { RequestHandler, Request, Response, NextFunction } from 'express';

function bodyValidator(keys: string): RequestHandler {
    return function (req: Request, res: Response, next: NextFunction) {
        if (!req.body) {
            res.status(422).json({
                error: 'Invalid request'
            })
            return;
        }
        for (let key of keys) {
            if (!req.body[key]) {
                res.status(422).json({
                    error: 'Invalid request'
                })
                return;
            }
        }
        next();
    }
}

export function controller(routePrefix: string) {
    return function (target: Function) {
        const router = AppRouter.getInstance()
        for (let key in target.prototype) {
            const routeHandler = target.prototype[key]
            const path = Reflect.getMetadata(metaDataKeys.path, target.prototype, key)
            const methods: methods = Reflect.getMetadata(metaDataKeys.method, target.prototype, key)
            const middlewares = Reflect.getMetadata(metaDataKeys.middleware, target.prototype, key) || []
            const requiredBodyProps = Reflect.getMetadata(metaDataKeys.bodyValidator, target.prototype, key) || []

            const validator = bodyValidator(requiredBodyProps)
            if (path) {
                router[methods](`${routePrefix}${path}`, ...middlewares, validator, routeHandler)
            }
        }
    }
}