import { IQueryResult } from 'gateway/queries/IQuery';
import { Usage } from 'gateway/services/UsageService/Usage';

export class PodUsageQueryResult extends IQueryResult {
    usage!: Usage;
}
