import { parse } from 'lua-json'
import { convertKeysToCamel } from '../utils/case.js'

const host = 'http://mineos.buttex.ru/MineOSAPI/2.04/'
const agent =
    'Mozilla/5.0 (Macintosh Intel Mac OS X 10_13_3) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/64.0.3282.119 Safari/537.36'

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
    const response = await fetch(host + script + '.php', {
        method: 'POST',
        headers: {
            'User-Agent': agent,
            'Content-Type': 'application/x-www-form-urlencoded'
        },
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
