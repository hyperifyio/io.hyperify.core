// Copyright (c) 2023. Sendanor <info@sendanor.fi>. All rights reserved.

import { isFunction } from "../../types/Function";
import { isObject } from "../../types/Object";
import { DTO } from "./DTO";
import { Entity } from "./Entity";
import { EntityProperty } from "./EntityProperty";

/**
 * Interface for entity types, e.g. the public API for static methods in an
 * entity class.
 */
export interface EntityType<
    D extends DTO,
    T extends Entity<D>,
> {

    /**
     * The constructor
     */
    new (dto ?: D | undefined) : T;

    /**
     * The name of the entity.
     */
    getEntityName() : string;

    /**
     * Creates an entity with default values.
     */
    create () : T;

    /**
     * Creates an entity from a DTO object.
     *
     * @param dto
     */
    createFromDTO (
        dto : D,
    ) : T;

    /**
     * Return DTO property configurations.
     */
    getProperties () : readonly EntityProperty[];

    /**
     * Returns `true` if value is type of the entity.
     *
     * @param value
     */
    isEntity (value: unknown): value is T;

    /**
     * Returns a string explaining why the value is not a type of this entity, or otherwise that it is.
     *
     * @param value
     */
    explainEntity (value: unknown): string;

    /**
     * Returns `true` if value is type of the entity DTO object.
     *
     * @param value
     */
    isDTO (value: unknown): value is D;

}

export function isEntityType (value : unknown) : value is EntityType<DTO, any> {
    return (
        isObject(value)
        && isFunction(value?.create)
        && isFunction(value?.createFromDTO)
        && isFunction(value?.getProperties)
        && isFunction(value?.isEntity)
        && isFunction(value?.isDTO)
    );
}
