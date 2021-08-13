import 'reflect-metadata';

import { startRecording } from '#groot/services/UsageService/Usage';

import { Commands } from './commands/commands.test';
import { Queries } from './queries/queries.test';

describe("Gateway", () => {
    startRecording(100, () => {});
    Queries();
    Commands();
});
