// Copyright (c) 2021-2024. Heusala Group Oy <info@heusalagroup.fi>. All rights reserved.

import {
    explainEnum,
    isEnum,
    parseEnum,
    stringifyEnum,
} from "../../../types/Enum";
import { explainNot, explainOk, explainOr } from "../../../types/explain";
import { isUndefined } from "../../../types/undefined";

export enum ProductType {
    PHOTO                = "PHOTO",
    PREMIUM_DOMAIN       = "PREMIUM_DOMAIN",
    VIRTUAL_SERVER       = "VIRTUAL_SERVER",
    VIRTUAL_SERVER_EXTRA = "VIRTUAL_SERVER_EXTRA",
    WEB_HOTEL_EXTRA      = "WEB_HOTEL_EXTRA",
    EMAIL_EXTRA          = "EMAIL_EXTRA",
    SHELL_EXTRA          = "SHELL_EXTRA",
    ATLAS                = "ATLAS",
    ATLAS_EXTRA          = "ATLAS_EXTRA",
    WEB_HOTEL            = "WEB_HOTEL",
    DOMAIN_TRANSFER      = "DOMAIN_TRANSFER",
    DOMAIN               = "DOMAIN",
    EMAIL                = "EMAIL",
    SHELL                = "SHELL",
    DATABASE             = "DATABASE",
    WP                   = "WP",
    NET                  = "NET",
    WEBRTC               = "WEBRTC",
    STOCK                = "STOCK",
    OUTLET               = "OUTLET",
}

export function isProductType (value: unknown) : value is ProductType {
    return isEnum(ProductType, value);
}

export function explainProductType (value : unknown) : string {
    return explainEnum("ProductType", ProductType, isProductType, value);
}

export function stringifyProductType (value : ProductType) : string {
    return stringifyEnum(ProductType, value);
}

export function parseProductType (value: any) : ProductType | undefined {
    return parseEnum(ProductType, value) as ProductType | undefined;
}

export function isProductTypeOrUndefined (value: unknown): value is ProductType | undefined {
    return isUndefined(value) || isProductType(value);
}

export function explainProductTypeOrUndefined (value: unknown): string {
    return isProductTypeOrUndefined(value) ? explainOk() : explainNot(explainOr(['ProductType', 'undefined']));
}
