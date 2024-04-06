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

export interface PostFeedResponseDTO {
    readonly id: string;
}

export function createPostFeedResponseDTO (
    id : string
) : PostFeedResponseDTO {
    return {
        id
    };
}

export function isPostFeedResponseDTO (value: unknown) : value is PostFeedResponseDTO {
    return (
        isRegularObject(value)
        && hasNoOtherKeysInDevelopment(value, [
            'id',
        ])
        && isString(value?.id)
    );
}

export function explainPostFeedResponseDTO (value: any) : string {
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

export function stringifyPostFeedResponseDTO (value : PostFeedResponseDTO) : string {
    return `PostFeedResponseDTO(${value})`;
}

export function parsePostFeedResponseDTO (value: unknown) : PostFeedResponseDTO | undefined {
    if (isPostFeedResponseDTO(value)) return value;
    return undefined;
}

export function isPostFeedResponseDTOOrUndefined (value: unknown): value is PostFeedResponseDTO | undefined {
    return isUndefined(value) || isPostFeedResponseDTO(value);
}

export function explainPostFeedResponseDTOOrUndefined (value: unknown): string {
    return isPostFeedResponseDTOOrUndefined(value) ? explainOk() : explainNot(explainOr(['PostFeedResponseDTO', 'undefined']));
}
