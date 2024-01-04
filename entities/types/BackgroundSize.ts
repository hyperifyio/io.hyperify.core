// Copyright (c) 2023. Heusala Group Oy <info@heusalagroup.fi>. All rights reserved.

import { explainEnum, isEnum, parseEnum, stringifyEnum } from "../../types/Enum";
import { explainNot, explainOk, explainOr } from "../../types/explain";
import { isUndefined } from "../../types/undefined";

export enum BackgroundSize {
    COVER = "cover",
    CONTAIN = "contain",
    INHERIT = "inherit",
    INITIAL = "initial",
    REVERT = "revert",
    REVERT_LAYER = "revert-layer",
    UNSET = "unset",
}

export function isBackgroundSize (value: unknown) : value is BackgroundSize {
    return isEnum(BackgroundSize, value);
}

export function explainBackgroundSize (value : unknown) : string {
    return explainEnum("BackgroundSize", BackgroundSize, isBackgroundSize, value);
}

export function stringifyBackgroundSize (value : BackgroundSize) : string {
    return stringifyEnum(BackgroundSize, value);
}

export function parseBackgroundSize (value: any) : BackgroundSize | undefined {
    return parseEnum(BackgroundSize, value) as BackgroundSize | undefined;
}

export function isBackgroundSizeOrUndefined (value: unknown): value is BackgroundSize | undefined {
    return isUndefined(value) || isBackgroundSize(value);
}

export function explainBackgroundSizeOrUndefined (value: unknown): string {
    return isBackgroundSizeOrUndefined(value) ? explainOk() : explainNot(explainOr(['BackgroundSize', 'undefined']));
}
