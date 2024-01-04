// Copyright (c) 2023. Sendanor <info@sendanor.fi>. All rights reserved.

import {
    EntityVariableType,
    EntityVariableValue,
} from "./EntityVariableType";

/**
 * Presents a property of an entity or entity DTO with a name and type(s).
 */
export interface EntityProperty {

    /**
     * The name of property
     */
    getPropertyName () : string;

    /**
     * Returns a list of method aliases. These are in the format of properties,
     * e.g. `"unitType"` creates `getUnitType()` alias for `getUnit()`.
     */
    getMethodAliases () : readonly string[];

    /**
     * Accepted type(s) of the property.
     */
    getTypes () : readonly EntityVariableType[];

    /**
     * Set types.
     *
     * @param types
     */
    setTypes (
        ...types : readonly EntityVariableType[]
    ): this;

    /**
     * Alternative alias for .setTypes()
     *
     * @param types
     */
    types (
        ...types : readonly EntityVariableType[]
    ) : this;

    /**
     *
     */
    getDefaultValue () : EntityVariableValue;

    /**
     *
     * @param value
     */
    setDefaultValue (value: EntityVariableValue) : this;

    /**
     * Alternative name for .setDefaultValue()
     *
     * @param value
     */
    defaultValue (value: EntityVariableValue) : this;

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
