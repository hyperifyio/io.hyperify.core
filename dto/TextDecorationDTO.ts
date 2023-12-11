// Copyright (c) 2023. Heusala Group Oy <info@heusalagroup.fi>. All rights reserved.

import {
    explain,
    explainNot,
    explainOk,
    explainOr,
    explainProperty,
} from "../types/explain";
import {
    explainNoOtherKeysInDevelopment,
    hasNoOtherKeysInDevelopment,
} from "../types/OtherKeys";
import {
    explainRegularObject,
    isRegularObject,
} from "../types/RegularObject";
import { isUndefined } from "../types/undefined";
import {
    explainTextDecorationLineTypeOrUndefined,
    isTextDecorationLineTypeOrUndefined,
    TextDecorationLineType,
} from "../entities/types/TextDecorationLineType";
import {
    explainTextDecorationStyleOrUndefined,
    isTextDecorationStyleOrUndefined,
    TextDecorationStyle,
} from "../entities/types/TextDecorationStyle";
import {
    ColorDTO,
    explainColorDTOOrUndefined,
    isColorDTOOrUndefined,
} from "./ColorDTO";
import {
    explainSizeDTOOrUndefined,
    isSizeDTOOrUndefined,
    SizeDTO,
} from "./SizeDTO";
import { DTO } from "./types/DTO";

export interface TextDecorationDTO extends DTO {
    readonly lineType ?: TextDecorationLineType;
    readonly color ?: ColorDTO;
    readonly style ?: TextDecorationStyle;
    readonly thickness ?: SizeDTO;
}

export function createTextDecorationDTO (
    lineType : TextDecorationLineType | undefined,
    color : ColorDTO | undefined,
    style : TextDecorationStyle | undefined,
    thickness : SizeDTO | undefined,
) : TextDecorationDTO {
    return {
        ...(lineType !== undefined ? {lineType} : {}),
        ...(color !== undefined ? {color} : {}),
        ...(style !== undefined ? {style} : {}),
        ...(thickness !== undefined ? {thickness} : {}),
    };
}

export function isTextDecorationDTO (value: unknown) : value is TextDecorationDTO {
    return (
        isRegularObject(value)
        && hasNoOtherKeysInDevelopment(value, [
            'lineType',
            'color',
            'style',
            'thickness',
        ])
        && isTextDecorationLineTypeOrUndefined(value?.lineType)
        && isColorDTOOrUndefined(value?.color)
        && isTextDecorationStyleOrUndefined(value?.style)
        && isSizeDTOOrUndefined(value?.thickness)
    );
}

export function explainTextDecorationDTO (value: any) : string {
    return explain(
        [
            explainRegularObject(value),
            explainNoOtherKeysInDevelopment(value, [
                'lineType',
                'color',
                'style',
                'thickness',
            ])
            , explainProperty("lineType", explainTextDecorationLineTypeOrUndefined(value?.lineType))
            , explainProperty("color", explainColorDTOOrUndefined(value?.color))
            , explainProperty("style", explainTextDecorationStyleOrUndefined(value?.style))
            , explainProperty("thickness", explainSizeDTOOrUndefined(value?.thickness))
        ]
    );
}

export function stringifyTextDecorationDTO (value : TextDecorationDTO) : string {
    return `TextDecorationDTO(${value})`;
}

export function parseTextDecorationDTO (value: unknown) : TextDecorationDTO | undefined {
    if (isTextDecorationDTO(value)) return value;
    return undefined;
}

export function isTextDecorationDTOOrUndefined (value: unknown): value is TextDecorationDTO | undefined {
    return isUndefined(value) || isTextDecorationDTO(value);
}

export function explainTextDecorationDTOOrUndefined (value: unknown): string {
    return isTextDecorationDTOOrUndefined(value) ? explainOk() : explainNot(explainOr(['TextDecorationDTO', 'undefined']));
}
