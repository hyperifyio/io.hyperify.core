// Copyright (c) 2023. Heusala Group Oy <info@heusalagroup.fi>. All rights reserved.

import { isArray } from "../types/Array";
import { explain, explainNot, explainOk, explainOr, explainProperty } from "../types/explain";
import { isNumber } from "../types/Number";
import { explainNoOtherKeysInDevelopment, hasNoOtherKeysInDevelopment } from "../types/OtherKeys";
import { explainRegularObject, isRegularObject } from "../types/RegularObject";
import { isUndefined } from "../types/undefined";
import { explainUnitTypeOrUndefined, isUnitTypeOrUndefined, UnitType } from "../entities/types/UnitType";
import { DTO } from "./types/DTO";

export const AUTO_KEYWORD : AutoSizeType = "auto";

export type AutoSizeType = "auto";

export function isAutoSizeType (value : unknown) : value is AutoSizeType {
    return value === AUTO_KEYWORD;
}

export interface SizeDTO extends DTO {

    readonly value: number | AutoSizeType;

    /**
     * Defaults to pixels.
     */
    readonly unit ?: UnitType;

}

export function createSizeDTO (
    value : number | AutoSizeType,
    unit  ?: UnitType | undefined,
) : SizeDTO {
    return {
        value,
        ...(unit ? {unit} : {}),
    };
}

export function isSizeDTO (value: unknown) : value is SizeDTO {
    return (
        isRegularObject(value)
        && hasNoOtherKeysInDevelopment(value, [
            'value',
            'unit',
        ])
        && (isNumber(value?.value) || value?.value === AUTO_KEYWORD)
        && isUnitTypeOrUndefined(value?.unit)
    );
}

export function explainSizeDTO (value: any) : string {
    return explain(
        [
            explainRegularObject(value),
            explainNoOtherKeysInDevelopment(value, [
                'value',
                'unit',
            ])
            , explainProperty("value", explainNumberOrAuto(value?.value))
            , explainProperty("unit", explainUnitTypeOrUndefined(value?.unit))
        ]
    );
}


export function explainNumberOrAuto (value: unknown) : string {
    return isNumber(value) || value === AUTO_KEYWORD ? explainOk() : explainNot(explainOr(['number', '"auto"']));
}

export function stringifySizeDTO (value : SizeDTO) : string {
    return `SizeDTO(${value})`;
}

export function parseSizeDTO (value: unknown) : SizeDTO | undefined {
    if (isSizeDTO(value)) return value;
    return undefined;
}

export function isSizeDTOOrUndefined (value: unknown): value is SizeDTO | undefined {
    return isUndefined(value) || isSizeDTO(value);
}

export function explainSizeDTOOrUndefined (value: unknown): string {
    return isSizeDTOOrUndefined(value) ? explainOk() : explainNot(explainOr(['SizeDTO', 'undefined']));
}

export type DoubleSizeDTO = [SizeDTO, SizeDTO];

export function isDoubleSizeDTO (value: unknown): value is [SizeDTO, SizeDTO] {
    return isArray(value) && value.length === 2 && isSizeDTO(value[0]) && isSizeDTO(value[1]);
}

export function isDoubleSizeDTOOrUndefined (value: unknown): value is [SizeDTO, SizeDTO] | undefined {
    return isUndefined(value) || isDoubleSizeDTO(value);
}

export function explainDoubleSizeDTOOrUndefined (value: unknown): string {
    return isDoubleSizeDTOOrUndefined(value) ? explainOk() : explainNot(explainOr([
        '[SizeDTO, SizeDTO]',
        'undefined'
    ]));
}

export type SquareSizeDTO = [SizeDTO, SizeDTO, SizeDTO, SizeDTO];

export function isSquareSizeDTO (value: unknown): value is [SizeDTO, SizeDTO, SizeDTO, SizeDTO] {
    return (
        isArray(value)
        && value.length === 4
        && isSizeDTO(value[0])
        && isSizeDTO(value[1])
        && isSizeDTO(value[2])
        && isSizeDTO(value[3])
    );
}

export type MultiSizeDTO = SizeDTO | DoubleSizeDTO | SquareSizeDTO;

export function isMultiSizeDTO (value: unknown)
    : value is SizeDTO | DoubleSizeDTO | SquareSizeDTO
{
    return (
        isSizeDTO(value)
        || isDoubleSizeDTO(value)
        || isSquareSizeDTO(value)
    );
}


export function isMultiSizeDTOOrUndefined (value: unknown): value is MultiSizeDTO | undefined {
    return isUndefined(value) || isMultiSizeDTO(value);
}

export function explainMultiSizeDTOOrUndefined (value: unknown): string {
    return isMultiSizeDTOOrUndefined(value) ? explainOk() : explainNot(explainOr([
        'SizeDTO',
        '[SizeDTO, SizeDTO]',
        '[SizeDTO, SizeDTO, SizeDTO, SizeDTO]',
        'undefined'
    ]));
}
