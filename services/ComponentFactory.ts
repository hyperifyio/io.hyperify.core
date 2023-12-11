// Copyright (c) 2023. Sendanor <info@sendanor.fi>. All rights reserved.

import { ComponentDTO } from "../dto/ComponentDTO";

/**
 * Type of Component DTO factory function.
 */
export interface ComponentFactoryFunction {
    () : ComponentDTO;
}

/**
 * Interface for component DTO factories.
 */
export interface ComponentFactory {

    /**
     * Check if a component has been registered.
     *
     * @param name The name of the component
     */
    hasComponent (
        name : string,
    ) : boolean;

    /**
     * Register a component factory function.
     *
     * @param name The name of the component
     * @param factoryFunction The factory function for HyperComponentDTO
     */
    registerComponentConstructor (
        name : string,
        factoryFunction : ComponentFactoryFunction,
    ) : this;

    /**
     * Unregister a component factory function.
     *
     * @param name The name of the component
     */
    unregisterComponentConstructor (
        name : string,
    ) : this;

    /**
     * Creates a component DTO if name is registered.
     * Otherwise, returns `undefined`.
     *
     * @param name The name of the component
     */
    createComponentDTO (name : string) : ComponentDTO | undefined;

}
