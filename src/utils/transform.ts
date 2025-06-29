export function recordToArray<T>(record: Record<string, T>): T[] {
    return Object.values(record)
}
