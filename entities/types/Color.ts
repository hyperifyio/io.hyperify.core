// Copyright (c) 2023. Sendanor <info@sendanor.fi>. All rights reserved.

import { ReadonlyJsonObject } from "../../Json";
import { isFunction } from "../../types/Function";
import { isObject } from "../../types/Object";
import { ColorDTO } from "../../dto/ColorDTO";
import { Entity } from "./Entity";

/**
 * Presents a color value
 */
export interface Color extends Entity<ColorDTO> {

    /**
     * @inheritDoc
     */
    valueOf () : ReadonlyJsonObject;

    /**
     *
     */
    getDTO () : ColorDTO;

    /**
     * @inheritDoc
     */
    toJSON () : ReadonlyJsonObject;

    /**
     * Get a value.
     */
    getValue () : string;

    /**
     * Set a value.
     *
     * @param value
     */
    setValue (value : string ) : this;

    /**
     * Returns CSS styles.
     */
    getCssStyles () : string;

}

export function isColor (value : unknown) : value is Color {
    return (
        isObject(value)
        && isFunction(value?.valueOf)
        && isFunction(value?.getDTO)
        && isFunction(value?.toJSON)
        && isFunction(value?.getValue)
        && isFunction(value?.setValue)
        && isFunction(value?.getCssStyles)
    );
}
