export declare type ResponseMessage = {
    status: string;
    message: any;
};
export declare type ErrorResponse = {
    error: string;
    message?: string;
};
export declare type tokenResponse = {
    token_type: "Bearer";
    expires_in: number;
    access_token: string;
    refresh_token: string;
};
export declare type ListPagination<T> = {
    data: T[];
    paging: {
        next: string;
        previous?: string | undefined;
    };
};
export declare type RequestResponse<T> = {
    response: {
        response: T;
        tokens: tokenResponse;
    } | ErrorResponse;
};
export declare function isTokenResponse(obj: any): obj is tokenResponse;
export declare function isErrResp(obj: any): obj is ErrorResponse;
