import { z } from 'zod'

import type { JsonValue } from './types'

export const PrimitiveSchema = z.union([
    z.string(),
    z.number(),
    z.boolean(),
    z.undefined(),
    z.null()
])
export type Primitive = z.infer<typeof PrimitiveSchema>

export const JsonValueSchema: z.ZodType<JsonValue> = z.lazy(() =>
    z.union([
        PrimitiveSchema,
        z.array(JsonValueSchema),
        z.record(z.string(), JsonValueSchema)
    ])
)

export const APIResponseSchema = z.union([
    z.object({
        success: z.literal(true),
        result: JsonValueSchema.optional()
    }),
    z.object({
        success: z.literal(false),
        reason: z.string().optional()
    })
])
export type ApiResponse = z.infer<typeof APIResponseSchema>
