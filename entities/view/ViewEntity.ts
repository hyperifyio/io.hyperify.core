// Copyright (c) 2023. Sendanor <info@sendanor.fi>. All rights reserved.

import { isString } from "../../types/String";
import { ComponentDTO } from "../component/ComponentDTO";
import { ComponentEntity } from "../component/ComponentEntity";
import { SeoEntity } from "../seo/SeoEntity";
import { StyleEntity } from "../style/StyleEntity";
import { VariableType } from "../types/VariableType";
import { ViewDTO } from "./ViewDTO";
import { EntityFactoryImpl } from "../types/EntityFactoryImpl";
import { View } from "./View";

export const ViewEntityFactory = (
    EntityFactoryImpl.create<ViewDTO, View>('View')
                     .add( EntityFactoryImpl.createProperty("name").setTypes(VariableType.STRING) )
                     .add( EntityFactoryImpl.createProperty("extend").setTypes(VariableType.STRING, VariableType.UNDEFINED) )
                     .add( EntityFactoryImpl.createProperty("publicUrl").setTypes(VariableType.STRING, VariableType.UNDEFINED) )
                     .add( EntityFactoryImpl.createProperty("language").setTypes(VariableType.STRING, VariableType.UNDEFINED) )
                     .add( EntityFactoryImpl.createProperty("seo").setTypes(SeoEntity, VariableType.UNDEFINED) )
                     .add( EntityFactoryImpl.createProperty("style").setTypes(StyleEntity, VariableType.UNDEFINED) )
                     .add( EntityFactoryImpl.createOptionalArrayProperty("content").setTypes(VariableType.STRING, ComponentEntity) )
                     .add( EntityFactoryImpl.createProperty("meta").setTypes(VariableType.JSON, VariableType.UNDEFINED) )
);

export const isViewDTO = ViewEntityFactory.createTestFunctionOfDTO();

export const isView = ViewEntityFactory.createTestFunctionOfInterface();

export const explainViewDTO = ViewEntityFactory.createExplainFunctionOfDTO();

export const isViewDTOOrUndefined = ViewEntityFactory.createTestFunctionOfDTOorOneOf(VariableType.UNDEFINED);

export const explainViewDTOOrUndefined = ViewEntityFactory.createExplainFunctionOfDTOorOneOf(VariableType.UNDEFINED);

export const BaseViewEntity = ViewEntityFactory.createEntityType();


/**
 * Entity for Hyper views.
 */
export class ViewEntity
    extends BaseViewEntity
    implements
        View
{

    public static create (
        name ?: string | ViewDTO | undefined,
    ) : ViewEntity {
        return new ViewEntity(
            name,
        );
    }

    public constructor (
        name ?: string | ViewDTO | undefined,
    ) {
        if (isString(name)) {
            super({name});
        } else {
            super(name);
        }
    }

}

export function isViewEntity (value: unknown): value is ViewEntity {
    return value instanceof ViewEntity;
}
