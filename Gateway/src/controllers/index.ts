import { DIContainer } from "kurabu-lib";
import { versionController } from "./VersionController/versionController";
var container = DIContainer.getInstance().Container;

export default [container.resolve(versionController)];
