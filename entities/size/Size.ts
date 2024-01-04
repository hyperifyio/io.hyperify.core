// Copyright (c) 2023. Sendanor <info@sendanor.fi>. All rights reserved.

import { ReadonlyJsonObject } from "../../Json";
import { isFunction } from "../../types/Function";
import { isObject } from "../../types/Object";
import {
    SizeDTO,

} from "./SizeDTO";
import { Entity } from "../types/Entity";
import { UnitType } from "../types/UnitType";
import { SpecialSize } from "./SpecialSize";

/**
 * Presents a color value
 */
export interface Size
    extends Entity<SizeDTO> {

    /**
     * Returns the DTO object.
     */
    getDTO () : SizeDTO;

    /**
     * @inheritDoc
     */
    valueOf() : ReadonlyJsonObject;

    /**
     * @inheritDoc
     */
    toJSON () : ReadonlyJsonObject;

    /**
     * Get a value.
     */
    getValue () : number | SpecialSize.AUTO;

    /**
     * Set a value.
     *
     * @param value
     */
    setValue (
        value : SpecialSize.AUTO,
    ) : this;

    /**
     * Set a value.
     *
     * @param value
     * @param unit
     */
    setValue (
        value : number,
        unit  ?: UnitType | undefined,
    ) : this;

    /**
     * Get unit type.
     */
    getUnit () : UnitType | undefined;

    /**
     * Get unit type. It is an alias.
     */
    getUnitType () : UnitType | undefined;

    /**
     * Returns CSS styles.
     */
    getCssStyles () : string;

    /**
     * Set the size to be special auto value.
     */
    setAuto () : this;

    /**
     * Returns true if the size is special auto value.
     */
    isAuto () : boolean;

}

export function isSize (value : unknown) : value is Size {
    return (
        isObject(value)
        && isFunction(value?.getDTO)
        && isFunction(value?.valueOf)
        && isFunction(value?.toJSON)
        && isFunction(value?.getValue)
        && isFunction(value?.setValue)
        && isFunction(value?.getUnitType)
        && isFunction(value?.getCssStyles)
    );
}

