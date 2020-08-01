import 'reflect-metadata';
import { RequestHandler } from 'express'
import { metaDataKeys } from './metaDataKeys';
export function use(middleware: RequestHandler) {
    return function (target: any, key: string, desc: PropertyDescriptor) {
        const middlewares = Reflect.getMetadata(metaDataKeys.middleware, target, key) || []

        Reflect.defineMetadata(metaDataKeys.middleware, [...middlewares, middleware], target, key)
    }

}