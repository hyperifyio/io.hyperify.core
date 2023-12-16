// Copyright (c) 2023. Sendanor <info@sendanor.fi>. All rights reserved.

import {
    SizeDTO,
    SpecialSize,
} from "../size/SizeDTO";
import { ReadonlyJsonObject } from "../../Json";
import { isFunction } from "../../types/Function";
import { isObject } from "../../types/Object";
import {
    SizeDimensionsDTO,
} from "./SizeDimensionsDTO";
import { SizeEntity } from "../size/SizeEntity";
import { Entity } from "../types/Entity";
import { UnitType } from "../types/UnitType";

/**
 * Presents dimensions of a box (e.g. width, height)
 */
export interface SizeDimensions
    extends Entity<SizeDimensionsDTO> {

    /**
     * Returns the DTO object.
     */
    getDTO () : SizeDimensionsDTO;

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
    getWidth () : SizeEntity | undefined;

    /**
     * Get top size as a DTO.
     */
    getWidthDTO () : SizeDTO | undefined;

    /**
     * Set a top value as auto
     *
     * @param value
     */
    setWidth (
        value : SpecialSize.AUTO,
    ) : this;

    /**
     * Set a top as a unit.
     *
     * @param value
     * @param unit
     */
    setWidth (
        value ?: number | undefined,
        unit  ?: UnitType | undefined,
    ) : this;


    /**
     * Get a right size.
     */
    getHeight () : SizeEntity | undefined;

    /**
     * Get right size as a DTO.
     */
    getHeightDTO () : SizeDTO | undefined;

    /**
     * Set a right value as auto
     *
     * @param value
     */
    setHeight (
        value : SpecialSize.AUTO,
    ) : this;

    /**
     * Set a right as a unit.
     *
     * @param value
     * @param unit
     */
    setHeight (
        value ?: number | undefined,
        unit  ?: UnitType | undefined,
    ) : this;

}

export function isSizeDimensions (value : unknown) : value is SizeDimensions {
    return (
        isObject(value)
        && isFunction(value?.getDTO)
        && isFunction(value?.valueOf)
        && isFunction(value?.toJSON)
        && isFunction(value?.getCssStyles)
        && isFunction(value?.getWidth)
        && isFunction(value?.getWidthDTO)
        && isFunction(value?.setWidth)
        && isFunction(value?.getHeight)
        && isFunction(value?.getHeightDTO)
        && isFunction(value?.setHeight)
    );
}

