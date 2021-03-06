import fetch, { Response, HeadersInit, BodyInit } from "node-fetch";

export type BuilderBuildType = {
    url: string;
    method?: string;
    body?: BodyInit;
    headers?: HeadersInit;
};

export class Builder {
    private headers: { key: string; value: string }[];
    private queryParams: { key: string; value: string }[];
    private body?: BodyInit;
    private path: string;

    constructor(private scheme: string, private domain: string) {
        this.path = "";
        this.headers = [];
        this.queryParams = [];
    }

    public setBody(body: BodyInit) {
        this.body = body;

        return this;
    }

    public addPath(path: string) {
        if (!path.endsWith("/")) path += "/";
        if (path.startsWith("/")) path = path.substr(1, path.length - 1);
        this.path += path;

        return this;
    }

    public setHeader(key: string, value: string) {
        this.headers.push({
            key: key,
            value: value,
        });

        return this;
    }

    public setQueryParam(key: string, value: string) {
        this.queryParams.push({
            key: key,
            value: value,
        });

        return this;
    }

    public build(): BuilderBuildType;
    public build(method?: string): BuilderBuildType;
    public build(method?: string): BuilderBuildType {
        let headers: HeadersInit | undefined;
        if (this.headers.length == 0) {
            headers = undefined;
        } else {
            headers = {};
            for (var i = 0; i < this.headers.length; i++) {
                var header = this.headers[i];
                headers[header.key] = header.value;
            }
        }

        let url: string = `${this.scheme}://${this.domain}/${this.path}`;
        url = url.substr(0, url.length - 1); //remove last /

        if (this.queryParams.length !== 0) {
            url += "?";
            for (var i = 0; i < this.queryParams.length; i++) {
                var queryParam = this.queryParams[i];

                if (url.endsWith("?") !== true) url += "&";
                url += `${queryParam.key}=${queryParam.value}`;
            }
        }

        return {
            url: url,
            method: method,
            body: this.body,
            headers: headers,
        };
    }

    public request(): Promise<Response>;
    public request(method?: string): Promise<Response>;
    public request(method?: string): Promise<Response> {
        var buildResult = this.build(method);

        return fetch(buildResult.url, {
            method: buildResult.method,
            body: buildResult.body,
            headers: buildResult.headers,
        });
    }
}

export function baseRequest(scheme: string, domain: string) {
    return new Builder(scheme, domain);
}
