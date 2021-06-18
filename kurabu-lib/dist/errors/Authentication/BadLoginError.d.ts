import AuthenticationError from "./AuthenticationError";
export default class BadLoginError extends AuthenticationError {
    constructor(message: any);
}
