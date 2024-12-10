import { explainBoolean, isBoolean } from "../../types/Boolean";
import { explainRegularObject, isRegularObject } from "../../types/RegularObject";
import { explainNoOtherKeysInDevelopment, hasNoOtherKeysInDevelopment } from "../../types/OtherKeys";
import { explainString, explainStringOrNull, isString } from "../../types/String";
import { explain, explainNot, explainOk, explainOr, explainProperty } from "../../types/explain";
import { isUndefined } from "../../types/undefined";

/**
 * Email Queue DTO
 */
export interface EmailQueueDTO {
    readonly emailQueueId: string;
    readonly invoiceId?: string;
    readonly clientId: string;
    readonly inventoryItemId: string;
    readonly updated: string;
    readonly created: string;
    readonly senderAddress: string;
    readonly targetAddress: string;
    readonly subject: string;
    readonly message: string;
    readonly htmlMessage?: string;
    readonly sent: boolean;
    readonly failed: boolean;
    readonly isTerminated: boolean;
}

export function createEmailQueueDTO(
    emailQueueId: string,
    updated: string,
    created: string,
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
): EmailQueueDTO {
    return {
        emailQueueId,
        updated,
        created,
        clientId,
        inventoryItemId,
        senderAddress,
        targetAddress,
        subject,
        message,
        sent,
        failed,
        isTerminated,
        invoiceId,
        htmlMessage,
    };
}

export function isEmailQueueDTO(value: unknown): value is EmailQueueDTO {
    return (
        isRegularObject(value)
        && hasNoOtherKeysInDevelopment(value, [
            'emailQueueId',
            'invoiceId',
            'clientId',
            'inventoryItemId',
            'updated',
            'created',
            'senderAddress',
            'targetAddress',
            'subject',
            'message',
            'htmlMessage',
            'sent',
            'failed',
            'isTerminated',
        ])
        && isString(value?.emailQueueId)
        && (value?.invoiceId === undefined || isString(value?.invoiceId))
        && isString(value?.clientId)
        && isString(value?.inventoryItemId)
        && isString(value?.updated)
        && isString(value?.created)
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

export function explainEmailQueueDTO(value: any): string {
    return explain(
        [
            explainRegularObject(value),
            explainNoOtherKeysInDevelopment(value, [
                'emailQueueId',
                'invoiceId',
                'clientId',
                'inventoryItemId',
                'updated',
                'created',
                'senderAddress',
                'targetAddress',
                'subject',
                'message',
                'htmlMessage',
                'sent',
                'failed',
                'isTerminated',
            ]),
            explainProperty("emailQueueId", explainString(value?.emailQueueId)),
            explainProperty("invoiceId", explainStringOrNull(value?.invoiceId)),
            explainProperty("clientId", explainString(value?.clientId)),
            explainProperty("inventoryItemId", explainString(value?.inventoryItemId)),
            explainProperty("updated", explainStringOrNull(value?.updated)),
            explainProperty("created", explainStringOrNull(value?.created)),
            explainProperty("senderAddress", explainString(value?.senderAddress)),
            explainProperty("targetAddress", explainString(value?.targetAddress)),
            explainProperty("subject", explainString(value?.subject)),
            explainProperty("message", explainString(value?.message)),
            explainProperty("htmlMessage", explainStringOrNull(value?.htmlMessage)),
            explainProperty("sent", explainBoolean(value?.sent)),
            explainProperty("failed", explainBoolean(value?.failed)),
            explainProperty("isTerminated", explainBoolean(value?.isTerminated))
        ]
    );
}

export function parseEmailQueueDTO(value: unknown): EmailQueueDTO | undefined {
    if (isEmailQueueDTO(value)) return value;
    return undefined;
}

export function isEmailQueueDTOOrUndefined(value: unknown): value is EmailQueueDTO | undefined {
    return isUndefined(value) || isEmailQueueDTO(value);
}

export function explainEmailQueueDTOOrUndefined(value: unknown): string {
    return isEmailQueueDTOOrUndefined(value) ? explainOk() : explainNot(explainOr(['EmailQueueDTO', 'undefined']));
}
