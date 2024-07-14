// Copyright (c) 2024. Sendanor <info@sendanor.fi>. All rights reserved.

import { explainString, isString } from "../../../types/String";
import { explainRegularObject, isRegularObject } from "../../../types/RegularObject";
import { explainNoOtherKeysInDevelopment, hasNoOtherKeysInDevelopment } from "../../../types/OtherKeys";
import { explain, explainNot, explainOk, explainProperty } from "../../../types/explain";
import { isUndefined } from "../../../types/undefined";

export interface DocumentDTO {
    readonly documentId          : string;
    readonly clientId            : string;
    readonly invoiceId           : string;
    readonly purchaseInvoiceId   : string;
    readonly updated             : string;
    readonly created             : string;
    readonly date                : string;
    readonly name                : string;
    readonly path                : string;
    readonly contentType         : string;
}

export function isDocumentDTO (value: unknown): value is DocumentDTO {
    return (
        isRegularObject(value)
        && hasNoOtherKeysInDevelopment(value, [
            'documentId',
            'clientId',
            'invoiceId',
            'purchaseInvoiceId',
            'updated',
            'created',
            'date',
            'name',
            'path',
            'contentType',
        ])
        && isString(value?.documentId)
        && isString(value?.clientId)
        && isString(value?.invoiceId)
        && isString(value?.purchaseInvoiceId)
        && isString(value?.updated)
        && isString(value?.created)
        && isString(value?.date)
        && isString(value?.name)
        && isString(value?.path)
        && isString(value?.contentType)
    );
}

export function explainDocumentDTO (value: any) : string {
    return explain(
        [
            explainRegularObject(value),
            explainNoOtherKeysInDevelopment(value, [
                'documentId',
                'clientId',
                'invoiceId',
                'purchaseInvoiceId',
                'updated',
                'created',
                'date',
                'name',
                'path',
                'contentType',
            ])
            , explainProperty("documentId", explainString(value?.documentId))
            , explainProperty("clientId", explainString(value?.clientId))
            , explainProperty("invoiceId", explainString(value?.invoiceId))
            , explainProperty("purchaseInvoiceId", explainString(value?.purchaseInvoiceId))
            , explainProperty("updated", explainString(value?.updated))
            , explainProperty("created", explainString(value?.created))
            , explainProperty("date", explainString(value?.date))
            , explainProperty("name", explainString(value?.name))
            , explainProperty("path", explainString(value?.path))
            , explainProperty("contentType", explainString(value?.contentType))
        ]
    );
}

export function isDocumentDTOOrUndefined (value: unknown) : value is DocumentDTO | undefined {
    return isUndefined(value) || isDocumentDTO(value);
}

export function explainDocumentDTOOrUndefined (value: any) : string {
    return isDocumentDTOOrUndefined(value) ? explainOk() : explainNot('DocumentDTO | undefined');
}

export function parseDocumentDTO (value: any): DocumentDTO | undefined {
    if ( isDocumentDTO(value) ) return value;
    return undefined;
}
