// Copyright (c) 2023. Sendanor <info@sendanor.fi>. All rights reserved.

import { Size } from "../size/Size";
import {
    SizeDTO,

} from "../size/SizeDTO";
import { ReadonlyJsonObject } from "../../Json";
import { SpecialSize } from "../size/SpecialSize";
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
     */
    getWidth () : SizeEntity | undefined;

    /**
     */
    getWidthDTO () : SizeDTO | undefined;

    /**
     * @param value
     */
    setWidth (
        value : SpecialSize.AUTO,
    ) : this;


    /**
     * @param value
     */
    setWidth (
        value : SizeDTO | Size | SizeEntity,
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
     * @param value
     */
    width (
        value : SizeDTO | Size | SizeEntity,
    ) : this;

    /**
     * @param value
     */
    width (
        value : SpecialSize.AUTO,
    ) : this;

    /**
     * @param value
     * @param unit
     */
    width (
        value ?: number | undefined,
        unit  ?: UnitType | undefined,
    ) : this;


    /**
     */
    getHeight () : SizeEntity | undefined;

    /**
     * Get height as a DTO.
     */
    getHeightDTO () : SizeDTO | undefined;

    /**
     * Set a height value as auto
     *
     * @param value
     */
    setHeight (
        value : SpecialSize.AUTO,
    ) : this;

    /**
     * Set a height as a unit.
     *
     * @param value
     * @param unit
     */
    setHeight (
        value ?: number | undefined,
        unit  ?: UnitType | undefined,
    ) : this;

    /**
     * Set a height value as auto
     *
     * @param value
     */
    height (
        value : SpecialSize.AUTO,
    ) : this;

    /**
     * Set a height as a unit.
     *
     * @param value
     * @param unit
     */
    height (
        value ?: number | undefined,
        unit  ?: UnitType | undefined,
    ) : this;

}
