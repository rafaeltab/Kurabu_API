import {
  Request,
  Response,
} from 'express';

import { getUUID } from '../crypto/GeneratedCodes';
import { Logger } from '../logging';

export default function LogArg() {
    return function (
        target: Object,
        key: string | symbol,
        descriptor: PropertyDescriptor
    ) {
        const original = descriptor.value;

        descriptor.value = function (
            req: Request,
            res: Response,
            arg: any = {}
        ) {
            const requestCode = getUUID();

            const { user, ...logArg } = arg;

            Logger.Info(
                `${requestCode} ${target.constructor.name}: ${JSON.stringify(
                    logArg,
                    null,
                    2
                )}`
            );
            let val = original.apply(this, [req, res, arg]);

            return val;
        };
    };
}
