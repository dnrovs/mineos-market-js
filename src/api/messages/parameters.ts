export interface GetDialogsParams {
    /** Authentication token of the user */
    token: string
}

export interface GetDialogParams {
    /** Authentication token of the user */
    token: string
    /** Target user */
    userName: string
}

export interface SendMessageParams {
    /** Authentication token of the user */
    token: string
    /** Receiver's username */
    userName: string
    /** Message text content */
    text: string
}
