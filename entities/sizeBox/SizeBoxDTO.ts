// Copyright (c) 2023. Heusala Group Oy <info@heusalagroup.fi>. All rights reserved.

import { explain, explainNot, explainOk, explainOr, explainProperty } from "../../types/explain";
import { explainNoOtherKeysInDevelopment, hasNoOtherKeysInDevelopment } from "../../types/OtherKeys";
import { explainRegularObject, isRegularObject } from "../../types/RegularObject";
import { isUndefined } from "../../types/undefined";
import {
    explainSizeDTOOrUndefined,
    isSizeDTOOrUndefined,
    SizeDTO,
} from "../size/SizeDTO";
import { DTO } from "../types/DTO";

export interface SizeBoxDTO extends DTO {
    readonly top ?: SizeDTO;
    readonly right ?: SizeDTO;
    readonly bottom ?: SizeDTO;
    readonly left ?: SizeDTO;
}

export function createSizeBoxDTO (
    top : SizeDTO | undefined,
    right : SizeDTO | undefined,
    bottom : SizeDTO | undefined,
    left : SizeDTO | undefined,
) : SizeBoxDTO {
    return {
        top,
        right,
        bottom,
        left,
    };
}

export function isSizeBoxDTO (value: unknown) : value is SizeBoxDTO {
    return (
        isRegularObject(value)
        && hasNoOtherKeysInDevelopment(value, [
            'top',
            'right',
            'bottom',
            'left',
        ])
        && isSizeDTOOrUndefined(value?.top)
        && isSizeDTOOrUndefined(value?.right)
        && isSizeDTOOrUndefined(value?.bottom)
        && isSizeDTOOrUndefined(value?.left)
    );
}

export function explainSizeBoxDTO (value: any) : string {
    return explain(
        [
            explainRegularObject(value),
            explainNoOtherKeysInDevelopment(value, [
                'top',
                'right',
                'bottom',
                'left',
            ])
            , explainProperty("top", explainSizeDTOOrUndefined(value?.top))
            , explainProperty("right", explainSizeDTOOrUndefined(value?.right))
            , explainProperty("bottom", explainSizeDTOOrUndefined(value?.bottom))
            , explainProperty("left", explainSizeDTOOrUndefined(value?.left))
        ]
    );
}

export function stringifySizeBoxDTO (value : SizeBoxDTO) : string {
    return `SizeBoxDTO(${value})`;
}

export function parseSizeBoxDTO (value: unknown) : SizeBoxDTO | undefined {
    if (isSizeBoxDTO(value)) return value;
    return undefined;
}

export function isSizeBoxDTOOrUndefined (value: unknown): value is SizeBoxDTO | undefined {
    return isUndefined(value) || isSizeBoxDTO(value);
}

export function explainSizeBoxDTOOrUndefined (value: unknown): string {
    return isSizeBoxDTOOrUndefined(value) ? explainOk() : explainNot(explainOr(['SizeBoxDTO', 'undefined']));
}
