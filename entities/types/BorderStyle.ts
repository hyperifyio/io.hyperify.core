// Copyright (c) 2023. Heusala Group Oy <info@heusalagroup.fi>. All rights reserved.

import { explainEnum, isEnum, parseEnum, stringifyEnum } from "../../types/Enum";
import { explainNot, explainOk, explainOr } from "../../types/explain";
import { isUndefined } from "../../types/undefined";

export enum BorderStyle {
    DOTTED = "dotted",
    DASHED = "dashed",
    SOLID = "solid",
    DOUBLE = "double",
    GROOVE = "groove",
    RIDGE = "ridge",
    INSET = "inset",
    OUTSET = "outset",
    NONE = "none",
    HIDDEN = "hidden",
}

export function isBorderStyle (value: unknown) : value is BorderStyle {
    return isEnum(BorderStyle, value);
}

export function explainBorderStyle (value : unknown) : string {
    return explainEnum("BorderStyle", BorderStyle, isBorderStyle, value);
}

export function stringifyBorderStyle (value : BorderStyle) : string {
    return stringifyEnum(BorderStyle, value);
}

export function parseBorderStyle (value: any) : BorderStyle | undefined {
    return parseEnum(BorderStyle, value) as BorderStyle | undefined;
}

export function isBorderStyleOrUndefined (value: unknown): value is BorderStyle | undefined {
    return isUndefined(value) || isBorderStyle(value);
}

export function explainBorderStyleOrUndefined (value: unknown): string {
    return isBorderStyleOrUndefined(value) ? explainOk() : explainNot(explainOr(['BorderStyle', 'undefined']));
}
