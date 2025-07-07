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
