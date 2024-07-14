// Copyright (c) 2024. Sendanor <info@sendanor.fi>. All rights reserved.

import {
    explainArrayOf,
    isArrayOf,
} from "../../../types/Array";
import { explainBoolean, isBoolean } from "../../../types/Boolean";
import { explainString, isString } from "../../../types/String";
import { explainNumber, isNumber } from "../../../types/Number";
import { explainRegularObject, isRegularObject } from "../../../types/RegularObject";
import { explainNoOtherKeysInDevelopment, hasNoOtherKeysInDevelopment } from "../../../types/OtherKeys";
import { explain, explainNot, explainOk, explainProperty } from "../../../types/explain";
import { isUndefined } from "../../../types/undefined";
import {
    DocumentDTO,
    explainDocumentDTO,
    isDocumentDTO,
} from "../document/DocumentDTO";

export interface PurchaseInvoiceDTO {
    readonly purchaseInvoiceId            : string;
    readonly invoiceTypeId                : string;
    readonly purchaseCompanyId            : string;
    readonly groupId                      : string;
    readonly bankAccountRowId             : string;
    readonly updated                      : string;
    readonly created                      : string;
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
    readonly documents                    : readonly DocumentDTO[];
}

export function isPurchaseInvoiceDTO (value: unknown): value is PurchaseInvoiceDTO {
    return (
        isRegularObject(value)
        && hasNoOtherKeysInDevelopment(value, [
            'purchaseInvoiceId',
            'invoiceTypeId',
            'purchaseCompanyId',
            'groupId',
            'bankAccountRowId',
            'updated',
            'created',
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
            'documents',
        ])
        && isString(value?.purchaseInvoiceId)
        && isString(value?.invoiceTypeId)
        && isString(value?.purchaseCompanyId)
        && isString(value?.groupId)
        && isString(value?.bankAccountRowId)
        && isString(value?.updated)
        && isString(value?.created)
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
        && isArrayOf<DocumentDTO>(value?.documents, isDocumentDTO)
    );
}

export function explainPurchaseInvoiceDTO (value: any) : string {
    return explain(
        [
            explainRegularObject(value),
            explainNoOtherKeysInDevelopment(value, [
                'purchaseInvoiceId',
                'invoiceTypeId',
                'purchaseCompanyId',
                'groupId',
                'bankAccountRowId',
                'updated',
                'created',
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
                'documents',
            ])
            , explainProperty("purchaseInvoiceId", explainString(value?.purchaseInvoiceId))
            , explainProperty("invoiceTypeId", explainString(value?.invoiceTypeId))
            , explainProperty("purchaseCompanyId", explainString(value?.purchaseCompanyId))
            , explainProperty("groupId", explainString(value?.groupId))
            , explainProperty("bankAccountRowId", explainString(value?.bankAccountRowId))
            , explainProperty("updated", explainString(value?.updated))
            , explainProperty("created", explainString(value?.created))
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
            , explainProperty("documents", explainArrayOf<DocumentDTO>("DocumentDTO", explainDocumentDTO, value?.documents, isDocumentDTO))
        ]
    );
}

export function isPurchaseInvoiceDTOOrUndefined (value: unknown) : value is PurchaseInvoiceDTO | undefined {
    return isUndefined(value) || isPurchaseInvoiceDTO(value);
}

export function explainPurchaseInvoiceDTOOrUndefined (value: any) : string {
    return isPurchaseInvoiceDTOOrUndefined(value) ? explainOk() : explainNot('PurchaseInvoiceDTO | undefined');
}

export function parsePurchaseInvoiceDTO (value: any): PurchaseInvoiceDTO | undefined {
    if ( isPurchaseInvoiceDTO(value) ) return value;
    return undefined;
}
