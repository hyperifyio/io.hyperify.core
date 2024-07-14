// Copyright (c) 2024. Sendanor <info@sendanor.fi>. All rights reserved.

import { explainString, isString } from "../../../types/String";
import { explainRegularObject, isRegularObject } from "../../../types/RegularObject";
import { explainNoOtherKeysInDevelopment, hasNoOtherKeysInDevelopment } from "../../../types/OtherKeys";
import { explain, explainNot, explainOk, explainProperty } from "../../../types/explain";
import { isUndefined } from "../../../types/undefined";

export interface NewDocumentDTO {
    readonly clientId            : string;
    readonly invoiceId           : string;
    readonly purchaseInvoiceId   : string;
    readonly date                : string;
    readonly name                : string;
    readonly path                : string;
    readonly contentType         : string;
}

export function isNewDocumentDTO (value: unknown): value is NewDocumentDTO {
    return (
        isRegularObject(value)
        && hasNoOtherKeysInDevelopment(value, [
            'clientId',
            'invoiceId',
            'purchaseInvoiceId',
            'date',
            'name',
            'path',
            'contentType',
        ])
        && isString(value?.clientId)
        && isString(value?.invoiceId)
        && isString(value?.purchaseInvoiceId)
        && isString(value?.date)
        && isString(value?.name)
        && isString(value?.path)
        && isString(value?.contentType)
    );
}

export function explainNewDocumentDTO (value: any) : string {
    return explain(
        [
            explainRegularObject(value),
            explainNoOtherKeysInDevelopment(value, [
                'clientId',
                'invoiceId',
                'purchaseInvoiceId',
                'date',
                'name',
                'path',
                'contentType',
            ])
            , explainProperty("clientId", explainString(value?.clientId))
            , explainProperty("invoiceId", explainString(value?.invoiceId))
            , explainProperty("purchaseInvoiceId", explainString(value?.purchaseInvoiceId))
            , explainProperty("date", explainString(value?.date))
            , explainProperty("name", explainString(value?.name))
            , explainProperty("path", explainString(value?.path))
            , explainProperty("contentType", explainString(value?.contentType))
        ]
    );
}

export function isNewDocumentDTOOrUndefined (value: unknown) : value is NewDocumentDTO | undefined {
    return isUndefined(value) || isNewDocumentDTO(value);
}

export function explainNewDocumentDTOOrUndefined (value: any) : string {
    return isNewDocumentDTOOrUndefined(value) ? explainOk() : explainNot('NewDocumentDTO | undefined');
}

export function parseNewDocumentDTO (value: any): NewDocumentDTO | undefined {
    if ( isNewDocumentDTO(value) ) return value;
    return undefined;
}
