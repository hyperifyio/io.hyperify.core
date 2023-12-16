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

export interface SizeDimensionsDTO extends DTO {
    readonly width ?: SizeDTO;
    readonly height ?: SizeDTO;
}

export function createSizeDimensionsDTO (
    width : SizeDTO | undefined,
    height : SizeDTO | undefined,
) : SizeDimensionsDTO {
    return {
        width,
        height,
    };
}

export function isSizeDimensionsDTO (value: unknown) : value is SizeDimensionsDTO {
    return (
        isRegularObject(value)
        && hasNoOtherKeysInDevelopment(value, [
            'width',
            'height',
        ])
        && isSizeDTOOrUndefined(value?.width)
        && isSizeDTOOrUndefined(value?.height)
    );
}

export function explainSizeDimensionsDTO (value: any) : string {
    return explain(
        [
            explainRegularObject(value),
            explainNoOtherKeysInDevelopment(value, [
                'width',
                'height',
            ])
            , explainProperty("width", explainSizeDTOOrUndefined(value?.width))
            , explainProperty("height", explainSizeDTOOrUndefined(value?.height))
        ]
    );
}

export function stringifySizeDimensionsDTO (value : SizeDimensionsDTO) : string {
    return `SizeDimensionsDTO(${value})`;
}

export function parseSizeDimensionsDTO (value: unknown) : SizeDimensionsDTO | undefined {
    if (isSizeDimensionsDTO(value)) return value;
    return undefined;
}

export function isSizeDimensionsDTOOrUndefined (value: unknown): value is SizeDimensionsDTO | undefined {
    return isUndefined(value) || isSizeDimensionsDTO(value);
}

export function explainSizeDimensionsDTOOrUndefined (value: unknown): string {
    return isSizeDimensionsDTOOrUndefined(value) ? explainOk() : explainNot(explainOr(['SizeDimensionsDTO', 'undefined']));
}
