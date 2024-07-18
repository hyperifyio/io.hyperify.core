// Copyright (c) 2022. Heusala Group Oy <info@heusalagroup.fi>. All rights reserved.

import { explainProductFeatureCategory, isProductFeatureCategory, ProductFeatureCategory } from "./ProductFeatureCategory";
import { explainProductFeatureId, isProductFeatureId, ProductFeatureId } from "./ProductFeatureId";
import { explain, explainOr, explainProperty } from "../../../../types/explain";
import { isBoolean, explainBoolean } from "../../../../types/Boolean";
import {
    explainString,
    explainStringOrUndefined,
    isString,
    isStringOrUndefined,
} from "../../../../types/String";
import { explainNumber, isNumber } from "../../../../types/Number";
import { explainRegularObject, isRegularObject } from "../../../../types/RegularObject";
import { explainNoOtherKeys, hasNoOtherKeys } from "../../../../types/OtherKeys";

export interface ProductFeature {

    readonly id       : ProductFeatureId;
    readonly category : ProductFeatureCategory;
    readonly value    : string | number | boolean;

    readonly productFeatureId ?: string;
    readonly productGroupId   ?: string;
    readonly updated          ?: string;
    readonly created          ?: string;

}

export function createProductFeature (
    id       : ProductFeatureId,
    category : ProductFeatureCategory,
    value    : string | number | boolean,
    productFeatureId ?: string,
    productGroupId   ?: string,
    updated          ?: string,
    created          ?: string,
) : ProductFeature {
    return {
        id,
        category,
        value,
        productFeatureId,
        productGroupId,
        updated,
        created,
    };
}

export function isProductFeature (value: any): value is ProductFeature {
    return (
        isRegularObject(value)
        && hasNoOtherKeys(value, [
            'id',
            'category',
            'value',
            'productFeatureId',
            'productGroupId',
            'updated',
            'created',
        ])
        && isStringOrUndefined(value?.productFeatureId)
        && isStringOrUndefined(value?.productGroupId)
        && isStringOrUndefined(value?.updated)
        && isStringOrUndefined(value?.created)
        && isProductFeatureId(value?.id)
        && isProductFeatureCategory(value?.category)
        && ( isString(value?.value) || isNumber(value?.value) || isBoolean(value?.value) )
    );
}

export function explainProductFeature (value: any) : string {
    return explain(
        [
            explainRegularObject(value),
            explainNoOtherKeys(value, [
                'id',
                'category',
                'value',
                'productFeatureId',
                'productGroupId',
                'updated',
                'created',
            ]),
            explainProperty("productFeatureId", explainStringOrUndefined(value?.productFeatureId)),
            explainProperty("productGroupId", explainStringOrUndefined(value?.productGroupId)),
            explainProperty("updated", explainStringOrUndefined(value?.updated)),
            explainProperty("created", explainStringOrUndefined(value?.created)),
            explainProperty("id", explainProductFeatureId(value?.id)),
            explainProperty("category", explainProductFeatureCategory(value?.category)),
            explainProperty(
                "value",
                explainOr(
                    [
                        explainString(value?.value),
                        explainNumber(value?.value),
                        explainBoolean(value?.value),
                    ]
                )
            )
        ]
    );
}


export function stringifyProductFeature (value: ProductFeature): string {
    if ( !isProductFeature(value) ) throw new TypeError(
        `Not ProductFeature: ${value}`);
    return `ProductFeature(${value})`;
}

export function parseProductFeature (value: any): ProductFeature | undefined {
    if ( isProductFeature(value) ) return value;
    return undefined;
}
