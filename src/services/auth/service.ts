import { BaseService } from '../base'

import { LoginParams, RegisterParams, ChangePasswordParams } from './parameters'
import { UserCredentials } from './responses'

import { UserCredentialsSchema } from './responses'

/** @group Services */
export interface Auth {
    /**
     * Get a user's credentials without setting the instance's token.
     * Requires either username or email along with a password.
     *
     * @see {@link MarketClient.login} if you want to authenticate an instance.
     *
     * @param {LoginParams} params Object with required fields.
     *
     * @example await client.auth.login({ email: 'user@example.com', password: 'prettynewpassword' })
     *
     * @returns {Promise<UserCredentials>} User's credentials.
     * */
    login(params: LoginParams): Promise<UserCredentials>

    /**
     * Register a new user.
     *
     * @param {LoginParams} params Object with required fields.
     *
     * @example
     * await client.auth.register({
     *     userName: 'ECS',
     *     email: 'user@example.com',
     *     password: 'prettynewpassword'
     * })
     * */
    register(params: RegisterParams): Promise<void>

    /**
     * Change a user's password.
     *
     * @param {ChangePasswordParams} params Object with required fields.
     *
     * @example
     * await client.auth.changePassword({
     *     email: 'user@example.com',
     *     currentPassword: 'old-password',
     *     newPassword: 'prettynewpassword'
     * })
     * */
    changePassword(params: ChangePasswordParams): Promise<void>
}

export class AuthService extends BaseService implements Auth {
    async login(params: LoginParams): Promise<UserCredentials> {
        return await this.core.request(
            'login',
            {
                name: params.userName,
                email: params.email,
                password: params.password
            },
            false,
            UserCredentialsSchema
        )
    }

    async register(params: RegisterParams): Promise<void> {
        await this.core.request('register', {
            name: params.userName,
            email: params.email,
            password: params.password
        })
    }

    async changePassword(params: ChangePasswordParams): Promise<void> {
        await this.core.request('change_password', {
            email: params.email,
            current_password: params.currentPassword,
            new_password: params.newPassword
        })
    }
}
