// Copyright (c) 2023. Heusala Group Oy <info@heusalagroup.fi>. All rights reserved.

import { isArray } from "../types/Array";
import { explain, explainNot, explainOk, explainOr, explainProperty } from "../types/explain";
import { explainNoOtherKeysInDevelopment, hasNoOtherKeysInDevelopment } from "../types/OtherKeys";
import { explainRegularObject, isRegularObject } from "../types/RegularObject";
import { isUndefined } from "../types/undefined";
import { ColorDTO, explainColorDTOOrUndefined, isColorDTOOrUndefined } from "./ColorDTO";
import { explainSizeDTOOrUndefined, isSizeDTOOrUndefined, SizeDTO } from "./SizeDTO";
import { BorderStyle, explainBorderStyleOrUndefined, isBorderStyleOrUndefined } from "./types/BorderStyle";
import { DTO } from "./types/DTO";

export interface BorderDTO extends DTO {

    /**
     * Defaults to NONE
     */
    readonly style ?: BorderStyle | undefined;

    readonly width ?: SizeDTO | undefined;

    readonly radius ?: SizeDTO | undefined;

    readonly color ?: ColorDTO | undefined;

}

export function createBorderDTO (
    width : SizeDTO | undefined,
    style : BorderStyle | undefined,
    color : ColorDTO | undefined,
    radius : SizeDTO | undefined,
) : BorderDTO {
    return {
        ...(width !== undefined ? {width} : {}),
        ...(style !== undefined ? {style} : {}),
        ...(color !== undefined ? {color} : {}),
        ...(radius !== undefined ? {radius} : {}),
    };
}

export function isBorderDTO (value: unknown) : value is BorderDTO {
    return (
        isRegularObject(value)
        && hasNoOtherKeysInDevelopment(value, [
            'width',
            'style',
            'color',
            'radius',
        ])
        && isSizeDTOOrUndefined(value?.width)
        && isSizeDTOOrUndefined(value?.radius)
        && isBorderStyleOrUndefined(value?.style)
        && isColorDTOOrUndefined(value?.color)
    );
}

export function explainBorderDTO (value: any) : string {
    return explain(
        [
            explainRegularObject(value),
            explainNoOtherKeysInDevelopment(value, [
                'width',
                'style',
                'color',
                'radius',
            ])
            , explainProperty("width", explainSizeDTOOrUndefined(value?.width))
            , explainProperty("radius", explainSizeDTOOrUndefined(value?.radius))
            , explainProperty("style", explainBorderStyleOrUndefined(value?.style))
            , explainProperty("color", explainColorDTOOrUndefined(value?.color))
        ]
    );
}

export function stringifyBorderDTO (value : BorderDTO) : string {
    return `BorderDTO(${value})`;
}

export function parseBorderDTO (value: unknown) : BorderDTO | undefined {
    if (isBorderDTO(value)) return value;
    return undefined;
}

export function isBorderDTOOrUndefined (value: unknown): value is BorderDTO | undefined {
    return isUndefined(value) || isBorderDTO(value);
}

export function explainBorderDTOOrUndefined (value: unknown): string {
    return isBorderDTOOrUndefined(value) ? explainOk() : explainNot(explainOr(['BorderDTO', 'undefined']));
}


export type DoubleBorderDTO = [BorderDTO, BorderDTO];

export function isDoubleBorderDTO (value: unknown): value is [BorderDTO, BorderDTO] {
    return isArray(value) && value.length === 2 && isBorderDTO(value[0]) && isBorderDTO(value[1]);
}

export function isDoubleBorderDTOOrUndefined (value: unknown): value is [BorderDTO, BorderDTO] | undefined {
    return isUndefined(value) || isDoubleBorderDTO(value);
}

export function explainDoubleBorderDTOOrUndefined (value: unknown): string {
    return isDoubleBorderDTOOrUndefined(value) ? explainOk() : explainNot(explainOr([
        '[BorderDTO, BorderDTO]',
        'undefined'
    ]));
}

export type SquareBorderDTO = [BorderDTO, BorderDTO, BorderDTO, BorderDTO];

export function isSquareBorderDTO (value: unknown): value is [BorderDTO, BorderDTO, BorderDTO, BorderDTO] {
    return (
        isArray(value)
        && value.length === 4
        && isBorderDTO(value[0])
        && isBorderDTO(value[1])
        && isBorderDTO(value[2])
        && isBorderDTO(value[3])
    );
}

export type MultiBorderDTO = BorderDTO | DoubleBorderDTO | SquareBorderDTO;

export function isMultiBorderDTO (value: unknown)
    : value is BorderDTO | DoubleBorderDTO | SquareBorderDTO
{
    return (
        isBorderDTO(value)
        || isDoubleBorderDTO(value)
        || isSquareBorderDTO(value)
    );
}


export function isMultiBorderDTOOrUndefined (value: unknown): value is MultiBorderDTO | undefined {
    return isUndefined(value) || isMultiBorderDTO(value);
}

export function explainMultiBorderDTOOrUndefined (value: unknown): string {
    return isMultiBorderDTOOrUndefined(value) ? explainOk() : explainNot(explainOr([
        'BorderDTO',
        '[BorderDTO, BorderDTO]',
        '[BorderDTO, BorderDTO, BorderDTO, BorderDTO]',
        'undefined'
    ]));
}
