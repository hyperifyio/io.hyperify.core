// Copyright (c) 2023. Heusala Group Oy <info@heusalagroup.fi>. All rights reserved.

import { explainEnum, isEnum, parseEnum, stringifyEnum } from "../../types/Enum";
import { explainNot, explainOk, explainOr } from "../../types/explain";
import { isUndefined } from "../../types/undefined";

export enum BackgroundBlendMode {
    NORMAL = "normal",
    MULTIPLY = "multiply",
    HARD_LIGHT = "hard-light",
    DIFFERENCE = "difference",
    SCREEN = "screen",
    DARKEN = "darken",
    LUMINOSITY = "luminosity",
    INHERIT = "inherit",
    INITIAL = "initial",
    REVERT_LAYER = "revert-layer",
    UNSET = "unset",
}

export function isBackgroundBlendMode (value: unknown) : value is BackgroundBlendMode {
    return isEnum(BackgroundBlendMode, value);
}

export function explainBackgroundBlendMode (value : unknown) : string {
    return explainEnum("BackgroundBlendMode", BackgroundBlendMode, isBackgroundBlendMode, value);
}

export function stringifyBackgroundBlendMode (value : BackgroundBlendMode) : string {
    return stringifyEnum(BackgroundBlendMode, value);
}

export function parseBackgroundBlendMode (value: any) : BackgroundBlendMode | undefined {
    return parseEnum(BackgroundBlendMode, value) as BackgroundBlendMode | undefined;
}

export function isBackgroundBlendModeOrUndefined (value: unknown): value is BackgroundBlendMode | undefined {
    return isUndefined(value) || isBackgroundBlendMode(value);
}

export function explainBackgroundBlendModeOrUndefined (value: unknown): string {
    return isBackgroundBlendModeOrUndefined(value) ? explainOk() : explainNot(explainOr(['BackgroundBlendMode', 'undefined']));
}
