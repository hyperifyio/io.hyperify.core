// Copyright (c) 2023. Sendanor <info@sendanor.fi>. All rights reserved.

import { ComponentEntity } from "../component/ComponentEntity";
import { RouteEntity } from "../route/RouteEntity";
import { EntityFactoryImpl } from "../types/EntityFactoryImpl";
import { VariableType } from "../types/VariableType";
import { ViewEntity } from "../view/ViewEntity";
import { App } from "./App";
import { AppDTO } from "./AppDTO";

export const AppEntityFactory = (
    EntityFactoryImpl.create<AppDTO, App>('App')
                     .add( EntityFactoryImpl.createProperty("name").setTypes(VariableType.STRING) )
                     .add( EntityFactoryImpl.createArrayProperty("components").setTypes(ComponentEntity) )
                     .add( EntityFactoryImpl.createArrayProperty("views").setTypes(ViewEntity) )
                     .add( EntityFactoryImpl.createArrayProperty("routes").setTypes(RouteEntity) )
                     .add( EntityFactoryImpl.createProperty("extend").setTypes(VariableType.STRING, VariableType.UNDEFINED) )
                     .add( EntityFactoryImpl.createProperty("publicUrl").setTypes(VariableType.STRING, VariableType.UNDEFINED) )
                     .add( EntityFactoryImpl.createProperty("language").setTypes(VariableType.STRING, VariableType.UNDEFINED) )
);

export const isAppDTO = AppEntityFactory.createTestFunctionOfDTO();

export const explainAppDTO = AppEntityFactory.createExplainFunctionOfDTO();

export const isAppDTOOrUndefined = AppEntityFactory.createTestFunctionOfDTOorOneOf(VariableType.UNDEFINED);

export const explainAppDTOOrUndefined = AppEntityFactory.createExplainFunctionOfDTOorOneOf(VariableType.UNDEFINED);

export const BaseAppEntity = AppEntityFactory.createEntityType();


export class AppEntity
    extends BaseAppEntity
    implements App
{

    public static create (name ?: string) : AppEntity {
        return name ? (new this( )).setName(name) : (new this());
    }

    public constructor (
        dto ?: AppDTO,
    ) {
        super(dto);
    }

}

export function isHyperEntity (value: unknown): value is AppEntity {
    return value instanceof AppEntity;
}

