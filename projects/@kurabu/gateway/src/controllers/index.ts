import { DIContainer } from '@kurabu/common';

import { PodUsageController } from './Pod/Usage/PodUsageController';
import { VersionController } from './VersionController/VersionController';

var container = DIContainer.getInstance().Container;

export default [
    container.resolve(VersionController),
    container.resolve(PodUsageController),
];
