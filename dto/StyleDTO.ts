// Copyright (c) 2023. Heusala Group Oy <info@heusalagroup.fi>. All rights reserved.

import { explain, explainNot, explainOk, explainOr, explainProperty } from "../types/explain";
import { explainNoOtherKeysInDevelopment, hasNoOtherKeysInDevelopment } from "../types/OtherKeys";
import { explainRegularObject, isRegularObject } from "../types/RegularObject";
import { isUndefined } from "../types/undefined";
import { BackgroundDTO, explainBackgroundDTOOrUndefined, isBackgroundDTOOrUndefined } from "./BackgroundDTO";
import { BorderDTO, explainMultiBorderDTOOrUndefined, isMultiBorderDTOOrUndefined } from "./BorderDTO";
import { ColorDTO, explainColorDTOOrUndefined, isColorDTOOrUndefined } from "./ColorDTO";
import { explainFontDTOOrUndefined, FontDTO, isFontDTOOrUndefined } from "./FontDTO";
import {
    explainMultiSizeDTOOrUndefined,
    explainSizeDTOOrUndefined, isMultiSizeDTOOrUndefined,
    isSizeDTOOrUndefined,
    SizeDTO
} from "./SizeDTO";
import {
    explainTextDecorationDTOOrUndefined,
    isTextDecorationDTOOrUndefined,
    TextDecorationDTO,
} from "./TextDecorationDTO";
import { BoxSizing, explainBoxSizingOrUndefined, isBoxSizingOrUndefined } from "./types/BoxSizing";
import { DTO } from "./types/DTO";
import { explainTextAlignOrUndefined, isTextAlignOrUndefined, TextAlign } from "./types/TextAlign";

export interface StyleDTO extends DTO {
    readonly textAlign       ?: TextAlign;
    readonly textColor       ?: ColorDTO;
    readonly width           ?: SizeDTO;
    readonly height          ?: SizeDTO;
    readonly margin          ?: SizeDTO | [SizeDTO, SizeDTO] | [SizeDTO, SizeDTO, SizeDTO, SizeDTO];
    readonly padding         ?: SizeDTO | [SizeDTO, SizeDTO] | [SizeDTO, SizeDTO, SizeDTO, SizeDTO];
    readonly border          ?: BorderDTO | [BorderDTO, BorderDTO] | [BorderDTO, BorderDTO, BorderDTO, BorderDTO];
    readonly font            ?: FontDTO;
    readonly textDecoration  ?: TextDecorationDTO;
    readonly background      ?: BackgroundDTO;
    readonly minWidth           ?: SizeDTO;
    readonly minHeight          ?: SizeDTO;
    readonly maxWidth           ?: SizeDTO;
    readonly maxHeight          ?: SizeDTO;
    readonly boxSizing          ?: BoxSizing;
}

export function createStyleDTO (
    textColor       : ColorDTO | undefined,
    background      : BackgroundDTO | undefined,
    width           : SizeDTO | undefined,
    height          : SizeDTO | undefined,
    margin          : SizeDTO | [SizeDTO, SizeDTO] | [SizeDTO, SizeDTO, SizeDTO, SizeDTO] | undefined,
    padding         : SizeDTO | [SizeDTO, SizeDTO] | [SizeDTO, SizeDTO, SizeDTO, SizeDTO] | undefined,
    border          : BorderDTO | [BorderDTO, BorderDTO] | [BorderDTO, BorderDTO, BorderDTO, BorderDTO] | undefined,
    font            : FontDTO | undefined,
    textDecoration  : TextDecorationDTO | undefined,
    minWidth           : SizeDTO | undefined,
    minHeight          : SizeDTO | undefined,
    maxWidth           : SizeDTO | undefined,
    maxHeight          : SizeDTO | undefined,
    textAlign          : TextAlign | undefined,
    boxSizing          : BoxSizing | undefined,
) : StyleDTO {
    return {
        ...(textColor !== undefined ? { textColor } : {}),
        ...(textAlign !== undefined ? { textAlign } : {}),
        ...(background !== undefined ? { background } : {}),
        ...(width !== undefined ? { width } : {}),
        ...(height !== undefined ? { height } : {}),
        ...(margin !== undefined ? { margin } : {}),
        ...(padding !== undefined ? { padding } : {}),
        ...(border !== undefined ? { border } : {}),
        ...(font !== undefined ? { font } : {}),
        ...(textDecoration !== undefined ? { textDecoration } : {}),
        ...(minWidth !== undefined ? { minWidth } : {}),
        ...(minHeight !== undefined ? { minHeight } : {}),
        ...(maxWidth !== undefined ? { maxWidth } : {}),
        ...(maxHeight !== undefined ? { maxHeight } : {}),
        ...(boxSizing !== undefined ? { boxSizing } : {}),
    };
}

export function isStyleDTO ( value: unknown) : value is StyleDTO {
    return (
        isRegularObject(value)
        && hasNoOtherKeysInDevelopment(value, [
            'width',
            'height',
            'minWidth',
            'minHeight',
            'maxWidth',
            'maxHeight',
            'textColor',
            'textAlign',
            'margin',
            'padding',
            'border',
            'font',
            'textDecoration',
            'background',
            'boxSizing',
        ])
        && isColorDTOOrUndefined(value?.textColor)
        && isTextAlignOrUndefined(value?.textAlign)
        && isSizeDTOOrUndefined(value?.width)
        && isSizeDTOOrUndefined(value?.height)
        && isSizeDTOOrUndefined(value?.minWidth)
        && isSizeDTOOrUndefined(value?.minHeight)
        && isSizeDTOOrUndefined(value?.maxWidth)
        && isSizeDTOOrUndefined(value?.maxHeight)
        && isMultiSizeDTOOrUndefined(value?.margin)
        && isMultiSizeDTOOrUndefined(value?.padding)
        && isMultiBorderDTOOrUndefined(value?.border)
        && isFontDTOOrUndefined(value?.font)
        && isTextDecorationDTOOrUndefined(value?.textDecoration)
        && isBackgroundDTOOrUndefined(value?.background)
        && isBoxSizingOrUndefined(value?.boxSizing)
    );
}

export function explainStyleDTO ( value: any) : string {
    return explain(
        [
            explainRegularObject(value),
            explainNoOtherKeysInDevelopment(value, [
                'width',
                'height',
                'minWidth',
                'minHeight',
                'maxWidth',
                'maxHeight',
                'textColor',
                'textAlign',
                'margin',
                'padding',
                'border',
                'font',
                'textDecoration',
                'background',
                'boxSizing',
            ])
            , explainProperty("width", explainSizeDTOOrUndefined(value?.width))
            , explainProperty("height", explainSizeDTOOrUndefined(value?.height))
            , explainProperty("minWidth", explainSizeDTOOrUndefined(value?.minWidth))
            , explainProperty("minHeight", explainSizeDTOOrUndefined(value?.minHeight))
            , explainProperty("maxWidth", explainSizeDTOOrUndefined(value?.maxWidth))
            , explainProperty("maxHeight", explainSizeDTOOrUndefined(value?.maxHeight))
            , explainProperty("textColor", explainColorDTOOrUndefined(value?.textColor))
            , explainProperty("textAlign", explainTextAlignOrUndefined(value?.textAlign))
            , explainProperty("margin", explainMultiSizeDTOOrUndefined(value?.margin))
            , explainProperty("padding", explainMultiSizeDTOOrUndefined(value?.padding))
            , explainProperty("border", explainMultiBorderDTOOrUndefined(value?.border))
            , explainProperty("font", explainFontDTOOrUndefined(value?.font))
            , explainProperty("textDecoration", explainTextDecorationDTOOrUndefined(value?.textDecoration))
            , explainProperty("background", explainBackgroundDTOOrUndefined(value?.background))
            , explainProperty("boxSizing", explainBoxSizingOrUndefined(value?.boxSizing))
        ]
    );
}

export function stringifyStyleDTO ( value : StyleDTO) : string {
    return `StyleDTO(${value})`;
}

export function parseStyleDTO ( value: unknown) : StyleDTO | undefined {
    if (isStyleDTO(value)) return value;
    return undefined;
}

export function isStyleDTOOrUndefined ( value: unknown): value is StyleDTO | undefined {
    return isUndefined(value) || isStyleDTO(value);
}

export function explainStyleDTOOrUndefined ( value: unknown): string {
    return isStyleDTOOrUndefined(value) ? explainOk() : explainNot(explainOr(['StyleDTO', 'undefined']));
}
