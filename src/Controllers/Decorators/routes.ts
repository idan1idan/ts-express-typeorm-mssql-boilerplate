import 'reflect-metadata';
import { methods } from './methods';
import { metaDataKeys } from './metaDataKeys';
function routeBinder(method: string) {
    return function (path: string) {
        return function (target: any, key: string, desc: PropertyDescriptor) {
            Reflect.defineMetadata(metaDataKeys.path, path, target, key);
            Reflect.defineMetadata(metaDataKeys.method, method, target, key)
        }
    }
}

export const get = routeBinder(methods.get)
export const put = routeBinder(methods.put)
export const post = routeBinder(methods.post)
export const del = routeBinder(methods.del)
export const patch = routeBinder(methods.patch)