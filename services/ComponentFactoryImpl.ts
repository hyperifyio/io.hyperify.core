// Copyright (c) 2023. Sendanor <info@sendanor.fi>. All rights reserved.

import { has } from "../functions/has";
import { ComponentDTO } from "../dto/ComponentDTO";
import { ComponentFactoryService } from "./ComponentFactoryService";
import { ComponentFactoryFunction, ComponentFactory } from "./ComponentFactory";

/**
 * Implementation for a component DTO factory.
 */
export class ComponentFactoryImpl implements ComponentFactory {

    /**
     * Internal object containing factory functions.
     *
     * @private
     */
    private readonly _factories : {
        [key: string]: ComponentFactoryFunction;
    };

    /**
     * The protected constructor.
     *
     * Use `ComponentFactoryImpl.create()` to instantiate the class.
     *
     * @protected
     */
    protected constructor () {
        this._factories = {};
    }

    /**
     * @inheritDoc
     */
    hasComponent (
        name : string,
    ) : boolean {
        return has(this._factories, name);
    }

    /**
     * @inheritDoc
     */
    public registerComponentConstructor (
        name : string,
        factoryFunction : ComponentFactoryFunction,
    ) : this {
        this._factories[name] = factoryFunction;
        return this;
    }

    /**
     * @inheritDoc
     */
    public unregisterComponentConstructor (
        name : string,
    ) : this {
        if (has(this._factories, name)) {
            delete this._factories[name];
        }
        return this;
    }

    /**
     * @inheritDoc
     */
    public createComponentDTO (
        name : string
    ) : ComponentDTO | undefined {
        if (has(this._factories, name)) {
            return this._factories[name]();
        }
        return undefined;
    }

    /**
     * Creates a new (empty) instance of component factory.
     */
    public static create () : ComponentFactory {
        return new this();
    }

}

export function isComponentFactoryImpl (value: unknown): value is ComponentFactoryService {
    return value instanceof ComponentFactoryImpl;
}
