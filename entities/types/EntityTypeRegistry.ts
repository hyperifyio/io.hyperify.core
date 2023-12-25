// Copyright (c) 2023. Sendanor <info@sendanor.fi>. All rights reserved.

import { Entity } from "./Entity";
import { EntityType } from "./EntityType";

/**
 * Interface for entity type registry.
 */
export interface EntityTypeRegistry {

    /**
     * Destroy global state.
     */
    destroy () : this;

    /**
     * Unregister previously registered entity type by name.
     */
    deleteType ( name : string) : this;

    /**
     * Check if entity exists by name.
     *
     * @param name
     */
    hasType ( name : string) : boolean;

    /**
     * Returns the entity by name, otherwise undefined.
     *
     * @param name
     */
    findType ( name : string) : EntityType<any, Entity<any>> | undefined;

    /**
     * Register a type.
     *
     * @param name
     * @param Type
     */
    registerType (
        name : string,
        Type: EntityType<any, Entity<any>>,
    ) : this;

}
