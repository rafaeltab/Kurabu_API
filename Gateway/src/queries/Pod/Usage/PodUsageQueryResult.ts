import { IQueryResult } from '#gqueries/IQuery';
import { Usage } from '#groot/services/UsageService/Usage';

export class PodUsageQueryResult extends IQueryResult {
    usage!: Usage;
}
