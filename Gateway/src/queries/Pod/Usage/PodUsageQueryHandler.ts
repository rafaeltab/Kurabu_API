import { autoInjectable } from "tsyringe";
import { IQueryHandler, IQueryResultStatus } from "#queries/IQuery";
import { PodUsageQuery } from "./PodUsageQuery";
import { PodUsageQueryResult } from "./PodUsageQueryResult";
import { mem, cpu } from "node-os-utils";

@autoInjectable()
export class PodUsageQueryHandler
    implements IQueryHandler<PodUsageQuery, PodUsageQueryResult>
{
    async handle(Query: PodUsageQuery): Promise<PodUsageQueryResult> {
        var usage: any = {};

        var memory = await mem.used();

        usage.cpu = (await cpu.usage()) + "%";

        usage.ramPercentage =
            Math.round(
                (memory.usedMemMb / memory.totalMemMb) * 100
            ).toString() + "%";

        usage.ramMB = memory.usedMemMb;

        return {
            usage: usage,
            success: IQueryResultStatus.SUCCESS,
        };
    }
}
