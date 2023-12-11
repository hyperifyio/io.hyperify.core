// Copyright (c) 2023. Heusala Group Oy <info@heusalagroup.fi>. All rights reserved.

import { explainEnum, isEnum, parseEnum, stringifyEnum } from "../../types/Enum";
import { explainNot, explainOk, explainOr } from "../../types/explain";
import { isUndefined } from "../../types/undefined";

/**
 *
 */
export enum FontVariant {
    NORMAL = "normal",
    SMALL_CAPS = "small-caps",
}

export function isFontVariant (value: unknown) : value is FontVariant {
    return isEnum(FontVariant, value);
}

export function explainFontVariant (value : unknown) : string {
    return explainEnum("FontVariant", FontVariant, isFontVariant, value);
}

export function stringifyFontVariant (value : FontVariant) : string {
    return stringifyEnum(FontVariant, value);
}

export function parseFontVariant (value: any) : FontVariant | undefined {
    return parseEnum(FontVariant, value) as FontVariant | undefined;
}

export function isFontVariantOrUndefined (value: unknown): value is FontVariant | undefined {
    return isUndefined(value) || isFontVariant(value);
}

export function explainFontVariantOrUndefined (value: unknown): string {
    return isFontVariantOrUndefined(value) ? explainOk() : explainNot(explainOr(['FontVariant', 'undefined']));
}
