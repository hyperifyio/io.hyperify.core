// Copyright (c) 2023. Sendanor <info@sendanor.fi>. All rights reserved.

import { SizeDTO } from "../size/SizeDTO";
import { map } from "../../functions/map";
import { ReadonlyJsonObject } from "../../Json";
import { isArray } from "../../types/Array";
import { ComponentContent, ComponentDTO } from "../component/ComponentDTO";
import { SeoDTO } from "../seo/SeoDTO";
import { StyleDTO } from "../style/StyleDTO";
import { createViewDTO, ViewDTO } from "./ViewDTO";
import { ComponentEntity, isComponentEntity } from "../component/ComponentEntity";
import { isStyleEntity, StyleEntity } from "../style/StyleEntity";
import { EntityFactoryImpl } from "../types/EntityFactoryImpl";
import { VariableType } from "../types/EntityProperty";
import { EntityPropertyImpl } from "../types/EntityPropertyImpl";
import { isStyle, Style } from "../style/Style";
import { View } from "./View";


export const BaseViewEntityFactory = (
    EntityFactoryImpl.create<ViewDTO, View>()
    .add( EntityPropertyImpl.create("name").setTypes(VariableType.STRING) )
    .add( EntityPropertyImpl.create("extend").setTypes(VariableType.STRING, VariableType.UNDEFINED) )
    .add( EntityPropertyImpl.create("publicUrl").setTypes(VariableType.STRING, VariableType.UNDEFINED) )
    .add( EntityPropertyImpl.create("language").setTypes(VariableType.STRING, VariableType.UNDEFINED) )
);

export const BaseViewEntity = BaseViewEntityFactory.createEntityType();

/**
 * Entity for Hyper views.
 */
export class ViewEntity
    extends BaseViewEntity
    implements
        View
{

    public static create (name : string) : ViewEntity {
        return new ViewEntity(
            name,
        );
    }

    protected _name : string;
    protected _extend : string | undefined;
    protected _publicUrl : string | undefined;
    protected _language : string | undefined;
    protected _seo : SeoDTO | undefined;
    protected _style : StyleDTO | undefined;
    protected _content : ComponentContent | undefined;
    protected _meta : ReadonlyJsonObject | undefined;

    protected constructor (
        name : string,
    ) {
        this._name = name;
        this._extend = undefined;
        this._content = undefined;
    }

    /**
     * @inheritDoc
     */
    public getName () : string {
        return this._name;
    }

    /**
     * @inheritDoc
     */
    public getExtend () : string | undefined {
        return this._extend;
    }

    /**
     * @inheritDoc
     */
    public extend (name : string) : this {
        this._extend = name;
        return this;
    }

    /**
     * @inheritDoc
     */
    public getDTO () : ViewDTO {
        return createViewDTO(
            this._name,
            this._extend,
            this._publicUrl,
            this._language,
            this._seo,
            this._content ?? [],
            this._style,
            this._meta,
        );
    }

    /**
     * @inheritDoc
     */
    public valueOf() : ReadonlyJsonObject {
        return this.toJSON();
    }

    /**
     * @inheritDoc
     */
    public toJSON () : ReadonlyJsonObject {
        return this.getDTO() as unknown as ReadonlyJsonObject;
    }

    /**
     * @inheritDoc
     */
    public add (value : string | ComponentDTO | readonly (string|ComponentDTO|ComponentEntity)[] | ComponentEntity ) : this {

        if (isComponentEntity(value)) {
            value = [value.getDTO()];
        } else if (!isArray(value)) {
            value = [value];
        }

        const list : readonly (string | ComponentDTO)[] = map(
            value,
            (item : string | ComponentDTO | ComponentEntity) : string | ComponentDTO => isComponentEntity( item ) ? item.getDTO() : item
        ) as readonly (string | ComponentDTO)[];

        if (this._content === undefined) {
            this._content = list;
        } else if (!isArray(this._content)) {
            this._content = [this._content, ...list];
        } else {
            this._content = [...this._content, ...list];
        }

        return this;
    }

    /**
     * @inheritDoc
     */
    public addText (value : string) : this {
        return this.add(value);
    }

    /**
     * @inheritDoc
     */
    public getLanguage () : string | undefined {
        return this._language;
    }

    /**
     * @inheritDoc
     */
    public setLanguage (value : string) : this {
        this._language = value;
        return this;
    }

    /**
     * @inheritDoc
     */
    public getPublicUrl () : string | undefined {
        return this._publicUrl;
    }

    /**
     * @inheritDoc
     */
    public setPublicUrl (value : string | undefined) : this {
        this._publicUrl = value;
        return this;
    }

    /**
     * @inheritDoc
     */
    public setMeta (value: ReadonlyJsonObject) : this {
        if (this._meta) {
            this._meta = {
                ...this._meta,
                ...value,
            };
        } else {
            this._meta = {
                ...value,
            };
        }
        return this;
    }

    /**
     * @inheritDoc
     */
    public setRefresh (value: number) : this {
        return this.setMeta({
            refresh: value,
        });
    }

    /**
     * @inheritDoc
     */
    public setIntervalRefresh (value: number) : this {
        return this.setRefresh(value).setTimestamp(new Date().toISOString());
    }

    /**
     * @inheritDoc
     */
    public setTimestamp (value: string) : this {
        return this.setMeta({
            timestamp: value,
        });
    }

    /**
     * @inheritDoc
     */
    public getStyle () : Style | undefined {
        return this._style ? StyleEntity.createFromDTO(this._style) : undefined;
    }

    /**
     * @inheritDoc
     */
    public getStyleDTO () : StyleDTO | undefined {
        return this._style;
    }

    /**
     * @inheritDoc
     */
    public setStyle (value : StyleEntity | Style | StyleDTO | undefined) : this {
        if (isStyleEntity(value)) {
            this._style = value.getDTO();
        } else if (isStyle(value)) {
            this._style = value.getDTO();
        } else {
            this._style = value;
        }
        return this;
    }

}

export function isViewEntity (value: unknown): value is ViewEntity {
    return value instanceof ViewEntity;
}
