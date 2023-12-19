// Copyright (c) 2023. Sendanor <info@sendanor.fi>. All rights reserved.

import { ReadonlyJsonObject } from "../../Json";
import { isFunction } from "../../types/Function";
import { isObject } from "../../types/Object";
import { ColorDTO } from "./ColorDTO";
import { Entity } from "../types/Entity";

/**
 * Presents an interface for color value
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
    setValue (value : string) : this;

    /**
     * Set a value.
     *
     * An alias for `.setValue(value)`.
     *
     * @param value
     */
    value (value : string) : this;

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
