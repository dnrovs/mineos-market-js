/**
 * Parameters for retrieving dialog with specific user.
 *
 * @category Parameters
 */
export type GetDialogParams = {
    /** Target user */
    userName: string
}

/**
 * Parameters for sending a message to a specific user.
 *
 * @category Parameters
 */
export type SendMessageParams = {
    /** Receiver's username */
    userName: string
    /** Message text content */
    text: string
}
