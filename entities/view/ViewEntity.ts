// Copyright (c) 2023-2024. Sendanor <info@sendanor.fi>. All rights reserved.

import { map } from "../../functions/map";
import { LogUtils } from "../../LogUtils";
import { isArray } from "../../types/Array";
import { isString } from "../../types/String";
import {
    UnreparedComponentContentItem,
    UnreparedComponentContent,
    ComponentDTOContentItem,
} from "../component/ComponentContent";
import {
    ComponentEntity,
    isComponent,
    isComponentDTO,
    isComponentEntity,
} from "../component/ComponentEntity";
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

export const BaseViewEntity = ViewEntityFactory.createEntityType();

export const isViewDTO = ViewEntityFactory.createTestFunctionOfDTO();

export const isView = ViewEntityFactory.createTestFunctionOfInterface();

export const explainViewDTO = ViewEntityFactory.createExplainFunctionOfDTO();

export const isViewDTOOrUndefined = ViewEntityFactory.createTestFunctionOfDTOorOneOf(VariableType.UNDEFINED);

export const explainViewDTOOrUndefined = ViewEntityFactory.createExplainFunctionOfDTOorOneOf(VariableType.UNDEFINED);


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

    public addContent ( value : UnreparedComponentContent ) : this {

        if ( isArray(value) ) {
            const prevContent = this.getContentDTO();
            return this.setContent( [
                ...(prevContent ? prevContent : []),
                ...map(
                    value,
                    (item: UnreparedComponentContentItem) : ComponentDTOContentItem => {
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
            const prevContent = this.getContentDTO();
            return this.setContent( [
                ...(prevContent ? prevContent : []),
                value,
            ]);
        }

        if ( isComponentEntity(value) || isComponent(value) ) {
            const prevContent = this.getContentDTO();
            return this.setContent( [
                ...(prevContent ? prevContent : []),
                value.getDTO(),
            ]);
        }

        console.log(`WOOT: value = `, value);
        throw new TypeError(`${this.getEntityType().getEntityName()}.addContent: Invalid argument: ${LogUtils.stringifyValue(value)}`);

    }

    public add ( value : UnreparedComponentContent ) : this {
        return this.addContent(value);
    }

    public addText ( value : string ) : this {
        return this.addContent(value);
    }

    public getRefresh () : number | null | undefined {
        return this.getMetaNumber("refresh");
    }

    public getIntervalRefresh () : number | null | undefined {
        return this.getMetaNumber("refresh");
    }

    public setRefresh (value: number | undefined) : this {
        return this.setMetaNumber("refresh", value);
    }

    public setIntervalRefresh (value: number | undefined) : this {
        return this.setRefresh(value);
    }

    public getTimestamp () : string | undefined {
        return this.getMetaString("timestamp");
    }

    public setTimestamp (value: string | undefined) : this {
        return this.setMetaString("timestamp", value);
    }

}

export function isViewEntity (value: unknown): value is ViewEntity {
    return value instanceof ViewEntity;
}
