// Copyright (c) 2023. Sendanor <info@sendanor.fi>. All rights reserved.

import { ReadonlyJsonObject } from "../../Json";
import { isFunction } from "../../types/Function";
import { isObject } from "../../types/Object";
import { BackgroundRepeatDTO } from "../../dto/BackgroundRepeatDTO";
import { BackgroundRepeatType } from "../../dto/types/BackgroundRepeatType";
import { Entity } from "./Entity";

/**
 * Presents a color value
 */
export interface BackgroundRepeat extends Entity<BackgroundRepeatDTO> {

    /**
     * Returns the DTO object.
     */
    getDTO () : BackgroundRepeatDTO;

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
    getCssStyles () : string;

    /**
     * Get x.
     */
    getX () : BackgroundRepeatType;

    /**
     * Get y.
     */
    getY () : BackgroundRepeatType;

    /**
     * Set x.
     *
     * @param value
     * @param unit
     */
    x (
        value : BackgroundRepeatType,
    ) : this;

    /**
     * Set y.
     *
     * @param value
     * @param unit
     */
    y (
        value : BackgroundRepeatType,
    ) : this;

    repeatX() : this;
    repeatY() : this;
    repeat() : this;
    space() : this;
    round() : this;
    noRepeat() : this;

}

export function isBackgroundRepeat (value : unknown) : value is BackgroundRepeat {
    return (
        isObject(value)
        && isFunction(value?.getDTO)
        && isFunction(value?.valueOf)
        && isFunction(value?.toJSON)
        && isFunction(value?.getCssStyles)
        && isFunction(value?.getX)
        && isFunction(value?.getY)
        && isFunction(value?.x)
        && isFunction(value?.y)
    );
}

