// Copyright (c) 2023-2024. Sendanor <info@sendanor.fi>. All rights reserved.

import { ComponentDTO } from "../component/ComponentDTO";
import { ComponentEntity } from "../component/ComponentEntity";
import { RouteDTO } from "../route/RouteDTO";
import { RouteEntity } from "../route/RouteEntity";
import { EntityFactoryImpl } from "../types/EntityFactoryImpl";
import { VariableType } from "../types/VariableType";
import { ViewDTO } from "../view/ViewDTO";
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

    public addView (view : ViewDTO | ViewEntity | readonly (ViewDTO | ViewEntity)[]) : this {
        return this.addViews(view);
    }

    public addComponent (component : ComponentDTO | ComponentEntity | readonly (ComponentDTO | ComponentEntity)[]) : this {
        return this.addComponents(component);
    }

    public addRoute (route : RouteDTO | RouteEntity | readonly (RouteDTO | RouteEntity)[]) : this {
        return this.addRoutes(route);
    }

}

export function isHyperEntity (value: unknown): value is AppEntity {
    return value instanceof AppEntity;
}

