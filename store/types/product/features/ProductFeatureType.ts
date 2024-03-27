// Copyright (c) 2021-2022. Heusala Group Oy <info@heusalagroup.fi>. All rights reserved.

import {
    explainEnum,
    isEnum,
    parseEnum,
    stringifyEnum,
} from "../../../../types/Enum";
import {
    explainNot,
    explainOk,
    explainOr,
} from "../../../../types/explain";
import { isUndefined } from "../../../../types/undefined";

export enum ProductFeatureType {
    OTHER            = "OTHER",
    SHELL            = "SHELL",
    SHELL_SERVER     = "SHELL_SERVER",
    EMAIL            = "EMAIL",
    EMAIL_SERVER     = "EMAIL_SERVER",
    WEB_SERVER       = "WEB_SERVER",
    PHYSICAL_PRODUCT = "PHYSICAL_PRODUCT",
    VIRTUAL_SERVER   = "VIRTUAL_SERVER",
    SERVER           = "SERVER",
    CABLE            = "CABLE",
    DOMAIN           = "DOMAIN"
}

export function isProductFeatureType (value: unknown) : value is ProductFeatureType {
    return isEnum(ProductFeatureType, value);
}

export function explainProductFeatureType (value : unknown) : string {
    return explainEnum("ProductFeatureType", ProductFeatureType, isProductFeatureType, value);
}

export function stringifyProductFeatureType (value : ProductFeatureType) : string {
    return stringifyEnum(ProductFeatureType, value);
}

export function parseProductFeatureType (value: any) : ProductFeatureType | undefined {
    return parseEnum(ProductFeatureType, value) as ProductFeatureType | undefined;
}

export function isProductFeatureTypeOrUndefined (value: unknown): value is ProductFeatureType | undefined {
    return isUndefined(value) || isProductFeatureType(value);
}

export function explainProductFeatureTypeOrUndefined (value: unknown): string {
    return isProductFeatureTypeOrUndefined(value) ? explainOk() : explainNot(explainOr(['ProductFeatureType', 'undefined']));
}
