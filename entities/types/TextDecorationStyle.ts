// Copyright (c) 2023. Heusala Group Oy <info@heusalagroup.fi>. All rights reserved.

import {
    explainEnum,
    isEnum,
    parseEnum,
    stringifyEnum,
} from "../../types/Enum";
import {
    explainNot,
    explainOk,
    explainOr,
} from "../../types/explain";
import { isUndefined } from "../../types/undefined";

export enum TextDecorationStyle {
    SOLID = "solid",
    DOUBLE = "double",
    DOTTED = "dotted",
    DASHED = "dashed",
    WAVY = "wavy",
    INITIAL = "initial",
    INHERIT = "inherit",
}

export function isTextDecorationStyle (value: unknown) : value is TextDecorationStyle {
    return isEnum(TextDecorationStyle, value);
}

export function explainTextDecorationStyle (value : unknown) : string {
    return explainEnum("TextDecorationStyle", TextDecorationStyle, isTextDecorationStyle, value);
}

export function stringifyTextDecorationStyle (value : TextDecorationStyle) : string {
    return stringifyEnum(TextDecorationStyle, value);
}

export function parseTextDecorationStyle (value: any) : TextDecorationStyle | undefined {
    return parseEnum(TextDecorationStyle, value) as TextDecorationStyle | undefined;
}

export function isTextDecorationStyleOrUndefined (value: unknown): value is TextDecorationStyle | undefined {
    return isUndefined(value) || isTextDecorationStyle(value);
}

export function explainTextDecorationStyleOrUndefined (value: unknown): string {
    return isTextDecorationStyleOrUndefined(value) ? explainOk() : explainNot(explainOr(['TextDecorationStyle', 'undefined']));
}
