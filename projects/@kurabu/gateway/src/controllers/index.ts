import { DIContainer } from "@kurabu/common/index";

import PodUsageController from "./Pod/Usage/PodUsageController";
import VersionController from "./VersionController/VersionController";

var container = DIContainer.getInstance().Container;

var controllers = [
  new VersionController(),
  // container.resolve(VersionController),
  container.resolve(PodUsageController),
];

export default controllers;
