// Copyright (c) 2022-2024. Sendanor <info@sendanor.fi>. All rights reserved.

import {
    explainBooleanOrUndefined,
    isBooleanOrUndefined,
} from "../../../types/Boolean";
import { explainProductPriceType, isProductPriceType, ProductPriceType } from "./ProductPriceType";
import { explain, explainProperty } from "../../../types/explain";
import { explainStringOrUndefined, isStringOrUndefined } from "../../../types/String";
import { explainNumber, explainNumberOrUndefined, isNumber, isNumberOrUndefined } from "../../../types/Number";
import { explainRegularObject, isRegularObject } from "../../../types/RegularObject";
import { explainNoOtherKeys, hasNoOtherKeys } from "../../../types/OtherKeys";

/**
 * In the legacy database this will be a row in `product` table.
 *
 * See {@see Product} for `product_group` table!
 */
export interface ProductPrice {

    readonly sum              : number;
    readonly vatPercent       : number;
    readonly type             : ProductPriceType;
    readonly buyUrl          ?: string;
    readonly discountPercent ?: number;
    readonly discountFrom    ?: string;
    readonly discountTo      ?: string;

    /** Must be a number like `1234[.5678]`. In the legacy database it will be stored in the `product`.`number` field which is `decimal(20,10)`. */
    readonly id              ?: string;

    readonly stockSold       ?: number;
    readonly stockAmount     ?: number;
    readonly stockEnabled    ?: boolean;
    readonly onHold          ?: boolean;
    readonly published       ?: boolean;
    readonly expenseSum      ?: number;
}

export function createProductPrice (
    sum              : number,
    vatPercent       : number,
    type             : ProductPriceType,
    buyUrl          ?: string,
    discountPercent ?: number,
    discountFrom    ?: string,
    discountTo      ?: string,
    id              ?: string,
    stockSold       ?: number,
    stockAmount     ?: number,
    stockEnabled    ?: boolean,
    onHold          ?: boolean,
    published       ?: boolean,
    expenseSum      ?: number,
): ProductPrice {
    return {
        type,
        vatPercent,
        buyUrl,
        sum,
        discountPercent,
        discountFrom,
        discountTo,
        id,
        stockSold,
        stockAmount,
        stockEnabled,
        onHold,
        published,
        expenseSum,
    };
}


export function isProductPrice (value: any): value is ProductPrice {
    return (
        isRegularObject(value)
        && hasNoOtherKeys(value, [
            'id',
            'sum',
            'vatPercent',
            'type',
            'discountPercent',
            'discountFrom',
            'discountTo',
            'buyUrl',
            'stockSold',
            'stockAmount',
            'stockEnabled',
            'onHold',
            'published',
            'expenseSum',
        ])
        && isStringOrUndefined(value?.id)
        && isNumber(value?.sum)
        && isNumber(value?.vatPercent)
        && isNumberOrUndefined(value?.discountPercent)
        && isStringOrUndefined(value?.discountFrom)
        && isStringOrUndefined(value?.discountTo)
        && isProductPriceType(value?.type)
        && isStringOrUndefined(value?.buyUrl)
        && isNumberOrUndefined(value?.stockSold)
        && isNumberOrUndefined(value?.stockAmount)
        && isBooleanOrUndefined(value?.stockEnabled)
        && isNumberOrUndefined(value?.expenseSum)
        && isBooleanOrUndefined(value?.onHold)
        && isBooleanOrUndefined(value?.published)
    );
}

export function explainProductPrice (value: any) : string {
    return explain(
        [
            explainRegularObject(value),
            explainNoOtherKeys(value, [
                'id',
                'sum',
                'vatPercent',
                'type',
                'discountPercent',
                'discountFrom',
                'discountTo',
                'buyUrl',
                'stockSold',
                'stockAmount',
                'stockEnabled',
                'onHold',
                'published',
                'expenseSum',
            ]),
            explainProperty("id", explainStringOrUndefined(value?.id)),
            explainProperty("sum", explainNumber(value?.sum)),
            explainProperty("vatPercent", explainNumber(value?.vatPercent)),
            explainProperty("type", explainProductPriceType(value?.type)),
            explainProperty("discountPercent", explainNumberOrUndefined(value?.discountPercent)),
            explainProperty("discountFrom", explainStringOrUndefined(value?.discountFrom)),
            explainProperty("discountTo", explainStringOrUndefined(value?.discountTo)),
            explainProperty("buyUrl", explainStringOrUndefined(value?.buyUrl)),
            explainProperty("stockSold", explainNumberOrUndefined(value?.stockSold)),
            explainProperty("stockAmount", explainNumberOrUndefined(value?.stockAmount)),
            explainProperty("stockEnabled", explainBooleanOrUndefined(value?.stockEnabled)),
            explainProperty("onHold", explainBooleanOrUndefined(value?.onHold)),
            explainProperty("published", explainBooleanOrUndefined(value?.published)),
            explainProperty("expenseSum", explainNumberOrUndefined(value?.expenseSum)),
        ]
    );
}

export function isProductPriceOrUndefined (value: any): value is ProductPrice | undefined {
    return value === undefined || isProductPrice(value);
}

export function stringifyProductPrice (value: ProductPrice): string {
    return `ProductPrice(${value})`;
}

export function parseProductPrice (value: any): ProductPrice | undefined {
    if ( isProductPrice(value) ) return value;
    return undefined;
}
