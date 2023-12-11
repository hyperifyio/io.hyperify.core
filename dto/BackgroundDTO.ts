// Copyright (c) 2023. Heusala Group Oy <info@heusalagroup.fi>. All rights reserved.

import { explain, explainNot, explainOk, explainOr, explainProperty } from "../types/explain";
import { explainNoOtherKeysInDevelopment, hasNoOtherKeysInDevelopment } from "../types/OtherKeys";
import { explainRegularObject, isRegularObject } from "../types/RegularObject";
import { isUndefined } from "../types/undefined";
import { BackgroundImageDTO, explainBackgroundImageDTOOrUndefined, isBackgroundImageDTOOrUndefined } from "./BackgroundImageDTO";
import { ColorDTO, explainColorDTOOrUndefined, isColorDTOOrUndefined } from "./ColorDTO";
import { BackgroundAttachment, explainBackgroundAttachmentOrUndefined, isBackgroundAttachmentOrUndefined } from "./types/BackgroundAttachment";
import { BackgroundBlendMode, explainBackgroundBlendModeOrUndefined, isBackgroundBlendModeOrUndefined } from "./types/BackgroundBlendMode";
import { BackgroundClip, explainBackgroundClipOrUndefined, isBackgroundClipOrUndefined } from "./types/BackgroundClip";
import { BackgroundOrigin, explainBackgroundOriginOrUndefined, isBackgroundOriginOrUndefined } from "./types/BackgroundOrigin";
import { BackgroundPositionOptions, explainBackgroundPositionOptionsOrUndefined, isBackgroundPositionOptionsOrUndefined } from "./types/BackgroundPositionOptions";
import { BackgroundRepeatDTO, explainBackgroundRepeatDTOOrUndefined, isBackgroundRepeatDTOOrUndefined } from "./BackgroundRepeatDTO";
import { BackgroundSizeOptions, explainBackgroundSizeOptionsOrUndefined, isBackgroundSizeOptionsOrUndefined } from "./types/BackgroundSizeOptions";
import { DTO } from "./types/DTO";

export interface BackgroundDTO extends DTO {
    readonly attachment ?: BackgroundAttachment;
    readonly blendMode ?: BackgroundBlendMode;
    readonly clip ?: BackgroundClip;
    readonly color ?: ColorDTO;
    readonly image ?: BackgroundImageDTO;
    readonly origin ?: BackgroundOrigin;
    readonly position ?: BackgroundPositionOptions;
    readonly repeat ?: BackgroundRepeatDTO;
    readonly size ?: BackgroundSizeOptions;
}

export function createBackgroundDTO (
    attachment : BackgroundAttachment | undefined,
    blendMode : BackgroundBlendMode | undefined,
    clip : BackgroundClip | undefined,
    color : ColorDTO | undefined,
    image : BackgroundImageDTO | undefined,
    origin : BackgroundOrigin | undefined,
    position : BackgroundPositionOptions | undefined,
    repeat : BackgroundRepeatDTO | undefined,
    size : BackgroundSizeOptions | undefined,
) : BackgroundDTO {
    return {
        ...(attachment !== undefined ? {attachment} : {}),
        ...(blendMode !== undefined ? {blendMode} : {}),
        ...(clip !== undefined ? {clip} : {}),
        ...(color !== undefined ? {color} : {}),
        ...(image !== undefined ? {image} : {}),
        ...(origin !== undefined ? {origin} : {}),
        ...(position !== undefined ? {position} : {}),
        ...(repeat !== undefined ? {repeat} : {}),
        ...(size !== undefined ? {size} : {}),
    };
}

export function isBackgroundDTO (value: unknown) : value is BackgroundDTO {
    return (
        isRegularObject(value)
        && hasNoOtherKeysInDevelopment(value, [
            'attachment',
            'blendMode',
            'clip',
            'color',
            'image',
            'origin',
            'position',
            'repeat',
            'size',
        ])
        && isBackgroundAttachmentOrUndefined(value?.attachment)
        && isBackgroundBlendModeOrUndefined(value?.blendMode)
        && isBackgroundClipOrUndefined(value?.clip)
        && isColorDTOOrUndefined(value?.color)
        && isBackgroundImageDTOOrUndefined(value?.image)
        && isBackgroundOriginOrUndefined(value?.origin)
        && isBackgroundPositionOptionsOrUndefined(value?.position)
        && isBackgroundRepeatDTOOrUndefined(value?.repeat)
        && isBackgroundSizeOptionsOrUndefined(value?.size)
    );
}

export function explainBackgroundDTO (value: any) : string {
    return explain(
        [
            explainRegularObject(value),
            explainNoOtherKeysInDevelopment(value, [
                'attachment',
                'blendMode',
                'clip',
                'color',
                'image',
                'origin',
                'position',
                'repeat',
                'size',
            ])
            , explainProperty("attachment", explainBackgroundAttachmentOrUndefined(value?.attachment))
            , explainProperty("blendMode", explainBackgroundBlendModeOrUndefined(value?.blendMode))
            , explainProperty("clip", explainBackgroundClipOrUndefined(value?.clip))
            , explainProperty("color", explainColorDTOOrUndefined(value?.color))
            , explainProperty("image", explainBackgroundImageDTOOrUndefined(value?.image))
            , explainProperty("origin", explainBackgroundOriginOrUndefined(value?.origin))
            , explainProperty("position", explainBackgroundPositionOptionsOrUndefined(value?.position))
            , explainProperty("repeat", explainBackgroundRepeatDTOOrUndefined(value?.repeat))
            , explainProperty("size", explainBackgroundSizeOptionsOrUndefined(value?.size))
        ]
    );
}

export function stringifyBackgroundDTO (value : BackgroundDTO) : string {
    return `BackgroundDTO(${value})`;
}

export function parseBackgroundDTO (value: unknown) : BackgroundDTO | undefined {
    if (isBackgroundDTO(value)) return value;
    return undefined;
}

export function isBackgroundDTOOrUndefined (value: unknown): value is BackgroundDTO | undefined {
    return isUndefined(value) || isBackgroundDTO(value);
}

export function explainBackgroundDTOOrUndefined (value: unknown): string {
    return isBackgroundDTOOrUndefined(value) ? explainOk() : explainNot(explainOr(['BackgroundDTO', 'undefined']));
}
