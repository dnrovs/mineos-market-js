export type JsonValue =
    | string
    | number
    | boolean
    | null
    | undefined
    | JsonValue[]
    | { [key: string]: JsonValue }

export type LuaValue =
    | { [key: string]: unknown }
    | Array<{ [key: string]: unknown }>

/**
 * Configuration settings for connecting to the Market API.
 *
 * @default
 * ```
 * {
 *     hostUrl: 'http://mineos.buttex.ru/MineOSAPI/2.04/',
 *     userAgent:
 *         'Mozilla/5.0 (Macintosh Intel Mac OS X 10_13_3) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/64.0.3282.119 Safari/537.36',
 *     headers: undefined,
 *     proxyUrl: undefined,
 *     validateResponses: true
 * }
 * ```
 */
export type Config = {
    /**
     * Market API URL
     * @default http://mineos.buttex.ru/MineOSAPI/2.04/
     * */
    hostUrl: string
    /**
     * User agent for requests
     * @default Mozilla/5.0 (Macintosh Intel Mac OS X 10_13_3) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/64.0.3282.119 Safari/537.36
     * */
    userAgent?: string
    /** Additional headers for request */
    headers?: Record<string, string>
    /** Appends before the host URL. Useful for CORS bypass */
    proxyUrl?: string
    /** Validate API responses by Zod schema */
    validateResponses?: boolean
}
