// Copyright (c) 2023. Heusala Group Oy <info@heusalagroup.fi>. All rights reserved.

import { explain, explainNot, explainOk, explainOr, explainProperty } from "../../types/explain";
import { explainNoOtherKeysInDevelopment, hasNoOtherKeysInDevelopment } from "../../types/OtherKeys";
import { explainRegularObject, isRegularObject } from "../../types/RegularObject";
import { isUndefined } from "../../types/undefined";
import {
    explainBorderDTOOrUndefined,
    isBorderDTOOrUndefined,
    BorderDTO,
} from "../border/BorderDTO";
import { DTO } from "../types/DTO";

export interface BorderBoxDTO extends DTO {
    readonly top ?: BorderDTO;
    readonly right ?: BorderDTO;
    readonly bottom ?: BorderDTO;
    readonly left ?: BorderDTO;
}

export function createBorderBoxDTO (
    top : BorderDTO | undefined,
    right : BorderDTO | undefined,
    bottom : BorderDTO | undefined,
    left : BorderDTO | undefined,
) : BorderBoxDTO {
    return {
        top,
        right,
        bottom,
        left,
    };
}

export function isBorderBoxDTO (value: unknown) : value is BorderBoxDTO {
    return (
        isRegularObject(value)
        && hasNoOtherKeysInDevelopment(value, [
            'top',
            'right',
            'bottom',
            'left',
        ])
        && isBorderDTOOrUndefined(value?.top)
        && isBorderDTOOrUndefined(value?.right)
        && isBorderDTOOrUndefined(value?.bottom)
        && isBorderDTOOrUndefined(value?.left)
    );
}

export function explainBorderBoxDTO (value: any) : string {
    return explain(
        [
            explainRegularObject(value),
            explainNoOtherKeysInDevelopment(value, [
                'top',
                'right',
                'bottom',
                'left',
            ])
            , explainProperty("top", explainBorderDTOOrUndefined(value?.top))
            , explainProperty("right", explainBorderDTOOrUndefined(value?.right))
            , explainProperty("bottom", explainBorderDTOOrUndefined(value?.bottom))
            , explainProperty("left", explainBorderDTOOrUndefined(value?.left))
        ]
    );
}

export function stringifyBorderBoxDTO (value : BorderBoxDTO) : string {
    return `BorderBoxDTO(${value})`;
}

export function parseBorderBoxDTO (value: unknown) : BorderBoxDTO | undefined {
    if (isBorderBoxDTO(value)) return value;
    return undefined;
}

export function isBorderBoxDTOOrUndefined (value: unknown): value is BorderBoxDTO | undefined {
    return isUndefined(value) || isBorderBoxDTO(value);
}

export function explainBorderBoxDTOOrUndefined (value: unknown): string {
    return isBorderBoxDTOOrUndefined(value) ? explainOk() : explainNot(explainOr(['BorderBoxDTO', 'undefined']));
}
