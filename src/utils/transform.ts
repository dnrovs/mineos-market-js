export function recordToArray<T>(record: Record<string, T>): T[] {
    return Object.values(record)
}

export function arrayToUri(
    key: string,
    values: (string | number | boolean)[]
): Record<string, string> {
    return values.reduce(
        (acc, value, index) => {
            acc[`${encodeURIComponent(key)}[${index + 1}]`] =
                `${encodeURIComponent(value)}`
            return acc
        },
        {} as Record<string, string>
    )
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
