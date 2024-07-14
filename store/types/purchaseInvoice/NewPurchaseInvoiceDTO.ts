// Copyright (c) 2024. Sendanor <info@sendanor.fi>. All rights reserved.

import { explainBoolean, isBoolean } from "../../../types/Boolean";
import { explainString, isString } from "../../../types/String";
import { explainNumber, isNumber } from "../../../types/Number";
import { explainRegularObject, isRegularObject } from "../../../types/RegularObject";
import { explainNoOtherKeysInDevelopment, hasNoOtherKeysInDevelopment } from "../../../types/OtherKeys";
import { explain, explainNot, explainOk, explainProperty } from "../../../types/explain";
import { isUndefined } from "../../../types/undefined";

export interface NewPurchaseInvoiceDTO {
    readonly invoiceTypeId                : string;
    readonly purchaseCompanyId            : string;
    readonly groupId                      : string;
    readonly bankAccountRowId             : string;
    readonly date                         : string;
    readonly dueDate                      : string;
    readonly extraDueDate                 : string;
    readonly invoiceNumber                : string;
    readonly referenceNumber              : string;
    readonly name                         : string;
    readonly description                  : string;
    readonly totalSum                     : number;
    readonly totalVat                     : number;
    readonly totalSumIncludingVat         : number;
    readonly totalExtra                   : number;
    readonly estimateTotalSum             : number;
    readonly estimateTotalVat             : number;
    readonly estimateTotalSumIncludingVat : number;
    readonly barcode                      : string;
    readonly iban                         : string;
    readonly uuid                         : string;
    readonly internalNote                 : string;
    readonly onHold                       : boolean;
    readonly isReceived                   : boolean;
}

export function isNewPurchaseInvoiceDTO (value: unknown): value is NewPurchaseInvoiceDTO {
    return (
        isRegularObject(value)
        && hasNoOtherKeysInDevelopment(value, [
            'invoiceTypeId',
            'purchaseCompanyId',
            'groupId',
            'bankAccountRowId',
            'date',
            'dueDate',
            'extraDueDate',
            'invoiceNumber',
            'referenceNumber',
            'name',
            'description',
            'totalSum',
            'totalVat',
            'totalSumIncludingVat',
            'totalExtra',
            'estimateTotalSum',
            'estimateTotalVat',
            'estimateTotalSumIncludingVat',
            'barcode',
            'iban',
            'uuid',
            'internalNote',
            'onHold',
            'isReceived',
        ])
        && isString(value?.invoiceTypeId)
        && isString(value?.purchaseCompanyId)
        && isString(value?.groupId)
        && isString(value?.bankAccountRowId)
        && isString(value?.date)
        && isString(value?.dueDate)
        && isString(value?.extraDueDate)
        && isString(value?.invoiceNumber)
        && isString(value?.referenceNumber)
        && isString(value?.name)
        && isString(value?.description)
        && isNumber(value?.totalSum)
        && isNumber(value?.totalVat)
        && isNumber(value?.totalSumIncludingVat)
        && isNumber(value?.totalExtra)
        && isNumber(value?.estimateTotalSum)
        && isNumber(value?.estimateTotalVat)
        && isNumber(value?.estimateTotalSumIncludingVat)
        && isString(value?.barcode)
        && isString(value?.iban)
        && isString(value?.uuid)
        && isString(value?.internalNote)
        && isBoolean(value?.onHold)
        && isBoolean(value?.isReceived)
    );
}

export function explainNewPurchaseInvoiceDTO (value: any) : string {
    return explain(
        [
            explainRegularObject(value),
            explainNoOtherKeysInDevelopment(value, [
                'invoiceTypeId',
                'purchaseCompanyId',
                'groupId',
                'bankAccountRowId',
                'date',
                'dueDate',
                'extraDueDate',
                'invoiceNumber',
                'referenceNumber',
                'name',
                'description',
                'totalSum',
                'totalVat',
                'totalSumIncludingVat',
                'totalExtra',
                'estimateTotalSum',
                'estimateTotalVat',
                'estimateTotalSumIncludingVat',
                'barcode',
                'iban',
                'uuid',
                'internalNote',
                'onHold',
                'isReceived',
            ])
            , explainProperty("invoiceTypeId", explainString(value?.invoiceTypeId))
            , explainProperty("purchaseCompanyId", explainString(value?.purchaseCompanyId))
            , explainProperty("groupId", explainString(value?.groupId))
            , explainProperty("bankAccountRowId", explainString(value?.bankAccountRowId))
            , explainProperty("date", explainString(value?.date))
            , explainProperty("dueDate", explainString(value?.dueDate))
            , explainProperty("extraDueDate", explainString(value?.extraDueDate))
            , explainProperty("invoiceNumber", explainString(value?.invoiceNumber))
            , explainProperty("referenceNumber", explainString(value?.referenceNumber))
            , explainProperty("name", explainString(value?.name))
            , explainProperty("description", explainString(value?.description))
            , explainProperty("totalSum", explainNumber(value?.totalSum))
            , explainProperty("totalVat", explainNumber(value?.totalVat))
            , explainProperty("totalSumIncludingVat", explainNumber(value?.totalSumIncludingVat))
            , explainProperty("totalExtra", explainNumber(value?.totalExtra))
            , explainProperty("estimateTotalSum", explainNumber(value?.estimateTotalSum))
            , explainProperty("estimateTotalVat", explainNumber(value?.estimateTotalVat))
            , explainProperty("estimateTotalSumIncludingVat", explainNumber(value?.estimateTotalSumIncludingVat))
            , explainProperty("barcode", explainString(value?.barcode))
            , explainProperty("iban", explainString(value?.iban))
            , explainProperty("uuid", explainString(value?.uuid))
            , explainProperty("internalNote", explainString(value?.internalNote))
            , explainProperty("onHold", explainBoolean(value?.onHold))
            , explainProperty("isReceived", explainBoolean(value?.isReceived))
        ]
    );
}

export function isNewPurchaseInvoiceDTOOrUndefined (value: unknown) : value is NewPurchaseInvoiceDTO | undefined {
    return isUndefined(value) || isNewPurchaseInvoiceDTO(value);
}

export function explainNewPurchaseInvoiceDTOOrUndefined (value: any) : string {
    return isNewPurchaseInvoiceDTOOrUndefined(value) ? explainOk() : explainNot('NewPurchaseInvoiceDTO | undefined');
}

export function parseNewPurchaseInvoiceDTO (value: any): NewPurchaseInvoiceDTO | undefined {
    if ( isNewPurchaseInvoiceDTO(value) ) return value;
    return undefined;
}
