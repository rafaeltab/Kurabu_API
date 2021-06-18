"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.baseRequest = exports.RequestBuilder = void 0;
const node_fetch_1 = require("node-fetch");
class RequestBuilder {
    constructor(scheme, domain) {
        this.scheme = scheme;
        this.domain = domain;
        this.path = "";
        this.headers = [];
        this.queryParams = [];
    }
    setBody(body) {
        this.body = body;
        return this;
    }
    addPath(path) {
        if (!path.endsWith("/"))
            path += "/";
        if (path.startsWith("/"))
            path = path.substr(1, path.length - 1);
        this.path += path;
        return this;
    }
    setHeader(key, value) {
        this.headers.push({
            key: key,
            value: value,
        });
        return this;
    }
    setQueryParam(key, value) {
        this.queryParams.push({
            key: key,
            value: value,
        });
        return this;
    }
    build(method) {
        let headers;
        if (this.headers.length == 0) {
            headers = undefined;
        }
        else {
            headers = {};
            for (var i = 0; i < this.headers.length; i++) {
                var header = this.headers[i];
                headers[header.key] = header.value;
            }
        }
        let url = `${this.scheme}://${this.domain}/${this.path}`;
        url = url.substr(0, url.length - 1); //remove last /
        if (this.queryParams.length !== 0) {
            url += "?";
            for (var i = 0; i < this.queryParams.length; i++) {
                var queryParam = this.queryParams[i];
                if (url.endsWith("?") !== true)
                    url += "&";
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
    request(method) {
        var buildResult = this.build(method);
        return node_fetch_1.default(buildResult.url, {
            method: buildResult.method,
            body: buildResult.body,
            headers: buildResult.headers,
        });
    }
}
exports.RequestBuilder = RequestBuilder;
function baseRequest(scheme, domain) {
    return new RequestBuilder(scheme, domain);
}
exports.baseRequest = baseRequest;
