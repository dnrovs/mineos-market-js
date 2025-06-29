export interface LoginData {
    /** User's unique identifier */
    id: number
    /** Authentication token for API requests */
    token: string
    /** User's display name */
    name: string
    /** User's email address */
    email: string
    /** Whether the user's email is verified */
    isVerified: boolean
    /** Timestamp of the login */
    timestamp: number
}
