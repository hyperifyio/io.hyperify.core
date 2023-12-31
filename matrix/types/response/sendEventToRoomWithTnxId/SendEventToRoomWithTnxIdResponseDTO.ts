// Copyright (c) 2022. Heusala Group Oy <info@heusalagroup.fi>. All rights reserved.

import { isString } from "../../../../types/String";
import { isRegularObject } from "../../../../types/RegularObject";
import { hasNoOtherKeysInDevelopment } from "../../../../types/OtherKeys";

export interface SendEventToRoomWithTnxIdResponseDTO {
    readonly event_id : string;
}

export function createSendEventToRoomWithTnxIdResponseDTO (
    event_id : string
): SendEventToRoomWithTnxIdResponseDTO {
    return {
        event_id
    };
}

export function isSendEventToRoomWithTnxIdResponseDTO (value: any): value is SendEventToRoomWithTnxIdResponseDTO {
    return (
        isRegularObject(value)
        && hasNoOtherKeysInDevelopment(value, [
            'event_id'
        ])
        && isString(value?.event_id)
    );
}

export function stringifySendEventToRoomWithTnxIdResponseDTO (value: SendEventToRoomWithTnxIdResponseDTO): string {
    return `SendEventToRoomWithTnxIdResponseDTO(${value})`;
}

export function parseSendEventToRoomWithTnxIdResponseDTO (value: any): SendEventToRoomWithTnxIdResponseDTO | undefined {
    if ( isSendEventToRoomWithTnxIdResponseDTO(value) ) return value;
    return undefined;
}
