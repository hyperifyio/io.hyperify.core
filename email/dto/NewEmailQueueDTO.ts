import { explainBoolean, isBoolean } from "../../types/Boolean";
import { explainRegularObject, isRegularObject } from "../../types/RegularObject";
import { explainNoOtherKeysInDevelopment, hasNoOtherKeysInDevelopment } from "../../types/OtherKeys";
import { explainString, isString } from "../../types/String";
import { explain, explainNot, explainOk, explainOr, explainProperty } from "../../types/explain";
import { isUndefined } from "../../types/undefined";

/**
 * New Email Queue DTO
 */
export interface NewEmailQueueDTO {
    readonly invoiceId?: string;
    readonly clientId: string;
    readonly inventoryItemId: string;
    readonly senderAddress: string;
    readonly targetAddress: string;
    readonly subject: string;
    readonly message: string;
    readonly htmlMessage?: string;
    readonly sent: boolean;
    readonly failed: boolean;
    readonly isTerminated: boolean;
}

export function createNewEmailQueueDTO (
    clientId: string,
    inventoryItemId: string,
    senderAddress: string,
    targetAddress: string,
    subject: string,
    message: string,
    sent: boolean,
    failed: boolean,
    isTerminated: boolean,
    invoiceId?: string,
    htmlMessage?: string,
) : NewEmailQueueDTO {
    return {
        invoiceId,
        clientId,
        inventoryItemId,
        senderAddress,
        targetAddress,
        subject,
        message,
        htmlMessage,
        sent,
        failed,
        isTerminated,
    };
}

export function isNewEmailQueueDTO (value: unknown) : value is NewEmailQueueDTO {
    return (
        isRegularObject(value)
        && hasNoOtherKeysInDevelopment(value, [
            'invoiceId',
            'clientId',
            'inventoryItemId',
            'senderAddress',
            'targetAddress',
            'subject',
            'message',
            'htmlMessage',
            'sent',
            'failed',
            'isTerminated',
        ])
        && (value?.invoiceId === undefined || isString(value?.invoiceId))
        && isString(value?.clientId)
        && isString(value?.inventoryItemId)
        && isString(value?.senderAddress)
        && isString(value?.targetAddress)
        && isString(value?.subject)
        && isString(value?.message)
        && (value?.htmlMessage === undefined || isString(value?.htmlMessage))
        && isBoolean(value?.sent)
        && isBoolean(value?.failed)
        && isBoolean(value?.isTerminated)
    );
}

export function explainNewEmailQueueDTO (value: any) : string {
    return explain(
        [
            explainRegularObject(value),
            explainNoOtherKeysInDevelopment(value, [
                'invoiceId',
                'clientId',
                'inventoryItemId',
                'senderAddress',
                'targetAddress',
                'subject',
                'message',
                'htmlMessage',
                'sent',
                'failed',
                'isTerminated',
            ]),
            explainProperty("invoiceId", explainString(value?.invoiceId)),
            explainProperty("clientId", explainString(value?.clientId)),
            explainProperty("inventoryItemId", explainString(value?.inventoryItemId)),
            explainProperty("senderAddress", explainString(value?.senderAddress)),
            explainProperty("targetAddress", explainString(value?.targetAddress)),
            explainProperty("subject", explainString(value?.subject)),
            explainProperty("message", explainString(value?.message)),
            explainProperty("htmlMessage", explainString(value?.htmlMessage)),
            explainProperty("sent", explainBoolean(value?.sent)),
            explainProperty("failed", explainBoolean(value?.failed)),
            explainProperty("isTerminated", explainBoolean(value?.isTerminated))
        ]
    );
}

export function parseNewEmailQueueDTO (value: unknown) : NewEmailQueueDTO | undefined {
    if (isNewEmailQueueDTO(value)) return value;
    return undefined;
}

export function isNewEmailQueueDTOOrUndefined (value: unknown): value is NewEmailQueueDTO | undefined {
    return isUndefined(value) || isNewEmailQueueDTO(value);
}

export function explainNewEmailQueueDTOOrUndefined (value: unknown): string {
    return isNewEmailQueueDTOOrUndefined(value) ? explainOk() : explainNot(explainOr(['NewEmailQueueDTO', 'undefined']));
}
