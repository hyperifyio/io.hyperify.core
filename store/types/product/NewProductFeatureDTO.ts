// Copyright (c) 2022-2024. Sendanor <info@sendanor.fi>. All rights reserved.

import {
    isReadonlyJsonAny,
    ReadonlyJsonAny,
} from "../../../Json";
import {
    isStringOrUndefined,
} from "../../../types/String";
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
    readonly value           : ReadonlyJsonAny;
    readonly productGroupId ?: string;
}

export function createNewProductFeatureDTO (
    id                : ProductFeatureId,
    category          : ProductFeatureCategory,
    value             : ReadonlyJsonAny,
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
        && isReadonlyJsonAny(value?.value)
    );
}

export function stringifyNewProductFeatureDTO (value: NewProductFeatureDTO): string {
    return `NewProductFeatureDTO(${value})`;
}

export function parseNewProductFeatureDTO (value: any): NewProductFeatureDTO | undefined {
    if ( isNewProductFeatureDTO(value) ) return value;
    return undefined;
}
