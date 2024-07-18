// Copyright (c) 2022-2024. Sendanor <info@sendanor.fi>. All rights reserved.

import { isBoolean } from "../../../types/Boolean";
import {
    isString,
    isStringOrUndefined,
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

export interface NewProductFeatureDTO {
    readonly id              : ProductFeatureId;
    readonly category        : ProductFeatureCategory;
    readonly value           : string | number | boolean;
    readonly productGroupId ?: string;
}

export function createNewProductFeatureDTO (
    id                : ProductFeatureId,
    category          : ProductFeatureCategory,
    value             : string | number | boolean,
    productGroupId    : string | undefined,
): NewProductFeatureDTO {
    return {
        productGroupId,
        id,
        category,
        value,
    };
}

export function isNewProductFeatureDTO (value: any): value is NewProductFeatureDTO {
    return (
        isRegularObject(value)
        && hasNoOtherKeysInDevelopment(value, [
            'productGroupId',
            'id',
            'category',
            'value',
        ])
        && isStringOrUndefined(value?.productGroupId)
        && isProductFeatureId(value?.id)
        && isProductFeatureCategory(value?.category)
        && ( isString(value?.value) || isNumber(value?.value) || isBoolean(value?.value) )
    );
}

export function stringifyNewProductFeatureDTO (value: NewProductFeatureDTO): string {
    return `NewProductFeatureDTO(${value})`;
}

export function parseNewProductFeatureDTO (value: any): NewProductFeatureDTO | undefined {
    if ( isNewProductFeatureDTO(value) ) return value;
    return undefined;
}
