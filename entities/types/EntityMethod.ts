// Copyright (c) 2023. Sendanor <info@sendanor.fi>. All rights reserved.

import { Enum } from "../../types/Enum";
import { Entity } from "./Entity";
import { EntityType } from "./EntityType";
import { VariableType } from "./VariableType";

/**
 *
 */
export type EntityMethodType = EntityType<any, Entity<any>> | Enum<any> | VariableType | string;

/**
 * Presents a property of an entity or entity DTO with a name and type(s).
 */
export interface EntityMethod {

    /**
     * The name of property
     */
    getMethodName () : string;

    /**
     * Returns a list of method aliases. These are in the format of properties,
     * e.g. `"unitType"` creates `getUnitType()` alias for `getUnit()`.
     */
    getMethodAliases () : readonly string[];

    /**
     * Accepted argument type(s) of the method
     */
    getArguments () : readonly (readonly EntityMethodType[])[];

    /**
     * Add a new argument as type(s).
     *
     * @param types
     */
    addArgument (
        ...types : readonly EntityMethodType[]
    ): this;

    /**
     * Accepted type of the return type.
     */
    getReturnType () : readonly EntityMethodType[];

    /**
     * Set types.
     *
     * @param types
     */
    setReturnType (
        ...types : readonly EntityMethodType[]
    ): this;

    /**
     * Alternative alias for .setArgs()
     *
     * @param types
     */
    returnType (
        ...types : readonly EntityMethodType[]
    ) : this;

    /**
     * Returns `true` if this method may be undefined.
     */
    isOptional () : boolean;

}
