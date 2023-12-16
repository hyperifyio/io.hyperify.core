// Copyright (c) 2023. Heusala Group Oy <info@heusalagroup.fi>. All rights reserved.

import { explainEnum, isEnum, parseEnum, stringifyEnum } from "../../types/Enum";
import { explainNot, explainOk, explainOr } from "../../types/explain";
import { isUndefined } from "../../types/undefined";

export enum TextAlign {
    START = "start",
    END = "end",
    LEFT = "left",
    RIGHT = "right",
    CENTER = "center",
    JUSTIFY = "justify",
    JUSTIFY_ALL = "justify-all",
    MATCH_PARENT = "match-parent",
    INHERIT = "inherit",
    INITIAL = "initial",
    REVERT = "revert",
    REVERT_LAYER = "revert-layer",
    UNSET = "unset",
}

export function isTextAlign (value: unknown) : value is TextAlign {
    return isEnum(TextAlign, value);
}

export function explainTextAlign (value : unknown) : string {
    return explainEnum("TextAlign", TextAlign, isTextAlign, value);
}

export function stringifyTextAlign (value : TextAlign) : string {
    return stringifyEnum(TextAlign, value);
}

export function parseTextAlign (value: any) : TextAlign | undefined {
    return parseEnum(TextAlign, value) as TextAlign | undefined;
}

export function isTextAlignOrUndefined (value: unknown): value is TextAlign | undefined {
    return isUndefined(value) || isTextAlign(value);
}

export function explainTextAlignOrUndefined (value: unknown): string {
    return isTextAlignOrUndefined(value) ? explainOk() : explainNot(explainOr(['TextAlign', 'undefined']));
}
