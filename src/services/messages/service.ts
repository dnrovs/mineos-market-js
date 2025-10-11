import { BaseService } from '../base'

import { z } from 'zod'

import { GetDialogParams, SendMessageParams } from './parameters'
import { Dialog, Message } from './responses'

import { DialogSchema, MessageSchema } from './responses'

/** @group Services */
export interface Messages {
    /**
     * Get user's dialogs.
     *
     * @example await client.messages.getDialogs()
     *
     * @returns {Promise<Dialog[]>} List of user's dialogs.
     * */
    getDialogs(): Promise<Dialog[]>

    /**
     * Get messages from dialog with user.
     *
     * @param {GetDialogParams} params Object with required fields.
     *
     * @example await client.messages.getDialog({ userName: 'ECS' })
     *
     * @returns {Promise<Message[]>} List of dialog's messages.
     * */
    getDialog(params: GetDialogParams): Promise<Message[]>

    /**
     * Send a message.
     *
     * @param {SendMessageParams} params Object with required fields.
     *
     * @example
     * await client.messages.sendMessage({
     *     userName: 'ECS',
     *     text: 'Holy guacamole'
     * })
     * */
    sendMessage(params: SendMessageParams): Promise<void>
}

export class MessagesService extends BaseService implements Messages {
    async getDialogs(): Promise<Dialog[]> {
        return Object.values(
            await this.core.request<Record<string, Dialog>>(
                'dialogs',
                undefined,
                true,
                z.record(z.string(), DialogSchema)
            )
        )
    }

    async getDialog(params: GetDialogParams): Promise<Message[]> {
        return Object.values(
            await this.core.request<Record<string, Message>>(
                'messages',
                {
                    user_name: params.userName
                },
                true,
                z.record(z.string(), MessageSchema)
            )
        )
    }

    async sendMessage(params: SendMessageParams): Promise<void> {
        await this.core.request(
            'message',
            {
                user_name: params.userName,
                text: params.text
            },
            true
        )
    }
}
