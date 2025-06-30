import { Config } from '../shared/types'

export interface ResolvedConfig {
    hostUrl?: string
    userAgent?: string | null
    headers?: Record<string, string>
}

const defaultHost: string = 'http://mineos.buttex.ru/MineOSAPI/2.04/'
const defaultUserAgent: string =
    'Mozilla/5.0 (Macintosh Intel Mac OS X 10_13_3) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/64.0.3282.119 Safari/537.36'

const defaultConfig: Config = {
    hostUrl: defaultHost,
    userAgent: defaultUserAgent,
    headers: undefined,
    proxyUrl: undefined
}

let globalConfig: Config = { ...defaultConfig }

/**
 * Set library's configuration.
 *
 * @param {Config} params Object with required fields.
 * @param {string} [params.hostUrl] Authentication token of the user.
 * @param {string | null} [params.userAgent] User agent for requests.
 * @param {string} [params.headers] Additional headers for request.
 * @param {string} [params.proxyUrl] Appends before the host URL. Useful for CORS bypass.
 *
 * @example
 * setConfig({
 *     hostUrl: "http://customapi.net/",
 *     proxy: "http://corsproxy.io/?url=",
 *     userAgent: "Opera/9.80",
 *     headers: { 'Some-Header': 'value' }
 * })
 * */
export function setConfig(params: Partial<Config>): void {
    globalConfig = { ...defaultConfig, ...params }
}

export function getConfig(): ResolvedConfig {
    const config = globalConfig

    let resolvedProxy: string | undefined
    let resolvedUrl: string | undefined
    let resolvedUserAgent: string | undefined

    if (config.proxyUrl) {
        resolvedProxy = config.proxyUrl
    } else {
        resolvedProxy = undefined
    }

    if (resolvedProxy) {
        resolvedUrl = resolvedProxy + config.hostUrl
    } else {
        resolvedUrl = config.hostUrl
    }

    if (config.userAgent === null) {
        resolvedUserAgent = undefined
    } else if (typeof config.userAgent === 'string') {
        resolvedUserAgent = config.userAgent
    } else {
        resolvedUserAgent = defaultUserAgent
    }

    return {
        hostUrl: resolvedUrl,
        userAgent: resolvedUserAgent,
        headers: config.headers
    }
}
