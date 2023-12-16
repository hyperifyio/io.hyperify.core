// Copyright (c) 2023. Heusala Group Oy <info@heusalagroup.fi>. All rights reserved.

import { explain, explainNot, explainOk, explainOr, explainProperty } from "../../types/explain";
import { explainNoOtherKeysInDevelopment, hasNoOtherKeysInDevelopment } from "../../types/OtherKeys";
import { explainRegularObject, isRegularObject } from "../../types/RegularObject";
import { isUndefined } from "../../types/undefined";
import { BackgroundRepeatType, explainBackgroundRepeatType, isBackgroundRepeatType } from "../types/BackgroundRepeatType";
import { DTO } from "../types/DTO";

export interface BackgroundRepeatDTO extends DTO {
    readonly x: BackgroundRepeatType;
    readonly y: BackgroundRepeatType;
}

export function createBackgroundRepeatDTO (
    x : BackgroundRepeatType,
    y : BackgroundRepeatType,
) : BackgroundRepeatDTO {
    return {
        x,
        y,
    };
}

export function isBackgroundRepeatDTO (value: unknown) : value is BackgroundRepeatDTO {
    return (
        isRegularObject(value)
        && hasNoOtherKeysInDevelopment(value, [
            'x',
            'y',
        ])
        && isBackgroundRepeatType(value?.x)
        && isBackgroundRepeatType(value?.y)
    );
}

export function explainBackgroundRepeatDTO (value: any) : string {
    return explain(
        [
            explainRegularObject(value),
            explainNoOtherKeysInDevelopment(value, [
                'x',
                'y',
            ])
            , explainProperty("x", explainBackgroundRepeatType(value?.x))
            , explainProperty("y", explainBackgroundRepeatType(value?.y))
        ]
    );
}

export function stringifyBackgroundRepeatDTO (value : BackgroundRepeatDTO) : string {
    return `BackgroundRepeatDTO(${value})`;
}

export function parseBackgroundRepeatDTO (value: unknown) : BackgroundRepeatDTO | undefined {
    if (isBackgroundRepeatDTO(value)) return value;
    return undefined;
}

export function isBackgroundRepeatDTOOrUndefined (value: unknown): value is BackgroundRepeatDTO | undefined {
    return isUndefined(value) || isBackgroundRepeatDTO(value);
}

export function explainBackgroundRepeatDTOOrUndefined (value: unknown): string {
    return isBackgroundRepeatDTOOrUndefined(value) ? explainOk() : explainNot(explainOr(['BackgroundRepeat', 'undefined']));
}
