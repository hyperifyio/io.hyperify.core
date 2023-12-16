// Copyright (c) 2023. Sendanor <info@sendanor.fi>. All rights reserved.

import { explain, explainNot, explainOk, explainOr, explainProperty } from "../../types/explain";
import { explainNoOtherKeysInDevelopment, hasNoOtherKeysInDevelopment } from "../../types/OtherKeys";
import { explainRegularObject, isRegularObject } from "../../types/RegularObject";
import { explainString, explainStringOrUndefined, isString, isStringOrUndefined } from "../../types/String";
import { isUndefined } from "../../types/undefined";
import { DTO } from "../types/DTO";
import { ExtendableDTO } from "../types/ExtendableDTO";
import { DTOWithOptionalExtend } from "../types/DTOWithOptionalExtend";
import { DTOWithName } from "../types/DTOWithName";
import { DTOWithOptionalLanguage } from "../types/DTOWithOptionalLanguage";
import { DTOWithOptionalPublicUrl } from "../types/DTOWithOptionalPublicUrl";

export interface RouteDTO
    extends
        DTO,
        DTOWithName,
        DTOWithOptionalExtend,
        DTOWithOptionalPublicUrl,
        DTOWithOptionalLanguage,
        ExtendableDTO
{
    readonly name       : string;
    readonly path       : string;
    readonly extend    ?: string;
    readonly publicUrl ?: string;
    readonly language  ?: string;
    readonly view      ?: string;
    readonly redirect  ?: string;
}

export function createRouteDTO (
    name      : string,
    path      : string,
    extend    : string | undefined,
    publicUrl : string | undefined,
    language  : string | undefined,
    view      : string | undefined,
    redirect  : string | undefined,
) : RouteDTO {
    return {
        name,
        path,
        ...(extend !== undefined ? {extend}: {}),
        ...(publicUrl !== undefined ? {publicUrl}: {}),
        ...(language !== undefined ? {language}: {}),
        ...(view !== undefined ? {view}: {}),
        ...(redirect !== undefined ? {redirect}: {}),
    };
}

export function isRouteDTO ( value: unknown) : value is RouteDTO {
    return (
        isRegularObject(value)
        && hasNoOtherKeysInDevelopment(value, [
            'name',
            'path',
            'extend',
            'publicUrl',
            'language',
            'view',
            'redirect',
        ])
        && isString(value?.name)
        && isString(value?.path)
        && isStringOrUndefined(value?.extend)
        && isStringOrUndefined(value?.publicUrl)
        && isStringOrUndefined(value?.language)
        && isStringOrUndefined(value?.view)
        && isStringOrUndefined(value?.redirect)
    );
}

export function explainRouteDTO ( value: any) : string {
    return explain(
        [
            explainRegularObject(value),
            explainNoOtherKeysInDevelopment(value, [
                'name',
                'path',
                'extend',
                'publicUrl',
                'language',
                'view',
                'redirect',
            ])
            , explainProperty("name", explainString(value?.name))
            , explainProperty("path", explainString(value?.path))
            , explainProperty("extend", explainStringOrUndefined(value?.extend))
            , explainProperty("publicUrl", explainStringOrUndefined(value?.publicUrl))
            , explainProperty("language", explainStringOrUndefined(value?.language))
            , explainProperty("view", explainStringOrUndefined(value?.view))
            , explainProperty("redirect", explainStringOrUndefined(value?.redirect))
        ]
    );
}

export function stringifyRouteDTO ( value : RouteDTO) : string {
    return `RouteDTO(${value})`;
}

export function parseRouteDTO ( value: unknown) : RouteDTO | undefined {
    if (isRouteDTO(value)) return value;
    return undefined;
}

export function isRouteDTOOrUndefined ( value: unknown): value is RouteDTO | undefined {
    return isUndefined(value) || isRouteDTO(value);
}

export function explainRouteDTOOrUndefined ( value: unknown): string {
    return isRouteDTOOrUndefined(value) ? explainOk() : explainNot(explainOr(['RouteDTO', 'undefined']));
}
