import {
  IQueryHandler,
  IQueryResultStatus,
} from "@kurabu/gateway/queries/IQuery";
import { recording, usage } from "@kurabu/gateway/services/UsageService/Usage";
import { autoInjectable } from "tsyringe";

import { PodUsageQuery } from "./PodUsageQuery";
import { PodUsageQueryResult } from "./PodUsageQueryResult";

@autoInjectable()
export class PodUsageQueryHandler
  implements IQueryHandler<PodUsageQuery, PodUsageQueryResult>
{
  async handle(_Query: PodUsageQuery): Promise<PodUsageQueryResult> {
    if (!recording) {
      return {
        usage: usage,
        success: IQueryResultStatus.FAILURE,
      };
    }

    return {
      usage: usage,
      success: IQueryResultStatus.SUCCESS,
    };
  }
}
