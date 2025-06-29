export interface LoginParams {
    /** User's username */
    name?: string
    /** User's e-mail */
    email?: string
    /** User's password */
    password: string
}

export interface RegisterParams {
    /** User's username */
    name: string
    /** User's e-mail */
    email: string
    /** User's password */
    password: string
}

export interface ChangePasswordParams {
    /** User's email address */
    email: string
    /** User's current password */
    currentPassword: string
    /** New password to set */
    newPassword: string
}
