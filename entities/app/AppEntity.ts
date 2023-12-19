// Copyright (c) 2023. Sendanor <info@sendanor.fi>. All rights reserved.

import { forEach } from "../../functions/forEach";
import { ReadonlyJsonObject } from "../../Json";
import { isArray } from "../../types/Array";
import { ComponentDTO } from "../component/ComponentDTO";
import { EntityFactoryImpl } from "../types/EntityFactoryImpl";
import { EntityPropertyImpl } from "../types/EntityPropertyImpl";
import { VariableType } from "../types/VariableType";
import { createAppDTO, AppDTO } from "./AppDTO";
import { RouteDTO } from "../route/RouteDTO";
import { ViewDTO } from "../view/ViewDTO";
import { App } from "./App";
import { ComponentEntity, isComponentEntity } from "../component/ComponentEntity";
import { Extendable } from "../types/Extendable";
import { JsonSerializable } from "../types/JsonSerializable";
import { isRouteEntity, RouteEntity } from "../route/RouteEntity";
import { isViewEntity, ViewEntity } from "../view/ViewEntity";

export const AppEntityFactory = (
    EntityFactoryImpl.create<AppDTO, App>('App')
                     .add( EntityPropertyImpl.create("value").setTypes(VariableType.STRING) )
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

