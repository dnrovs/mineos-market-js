import { z } from 'zod'

/**
 * System-wide statistics including user counts, publication metrics, and notable users
 *
 * @category Responses
 */
export type Statistic = {
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

export const StatisticSchema: z.ZodType<Statistic> = z.object({
    usersCount: z.number(),
    publicationsCount: z.number(),
    reviewsCount: z.number(),
    messagesCount: z.number(),
    lastRegisteredUser: z.string(),
    mostPopularUser: z.string()
})
