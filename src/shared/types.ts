export interface SuccessResponse {
    /** Indicates if the operation was successful */
    success: true
    /** Optional result data from the operation */
    result?: string
}

export interface Config {
    /**
     * Market API URL
     * @default http://mineos.buttex.ru/MineOSAPI/2.04/
     * */
    hostUrl?: string
    /**
     * User agent for requests
     * @default Mozilla/5.0 (Macintosh Intel Mac OS X 10_13_3) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/64.0.3282.119 Safari/537.36
     * */
    userAgent?: string | null
    /**
     * Additional headers for request
     * */
    headers?: Record<string, string>
    /**
     * Appends before the host URL. Useful for CORS bypass
     * */
    proxyUrl?: string
}
