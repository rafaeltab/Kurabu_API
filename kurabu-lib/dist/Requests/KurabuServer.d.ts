/// <reference types="node" />
import { Server as HttpServe } from 'http';
import { Server as HttpsServe } from 'https';
import { Server } from '@overnightjs/core';
declare type Certs = {
    key: Buffer;
    cert: Buffer;
};
declare class KurabuServer extends Server {
    private readonly SERVER_STARTED;
    private readonly certs;
    constructor(controllers: any[], certs: Certs);
    startHTTPS(port: number): HttpsServe;
    start(port: number): HttpServe;
}
export { KurabuServer };
