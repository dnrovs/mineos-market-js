import { z } from 'zod'
import { MessageStatus } from '../../shared'

/**
 * Dialog information containing last message details and participant
 *
 * @category Responses
 */
export type Dialog = {
    /** Username of the dialog participant */
    dialogUserName: string
    /** Timestamp of the last message */
    timestamp: number
    /** Text content of the last message */
    text: string
    /** Whether the last message has been read */
    lastMessageIsRead: MessageStatus
    /** Username of who sent the last message */
    lastMessageUserName: string
    /** User ID of who sent the last message */
    lastMessageUserId: number
}

export const DialogSchema: z.ZodType<Dialog> = z.object({
    dialogUserName: z.string(),
    timestamp: z.number(),
    text: z.string(),
    lastMessageIsRead: z.enum(MessageStatus),
    lastMessageUserName: z.string(),
    lastMessageUserId: z.number()
})

/**
 * Message content with sender information and timestamp
 *
 * @category Responses
 */
export type Message = {
    /** Message text content */
    text: string
    /** Username of the message sender */
    userName: string
    /** Timestamp when the message was sent */
    timestamp: number
}

export const MessageSchema: z.ZodType<Message> = z.object({
    text: z.string(),
    userName: z.string(),
    timestamp: z.number()
})
