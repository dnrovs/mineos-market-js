import { Core } from './core'

import type { Config } from './shared'
import { defaultConfig } from './shared/constants'

import { type Auth, AuthService } from './services/auth/service'
import { type Messages, MessagesService } from './services/messages/service'
import {
    type Publications,
    PublicationsService
} from './services/publications/service'
import { type Reviews, ReviewsService } from './services/reviews/service'
import {
    type Statistics,
    StatisticsService
} from './services/statistics/service'

import type { LoginParams } from './services'
import type { UserCredentials } from './services'

/**
 * Main class for interacting with MineOS Market services.
 *
 * @group None
 */
export class MarketClient {
    private token?: string
    private config: Config

    private readonly core: Core

    /** Provides methods for creating and managing accounts */
    public readonly auth: Auth
    /** Provides methods for receiving and sending user's messages */
    public readonly messages: Messages
    /** Provides methods for getting and manipulating market publications */
    public readonly publications: Publications
    /** Provides methods for receiving and publishing publication reviews */
    public readonly reviews: Reviews
    /** Provides methods for receiving market statistics and marking publications as downloaded */
    public readonly statistics: Statistics

    /**
     * Initializes a new instance of the class with the specified configuration.
     *
     * @param {Partial<Config>} [config] - The configuration object, partially overriding default settings.
     */
    constructor(config?: Partial<Config>) {
        this.config = { ...defaultConfig, ...config }

        this.core = new Core(
            () => this.config,
            () => this.token
        )

        this.auth = new AuthService(this.core)
        this.messages = new MessagesService(this.core)
        this.publications = new PublicationsService(this.core)
        this.reviews = new ReviewsService(this.core)
        this.statistics = new StatisticsService(this.core)
    }

    /**
     * Authenticate the current instance and store the token, allowing to access the protected endpoints.
     * Requires either username or email along with a password.
     *
     * @see {@link Auth.login} if you want to get credentials without setting the instance's token.
     *
     * @param {LoginParams} params Object with required fields.
     *
     * @example await client.login({ email: 'user@example.com', password: 'prettynewpassword' })
     *
     * @returns {Promise<UserCredentials>} User's credentials.
     */
    async login(params: LoginParams): Promise<UserCredentials> {
        const userCredentials = await this.auth.login(params)

        this.token = userCredentials.token

        return userCredentials
    }

    /**
     * Log out the current user by removing their authentication token.
     */
    logout(): void {
        this.token = undefined
    }

    /**
     * Set or change the token value for the current instance.
     *
     * @param {string} token - The token string to be set.
     */
    useToken(token: string): void {
        this.token = token
    }

    /**
     * Retrieve the current token value.
     *
     * @returns {string|undefined} The token if available, otherwise undefined.
     */
    getToken(): string | undefined {
        return this.token
    }

    /**
     * Update the existing configuration by merging the provided partial configuration object.
     *
     * @param {Partial<Config>} params A partial configuration object containing the configuration properties to be updated.
     */
    useConfig(params: Partial<Config>): void {
        this.config = { ...this.config, ...params }
    }

    /**
     * Retrieve the current configuration object.
     *
     * @returns {Config} The configuration object.
     */
    getConfig(): Config {
        return this.config
    }
}
