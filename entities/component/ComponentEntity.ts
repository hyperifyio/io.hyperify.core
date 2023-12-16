// Copyright (c) 2023. Heusala Group Oy <info@heusalagroup.fi>. All rights reserved.

import { has } from "../../functions/has";
import { map } from "../../functions/map";
import { isReadonlyJsonArray, isReadonlyJsonArrayOf, isReadonlyJsonObject, ReadonlyJsonAny, ReadonlyJsonArray, ReadonlyJsonArrayOf, ReadonlyJsonObject } from "../../Json";
import { isArray } from "../../types/Array";
import { isBoolean } from "../../types/Boolean";
import { isNumber } from "../../types/Number";
import { isString } from "../../types/String";
import { TestCallbackNonStandard } from "../../types/TestCallback";
import { createComponentDTO, ComponentContent, ComponentDTO } from "./ComponentDTO";
import { StyleDTO } from "../style/StyleDTO";
import { Component } from "./Component";
import { isStyle, Style } from "../style/Style";
import { isStyleEntity, StyleEntity } from "../style/StyleEntity";

/**
 * Type for internal component content.
 */
export type ComponentEntityContent = string | ComponentEntity | ComponentDTO | readonly (string|ComponentEntity|ComponentDTO)[];

/**
 * Entity for components.
 */
export class ComponentEntity
    implements Component
{

    /**
     * The name of the component.
     *
     * @protected
     */
    protected _name : string;

    /**
     * Name of another component where to extend.
     * @protected
     */
    protected _extend : string | undefined;

    /**
     * Inner content.
     *
     * @protected
     */
    protected _content : ComponentContent | undefined;

    /**
     * Meta information.
     *
     * @protected
     */
    protected _meta : ReadonlyJsonObject | undefined;

    /**
     * Style information.
     *
     * @protected
     */
    protected _style : StyleDTO | undefined;

    /**
     * Construct the component entity.
     *
     * @param name
     * @protected
     */
    protected constructor (
        name : string,
    ) {
        this._name = name;
        this._extend = undefined;
        this._content = undefined;
        this._meta = undefined;
        this._style = undefined;
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
    public getDTO () : ComponentDTO {
        return createComponentDTO(
            this._name,
            this._extend,
            this._content ?? [],
            this._meta,
            this._style,
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
    public hasMeta (name : string) : boolean {
        return this._meta ? has(this._meta, name) : false;
    }

    /**
     * @inheritDoc
     */
    public getMeta (name : string) : ReadonlyJsonAny | undefined {
        return this._meta && has(this._meta, name) ? this._meta[name] as ReadonlyJsonAny : undefined;
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
    public getMetaString (name : string) : string | undefined {
        if (!(this._meta && has(this._meta, name))) return undefined;
        const value : unknown = this._meta[name];
        return isString(value) ? value : undefined;
    }

    /**
     * @inheritDoc
     */
    public setMetaString (name : string, value: string) : this {
        return this.setMeta({
            [name]: value,
        });
    }

    /**
     * @inheritDoc
     */
    public getMetaBoolean (name : string) : boolean | undefined {
        if (!(this._meta && has(this._meta, name))) return undefined;
        const value : unknown = this._meta[name];
        return isBoolean(value) ? value : undefined;
    }

    /**
     * @inheritDoc
     */
    public setMetaBoolean (name : string, value: boolean) : this {
        return this.setMeta({
            [name]: value,
        });
    }

    /**
     * @inheritDoc
     */
    public getMetaNumber (name : string) : number | undefined {
        if (!(this._meta && has(this._meta, name))) return undefined;
        const value : unknown = this._meta[name];
        return isNumber(value) ? value : undefined;
    }

    /**
     * @inheritDoc
     */
    public setMetaNumber (name : string, value: number) : this {
        return this.setMeta({
            [name]: value,
        });
    }

    /**
     * @inheritDoc
     */
    public getMetaObject (name : string) : ReadonlyJsonObject | null | undefined {
        if (!(this._meta && has(this._meta, name))) return undefined;
        const value : unknown = this._meta[name];
        return isReadonlyJsonObject(value) ? value : undefined;
    }

    /**
     * @inheritDoc
     */
    public setMetaObject (name : string, value: ReadonlyJsonObject | null) : this {
        return this.setMeta({
            [name]: value,
        });
    }

    /**
     * @inheritDoc
     */
    public getMetaArray (
        name : string,
    ) : ReadonlyJsonArray | undefined {
        if (!(this._meta && has(this._meta, name))) return undefined;
        const value : unknown = this._meta[name];
        return isReadonlyJsonArray(value) ? value : undefined;
    }

    /**
     * @inheritDoc
     */
    public getMetaArrayOf<T extends ReadonlyJsonAny = ReadonlyJsonAny> (
        name : string,
        isItemOf : TestCallbackNonStandard,
    ) : ReadonlyJsonArrayOf<T> | undefined {
        if (!(this._meta && has(this._meta, name))) return undefined;
        const value : unknown = this._meta[name];
        return isReadonlyJsonArrayOf<T>(value, isItemOf) ? value : undefined;
    }

    /**
     * @inheritDoc
     */
    public setMetaArray<T extends ReadonlyJsonAny = ReadonlyJsonAny> (name : string, value: ReadonlyJsonArrayOf<T> | null) : this {
        return this.setMeta({
            [name]: value,
        });
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
    public getExtend () : string | undefined {
        return this._extend;
    }

    /**
     * @inheritDoc
     */
    public add (value : ComponentEntityContent) : this {

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
    public setStyle (
        style : Style | StyleEntity | StyleDTO | undefined,
    ) : this {
        this._style = style ? StyleEntity.toDTO(style) : undefined;
        return this;
    }

    /**
     * @inheritDoc
     */
    public addStyles (
        style : Style | StyleEntity | StyleDTO | undefined,
    ) : this {
        return style ? this.setStyle(
            this._style
                ? StyleEntity.merge( this._style, style )
                : style
        ) : this;
    }

    /**
     * @inheritDoc
     */
    public getStyle () : Style {
        return StyleEntity.createFromDTO(this._style);
    }

    /**
     * Create a component entity.
     *
     * @param name
     */
    public static create (name : string) : ComponentEntity {
        return new this(name);
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
