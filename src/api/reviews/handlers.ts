import { apiRequest } from '../core.js'
import {
    GetReviewsParams,
    PostReviewParams,
    VoteReviewParams
} from './parameters.js'
import { Review } from './responses.js'
import { SuccessResponse } from '../../shared/types.js'

/**
 * Get publication's reviews.
 *
 * @param {GetReviewsParams} params Object with required fields.
 * @param {number} params.publicationFileId Target publication's file ID.
 * @param {number} [params.offset = 0]  Number of reviews to skip (for pagination).
 * @param {number} [params.count] Number of reviews to return.
 *
 * @example await getReviews({ publicationFileId: 1488, count: 3 })
 *
 * @returns {Promise<Review[]>} List of reviews.
 * */
export async function getReviews({
    publicationFileId,
    offset = 0,
    count
}: GetReviewsParams): Promise<Review[]> {
    const options: Record<string, any> = { file_id: publicationFileId }

    if (offset) options.offset = offset
    if (count) options.count = count

    const raw = await apiRequest<Review[]>('reviews', options)

    return Object.values(raw)
}

/**
 * Vote either review is helpful or not.
 *
 * @param {GetReviewsParams} params Object with required fields.
 * @param {string} params.token Authentication token of the user.
 * @param {number} params.reviewId Review's ID.
 * @param {boolean} params.helpful Is review helpful.
 *
 * @example
 * await voteReview({
 *     token: 'veryrealistictoken',
 *     reviewId: 161,
 *     helpful: false
 * })
 *
 * @returns {Promise<SuccessResponse>} Successful response.
 * */
export async function voteReview({
    token,
    reviewId,
    helpful
}: VoteReviewParams): Promise<SuccessResponse> {
    return await apiRequest<SuccessResponse>('review_vote', {
        token: token,
        review_id: reviewId,
        rating: helpful
    })
}

/**
 * Post a review to a publication.
 *
 * @param {GetReviewsParams} params Object with required fields.
 * @param {string} params.token Authentication token of the user.
 * @param {number} params.fileId Publication's file ID.
 * @param {number} params.rating Rating value.
 * @param {number} params.comment Review's text content.
 *
 * @example
 * await postReview({
 *     token: 'veryrealistictoken'
 *     fileId: 1488,
 *     rating: 4,
 *     comment: 'Beautiful application, my grandma loved it',
 * })
 *
 * @returns {Promise<SuccessResponse>} Successful response.
 * */
export async function postReview({
    token,
    fileId,
    rating,
    comment
}: PostReviewParams): Promise<SuccessResponse> {
    return await apiRequest<SuccessResponse>('review', {
        token: token,
        file_id: fileId,
        rating: rating,
        comment: comment
    })
}
