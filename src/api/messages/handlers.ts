import { apiRequest } from '../core.js'
import {
    GetDialogsParams,
    GetDialogParams,
    SendMessageParams
} from './parameters.js'
import { Dialog, Message } from './responses.js'
import { SuccessResponse } from '../../shared/types.js'
import { recordToArray } from '../../utils/transform.js'

/**
 * Get user's dialogs.
 *
 * @param {GetDialogsParams} params Object with required fields.
 * @param {string} params.token Authentication token of the user.
 *
 * @example await getDialogs({ token: 'veryrealistictoken' })
 *
 * @returns {Promise<Dialog[]>} List of user's dialogs.
 * */
export async function getDialogs({
    token
}: GetDialogsParams): Promise<Dialog[]> {
    return recordToArray(
        await apiRequest<Record<string, Dialog>>('dialogs', { token })
    )
}

/**
 * Get messages from dialog with user.
 *
 * @param {GetDialogParams} params Object with required fields.
 * @param {string} params.token Authentication token of the user.
 * @param {string} params.userName Target user.
 *
 * @example await getDialog({token: 'veryrealistictoken', userName: 'ECS'})
 *
 * @returns {Promise<Message[]>} List of dialog's messages.
 * */

export async function getDialog({
    token,
    userName
}: GetDialogParams): Promise<Message[]> {
    return recordToArray(
        await apiRequest<Record<string, Message>>('messages', {
            token: token,
            user_name: userName
        })
    )
}

/**
 * Send a message.
 *
 * @param {SendMessageParams} params Object with required fields.
 * @param {string} params.token Authentication token of the user.
 * @param {string} params.userName Receiver's username.
 * @param {string} params.text Message text content.
 *
 * @example
 * await sendMessage({
 *     token: 'veryrealistictoken',
 *     userName: 'ECS',
 *     text: 'Holy guacamole'
 * })
 *
 * @returns {Promise<SuccessResponse>} Successful response.
 *  */
export async function sendMessage({
    token,
    userName,
    text
}: SendMessageParams): Promise<SuccessResponse> {
    return await apiRequest<SuccessResponse>('message', {
        token: token,
        user_name: userName,
        text: text
    })
}
