export interface Dialog {
    /** Username of the dialog participant */
    dialogUserName: string
    /** Timestamp of the last message */
    timestamp: number
    /** Text content of the last message */
    text: string
    /** Whether the last message has been read */
    lastMessageIsRead: boolean
    /** Username of who sent the last message */
    lastMessageUserName: string
    /** User ID of who sent the last message */
    lastMessageUserId: number
}

export interface Message {
    /** Message text content */
    text: string
    /** Username of the message sender */
    userName: string
    /** Timestamp when the message was sent */
    timestamp: number
}
