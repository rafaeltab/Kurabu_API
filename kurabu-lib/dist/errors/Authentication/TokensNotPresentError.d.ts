import AuthenticationError from "./AuthenticationError";
export default class TokensNotPresentError extends AuthenticationError {
    constructor(message: any);
}
