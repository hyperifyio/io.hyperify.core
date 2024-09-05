// Copyright (c) 2022-2024. Sendanor <info@sendanor.fi>. All rights reserved.

import {
    explainArrayOf,
    isArrayOf,
} from "../../../types/Array";
import {
    explainBooleanOrUndefined,
    isBooleanOrUndefined,
} from "../../../types/Boolean";
import {
    explain,
    explainProperty,
} from "../../../types/explain";
import {
    explainNumberOrUndefined,
    isNumberOrUndefined,
} from "../../../types/Number";
import {
    explainNoOtherKeys,
    hasNoOtherKeys,
} from "../../../types/OtherKeys";
import {
    explainRegularObject,
    isRegularObject,
} from "../../../types/RegularObject";
import {
    explainString,
    explainStringOrUndefined,
    isString,
    isStringOrUndefined,
} from "../../../types/String";
import {
    explainProductFeature,
    isProductFeature,
    ProductFeature,
} from "./features/ProductFeature";
import {
    explainProductPrice,
    isProductPrice,
    ProductPrice,
} from "./ProductPrice";
import {
    explainProductType,
    isProductType,
    ProductType,
} from "./ProductType";

/**
 * In the legacy database this will be a row in `product_group` table.
 *
 * See also {@see ProductPrice} for `product` table!
 */
export interface Product {

    /**
     * Repository property: `product_group.slug`
     */
    readonly id              : string;

    /**
     * Repository property: `product_group.type`
     */
    readonly type            : ProductType;

    /**
     * Repository property: `product_group.name`
     */
    readonly title           : string;

    /**
     * Repository property: `product_group.description`
     */
    readonly summary         : string;

    /**
     * Repository property: `product_group.stockSold`
     */
    readonly stockSold      ?: number;

    /**
     * Repository property: `product_group.stockAmount`
     */
    readonly stockAmount    ?: number;

    /**
     * Repository property: `product_group.stockEnabled`
     */
    readonly stockEnabled   ?: boolean;

    /**
     * Repository property: `product_group.onHold`
     */
    readonly onHold         ?: boolean;

    /**
     * Repository property: `product_group.published`
     */
    readonly published      ?: boolean;

    /**
     * Repository property: `product_group.productGroupId`
     */
    readonly productGroupId ?: string;

    /**
     * Repository property: `product_group.updated`
     */
    readonly updated ?: string;

    /**
     * Repository property: `product_group.creation`
     */
    readonly created ?: string;

    /**
     * Prices come from from `product` table, mapped by the `slug` property.
     */
    readonly prices          : readonly ProductPrice[];

    readonly features        : readonly ProductFeature[];

    /**
     * Repository property: `product_group.order`
     */
    readonly order           ?: number;

}

export function createProduct (
    id           : string,
    type         : ProductType,
    title        : string,
    summary      : string,
    features     : readonly ProductFeature[],
    prices       : readonly ProductPrice[],
    stockSold    : number,
    stockAmount  : number,
    stockEnabled : boolean,
    onHold       : boolean,
    published    : boolean,
    productGroupId ?: string | undefined,
    created        ?: string | undefined,
    updated        ?: string | undefined,
    order          ?: number | undefined,
) : Product {
    return {
        stockAmount,
        stockEnabled,
        onHold,
        published,
        id,
        type,
        title,
        summary,
        prices,
        features,
        stockSold,
        productGroupId,
        created,
        updated,
        order,
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
            'productGroupId',
            'updated',
            'created',
            'order',
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
        && isStringOrUndefined(value?.productGroupId)
        && isStringOrUndefined(value?.created)
        && isStringOrUndefined(value?.updated)
        && isNumberOrUndefined(value?.order)
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
                'productGroupId',
                'updated',
                'created',
                'order',
            ]),
            explainProperty("id", explainString(value?.id)),
            explainProperty("type", explainProductType(value?.type)),
            explainProperty("title", explainString(value?.title)),
            explainProperty("summary", explainString(value?.summary)),
            explainProperty("stockSold", explainNumberOrUndefined(value?.stockSold)),
            explainProperty("stockAmount", explainNumberOrUndefined(value?.stockAmount)),
            explainProperty("features", explainArrayOf<ProductFeature>("ProductFeature", explainProductFeature, value?.features, isProductFeature)),
            explainProperty("prices", explainArrayOf<ProductPrice>("ProductPrice", explainProductPrice, value?.prices, isProductPrice)),
            explainProperty("stockEnabled", explainBooleanOrUndefined(value?.stockEnabled)),
            explainProperty("onHold", explainBooleanOrUndefined(value?.onHold)),
            explainProperty("published", explainBooleanOrUndefined(value?.published)),
            explainProperty("productGroupId", explainStringOrUndefined(value?.productGroupId)),
            explainProperty("updated", explainStringOrUndefined(value?.updated)),
            explainProperty("created", explainStringOrUndefined(value?.created)),
            explainProperty("order", explainNumberOrUndefined(value?.order)),
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
