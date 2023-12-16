// Copyright (c) 2023. Sendanor <info@sendanor.fi>. All rights reserved.

import {
    SizeDTO,
    SpecialSize,
} from "../size/SizeDTO";
import { ReadonlyJsonObject } from "../../Json";
import { isFunction } from "../../types/Function";
import { isObject } from "../../types/Object";
import {
    SizeBoxDTO,
} from "./SizeBoxDTO";
import { SizeEntity } from "../size/SizeEntity";
import { Entity } from "../types/Entity";
import { UnitType } from "../types/UnitType";

/**
 * Presents a box of sizes (e.g. top, bottom, left, right)
 */
export interface SizeBox
    extends Entity<SizeBoxDTO> {

    /**
     * Returns the DTO object.
     */
    getDTO () : SizeBoxDTO;

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
     * Get a top size.
     */
    getTop () : SizeEntity | undefined;

    /**
     * Get top size as a DTO.
     */
    getTopDTO () : SizeDTO | undefined;

    /**
     * Set a top value as auto
     *
     * @param value
     */
    setTop (
        value : SpecialSize.AUTO,
    ) : this;

    /**
     * Set a top as a unit.
     *
     * @param value
     * @param unit
     */
    setTop (
        value ?: number | undefined,
        unit  ?: UnitType | undefined,
    ) : this;


    /**
     * Get a right size.
     */
    getRight () : SizeEntity | undefined;

    /**
     * Get right size as a DTO.
     */
    getRightDTO () : SizeDTO | undefined;

    /**
     * Set a right value as auto
     *
     * @param value
     */
    setRight (
        value : SpecialSize.AUTO,
    ) : this;

    /**
     * Set a right as a unit.
     *
     * @param value
     * @param unit
     */
    setRight (
        value ?: number | undefined,
        unit  ?: UnitType | undefined,
    ) : this;


    /**
     * Get a bottom size.
     */
    getBottom () : SizeEntity | undefined;

    /**
     * Get bottom size as a DTO.
     */
    getBottomDTO () : SizeDTO | undefined;

    /**
     * Set a bottom value as auto
     *
     * @param value
     */
    setBottom (
        value : SpecialSize.AUTO,
    ) : this;

    /**
     * Set a bottom as a unit.
     *
     * @param value
     * @param unit
     */
    setBottom (
        value ?: number | undefined,
        unit  ?: UnitType | undefined,
    ) : this;


    /**
     * Get a left size.
     */
    getLeft () : SizeEntity | undefined;

    /**
     * Get left size as a DTO.
     */
    getLeftDTO () : SizeDTO | undefined;

    /**
     * Set a left value as auto
     *
     * @param value
     */
    setLeft (
        value : SpecialSize.AUTO,
    ) : this;

    /**
     * Set a left as a unit.
     *
     * @param value
     * @param unit
     */
    setLeft (
        value ?: number | undefined,
        unit  ?: UnitType | undefined,
    ) : this;

}

export function isSizeBox (value : unknown) : value is SizeBox {
    return (
        isObject(value)
        && isFunction(value?.getDTO)
        && isFunction(value?.valueOf)
        && isFunction(value?.toJSON)
        && isFunction(value?.getCssStyles)
        && isFunction(value?.getTop)
        && isFunction(value?.getTopDTO)
        && isFunction(value?.setTop)
        && isFunction(value?.getRight)
        && isFunction(value?.getRightDTO)
        && isFunction(value?.setRight)
        && isFunction(value?.getBottom)
        && isFunction(value?.getBottomDTO)
        && isFunction(value?.setBottom)
        && isFunction(value?.getLeft)
        && isFunction(value?.getLeftDTO)
        && isFunction(value?.setLeft)
    );
}

