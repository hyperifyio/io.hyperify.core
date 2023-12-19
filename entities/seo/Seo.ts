// Copyright (c) 2023. Sendanor <info@sendanor.fi>. All rights reserved.

import { ReadonlyJsonObject } from "../../Json";
import { isFunction } from "../../types/Function";
import { isObject } from "../../types/Object";
import { Entity } from "../types/Entity";
import { SeoDTO } from "./SeoDTO";

/**
 * Presents an interface for SeoEntity.
 */
export interface Seo extends Entity<SeoDTO> {

    /**
     * @inheritDoc
     */
    valueOf () : ReadonlyJsonObject;

    /**
     * @inheritDoc
     */
    getDTO () : SeoDTO;

    /**
     * @inheritDoc
     */
    toJSON () : ReadonlyJsonObject;

    /**
     * Returns CSS styles.
     */
    getCssStyles () : ReadonlyJsonObject;


    /**
     * Get a title.
     */
    getTitle () : string | undefined;

    /**
     * Set a title.
     *
     * @param title
     */
    setTitle (title : string | undefined) : this;

    /**
     * Set a title.
     *
     * An alias for `.setTitle(title)`.
     *
     * @param title
     */
    title (title : string | undefined) : this;


    /**
     * Get a description.
     */
    getDescription () : string | undefined;

    /**
     * Set a description.
     *
     * @param description
     */
    setDescription (description : string | undefined) : this;

    /**
     * Set a description.
     *
     * An alias for `.setDescription(description)`.
     *
     * @param description
     */
    description (description : string | undefined) : this;


    /**
     * Get a siteName.
     */
    getSiteName () : string | undefined;

    /**
     * Set a siteName.
     *
     * @param siteName
     */
    setSiteName (siteName : string | undefined) : this;

    /**
     * Set a siteName.
     *
     * An alias for `.setSiteName(siteName)`.
     *
     * @param siteName
     */
    siteName (siteName : string | undefined) : this;


}

export function isSeo (value: unknown): value is Seo {
    return (
        isObject(value)
        && isFunction(value?.valueOf)
        && isFunction(value?.getDTO)
        && isFunction(value?.toJSON)
        && isFunction(value?.getCssStyles)
        && isFunction(value?.getTitle)
        && isFunction(value?.setTitle)
        && isFunction(value?.title)
        && isFunction(value?.getDescription)
        && isFunction(value?.setDescription)
        && isFunction(value?.description)
        && isFunction(value?.getSiteName)
        && isFunction(value?.setSiteName)
        && isFunction(value?.siteName)
    );
}
