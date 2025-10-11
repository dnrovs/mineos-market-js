/**
 * Parameters for retrieving a paginated list of reviews for a specific publication.
 *
 * @category Parameters
 */
export type GetReviewsParams = {
    /** Target publication's file ID */
    fileId: number
    /** Number of reviews to skip (for pagination) */
    offset?: number
    /** Number of reviews to return */
    count?: number
}

/**
 * Parameters for submitting a helpfulness vote on a specific review.
 *
 * @category Parameters
 */
export type VoteReviewParams = {
    /** Review's ID */
    reviewId: number
    /** If review is helpful */
    helpful: boolean
}

/**
 * Parameters for creating a new review for a specific publication.
 *
 * @category Parameters
 */
export type PostReviewParams = {
    /** Publication's file ID */
    fileId: number
    /** Rating value */
    rating: 1 | 2 | 3 | 4 | 5
    /** Review's text content */
    comment: string
}
