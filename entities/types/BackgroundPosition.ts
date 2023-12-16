// Copyright (c) 2023. Heusala Group Oy <info@heusalagroup.fi>. All rights reserved.

import { explainEnum, isEnum, parseEnum, stringifyEnum } from "../../types/Enum";
import { explainNot, explainOk, explainOr } from "../../types/explain";
import { isUndefined } from "../../types/undefined";

export enum BackgroundPosition {
    TOP = "top",
    BOTTOM = "bottom",
    LEFT = "left",
    RIGHT = "right",
    CENTER = "center",
}

export function isBackgroundPosition (value: unknown) : value is BackgroundPosition {
    return isEnum(BackgroundPosition, value);
}

export function explainBackgroundPosition (value : unknown) : string {
    return explainEnum("BackgroundPosition", BackgroundPosition, isBackgroundPosition, value);
}

export function stringifyBackgroundPosition (value : BackgroundPosition) : string {
    return stringifyEnum(BackgroundPosition, value);
}

export function parseBackgroundPosition (value: any) : BackgroundPosition | undefined {
    return parseEnum(BackgroundPosition, value) as BackgroundPosition | undefined;
}

export function isBackgroundPositionOrUndefined (value: unknown): value is BackgroundPosition | undefined {
    return isUndefined(value) || isBackgroundPosition(value);
}

export function explainBackgroundPositionOrUndefined (value: unknown): string {
    return isBackgroundPositionOrUndefined(value) ? explainOk() : explainNot(explainOr(['BackgroundPosition', 'undefined']));
}

