export interface GetReviewsParams {
    /** Target publication's file ID */
    publicationFileId: number
    /** Number of reviews to skip (for pagination) */
    offset?: number
    /** Number of reviews to return */
    count?: number
}

export interface VoteReviewParams {
    /** Authentication token of the user */
    token: string
    /** Review's ID */
    reviewId: number
    /** Is review helpful */
    helpful: boolean
}

export interface PostReviewParams {
    /** Authentication token of the user */
    token: string
    /** Publication's file ID */
    fileId: number
    /** Rating value */
    rating: number
    /** Review's text content */
    comment: string
}
