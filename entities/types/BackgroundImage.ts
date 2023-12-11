// Copyright (c) 2023. Sendanor <info@sendanor.fi>. All rights reserved.

import { ReadonlyJsonObject } from "../../Json";
import { isFunction } from "../../types/Function";
import { isObject } from "../../types/Object";
import { BackgroundImageDTO } from "../../dto/BackgroundImageDTO";
import { Entity } from "./Entity";

/**
 * Presents a background image value
 */
export interface BackgroundImage extends Entity<BackgroundImageDTO> {

    /**
     * Returns the DTO object.
     */
    getDTO () : BackgroundImageDTO;

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
     * Get url.
     */
    getUrl () : string;

    /**
     * Set image by URL.
     *
     * @param value
     * @param unit
     */
    url (value : string) : this;

}

export function isBackgroundImage (value : unknown) : value is BackgroundImage {
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

