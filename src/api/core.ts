import { parse } from 'lua-json'
import { convertKeysToCamel } from '../utils/case.js'
import { getConfig } from './config.js'

class APIError extends Error {
    constructor(message: string) {
        super(message)
        this.name = 'APIError'
    }
}

export async function apiRequest<T>(
    script: string,
    options?: Record<string, any>
): Promise<T> {
    const config = getConfig()

    const headers: HeadersInit = {
        'Content-Type': 'application/x-www-form-urlencoded',
        ...(config.userAgent && { 'User-Agent': config.userAgent }),
        ...config.headers
    }

    const response = await fetch(config.hostUrl + script + '.php', {
        method: 'POST',
        headers: headers,
        body: new URLSearchParams(options)
    })

    if (!response.ok) {
        throw new Error(`HTTP ${response.status}: ${response.statusText}`)
    }

    const text = await response.text()

    let parsed
    try {
        parsed = convertKeysToCamel(parse('return ' + text))
    } catch (error) {
        if (error instanceof Error) {
            throw new Error(
                `Failed to parse Lua response: ${error.message}. Raw response: ${text}`
            )
        }
    }

    if (parsed.success === false) {
        throw new APIError(parsed.reason || 'Unknown API error')
    }

    if (parsed.success === true && !parsed.result) {
        return parsed as T
    }

    return parsed.result as T
}
