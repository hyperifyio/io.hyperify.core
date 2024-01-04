// Copyright (c) 2023. Sendanor <info@sendanor.fi>. All rights reserved.

import {
    BorderDTO,
} from "../border/BorderDTO";
import { ReadonlyJsonObject } from "../../Json";
import { isFunction } from "../../types/Function";
import { isObject } from "../../types/Object";
import {
    BorderBoxDTO,
} from "./BorderBoxDTO";
import { BorderEntity } from "../border/BorderEntity";
import { Border } from "../border/Border";
import { Entity } from "../types/Entity";

/**
 * Presents a box of borders (e.g. top, right, bottom, left)
 */
export interface BorderBox
    extends Entity<BorderBoxDTO> {

    /**
     * Returns the DTO object.
     */
    getDTO () : BorderBoxDTO;

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


    /**
     * Get a top border.
     */
    getTop () : BorderEntity | undefined;

    /**
     * Get top border as a DTO.
     */
    getTopDTO () : BorderDTO | undefined;

    /**
     * Set a top border.
     *
     * @param value
     */
    setTop (
        value ?: BorderEntity | Border | BorderDTO | undefined,
    ) : this;


    /**
     * Get a right border.
     */
    getRight () : BorderEntity | undefined;

    /**
     * Get right border as a DTO.
     */
    getRightDTO () : BorderDTO | undefined;

    /**
     * Set a right border.
     *
     * @param value
     */
    setRight (
        value ?: BorderEntity | Border | BorderDTO | undefined,
    ) : this;


    /**
     * Get a bottom border.
     */
    getBottom () : BorderEntity | undefined;

    /**
     * Get bottom border as a DTO.
     */
    getBottomDTO () : BorderDTO | undefined;

    /**
     * Set a bottom border.
     *
     * @param value
     */
    setBottom (
        value ?: BorderEntity | Border | BorderDTO | undefined,
    ) : this;


    /**
     * Get a left border.
     */
    getLeft () : BorderEntity | undefined;

    /**
     * Get left border as a DTO.
     */
    getLeftDTO () : BorderDTO | undefined;

    /**
     * Set a left border.
     *
     * @param value
     */
    setLeft (
        value ?: BorderEntity | Border | BorderDTO | undefined,
    ) : this;

}
