export interface ReviewVotes {
    /** Total number of votes on the review */
    total: number
    /** Number of positive votes */
    positive: number
}

export interface Review {
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
    votes: ReviewVotes
}
