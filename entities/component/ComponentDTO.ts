// Copyright (c) 2023. Sendanor <info@sendanor.fi>. All rights reserved.

import { explainReadonlyJsonObjectOrUndefined, isReadonlyJsonObjectOrUndefined, ReadonlyJsonObject } from "../../Json";
import {
    explainArrayOf,
    isArrayOf,
} from "../../types/Array";
import { explain, explainNot, explainOk, explainOr, explainProperty } from "../../types/explain";
import { explainNoOtherKeysInDevelopment, hasNoOtherKeysInDevelopment } from "../../types/OtherKeys";
import { explainRegularObject, isRegularObject } from "../../types/RegularObject";
import {
    explainString,
    explainStringOrUndefined,
    isString,
    isStringOrUndefined,
    prefixLines,
} from "../../types/String";
import { isUndefined } from "../../types/undefined";
import { ExtendableDTO } from "../types/ExtendableDTO";
import { explainStyleDTOOrUndefined, StyleDTO, isStyleDTOOrUndefined } from "../style/StyleDTO";
import { DTOWithContent } from "../types/DTOWithContent";
import { DTOWithOptionalExtend } from "../types/DTOWithOptionalExtend";
import { DTOWithName } from "../types/DTOWithName";

export type ComponentContent = readonly (string|ComponentDTO)[];

export function isComponentContent ( value: unknown) : value is ComponentContent {
    return isArrayOf<string|ComponentDTO>(value, isStringOrComponentDTO);
}

export function explainComponentContent (value: any) : string {
    return isComponentContent(value) ? explainOk() : explainNot(
        `Array<string|ComponentDTO>(\n${prefixLines(explainArrayOf<string|ComponentDTO>(
            "string|ComponentDTO",
            explainStringOrComponentDTO,
            value,
            isStringOrComponentDTO
        ), '  ')}\n)`
    );

}

export function isComponentContentOrUndefined ( value: unknown) : value is ComponentContent | undefined {
    return isUndefined(value) || isComponentContent(value);
}

export function explainComponentContentOrUndefined ( value: unknown): string {
    return isComponentContentOrUndefined(value) ? explainOk() : explainNot(explainOr([
        `ComponentContent (\n${prefixLines(explainComponentContent(value), '  ')}\n)`,
        'undefined'
    ]));
}

export interface ComponentDTO
    extends
        DTOWithName,
        DTOWithOptionalExtend,
        DTOWithContent<ComponentDTO>,
        ExtendableDTO
{
    readonly name     : string;
    readonly content  : ComponentContent;
    readonly extend  ?: string;
    readonly meta    ?: ReadonlyJsonObject;
    readonly style   ?: StyleDTO;
}

export function createComponentDTO (
    name      : string,
    extend    : string | undefined,
    content   : ComponentContent,
    meta      : ReadonlyJsonObject | undefined,
    style     : StyleDTO | undefined,
) : ComponentDTO {
    return {
        name,
        content,
        ...(extend !== undefined ? {extend} : {}),
        ...(meta !== undefined ? {meta} : {}),
        ...(style !== undefined ? {style} : {}),
    };
}

export function isComponentDTO ( value: unknown) : value is ComponentDTO {
    return (
        isRegularObject(value)
        && hasNoOtherKeysInDevelopment(value, [
            'name',
            'extend',
            'content',
            'meta',
            'style',
        ])
        && isString(value?.name)
        && isStringOrUndefined(value?.extend)
        && isComponentContentOrUndefined(value?.content)
        && isReadonlyJsonObjectOrUndefined(value?.meta)
        && isStyleDTOOrUndefined(value?.style)
    );
}

export function explainComponentDTO (value: any) : string {
    return explain(
        [
            explainRegularObject(value),
            explainNoOtherKeysInDevelopment(value, [
                'name',
                'extend',
                'content',
                'meta',
                'style',
            ])
            , explainProperty("name", explainString(value?.name))
            , explainProperty("extend", explainStringOrUndefined(value?.extend))
            , explainProperty("content", explainComponentContentOrUndefined(value?.content))
            , explainProperty("meta", explainReadonlyJsonObjectOrUndefined(value?.meta))
            , explainProperty("style", explainStyleDTOOrUndefined(value?.style))
        ]
    );
}

export function stringifyComponentDTO (value : ComponentDTO) : string {
    return `ComponentDTO(${value})`;
}

export function parseComponentDTO (value: unknown) : ComponentDTO | undefined {
    if (isComponentDTO(value)) return value;
    return undefined;
}

export function isComponentDTOOrUndefined (value: unknown): value is ComponentDTO | undefined {
    return isUndefined(value) || isComponentDTO(value);
}

export function explainComponentDTOOrUndefined (value: unknown): string {
    return isComponentDTOOrUndefined(value) ? explainOk() : explainNot(explainOr([
        `ComponentDTO (\n${prefixLines(explainComponentDTO(value), '  ')}\n)`,
        'undefined'
    ]));
}

export type StringOrComponentDTO = string | ComponentContent;

export function isStringOrComponentDTO (value: unknown) : value is StringOrComponentDTO {
    return (
        isString(value)
        || isComponentDTO(value)
    );
}

export function explainStringOrComponentDTO (value: unknown): string {
    return (
        isStringOrComponentDTO(value)
            ? explainOk()
            : explainNot(explainOr([
                `ComponentDTO (\n${prefixLines(explainComponentDTO(value), '  ')}\n)`,
                'string'
            ]))
    );
}

export function isComponentDTOOrString (value: unknown): value is StringOrComponentDTO {
    return isStringOrComponentDTO(value);
}

export function explainComponentDTOOrString (value: unknown): string {
    return explainStringOrComponentDTO(value);
}
