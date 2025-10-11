/**
 * Parameters for getting user credentials.
 * Requires either username or email along with a password.
 *
 * @category Parameters
 */
export type LoginParams =
    | {
          /** User's username */
          userName: string
          email?: never
          /** User's password */
          password: string
      }
    | {
          userName?: never
          /** User's email address */
          email: string
          /** User's password */
          password: string
      }

/**
 * Parameters for registering a new user account.
 *
 * @category Parameters
 */
export type RegisterParams = {
    /** User's username */
    userName: string
    /** User's email address */
    email: string
    /** User's password */
    password: string
}

/**
 * Parameters for changing a user's password.
 *
 * @category Parameters
 */
export type ChangePasswordParams = {
    /** User's email address */
    email: string
    /** User's current password */
    currentPassword: string
    /** New password to set */
    newPassword: string
}
