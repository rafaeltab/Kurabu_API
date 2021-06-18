import AuthenticationError from "./AuthenticationError";
export default class MissingStateError extends AuthenticationError {
    constructor(message: any);
}
