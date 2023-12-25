// Copyright (c) 2023. Sendanor <info@sendanor.fi>. All rights reserved.

import { EntityFactoryImpl } from "../types/EntityFactoryImpl";
import { VariableType } from "../types/VariableType";
import { AppDTO } from "./AppDTO";
import { App } from "./App";

export const AppEntityFactory = (
    EntityFactoryImpl.create<AppDTO, App>('App')
                     .add( EntityFactoryImpl.createProperty("value").setTypes(VariableType.STRING) )
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

