import { z } from 'zod'
import { parse } from '@kilcekru/lua-table'
import camelcaseKeys from 'camelcase-keys'

import { forceStringKeys, normalize } from './utils/transform'

import { keysToForceString } from './shared/constants'

import { Config, JsonValue, LuaValue } from './shared/types'
import { APIResponseSchema, ApiResponse } from './shared/schema'
import { ApiError, SchemaError } from './shared'

export class Core {
    constructor(
        private getConfig: () => Config,
        private getToken: () => string | undefined
    ) {}

    async request<T>(
        endpoint: string,
        parameters: Record<string, JsonValue> = {},
        requiresAuth = false,
        schema?: z.ZodSchema<T>
    ): Promise<T> {
        const token = this.getToken()
        const config = this.getConfig()

        if (requiresAuth) {
            if (!token) {
                throw new Error(
                    `Authentication required for endpoint "${endpoint}".`
                )
            }

            parameters.token = token
        }

        const headers: HeadersInit = {
            'Content-Type': 'application/x-www-form-urlencoded',
            ...(config.userAgent && { 'User-Agent': config.userAgent }),
            ...config.headers
        }

        const requestUrl = new URL(`${endpoint}.php`, config.hostUrl).toString()
        const fullUrl = config.proxyUrl
            ? `${config.proxyUrl}${encodeURIComponent(requestUrl)}`
            : requestUrl

        let response: Response
        try {
            response = await fetch(fullUrl, {
                method: 'POST',
                headers,
                body: new URLSearchParams(normalize(parameters))
            })
        } catch (err) {
            throw new Error(
                `Network error while fetching "${endpoint}": ${err instanceof Error ? err.message : String(err)}`
            )
        }

        if (!response.ok) {
            throw new Error(
                `HTTP ${response.status} for "${endpoint}": ${response.statusText}`
            )
        }

        let luaContent: string
        try {
            luaContent = await response.text()
        } catch (err) {
            throw new Error(
                `Failed to read response for "${endpoint}": ${err instanceof Error ? err.message : String(err)}`
            )
        }

        let jsonContent
        try {
            jsonContent = camelcaseKeys(
                parse(luaContent, {
                    emptyTables: 'array'
                }) as LuaValue,
                {
                    deep: true
                }
            )
        } catch (err) {
            throw new Error(
                `Failed to parse Lua response for "${endpoint}": ${err instanceof Error ? err.message : String(err)}`
            )
        }

        let parsedContent: ApiResponse
        try {
            if (config.validateResponses) {
                parsedContent = APIResponseSchema.parse(jsonContent)
            } else {
                parsedContent = jsonContent as ApiResponse
            }
        } catch (err) {
            if (err instanceof z.ZodError) {
                throw new SchemaError(
                    `API response invalid for "${endpoint}":\n${err.issues.map((i) => `➔ Field ${i.path}: ${i.message}`).join('\n')}`,
                    err.issues
                )
            }
            throw new Error(
                `Unexpected error validating API response for "${endpoint}": ${err}`
            )
        }

        if (!parsedContent.success) {
            throw new ApiError(
                parsedContent.reason || `Unknown API error at "${endpoint}"`
            )
        }

        if (
            parsedContent.result &&
            typeof parsedContent.result === 'object' &&
            !Array.isArray(parsedContent.result)
        ) {
            parsedContent.result = forceStringKeys(
                parsedContent.result,
                keysToForceString
            )
        }

        if (schema) {
            try {
                if (config.validateResponses) {
                    return schema.parse(parsedContent.result)
                } else {
                    return parsedContent.result as T
                }
            } catch (err) {
                if (err instanceof z.ZodError) {
                    throw new SchemaError(
                        `Response for "${endpoint}" does not match expected schema:\n${err.issues.map((i) => `➔ Field ${i.path}: ${i.message}`).join('\n')}`,
                        err.issues
                    )
                }
                throw new Error(
                    `Unexpected error parsing endpoint "${endpoint}" response: ${err}`
                )
            }
        }

        return undefined as T
    }
}
