// Copyright (c) 2024. Heusala Group Oy <info@heusalagroup.fi>. All rights reserved.

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
    explainStringOrUndefined,
    isStringOrUndefined,
} from "../../types/String";
import { isUndefined } from "../../types/undefined";
import {
    explainFacebookCursorsDTOOrUndefined,
    FacebookCursorsDTO,
    isFacebookCursorsDTOOrUndefined,
} from "./FacebookCursorsDTO";

/**
 * @see https://developers.facebook.com/docs/graph-api/results/
 */
export interface FacebookPagingDTO {
    readonly cursors  ?: FacebookCursorsDTO;
    readonly next     ?: string;
    readonly previous ?: string;
}

export function isFacebookPagingDTO (value: unknown) : value is FacebookPagingDTO {
    return (
        isRegularObject(value)
        && hasNoOtherKeysInDevelopment(value, [
            'cursors',
            'next',
            'previous',
        ])
        && isFacebookCursorsDTOOrUndefined(value?.cursors)
        && isStringOrUndefined(value?.next)
        && isStringOrUndefined(value?.previous)
    );
}

export function explainFacebookPagingDTO (value: any) : string {
    return explain(
        [
            explainRegularObject(value),
            explainNoOtherKeysInDevelopment(value, [
                'cursors',
                'next',
                'previous',
            ])
            , explainProperty("cursors", explainFacebookCursorsDTOOrUndefined(value?.cursors))
            , explainProperty("next", explainStringOrUndefined(value?.next))
            , explainProperty("previous", explainStringOrUndefined(value?.previous))
        ]
    );
}

export function stringifyFacebookPagingDTO (value : FacebookPagingDTO) : string {
    return `FacebookPagingDTO(${value})`;
}

export function parseFacebookPagingDTO (value: unknown) : FacebookPagingDTO | undefined {
    if (isFacebookPagingDTO(value)) return value;
    return undefined;
}

export function isFacebookPagingDTOOrUndefined (value: unknown): value is FacebookPagingDTO | undefined {
    return isUndefined(value) || isFacebookPagingDTO(value);
}

export function explainFacebookPagingDTOOrUndefined (value: unknown): string {
    return isFacebookPagingDTOOrUndefined(value) ? explainOk() : explainNot(explainOr(['FacebookPagingDTO', 'undefined']));
}
