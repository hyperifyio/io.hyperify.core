// Copyright (c) 2022-2024. Sendanor <info@sendanor.fi>. All rights reserved.

import {
    explainBooleanOrUndefined,
    isBooleanOrUndefined,
} from "../../../types/Boolean";
import { explainProductType, isProductType, ProductType } from "./ProductType";
import { explainProductFeature, isProductFeature, ProductFeature } from "./features/ProductFeature";
import { ProductPrice, isProductPrice, explainProductPrice } from "./ProductPrice";
import { explain, explainProperty } from "../../../types/explain";
import { explainString, isString } from "../../../types/String";
import {
    explainNumberOrUndefined,
    isNumberOrUndefined,
} from "../../../types/Number";
import { explainRegularObject, isRegularObject } from "../../../types/RegularObject";
import { explainNoOtherKeys, hasNoOtherKeys } from "../../../types/OtherKeys";
import { explainArrayOf, isArrayOf } from "../../../types/Array";

/**
 * In the legacy database this will be a row in `product_group` table.
 *
 * See {@see ProductPrice} for `product` table!
 */
export interface Product {

    /**
     * This is the `slug` property in the database.
     */
    readonly id              : string;

    readonly type            : ProductType;

    /**
     * This is the `name` property in the database.
     */
    readonly title           : string;

    /**
     * This is the `description` property in the database.
     */
    readonly summary         : string;

    readonly stockSold      ?: number;
    readonly stockAmount    ?: number;
    readonly stockEnabled   ?: boolean;
    readonly onHold         ?: boolean;
    readonly published      ?: boolean;

    /**
     * Prices come from from `product` table, mapped by the `slug` property.
     */
    readonly prices          : readonly ProductPrice[];

    readonly features        : readonly ProductFeature[];

}

export function createProduct (
    id           : string,
    type         : ProductType,
    title        : string,
    summary      : string,
    features     : readonly ProductFeature[],
    prices       : readonly ProductPrice[],
    stockAmount  : number,
    stockEnabled : boolean,
    onHold       : boolean,
    published    : boolean,
) : Product {
    return {
        id,
        type,
        title,
        summary,
        features,
        prices,
        stockAmount,
        stockEnabled,
        onHold,
        published,
    };
}

export function isProduct (value: any): value is Product {
    return (
        isRegularObject(value)
        && hasNoOtherKeys(value, [
            'id',
            'type',
            'title',
            'summary',
            'features',
            'prices',
            'stockSold',
            'stockAmount',
            'stockEnabled',
            'onHold',
            'published',
        ])
        && isString(value?.id)
        && isProductType(value?.type)
        && isString(value?.title)
        && isString(value?.summary)
        && isNumberOrUndefined(value?.stockSold)
        && isNumberOrUndefined(value?.stockAmount)
        && isArrayOf<ProductFeature>(value?.features, isProductFeature)
        && isArrayOf<ProductPrice>(value?.prices, isProductPrice)
        && isBooleanOrUndefined(value?.stockEnabled)
        && isBooleanOrUndefined(value?.onHold)
        && isBooleanOrUndefined(value?.published)
    );
}

export function explainProduct (value: any) : string {
    return explain(
        [
            explainRegularObject(value),
            explainNoOtherKeys(value, [
                'id',
                'type',
                'title',
                'summary',
                'features',
                'prices',
                'stockSold',
                'stockAmount',
                'stockEnabled',
                'onHold',
                'published',
            ]),
            explainProperty("isArrayOf", explainString(value?.isArrayOf)),
            explainProperty("type", explainProductType(value?.type)),
            explainProperty("title", explainString(value?.title)),
            explainProperty("summary", explainString(value?.summary)),
            explainProperty("stockSold", explainNumberOrUndefined(value?.stockSold)),
            explainProperty("stockAmount", explainNumberOrUndefined(value?.stockAmount)),
            explainProperty("features", explainArrayOf<ProductFeature>("ProductFeature", explainProductFeature, value?.features)),
            explainProperty("prices", explainArrayOf<ProductPrice>("ProductPrice", explainProductPrice, value?.prices)),
            explainProperty("stockEnabled", explainBooleanOrUndefined(value?.stockEnabled)),
            explainProperty("onHold", explainBooleanOrUndefined(value?.onHold)),
            explainProperty("published", explainBooleanOrUndefined(value?.published)),
        ]
    );
}

export function isProductOrUndefined (value: any): value is Product | undefined {
    return value === undefined || isProduct(value);
}

export function stringifyProduct (value: Product): string {
    if ( !isProduct(value) ) throw new TypeError(`Not Product: ${value}`);
    return `Product(${value?.id})`;
}

export function parseProduct (value: any): Product | undefined {
    if ( isProduct(value) ) return value;
    return undefined;
}
