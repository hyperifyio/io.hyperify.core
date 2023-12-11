// Copyright (c) 2023. Sendanor <info@sendanor.fi>. All rights reserved.

import { ReadonlyJsonObject } from "../../Json";
import { isFunction } from "../../types/Function";
import { isObject } from "../../types/Object";
import { BackgroundDTO } from "../../dto/BackgroundDTO";
import { BackgroundImageDTO } from "../../dto/BackgroundImageDTO";
import { BackgroundRepeatDTO } from "../../dto/BackgroundRepeatDTO";
import { ColorDTO } from "../../dto/ColorDTO";
import { BackgroundAttachment } from "../../dto/types/BackgroundAttachment";
import { BackgroundBlendMode } from "../../dto/types/BackgroundBlendMode";
import { BackgroundClip } from "../../dto/types/BackgroundClip";
import { BackgroundOrigin } from "../../dto/types/BackgroundOrigin";
import { BackgroundPosition } from "../../dto/types/BackgroundPosition";
import { BackgroundPositionOptions } from "../../dto/types/BackgroundPositionOptions";
import { BackgroundSizeOptions } from "../../dto/types/BackgroundSizeOptions";
import { BackgroundImage } from "./BackgroundImage";
import { BackgroundRepeat } from "./BackgroundRepeat";
import { Color } from "./Color";
import { Entity } from "./Entity";

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
    getPosition () : BackgroundPositionOptions | undefined;
    getRepeat () : BackgroundRepeat | undefined;
    getRepeatDTO () : BackgroundRepeatDTO | undefined;
    getSize () : BackgroundSizeOptions | undefined;

    attachment (value : BackgroundAttachment | undefined) : this;
    blendMode (value : BackgroundBlendMode | undefined) : this;
    clip (value : BackgroundClip | undefined) : this;
    color (value : Color | ColorDTO | undefined) : this;
    transparentColor () : this;
    setTransparentColor () : this;
    image (value : BackgroundImage | BackgroundImageDTO | undefined) : this;
    origin (value : BackgroundOrigin | undefined) : this;

    position (
        a : BackgroundPosition | undefined,
        b : BackgroundPosition | undefined,
    ) : this;
    position (value : BackgroundPositionOptions | undefined) : this;

    repeat (value : BackgroundRepeat | BackgroundRepeatDTO | undefined) : this;
    size (value : BackgroundSizeOptions | undefined) : this;

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

