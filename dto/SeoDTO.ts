// Copyright (c) 2023. Sendanor <info@sendanor.fi>. All rights reserved.

import { explain, explainNot, explainOk, explainOr, explainProperty } from "../types/explain";
import { explainNoOtherKeysInDevelopment, hasNoOtherKeysInDevelopment } from "../types/OtherKeys";
import { explainRegularObject, isRegularObject } from "../types/RegularObject";
import { explainStringOrUndefined, isStringOrUndefined } from "../types/String";
import { isUndefined } from "../types/undefined";
import { DTO } from "./types/DTO";

export interface SeoDTO extends DTO {
    readonly title       ?: string;
    readonly description ?: string;
    readonly siteName    ?: string;
}

export function createSeoDTO (
    title       : string | undefined,
    description : string | undefined,
    siteName    : string | undefined,
) : SeoDTO {
    return {
        ...(title !== undefined ? {title} : {}),
        ...(description !== undefined ? {description} : {}),
        ...(siteName !== undefined ? {siteName} : {}),
    };
}

export function isSeoDTO ( value: unknown) : value is SeoDTO {
    return (
        isRegularObject(value)
        && hasNoOtherKeysInDevelopment(value, [
            'title',
            'description',
            'siteName',
        ])
        && isStringOrUndefined(value?.title)
        && isStringOrUndefined(value?.description)
        && isStringOrUndefined(value?.siteName)
    );
}

export function explainSeoDTO ( value: any) : string {
    return explain(
        [
            explainRegularObject(value),
            explainNoOtherKeysInDevelopment(value, [
                'title',
                'description',
                'siteName',
            ])
            , explainProperty("title", explainStringOrUndefined(value?.title))
            , explainProperty("description", explainStringOrUndefined(value?.description))
            , explainProperty("siteName", explainStringOrUndefined(value?.siteName))
        ]
    );
}

export function stringifySeoDTO ( value : SeoDTO) : string {
    return `SeoDTO(${value})`;
}

export function parseSeoDTO ( value: unknown) : SeoDTO | undefined {
    if (isSeoDTO(value)) return value;
    return undefined;
}

export function isSeoDTOOrUndefined ( value: unknown): value is SeoDTO | undefined {
    return isUndefined(value) || isSeoDTO(value);
}

export function explainSeoDTOOrUndefined ( value: unknown): string {
    return isSeoDTOOrUndefined(value) ? explainOk() : explainNot(explainOr(['SeoDTO', 'undefined']));
}
