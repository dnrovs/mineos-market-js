import { z } from 'zod'

/**
 * Vote counts for a review, including total and positive votes
 *
 * @category Responses
 */
export type ReviewVotes = {
    /** Total number of votes on the review */
    total: number
    /** Number of positive votes */
    positive: number
}

export const ReviewVotesSchema: z.ZodType<ReviewVotes> = z.object({
    total: z.number(),
    positive: z.number()
})

/**
 * Review content with author information, rating, and vote counts
 *
 * @category Responses
 */
export type Review = {
    /** Unique review identifier */
    id: number
    /** Username of the review author */
    userName: string
    /** Rating score given in the review */
    rating: number
    /** Text content of the review */
    comment: string
    /** Timestamp when the review was posted */
    timestamp: number
    /** Vote counts for this review */
    votes?: ReviewVotes
}

export const ReviewSchema: z.ZodType<Review> = z.object({
    id: z.number(),
    userName: z.string(),
    rating: z.number().min(1).max(5),
    comment: z.string(),
    timestamp: z.number(),
    votes: ReviewVotesSchema.optional()
})
