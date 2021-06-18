export default class GeneralError extends Error {
    protected errorCode: string;
    protected httpCode: number;
    constructor(message: any);
    getErrorCode(): string;
    getHttpCode(): number;
}
