// Copyright (c) 2023. Heusala Group Oy <info@heusalagroup.fi>. All rights reserved.

import { RouteDTO } from "./RouteDTO";
import { Extendable } from "../types/Extendable";
import { JsonSerializable } from "../types/JsonSerializable";
import { EntityFactoryImpl } from "../types/EntityFactoryImpl";
import { Route } from "./Route";
import { VariableType } from "../types/VariableType";
import { isString } from "../../types/String";


export const RouteEntityFactory = (
    EntityFactoryImpl.create<RouteDTO, Route>('Route')
        .add( EntityFactoryImpl.createProperty("name").setTypes(VariableType.STRING) )
        .add( EntityFactoryImpl.createProperty("path").setTypes(VariableType.STRING) )
        .add( EntityFactoryImpl.createProperty("extend").setTypes(VariableType.STRING, VariableType.UNDEFINED) )
        .add( EntityFactoryImpl.createProperty("publicUrl").setTypes(VariableType.STRING, VariableType.UNDEFINED) )
        .add( EntityFactoryImpl.createProperty("language").setTypes(VariableType.STRING, VariableType.UNDEFINED) )
        .add( EntityFactoryImpl.createProperty("view").setTypes(VariableType.STRING, VariableType.UNDEFINED) )
        .add( EntityFactoryImpl.createProperty("redirect").setTypes(VariableType.STRING, VariableType.UNDEFINED) )
);

export const isRoute = RouteEntityFactory.createTestFunctionOfInterface();

export const isRouteDTO = RouteEntityFactory.createTestFunctionOfDTO();

export const explainRouteDTO = RouteEntityFactory.createExplainFunctionOfDTO();

export const isRouteDTOOrUndefined = RouteEntityFactory.createTestFunctionOfDTOorOneOf(VariableType.UNDEFINED);

export const explainRouteDTOOrUndefined = RouteEntityFactory.createExplainFunctionOfDTOorOneOf(VariableType.UNDEFINED);

export const BaseRouteEntity = RouteEntityFactory.createEntityType();

export class RouteEntity
    extends BaseRouteEntity
    implements Extendable, JsonSerializable
{


    public static create () : RouteEntity;

    public static create (
        route : RouteDTO,
    ) : RouteEntity;

    public static create (
        name : string,
        path ?: string,
    ): RouteEntity

    public static create (
        name ?: RouteDTO | string | undefined,
        path ?: string | undefined,
    ) : RouteEntity {
        return new RouteEntity(name, path);
    }

    public constructor (
        name ?: RouteDTO | string | undefined,
        path ?: string | undefined,
    ) {
        if (name === undefined && path === undefined) {
            super();
        } else if (isString(name) && isString(path) ) {
            super(
                {
                    name,
                    path,
                }
            );
        } else if ( isRouteDTO(name) ) {
            super(name);
        } else {
            throw new TypeError(`new RouteEntity(): Incorrect arguments: ${name}, ${path}`);
        }
    }

}

export function isRouteEntity(value: unknown): value is RouteEntity {
    return value instanceof RouteEntity;
}
