import AuthenticationError from "./AuthenticationError";
export default class IncorrectCodeError extends AuthenticationError {
    constructor(message: any);
}
