// Copyright (c) 2023. Sendanor <info@sendanor.fi>. All rights reserved.

import { ReadonlyJsonObject } from "../../Json";
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
