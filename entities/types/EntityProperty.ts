// Copyright (c) 2023. Sendanor <info@sendanor.fi>. All rights reserved.

import { DTO } from "../../dto/types/DTO";
import { Entity } from "./Entity";
import { EntityType } from "./EntityType";

export enum VariableType {
    STRING = "string",
    NUMBER = "number",
    INTEGER = "integer",
    BOOLEAN = "boolean",
    NULL = "null",
    UNDEFINED = "undefined",
}

/**
 *
 */
export type EntityPropertyType = EntityType<any, Entity<any>> | VariableType;

/**
 *
 */
export type EntityPropertyValue = Entity<any> | string | number | boolean | null | undefined | EntityPropertyValue[];

/**
 * Presents a property of an entity or entity DTO with a name and type(s).
 */
export interface EntityProperty {

    /**
     * The name of property
     */
    getPropertyName () : string;

    /**
     * Accepted type(s) of the property.
     */
    getTypes () : readonly EntityPropertyType[];

    /**
     * Set types.
     *
     * @param types
     */
    setTypes (
        ...types : readonly EntityPropertyType[]
    ): this;

    /**
     * Alternative alias for .setTypes()
     *
     * @param types
     */
    types (
        ...types : readonly EntityPropertyType[]
    ) : this;

    /**
     *
     */
    getDefaultValue () : EntityPropertyValue;

    /**
     *
     * @param value
     */
    setDefaultValue (value: EntityPropertyValue) : this;

    /**
     * Alternative name for .setDefaultValue()
     *
     * @param value
     */
    defaultValue (value: EntityPropertyValue) : this;

    /**
     * Returns names for getter functions.
     */
    getGetterNames () : readonly string[];

    /**
     * Returns names for setter functions.
     */
    getSetterNames () : readonly string[];

    /**
     * Returns `true` if this property is an array.
     */
    isArray () : boolean;

    /**
     * Returns `true` if this property may be undefined.
     */
    isOptional () : boolean;

}
