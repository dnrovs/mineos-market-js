import { BaseService } from '../base'

import { Statistic } from './responses'

import { StatisticSchema } from './responses'

/** @group Services */
export interface Statistics {
    /**
     * Get market's statistics.
     *
     * @example await client.statistics.getStatistic()
     *
     * @returns {Promise<Statistic>} Market statistics data.
     * */
    getStatistic(): Promise<Statistic>
}

export class StatisticsService extends BaseService {
    async getStatistic(): Promise<Statistic> {
        return await this.core.request(
            'statistics',
            undefined,
            false,
            StatisticSchema
        )
    }
}
