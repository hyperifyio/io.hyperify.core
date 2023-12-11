// Copyright (c) 2023. Heusala Group Oy <info@heusalagroup.fi>. All rights reserved.

import { explain, explainNot, explainOk, explainOr, explainProperty } from "../types/explain";
import { explainNoOtherKeysInDevelopment, hasNoOtherKeysInDevelopment } from "../types/OtherKeys";
import { explainRegularObject, isRegularObject } from "../types/RegularObject";
import { explainString, isString } from "../types/String";
import { isUndefined } from "../types/undefined";
import { DTO } from "./types/DTO";

export interface BackgroundImageDTO extends DTO {
    readonly url: string;
}

export function createBackgroundImageDTO (
    url : string,
) : BackgroundImageDTO {
    return {
        url,
    };
}

export function isBackgroundImageDTO (value: unknown) : value is BackgroundImageDTO {
    return (
        isRegularObject(value)
        && hasNoOtherKeysInDevelopment(value, [
            'url',
        ])
        && isString(value?.url)
    );
}

export function explainBackgroundImageDTO (value: any) : string {
    return explain(
        [
            explainRegularObject(value),
            explainNoOtherKeysInDevelopment(value, [
                'url',
            ])
            , explainProperty("url", explainString(value?.url))
        ]
    );
}

export function stringifyBackgroundImageDTO (value : BackgroundImageDTO) : string {
    return `BackgroundImageDTO(${value})`;
}

export function parseBackgroundImageDTO (value: unknown) : BackgroundImageDTO | undefined {
    if (isBackgroundImageDTO(value)) return value;
    return undefined;
}

export function isBackgroundImageDTOOrUndefined (value: unknown): value is BackgroundImageDTO | undefined {
    return isUndefined(value) || isBackgroundImageDTO(value);
}

export function explainBackgroundImageDTOOrUndefined (value: unknown): string {
    return isBackgroundImageDTOOrUndefined(value) ? explainOk() : explainNot(explainOr(['BackgroundImageDTO', 'undefined']));
}
