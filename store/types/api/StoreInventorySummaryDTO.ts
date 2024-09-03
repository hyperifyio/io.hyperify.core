// Copyright (c) 2024. Sendanor <info@sendanor.fi>. All rights reserved.

import {
    explainBoolean,
    isBoolean,
} from "../../../types/Boolean";
import {
    explain,
    explainNot,
    explainOk,
    explainOr,
    explainProperty,
} from "../../../types/explain";
import {
    explainNumber,
    isNumber,
} from "../../../types/Number";
import {
    explainNoOtherKeysInDevelopment,
    hasNoOtherKeysInDevelopment,
} from "../../../types/OtherKeys";
import {
    explainRegularObject,
    isRegularObject,
} from "../../../types/RegularObject";
import {
    explainString,
    isString,
} from "../../../types/String";
import { isUndefined } from "../../../types/undefined";

export interface StoreInventorySummaryDTO {
    readonly id          : string;
    readonly date        : string;
    readonly months      : number;
    readonly summary     : string;
    readonly sum         : number;
    readonly isRecurring : boolean;
    readonly productId   : string;
    readonly productType : string;
}

export function createStoreInventorySummaryDTO (
    id : string,
    date : string,
    months : number,
    summary : string,
    sum : number,
    isRecurring : boolean,
    productId : string,
    productType : string,
) : StoreInventorySummaryDTO {
    return {
        id,
        date,
        months,
        summary,
        sum,
        isRecurring,
        productId,
        productType,
    };
}

export function isStoreInventorySummaryDTO (value: unknown) : value is StoreInventorySummaryDTO {
    return (
        isRegularObject(value)
        && hasNoOtherKeysInDevelopment(value, [
            'id',
            'date',
            'months',
            'summary',
            'sum',
            'isRecurring',
            'productId',
            'productType',
        ])
        && isString(value?.id)
        && isString(value?.date)
        && isNumber(value?.months)
        && isString(value?.summary)
        && isNumber(value?.sum)
        && isBoolean(value?.isRecurring)
        && isString(value?.productId)
        && isString(value?.productType)
    );
}

export function explainStoreInventorySummaryDTO (value: any) : string {
    return explain(
        [
            explainRegularObject(value),
            explainNoOtherKeysInDevelopment(value, [
                'id',
                'date',
                'months',
                'summary',
                'sum',
                'isRecurring',
                'productId',
                'productType',
            ])
            , explainProperty("id", explainString(value?.id))
            , explainProperty("date", explainString(value?.date))
            , explainProperty("months", explainNumber(value?.months))
            , explainProperty("summary", explainString(value?.summary))
            , explainProperty("sum", explainNumber(value?.sum))
            , explainProperty("isRecurring", explainBoolean(value?.isRecurring))
            , explainProperty("productId", explainString(value?.productId))
            , explainProperty("productType", explainString(value?.productType))
        ]
    );
}

export function stringifyStoreInventorySummaryDTO (value : StoreInventorySummaryDTO) : string {
    return `StoreInventorySummaryDTO(${value})`;
}

export function parseStoreInventorySummaryDTO (value: unknown) : StoreInventorySummaryDTO | undefined {
    if (isStoreInventorySummaryDTO(value)) return value;
    return undefined;
}

export function isStoreInventorySummaryDTOOrUndefined (value: unknown): value is StoreInventorySummaryDTO | undefined {
    return isUndefined(value) || isStoreInventorySummaryDTO(value);
}

export function explainStoreInventorySummaryDTOOrUndefined (value: unknown): string {
    return isStoreInventorySummaryDTOOrUndefined(value) ? explainOk() : explainNot(explainOr(['StoreInventorySummaryDTO', 'undefined']));
}
