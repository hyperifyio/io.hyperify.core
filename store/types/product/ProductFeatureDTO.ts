// Copyright (c) 2022-2024. Sendanor <info@sendanor.fi>. All rights reserved.

import { isBoolean } from "../../../types/Boolean";
import {
    isString,
} from "../../../types/String";
import { isNumber } from "../../../types/Number";
import { isRegularObject } from "../../../types/RegularObject";
import { hasNoOtherKeysInDevelopment } from "../../../types/OtherKeys";
import {
    isProductFeatureCategory,
    ProductFeatureCategory,
} from "./features/ProductFeatureCategory";
import {
    isProductFeatureId,
    ProductFeatureId,
} from "./features/ProductFeatureId";

export interface ProductFeatureDTO {
    readonly productFeatureId : string;
    readonly productGroupId   : string;
    readonly updated          : string;
    readonly created          : string;
    readonly id               : ProductFeatureId;
    readonly category         : ProductFeatureCategory;
    readonly value            : string | number | boolean;
}

export function createProductFeatureDTO (
    productFeatureId  : string,
    productGroupId    : string,
    updated           : string,
    created           : string,
    id                : ProductFeatureId,
    category          : ProductFeatureCategory,
    value             : string | number | boolean,
): ProductFeatureDTO {
    return {
        productFeatureId,
        productGroupId,
        updated,
        created,
        id,
        category,
        value,
    };
}

export function isProductFeatureDTO (value: any): value is ProductFeatureDTO {
    return (
        isRegularObject(value)
        && hasNoOtherKeysInDevelopment(value, [
            'productFeatureId',
            'productGroupId',
            'updated',
            'created',
            'productGroupId',
            'id',
            'category',
            'value',
        ])
        && isString(value?.productFeatureId)
        && isString(value?.productGroupId)
        && isString(value?.updated)
        && isString(value?.created)
        && isProductFeatureId(value?.id)
        && isProductFeatureCategory(value?.category)
        && ( isString(value?.value) || isNumber(value?.value) || isBoolean(value?.value) )
    );
}

export function stringifyProductFeatureDTO (value: ProductFeatureDTO): string {
    return `ProductFeatureDTO(${value})`;
}

export function parseProductFeatureDTO (value: any): ProductFeatureDTO | undefined {
    if ( isProductFeatureDTO(value) ) return value;
    return undefined;
}
