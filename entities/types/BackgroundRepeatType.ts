// Copyright (c) 2023. Heusala Group Oy <info@heusalagroup.fi>. All rights reserved.

import { explainEnum, isEnum, parseEnum, stringifyEnum } from "../../types/Enum";
import { explainNot, explainOk, explainOr } from "../../types/explain";
import { isUndefined } from "../../types/undefined";

export enum BackgroundRepeatType {
    REPEAT = "repeat",
    SPACE = "space",
    ROUND = "round",
    NO_REPEAT = "no-repeat",
}

export function isBackgroundRepeatType (value: unknown) : value is BackgroundRepeatType {
    return isEnum(BackgroundRepeatType, value);
}

export function explainBackgroundRepeatType (value : unknown) : string {
    return explainEnum("BackgroundRepeat", BackgroundRepeatType, isBackgroundRepeatType, value);
}

export function stringifyBackgroundRepeatType (value : BackgroundRepeatType) : string {
    return stringifyEnum(BackgroundRepeatType, value);
}

export function parseBackgroundRepeatType (value: any) : BackgroundRepeatType | undefined {
    return parseEnum(BackgroundRepeatType, value) as BackgroundRepeatType | undefined;
}

export function isBackgroundRepeatTypeOrUndefined (value: unknown): value is BackgroundRepeatType | undefined {
    return isUndefined(value) || isBackgroundRepeatType(value);
}

export function explainBackgroundRepeatTypeOrUndefined (value: unknown): string {
    return isBackgroundRepeatTypeOrUndefined(value) ? explainOk() : explainNot(explainOr(['BackgroundRepeat', 'undefined']));
}
