import { JsonValue } from '../shared/types'

export function normalize(
    object: Record<string, JsonValue>
): Record<string, string> {
    const result: Record<string, string> = {}

    const serialize = (value: JsonValue, key?: string) => {
        if (value === undefined || value === null) return

        if (Array.isArray(value)) {
            value.forEach((v, i) => serialize(v, key ? `${key}[${i}]` : `${i}`))
        } else if (typeof value === 'object') {
            Object.entries(value).forEach(([k, v]) =>
                serialize(v, key ? `${key}[${k}]` : k)
            )
        } else if (key) {
            result[key] = String(value)
        }
    }

    Object.entries(object).forEach(([k, v]) => serialize(v, k))

    return result
}

export function forceStringKeys(
    object: Record<string, JsonValue>,
    keys: string[]
): JsonValue {
    for (const [key, value] of Object.entries(object)) {
        if (keys.includes(key) && typeof value === 'number') {
            object[key] = String(value)
        } else if (
            value !== null &&
            typeof value === 'object' &&
            !Array.isArray(value)
        ) {
            object[key] = forceStringKeys(
                value as Record<string, JsonValue>,
                keys
            )
        } else if (value !== null && Array.isArray(value)) {
            object[key] = value.map((item) =>
                item !== null &&
                typeof item === 'object' &&
                !Array.isArray(item)
                    ? forceStringKeys(item as Record<string, JsonValue>, keys)
                    : item
            )
        }
    }
    return object
}
