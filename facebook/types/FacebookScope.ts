// Copyright (c) 2024. Heusala Group Oy <info@heusalagroup.fi>. All rights reserved.

import {
    explainEnum,
    isEnum,
    parseEnum,
    stringifyEnum,
} from "../../types/Enum";
import {
    explainNot,
    explainOk,
    explainOr,
} from "../../types/explain";
import { isUndefined } from "../../types/undefined";

export enum FacebookScope {
    pages_manage_engagement = "pages_manage_engagement",
    pages_manage_posts      = "pages_manage_posts",
    pages_manage_metadata   = "pages_manage_metadata",
    pages_read_engagement   = "pages_read_engagement",
    pages_show_list         = "pages_show_list",
    ads_management          = "ads_management",
    ads_read                = "ads_read",
}

export function isFacebookScope (value: unknown) : value is FacebookScope {
    return isEnum(FacebookScope, value);
}

export function explainFacebookScope (value : unknown) : string {
    return explainEnum("FacebookScope", FacebookScope, isFacebookScope, value);
}

export function stringifyFacebookScope (value : FacebookScope) : string {
    return stringifyEnum(FacebookScope, value);
}

export function parseFacebookScope (value: any) : FacebookScope | undefined {
    return parseEnum(FacebookScope, value) as FacebookScope | undefined;
}

export function isFacebookScopeOrUndefined (value: unknown): value is FacebookScope | undefined {
    return isUndefined(value) || isFacebookScope(value);
}

export function explainFacebookScopeOrUndefined (value: unknown): string {
    return isFacebookScopeOrUndefined(value) ? explainOk() : explainNot(explainOr(['FacebookScope', 'undefined']));
}
