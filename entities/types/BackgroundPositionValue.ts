// Copyright (c) 2023. Heusala Group Oy <info@heusalagroup.fi>. All rights reserved.

import { explainEnum, isEnum, parseEnum, stringifyEnum } from "../../types/Enum";
import { explainNot, explainOk, explainOr } from "../../types/explain";
import { isUndefined } from "../../types/undefined";

export enum BackgroundPositionValue {
    TOP = "top",
    BOTTOM = "bottom",
    LEFT = "left",
    RIGHT = "right",
    CENTER = "center",
}

export function isBackgroundPositionValue ( value: unknown) : value is BackgroundPositionValue {
    return isEnum(BackgroundPositionValue, value);
}

export function explainBackgroundPositionValue ( value : unknown) : string {
    return explainEnum("BackgroundPosition", BackgroundPositionValue, isBackgroundPositionValue, value);
}

export function stringifyBackgroundPositionValue ( value : BackgroundPositionValue) : string {
    return stringifyEnum(BackgroundPositionValue, value);
}

export function parseBackgroundPositionValue ( value: any) : BackgroundPositionValue | undefined {
    return parseEnum(BackgroundPositionValue, value) as BackgroundPositionValue | undefined;
}

export function isBackgroundPositionValueOrUndefined ( value: unknown): value is BackgroundPositionValue | undefined {
    return isUndefined(value) || isBackgroundPositionValue(value);
}

export function explainBackgroundPositionValueOrUndefined ( value: unknown): string {
    return isBackgroundPositionValueOrUndefined(value) ? explainOk() : explainNot(explainOr(['BackgroundPosition', 'undefined']));
}

