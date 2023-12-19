// Copyright (c) 2023. Sendanor <info@sendanor.fi>. All rights reserved.

import { ReadonlyJsonObject } from "../../Json";
import { DTO } from "./DTO";
import { BaseEntity } from "./BaseEntity";
import { Entity } from "./Entity";
import {
    EntityProperty,
    EntityPropertyType,
} from "./EntityProperty";
import { EntityType } from "./EntityType";
import { IsDTOTestFunction } from "./IsDTOTestFunction";

export type ArrayMapMethod<
    I = any,
    R = any,
> = (item: I) => R;

export type GetterMethod<
    D extends DTO,
    T extends BaseEntity<D, T>,
    R = any
> = (this: T) => R;

export type SetterMethod<
    D extends DTO,
    T extends BaseEntity<D, T>,
    R = any
> = (this: T, value: R) => T;

export interface TypeCheckFn {
    (value: unknown): boolean;
}

export interface TypeExplainFn {
    (value: unknown): string;
}

export interface PropertyTypeCheckFn {
    (value: ReadonlyJsonObject): boolean;
}

export interface CreateEntityTypeOpts {
    readonly immutable ?: boolean,
    readonly name ?: string,
}

/**
 * Factory for entity classes.
 */
export interface EntityFactory<
    D extends DTO,
    T extends Entity<D>,
> {

    /**
     * Get all defined properties.
     */
    getProperties () : readonly EntityProperty[];

    /**
     * Create a new property object, to be used with `.add( .createProperty(name) ... )`.
     *
     * @param name
     */
    createProperty (name : string) : EntityProperty;

    /**
     * Add a property with name and type(s).
     *
     * @param name The name of the property
     * @param types Type(s) of the property
     */
    add (name: string, ...types : EntityPropertyType[]) : this;

    /**
     * Add a property with a property entity.
     *
     * @param item The property
     */
    add (item: EntityProperty) : this;

    /**
     * Creates a default DTO object.
     */
    createDefaultDTO () : D;

    /**
     * Creates a test function for DTO object.
     */
    createTestFunctionOfDTO () : IsDTOTestFunction<D>;

    /**
     * Creates an entity constructor by default name.
     */
    createEntityType () : EntityType<D, T>;

    /**
     * Creates an entity constructor by another name.
     */
    createEntityType (
        name : string,
    ) : EntityType<D, T>;

    /**
     * Creates an entity constructor by name and options.
     *
     * @param name
     * @param opts
     */
    createEntityType (
        name : string,
        opts: CreateEntityTypeOpts,
    ) : EntityType<D, T>;

    /**
     * Creates an entity constructor by default name and options.
     *
     * @param opts
     */
    createEntityType (
        opts: CreateEntityTypeOpts,
    ) : EntityType<D, T>;

}
