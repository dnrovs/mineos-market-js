import { apiRequest } from '../core.js'
import {
    LoginParams,
    RegisterParams,
    ChangePasswordParams
} from './parameters.js'
import { LoginData } from './responses.js'
import { SuccessResponse } from '../../shared/types.js'

/**
 * Get user's credentials, including token.
 * Either email or name required.
 *
 * @param {LoginParams} params Object with required fields.
 * @param {string} [params.name] User's username.
 * @param {string} [params.email] User's e-mail.
 * @param {string} params.password User's password.
 *
 * @example await login({ email: 'user@example.com', password: 'prettynewpassword' })
 *
 * @returns {Promise<LoginData>} User's credentials.
 * */
export async function login({
    name,
    email,
    password
}: LoginParams): Promise<LoginData> {
    const options: LoginParams = { password }

    if (email) options.email = email
    if (name) options.name = name

    return await apiRequest<LoginData>('login', options)
}

/**
 * Register a new user.
 *
 * @param {LoginParams} params Object with required fields.
 * @param {string} params.name User's username.
 * @param {string} params.email User's e-mail.
 * @param {string} params.password User's password.
 *
 * @example await register({ name: 'ECS', email: 'user@example.com', password: 'prettynewpassword' })
 *
 * @returns {Promise<SuccessResponse>}
 * */

export async function register({
    name,
    email,
    password
}: RegisterParams): Promise<SuccessResponse> {
    return await apiRequest<SuccessResponse>('register', {
        name,
        email,
        password
    })
}

/**
 * Change user's password.
 *
 * @param {ChangePasswordParams} params Object with required fields.
 * @param {string} params.email User's email address.
 * @param {string} params.currentPassword User's current password.
 * @param {string} params.newPassword New password to set.
 *
 * @example
 * await changePassword({
 *     email: 'user@example.com',
 *     currentPassword: 'oldpass1488',
 *     newPassword: 'prettynewpassword'
 * })
 *
 * @returns {Promise<SuccessResponse>} Successful response.
 * */
export async function changePassword({
    email,
    currentPassword,
    newPassword
}: ChangePasswordParams): Promise<SuccessResponse> {
    return await apiRequest<SuccessResponse>('change_password', {
        email,
        current_password: currentPassword,
        new_password: newPassword
    })
}
