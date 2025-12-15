import { BaseService } from '../base'

import { z } from 'zod'

import {
    GetReviewsParams,
    PostReviewParams,
    VoteReviewParams
} from './parameters'
import { Review } from './responses'

import { ReviewSchema } from './responses'

/** @group Services */
export interface Reviews {
    /**
     * Get the publication's reviews.
     *
     * @param {GetReviewsParams} params Object with required fields.
     *
     * @example await client.reviews.getReviews({ fileId: 1488, count: 3 })
     *
     * @returns {Promise<Review[]>} List of reviews.
     * */
    getReviews(params: GetReviewsParams): Promise<Review[]>

    /**
     * Vote either review is rating or not.
     *
     * @param {GetReviewsParams} params Object with required fields.
     *
     * @example
     * await client.reviews.voteReview({
     *     reviewId: 161,
     *     helpful: false
     * })
     * */
    voteReview(params: VoteReviewParams): Promise<void>

    /**
     * Post a review to a publication.
     *
     * @param {GetReviewsParams} params Object with required fields.
     *
     * @example
     * await client.reviews.postReview({
     *     fileId: 1488,
     *     rating: 4,
     *     comment: 'Beautiful application, my wife jumped out the window after downloading.',
     * })
     * */
    postReview(params: PostReviewParams): Promise<void>
}

export class ReviewsService extends BaseService implements Reviews {
    async getReviews(params: GetReviewsParams): Promise<Review[]> {
        return Object.values(
            await this.core.request(
                'reviews',
                {
                    file_id: params.fileId,
                    offset: params.offset,
                    count: params.count
                },
                false,
                z.array(ReviewSchema)
            )
        )
    }

    async voteReview(params: VoteReviewParams): Promise<void> {
        await this.core.request(
            'review_vote',
            {
                review_id: params.reviewId,
                rating: params.helpful ? 1 : 0
            },
            true
        )
    }

    async postReview(params: PostReviewParams): Promise<void> {
        await this.core.request(
            'review',
            {
                file_id: params.fileId,
                rating: params.rating,
                comment: params.comment
            },
            true
        )
    }
}
