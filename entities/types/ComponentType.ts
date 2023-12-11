// Copyright (c) 2023. Sendanor <info@sendanor.fi>. All rights reserved.

import { isFunction } from "../../types/Function";
import { isObject } from "../../types/Object";
import { ComponentEntity } from "../ComponentEntity";

/**
 * Public interface of static `ComponentEntity`.
 */
export interface ComponentType {
    create (name : string) : ComponentEntity;
}

/**
 * Tries to detect if this value is an interface for static ComponentEntity.
 *
 * This function cannot really detect if the value has the correct interface.
 * It can only detect that the object has a create function.
 *
 * @param value
 */
export function isComponentType (value: unknown): value is ComponentType {
    return isObject(value) && isFunction(value?.create);
}
