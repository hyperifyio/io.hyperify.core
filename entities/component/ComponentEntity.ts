// Copyright (c) 2023. Heusala Group Oy <info@heusalagroup.fi>. All rights reserved.

import { has } from "../../functions/has";
import { map } from "../../functions/map";
import { LogUtils } from "../../LogUtils";
import { isArray } from "../../types/Array";
import { isFunction } from "../../types/Function";
import { isObject } from "../../types/Object";
import { isString } from "../../types/String";
import { Style } from "../style/Style";
import { StyleDTO } from "../style/StyleDTO";
import { StyleEntity } from "../style/StyleEntity";
import { EntityFactoryImpl } from "../types/EntityFactoryImpl";
import { VariableType } from "../types/VariableType";
import { Component } from "./Component";
import {
    ComponentContent,
    ComponentContentItem,
    UnreparedComponentContent,
    UnreparedComponentContentItem,
} from "./ComponentContent";
import { ComponentDTO } from "./ComponentDTO";
import { ComponentType } from "./ComponentType";

export const ComponentEntityFactory = (
    EntityFactoryImpl.create<ComponentDTO, Component>('Component')
                     .add( EntityFactoryImpl.createProperty("name").setTypes(VariableType.STRING) )
                     .add( EntityFactoryImpl.createOptionalArrayProperty("content").setTypes('Component', VariableType.STRING) )
                     .add( EntityFactoryImpl.createProperty("extend").setTypes(VariableType.STRING, VariableType.UNDEFINED) )
                     .add( EntityFactoryImpl.createProperty("meta").setTypes(VariableType.JSON, VariableType.UNDEFINED) )
                     .add( EntityFactoryImpl.createProperty("style").setTypes(StyleEntity, VariableType.UNDEFINED) )
);

export const BaseComponentEntity = ComponentEntityFactory.createEntityType();

export const isComponentDTO = ComponentEntityFactory.createTestFunctionOfDTO();

export const isComponent = ComponentEntityFactory.createTestFunctionOfInterface();

export const explainComponentDTO = ComponentEntityFactory.createExplainFunctionOfDTO();

export const isComponentDTOOrUndefined = ComponentEntityFactory.createTestFunctionOfDTOorOneOf(VariableType.UNDEFINED);
export const explainComponentDTOOrUndefined = ComponentEntityFactory.createExplainFunctionOfDTOorOneOf(VariableType.UNDEFINED);

/**
 * Tries to detect if this value is an interface for static ComponentEntity.
 *
 * This function cannot really detect if the value has the correct interface.
 * It can only detect that the object has a create function.
 *
 * @param value
 * @todo Create support for this in ComponentEntityFactory
 */
export function isComponentType (value: unknown): value is ComponentType {
    return isObject(value) && isFunction(value?.create);
}

/**
 * Entity for components.
 *
 * @see {@link ComponentType} for the interface of static methods.
 */
export class ComponentEntity
    extends BaseComponentEntity
    implements Component
{

    /**
     * Create a component entity.
     *
     * @param name
     */
    public static create (
        name ?: string
    ) : ComponentEntity {
        return new this(name);
    }



    /**
     * Construct the component entity.
     *
     * @param name
     * @protected
     */
    protected constructor (
        name ?: string | ComponentDTO | undefined,
    ) {
        if (name === undefined) {
            super();
        } else if (isString(name)) {
            super( { name } );
        } else if (isComponentDTO(name)) {
            super( name );
        } else {
            throw new TypeError(`ComponentEntity: Incorrect arguments`);
        }
    }

    /**
     * @inheritDoc
     */
    public addContent ( value : UnreparedComponentContent ) : this {

        if ( isArray(value) ) {
            const prevContent : ComponentContent | undefined = this.getContent();
            return this.setContent( [
                ...(prevContent ? prevContent : []),
                ...map(
                    value,
                    (item: UnreparedComponentContentItem) : ComponentContentItem => {
                        if (isComponentEntity(item)) {
                            return item.getDTO();
                        }
                        if (isComponent(item)) {
                            return item.getDTO();
                        }
                        return item;
                    }
                ),
            ]);
        }

        if ( isString(value) || isComponentDTO(value) ) {
            const prevContent = this.getContent();
            return this.setContent( [
                ...(prevContent ? prevContent : []),
                value,
            ]);
        }

        if ( isComponentEntity(value) || isComponent(value) ) {
            const prevContent = this.getContent();
            return this.setContent( [
                ...(prevContent ? prevContent : []),
                value.getDTO(),
            ]);
        }

        throw new TypeError(`${this.getEntityType().getEntityName()}.addContent: Invalid argument: ${LogUtils.stringifyValue(value)}`);

    }

    /**
     * @inheritDoc
     */
    public add ( value : UnreparedComponentContent ) : this {
        return this.addContent(value);
    }

    /**
     * @inheritDoc
     */
    public addText ( value : string ) : this {
        return this.addContent(value);
    }

    /**
     * @inheritDoc
     */
    public getContentDTO () : ComponentContent | undefined {
        return this.getContent();
    }

    /**
     * @inheritDoc
     */
    public addStyles (style : Style | StyleEntity | StyleDTO | undefined) : this {
        return this.addStyle(style);
    }

}

/**
 * Returns true if the value is instance of ComponentEntity.
 *
 * @param value
 */
export function isComponentEntity (value: unknown): value is ComponentEntity {
    return value instanceof ComponentEntity;
}

export const isComponentDTOOrString = ComponentEntityFactory.createTestFunctionOfDTOorOneOf(VariableType.STRING);
export const explainComponentDTOOrString = ComponentEntityFactory.createExplainFunctionOfDTOorOneOf(VariableType.STRING);
