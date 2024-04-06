// Copyright (c) 2024. Heusala Group Oy <info@heusalagroup.fi>. All rights reserved.

import {
    explainArrayOf,
    isArrayOf,
} from "../../types/Array";
import {
    explain,
    explainNot,
    explainOk,
    explainOr,
    explainProperty,
} from "../../types/explain";
import {
    explainNoOtherKeysInDevelopment,
    hasNoOtherKeysInDevelopment,
} from "../../types/OtherKeys";
import {
    explainRegularObject,
    isRegularObject,
} from "../../types/RegularObject";
import {
    explainString,
    isString,
} from "../../types/String";
import { isUndefined } from "../../types/undefined";

/**
 * @see https://developers.facebook.com/docs/graph-api/reference/page-category/
 */
export interface FacebookPageCategory {
    readonly id: string;
    readonly api_enum: string;
    readonly fb_page_categories: readonly FacebookPageCategory[];
    readonly name: string;
}

export function createFacebookPageCategory (
    id : string,
    api_enum : string,
    fb_page_categories : readonly FacebookPageCategory[],
    name : string,
) : FacebookPageCategory {
    return {
        id,
        api_enum,
        fb_page_categories,
        name,
    };
}

export function isFacebookPageCategory (value: unknown) : value is FacebookPageCategory {
    return (
        isRegularObject(value)
        && hasNoOtherKeysInDevelopment(value, [
            'id',
            'api_enum',
            'fb_page_categories',
            'name',
        ])
        && isString(value?.id)
        && isString(value?.api_enum)
        && isArrayOf<FacebookPageCategory>(value?.fb_page_categories, isFacebookPageCategory)
        && isString(value?.name)
    );
}

export function explainFacebookPageCategory (value: any) : string {
    return explain(
        [
            explainRegularObject(value),
            explainNoOtherKeysInDevelopment(value, [
                'id',
                'api_enum',
                'fb_page_categories',
                'name',
            ])
            , explainProperty("id", explainString(value?.id))
            , explainProperty("api_enum", explainString(value?.api_enum))
            , explainProperty("fb_page_categories", explainArrayOf<FacebookPageCategory>("FacebookPageCategory", explainFacebookPageCategory, value?.fb_page_categories, isFacebookPageCategory))
            , explainProperty("name", explainString(value?.name))
        ]
    );
}

export function stringifyFacebookPageCategory (value : FacebookPageCategory) : string {
    return `FacebookPageCategory(${value})`;
}

export function parseFacebookPageCategory (value: unknown) : FacebookPageCategory | undefined {
    if (isFacebookPageCategory(value)) return value;
    return undefined;
}

export function isFacebookPageCategoryOrUndefined (value: unknown): value is FacebookPageCategory | undefined {
    return isUndefined(value) || isFacebookPageCategory(value);
}

export function explainFacebookPageCategoryOrUndefined (value: unknown): string {
    return isFacebookPageCategoryOrUndefined(value) ? explainOk() : explainNot(explainOr(['FacebookPageCategory', 'undefined']));
}
