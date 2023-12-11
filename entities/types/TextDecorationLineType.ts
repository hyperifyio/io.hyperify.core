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

export enum TextDecorationLineType {
    NONE = "none",
    UNDERLINE = "underline",
    OVERLINE = "overline",
    INITIAL = "initial",
    INHERIT = "inherit",
    LINE_THROUGH = "line-through",
}

export function isTextDecorationLineType ( value: unknown) : value is TextDecorationLineType {
    return isEnum(TextDecorationLineType, value);
}

export function explainTextDecorationLineType ( value : unknown) : string {
    return explainEnum("TextDecorationLine", TextDecorationLineType, isTextDecorationLineType, value);
}

export function stringifyTextDecorationLineType ( value : TextDecorationLineType) : string {
    return stringifyEnum(TextDecorationLineType, value);
}

export function parseTextDecorationLineType ( value: any) : TextDecorationLineType | undefined {
    return parseEnum(TextDecorationLineType, value) as TextDecorationLineType | undefined;
}

export function isTextDecorationLineTypeOrUndefined ( value: unknown): value is TextDecorationLineType | undefined {
    return isUndefined(value) || isTextDecorationLineType(value);
}

export function explainTextDecorationLineTypeOrUndefined ( value: unknown): string {
    return isTextDecorationLineTypeOrUndefined(value) ? explainOk() : explainNot(explainOr(['TextDecorationLine', 'undefined']));
}
