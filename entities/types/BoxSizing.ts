// Copyright (c) 2023. Heusala Group Oy <info@heusalagroup.fi>. All rights reserved.

import { explainEnum, isEnum, parseEnum, stringifyEnum } from "../../types/Enum";
import { explainNot, explainOk, explainOr } from "../../types/explain";
import { isUndefined } from "../../types/undefined";

export enum BoxSizing {
    BORDER_BOX = "border-box",
    CONTENT_BOX = "content-box",
    INHERIT = "inherit",
    INITIAL = "initial",
    REVERT = "revert",
    REVERT_LAYER = "revert-layer",
    UNSET = "unset",
}

export function isBoxSizing (value: unknown) : value is BoxSizing {
    return isEnum(BoxSizing, value);
}

export function explainBoxSizing (value : unknown) : string {
    return explainEnum("BoxSizing", BoxSizing, isBoxSizing, value);
}

export function stringifyBoxSizing (value : BoxSizing) : string {
    return stringifyEnum(BoxSizing, value);
}

export function parseBoxSizing (value: any) : BoxSizing | undefined {
    return parseEnum(BoxSizing, value) as BoxSizing | undefined;
}

export function isBoxSizingOrUndefined (value: unknown): value is BoxSizing | undefined {
    return isUndefined(value) || isBoxSizing(value);
}

export function explainBoxSizingOrUndefined (value: unknown): string {
    return isBoxSizingOrUndefined(value) ? explainOk() : explainNot(explainOr(['BoxSizing', 'undefined']));
}
