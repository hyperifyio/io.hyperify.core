// Copyright (c) 2024. Heusala Group Oy <info@heusalagroup.fi>. All rights reserved.

import {
    explain,
    explainNot,
    explainOk,
    explainOr,
    explainProperty,
} from "../../types/explain";
import {
    explainNumberOrUndefined,
    isNumberOrUndefined,
} from "../../types/Number";
import {
    explainNoOtherKeysInDevelopment,
    hasNoOtherKeysInDevelopment,
} from "../../types/OtherKeys";
import {
    explainRegularObject,
    isRegularObject,
} from "../../types/RegularObject";
import {
    explainStringOrUndefined,
    isStringOrUndefined,
} from "../../types/String";
import { isUndefined } from "../../types/undefined";

/**
 * @see https://developers.facebook.com/docs/graph-api/results/
 */
export interface FacebookCursorsDTO {
    readonly after    ?: string;
    readonly before   ?: string;
    readonly limit    ?: number;
}

export function isFacebookCursorsDTO (value: unknown) : value is FacebookCursorsDTO {
    return (
        isRegularObject(value)
        && hasNoOtherKeysInDevelopment(value, [
            'after',
            'before',
            'limit',
        ])
        && isStringOrUndefined(value?.after)
        && isStringOrUndefined(value?.before)
        && isNumberOrUndefined(value?.limit)
    );
}

export function explainFacebookCursorsDTO (value: any) : string {
    return explain(
        [
            explainRegularObject(value),
            explainNoOtherKeysInDevelopment(value, [
                'after',
                'before',
                'limit',
            ])
            , explainProperty("after", explainStringOrUndefined(value?.after))
            , explainProperty("before", explainStringOrUndefined(value?.before))
            , explainProperty("limit", explainNumberOrUndefined(value?.limit))
        ]
    );
}

export function stringifyFacebookCursorsDTO (value : FacebookCursorsDTO) : string {
    return `FacebookCursorsDTO(${value})`;
}

export function parseFacebookCursorsDTO (value: unknown) : FacebookCursorsDTO | undefined {
    if (isFacebookCursorsDTO(value)) return value;
    return undefined;
}

export function isFacebookCursorsDTOOrUndefined (value: unknown): value is FacebookCursorsDTO | undefined {
    return isUndefined(value) || isFacebookCursorsDTO(value);
}

export function explainFacebookCursorsDTOOrUndefined (value: unknown): string {
    return isFacebookCursorsDTOOrUndefined(value) ? explainOk() : explainNot(explainOr(['FacebookCursorsDTO', 'undefined']));
}
