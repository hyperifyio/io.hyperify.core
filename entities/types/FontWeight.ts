// Copyright (c) 2023. Heusala Group Oy <info@heusalagroup.fi>. All rights reserved.

import { explainEnum, isEnum, parseEnum, stringifyEnum } from "../../types/Enum";
import { explainNot, explainOk, explainOr } from "../../types/explain";
import { isUndefined } from "../../types/undefined";

export enum FontWeight {
    NORMAL = "normal",
    BOLD = "bold",
}

export function isFontWeight (value: unknown) : value is FontWeight {
    return isEnum(FontWeight, value);
}

export function explainFontWeight (value : unknown) : string {
    return explainEnum("FontWeight", FontWeight, isFontWeight, value);
}

export function stringifyFontWeight (value : FontWeight) : string {
    return stringifyEnum(FontWeight, value);
}

export function parseFontWeight (value: any) : FontWeight | undefined {
    return parseEnum(FontWeight, value) as FontWeight | undefined;
}

export function isFontWeightOrUndefined (value: unknown): value is FontWeight | undefined {
    return isUndefined(value) || isFontWeight(value);
}

export function explainFontWeightOrUndefined (value: unknown): string {
    return isFontWeightOrUndefined(value) ? explainOk() : explainNot(explainOr(['FontWeight', 'undefined']));
}
