export interface Statistics {
    /** Total number of registered users */
    usersCount: number
    /** Total number of published items */
    publicationsCount: number
    /** Total number of reviews posted */
    reviewsCount: number
    /** Total number of messages sent */
    messagesCount: number
    /** Username of the most recently registered user */
    lastRegisteredUser: string
    /** Username of the most popular user */
    mostPopularUser: string
}
