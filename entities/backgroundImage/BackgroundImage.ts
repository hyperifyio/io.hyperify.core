// Copyright (c) 2023. Sendanor <info@sendanor.fi>. All rights reserved.

import { ReadonlyJsonObject } from "../../Json";
import { BackgroundImageDTO } from "./BackgroundImageDTO";
import { Entity } from "../types/Entity";

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
