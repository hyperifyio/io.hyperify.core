// Copyright (c) 2023. Heusala Group Oy <info@heusalagroup.fi>. All rights reserved.

import { explainEnum, isEnum, parseEnum, stringifyEnum } from "../../../types/Enum";
import { explainNot, explainOk, explainOr } from "../../../types/explain";
import { isUndefined } from "../../../types/undefined";

export enum FontStyle {

    /**
     * The text is shown normally
     */
    NORMAL = "normal",

    /**
     * The text is shown in italics
     */
    ITALIC = "italic",

    /**
     * The text is "leaning" (oblique is very similar to italic, but less supported)
     */
    OBLIQUE = "oblique",

}

export function isFontStyle (value: unknown) : value is FontStyle {
    return isEnum(FontStyle, value);
}

export function explainFontStyle (value : unknown) : string {
    return explainEnum("FontStyle", FontStyle, isFontStyle, value);
}

export function stringifyFontStyle (value : FontStyle) : string {
    return stringifyEnum(FontStyle, value);
}

export function parseFontStyle (value: any) : FontStyle | undefined {
    return parseEnum(FontStyle, value) as FontStyle | undefined;
}

export function isFontStyleOrUndefined (value: unknown): value is FontStyle | undefined {
    return isUndefined(value) || isFontStyle(value);
}

export function explainFontStyleOrUndefined (value: unknown): string {
    return isFontStyleOrUndefined(value) ? explainOk() : explainNot(explainOr(['FontStyle', 'undefined']));
}
