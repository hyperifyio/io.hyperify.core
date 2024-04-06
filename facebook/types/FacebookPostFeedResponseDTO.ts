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
    explainString,
    isString,
} from "../../types/String";
import { isUndefined } from "../../types/undefined";

export interface FacebookPostFeedResponseDTO {
    readonly id: string;
}

export function createFacebookPostFeedResponseDTO (
    id : string
) : FacebookPostFeedResponseDTO {
    return {
        id
    };
}

export function isFacebookPostFeedResponseDTO ( value: unknown) : value is FacebookPostFeedResponseDTO {
    return (
        isRegularObject(value)
        && hasNoOtherKeysInDevelopment(value, [
            'id',
        ])
        && isString(value?.id)
    );
}

export function explainFacebookPostFeedResponseDTO ( value: any) : string {
    return explain(
        [
            explainRegularObject(value),
            explainNoOtherKeysInDevelopment(value, [
                'id',
            ])
            , explainProperty("id", explainString(value?.id))
        ]
    );
}

export function stringifyFacebookPostFeedResponseDTO ( value : FacebookPostFeedResponseDTO) : string {
    return `PostFeedResponseDTO(${value})`;
}

export function parseFacebookPostFeedResponseDTO ( value: unknown) : FacebookPostFeedResponseDTO | undefined {
    if (isFacebookPostFeedResponseDTO(value)) return value;
    return undefined;
}

export function isFacebookPostFeedResponseDTOOrUndefined ( value: unknown): value is FacebookPostFeedResponseDTO | undefined {
    return isUndefined(value) || isFacebookPostFeedResponseDTO(value);
}

export function explainFacebookPostFeedResponseDTOOrUndefined ( value: unknown): string {
    return isFacebookPostFeedResponseDTOOrUndefined(value) ? explainOk() : explainNot(explainOr(['PostFeedResponseDTO', 'undefined']));
}
