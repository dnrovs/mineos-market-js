import { z } from 'zod'

/** @group Errors */
export class ApiError extends Error {
    constructor(message: string) {
        super(message)
        this.name = 'ApiError'
    }
}

/** @group Errors */
export class SchemaError extends Error {
    constructor(
        public message: string,
        public issues: z.core.$ZodIssue[]
    ) {
        super(message)
        this.name = 'SchemaError'
    }
}
