// Copyright (c) 2023. Heusala Group Oy <info@heusalagroup.fi>. All rights reserved.

import { map } from "../../functions/map";
import { LogUtils } from "../../LogUtils";
import { isArray } from "../../types/Array";
import { isString } from "../../types/String";
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
 * Entity for components.
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

    public add ( value : UnreparedComponentContent ) : this {
        return this.addContent(value);
    }

    public addText ( value : string ) : this {
        return this.addContent(value);
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
