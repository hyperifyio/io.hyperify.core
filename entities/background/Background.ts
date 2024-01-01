// Copyright (c) 2023-2024. Sendanor <info@sendanor.fi>. All rights reserved.

import { ReadonlyJsonObject } from "../../Json";
import { isFunction } from "../../types/Function";
import { isObject } from "../../types/Object";
import { BackgroundPositionDTO } from "../backgroundPosition/BackgroundPositionDTO";
import { BackgroundPositionEntity } from "../backgroundPosition/BackgroundPositionEntity";
import { ColorEntity } from "../color/ColorEntity";
import { BackgroundRepeatType } from "../types/BackgroundRepeatType";
import { BackgroundDTO } from "./BackgroundDTO";
import { BackgroundImageDTO } from "../backgroundImage/BackgroundImageDTO";
import { BackgroundRepeatDTO } from "../backgroundRepeat/BackgroundRepeatDTO";
import { ColorDTO } from "../color/ColorDTO";
import { BackgroundAttachment } from "../types/BackgroundAttachment";
import { BackgroundBlendMode } from "../types/BackgroundBlendMode";
import { BackgroundClip } from "../types/BackgroundClip";
import { BackgroundOrigin } from "../types/BackgroundOrigin";
import { BackgroundPositionValue } from "../types/BackgroundPositionValue";
import { BackgroundPositionOptions } from "../types/BackgroundPositionOptions";
import { BackgroundSizeOptions } from "../types/BackgroundSizeOptions";
import { BackgroundImage } from "../backgroundImage/BackgroundImage";
import { BackgroundRepeat } from "../backgroundRepeat/BackgroundRepeat";
import { Color } from "../color/Color";
import { Entity } from "../types/Entity";

/**
 * Presents a background image value
 */
export interface Background extends Entity<BackgroundDTO> {

    /**
     * Returns the DTO object.
     */
    getDTO () : BackgroundDTO;

    /**
     * @inheritDoc
     */
    valueOf() : ReadonlyJsonObject;

    /**
     * @inheritDoc
     */
    toJSON () : ReadonlyJsonObject;

    /**
     * Returns CSS styles.
     */
    getCssStyles () : ReadonlyJsonObject;

    getAttachment () : BackgroundAttachment | undefined;
    getBlendMode () : BackgroundBlendMode | undefined;
    getClip () : BackgroundClip | undefined;
    getColor () : Color | undefined;
    getColorDTO () : ColorDTO | undefined;
    getImage () : BackgroundImage | undefined;
    getImageDTO () : BackgroundImageDTO | undefined;
    getOrigin () : BackgroundOrigin | undefined;
    getRepeat () : BackgroundRepeat | undefined;
    getRepeatDTO () : BackgroundRepeatDTO | undefined;
    getSize () : BackgroundSizeOptions | undefined;

    setAttachment (value : BackgroundAttachment | undefined) : this;
    setBlendMode (value : BackgroundBlendMode | undefined) : this;
    setClip (value : BackgroundClip | undefined) : this;
    setColor (value : ColorEntity | Color | ColorDTO | undefined) : this;
    setTransparentColor () : this;
    setSetTransparentColor () : this;
    setImage (value : BackgroundImage | BackgroundImageDTO | undefined) : this;
    setOrigin (value : BackgroundOrigin | undefined) : this;
    setRepeat (value : BackgroundRepeat | BackgroundRepeatDTO | undefined) : this;
    setSize (value : BackgroundSizeOptions | undefined) : this;

    attachment (value : BackgroundAttachment | undefined) : this;
    blendMode (value : BackgroundBlendMode | undefined) : this;
    clip (value : BackgroundClip | undefined) : this;
    color (value : ColorEntity | Color | ColorDTO | string | undefined) : this;
    transparentColor () : this;
    setTransparentColor () : this;
    image (value : BackgroundImage | BackgroundImageDTO | undefined) : this;
    origin (value : BackgroundOrigin | undefined) : this;

    repeat (value : BackgroundRepeat | BackgroundRepeatDTO | BackgroundRepeatType | undefined) : this;
    size (value : BackgroundSizeOptions | undefined) : this;


    getPosition () : BackgroundPositionEntity | undefined;
    getPositionDTO () : BackgroundPositionDTO | undefined;
    setPosition (value : BackgroundPositionValue | BackgroundPositionEntity | BackgroundPositionDTO | undefined) : this;
    position (value : BackgroundPositionValue | BackgroundPositionEntity | BackgroundPositionDTO | undefined) : this;

}

export function isBackground (value : unknown) : value is Background {
    return (
        isObject(value)
        && isFunction(value?.getDTO)
        && isFunction(value?.valueOf)
        && isFunction(value?.toJSON)
        && isFunction(value?.getCssStyles)
        && isFunction(value?.getUrl)
        && isFunction(value?.url)
    );
}

