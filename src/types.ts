import { GetConversationResponse } from "./background/requests/conversation/list"
import { SendMessageResponse } from "./background/requests/message/send"

export type StreamMessageBody = {
    message: {
        id: string
        author: {
            role: string
            name: string
        }
        create_time: number
        update_time: number
        content: {
            content_type: string
            parts: Array<string>
        }
        status: string
        end_turn: null | boolean
        weight: number
        metadata: {
            message_type: string
            model_slug: string
            parent_id: string
        }
        recipient: string
    }
    conversation_id: string
    error: null | string
}

export type SendResponseType = {
    success: boolean;
    error?: string | object | null;
    data?: SendMessageResponse | GetConversationResponse;
} | string;

export type AuthResponseType = {
    user: {
        id: string
        name: string
        email: string
        image: string
        picture: string
        idp: string
        iat: number
        mfa: boolean
        groups: Array<string>
        intercom_hash: string
    }
    expires: string
    accessToken: string
    authProvider: string
}
