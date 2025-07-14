function snakeToCamelCase(str: string): string {
    return str.replace(/_([a-z])/g, (_, letter) => letter.toUpperCase())
}

export function convertKeysToCamel(obj: any): any {
    if (Array.isArray(obj)) {
        return obj.map(convertKeysToCamel)
    } else if (obj !== null && typeof obj === 'object') {
        return Object.entries(obj).reduce(
            (acc: Record<string, any>, [key, value]) => {
                const camelKey = snakeToCamelCase(key)
                acc[camelKey] = convertKeysToCamel(value)
                return acc
            },
            {}
        )
    }
    return obj
}
