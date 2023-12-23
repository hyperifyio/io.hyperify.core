// Copyright (c) 2023. Heusala Group Oy <info@heusalagroup.fi>. All rights reserved.

import { isString } from "../../types/String";
import { StyleEntity } from "../style/StyleEntity";
import { EntityFactoryImpl } from "../types/EntityFactoryImpl";
import { EntityPropertyImpl } from "../types/EntityPropertyImpl";
import { VariableType } from "../types/VariableType";
import { Component } from "./Component";
import { ComponentDTO } from "./ComponentDTO";

export const ComponentEntityFactory = (
    EntityFactoryImpl.create<ComponentDTO, Component>('Component')
                     .add( EntityPropertyImpl.create("value").setTypes(VariableType.STRING) )
                     .add( EntityPropertyImpl.createOptionalArray("content").setTypes('Component', VariableType.STRING) )
                     .add( EntityPropertyImpl.create("extend").setTypes(VariableType.STRING, VariableType.UNDEFINED) )
                     .add( EntityPropertyImpl.create("meta").setTypes(VariableType.JSON, VariableType.UNDEFINED) )
                     .add( EntityPropertyImpl.create("style").setTypes(StyleEntity, VariableType.UNDEFINED) )
);

export const BaseComponentEntity = ComponentEntityFactory.createEntityType();

export const isComponentDTO = ComponentEntityFactory.createTestFunctionOfDTO();

export const isComponent = ComponentEntityFactory.createTestFunctionOfInterface();

export const explainComponentDTO = ComponentEntityFactory.createExplainFunctionOfDTO();

export const isComponentDTOOrUndefined = ComponentEntityFactory.createTestFunctionOfDTOorOneOf(VariableType.UNDEFINED);
export const explainComponentDTOOrUndefined = ComponentEntityFactory.createExplainFunctionOfDTOorOneOf(VariableType.UNDEFINED);

export const isComponentDTOOrString = ComponentEntityFactory.createTestFunctionOfDTOorOneOf(VariableType.STRING);
export const explainComponentDTOOrString = ComponentEntityFactory.createExplainFunctionOfDTOorOneOf(VariableType.STRING);


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

}

/**
 * Returns true if the value is instance of ComponentEntity.
 *
 * @param value
 */
export function isComponentEntity (value: unknown): value is ComponentEntity {
    return value instanceof ComponentEntity;
}
