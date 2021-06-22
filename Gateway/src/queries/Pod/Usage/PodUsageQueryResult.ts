import { IQueryResult } from "#queries/IQuery";

type Usage = {
    ramPercentage: string;
    ramMB: number;
    cpu: any;
};

export class PodUsageQueryResult extends IQueryResult {
    usage!: Usage;
}
