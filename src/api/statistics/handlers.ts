import { apiRequest } from '../core.js'

import { Statistics } from './responses.js'

import { MarkDownloadedParams } from './parameters.js'

import { SuccessResponse } from '../../shared/types.js'

/**
 * Get market's statistics.
 *
 * @example await getStatistics()
 *
 * @returns {Promise<Statistics>} Market statistics data.
 * */
export async function getStatistics(): Promise<Statistics> {
    return await apiRequest<Statistics>('statistics')
}

/**
 * Mark publication as downloaded.
 *
 * @param {GetReviewsParams} params Object with required fields.
 * @param {string} params.token Authentication token of the user.
 * @param {number} params.fileId Publication's ID.
 *
 * @example await markDownloaded({ token: 'veryrealistictoken', fileId: 1488 })
 *
 * @returns {Promise<SuccessResponse>} Successful response.
 * */
export async function markDownloaded({
    token,
    fileId
}: MarkDownloadedParams): Promise<SuccessResponse> {
    return await apiRequest<SuccessResponse>('download', {
        token: token,
        file_id: fileId
    })
}
