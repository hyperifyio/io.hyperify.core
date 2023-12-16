// Copyright (c) 2023. Sendanor <info@sendanor.fi>. All rights reserved.

import { has } from "../functions/has";
import { ComponentDTO } from "../entities/component/ComponentDTO";
import { ComponentFactoryImpl } from "./ComponentFactoryImpl";
import { ComponentFactoryFunction, ComponentFactory } from "./ComponentFactory";

/**
 * Global component factory service.
 */
export class ComponentFactoryService {

    /**
     *
     * @private
     */
    private static _factory : ComponentFactory = ComponentFactoryImpl.create();

    /**
     * Check if a component has been registered.
     *
     * @param name The name of the component
     */
    public static hasComponent (
        name : string,
    ) : boolean {
        return this._factory.hasComponent(name);
    }

    /**
     * Register a component factory function.
     *
     * @param name The name of the component
     * @param factoryFunction The factory function for HyperComponentDTO
     */
    public static registerComponentConstructor (
        name : string,
        factoryFunction : ComponentFactoryFunction,
    ) : ComponentFactory {
        return this._factory.registerComponentConstructor(name, factoryFunction);
    }

    /**
     * Unregister a component factory function.
     *
     * @param name The name of the component
     */
    public static unregisterComponentConstructor (
        name : string,
    ) : ComponentFactory {
        return this._factory.unregisterComponentConstructor(name);
    }

    /**
     * Creates a component DTO if name is registered.
     * Otherwise, returns `undefined`.
     *
     * @param name The name of the component DTO
     */
    public static createComponentDTO (
        name : string
    ) : ComponentDTO | undefined {
        return this._factory.createComponentDTO(name);
    }

    /**
     * Creates a new (empty) instance of component factory.
     */
    public static create () : ComponentFactory {
        return ComponentFactoryImpl.create();
    }

}
