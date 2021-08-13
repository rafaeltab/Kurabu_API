import 'reflect-metadata';

import { Pod } from './Pod/pod.test';

export function Queries() {
    describe("Queries", () => {
        Pod();
    });
}
