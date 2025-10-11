import { z } from 'zod'
import { VerificationStatus } from '../../shared'

/**
 * User authentication credentials and profile information
 *
 * @category Responses
 */
export type UserCredentials = {
    /** User's unique identifier */
    id: number
    /** Authentication token for API requests */
    token: string
    /** User's display name */
    name: string
    /** User's email address */
    email: string
    /** Whether the user's email is verified */
    isVerified: VerificationStatus
    /** Timestamp of the login */
    timestamp: number
}

export const UserCredentialsSchema: z.ZodSchema<UserCredentials> = z.object({
    id: z.number(),
    token: z.string(),
    name: z.string(),
    email: z.email(),
    isVerified: z.enum(VerificationStatus),
    timestamp: z.number()
})
