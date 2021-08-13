import 'reflect-metadata';

import { startRecording } from '@kurabu/gateway/services/UsageService/Usage';

import { Commands } from './commands/commands.test';
import { Queries } from './queries/queries.test';

describe("Gateway", () => {
    startRecording(100, () => {});
    Queries();
    Commands();
});
