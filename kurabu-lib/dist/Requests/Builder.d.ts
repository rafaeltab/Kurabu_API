import { Response, HeadersInit, BodyInit } from "node-fetch";
export declare type BuilderBuildType = {
    url: string;
    method?: string;
    body?: BodyInit;
    headers?: HeadersInit;
};
export declare class Builder {
    private scheme;
    private domain;
    private headers;
    private queryParams;
    private body?;
    private path;
    constructor(scheme: string, domain: string);
    setBody(body: BodyInit): this;
    addPath(path: string): this;
    setHeader(key: string, value: string): this;
    setQueryParam(key: string, value: string): this;
    build(): BuilderBuildType;
    build(method?: string): BuilderBuildType;
    request(): Promise<Response>;
    request(method?: string): Promise<Response>;
}
export declare function baseRequest(scheme: string, domain: string): Builder;
