import { IQueryResult } from '@kurabu/gateway/queries/IQuery';
import { Usage } from '@kurabu/gateway/services/UsageService/Usage';

export class PodUsageQueryResult extends IQueryResult {
    usage!: Usage;
}
