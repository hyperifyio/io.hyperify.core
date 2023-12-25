// Copyright (c) 2023. Sendanor <info@sendanor.fi>. All rights reserved.

import { has } from "../../functions/has";
import {
    isReadonlyJsonAny,
    isReadonlyJsonObject,
    ReadonlyJsonObject,
} from "../../Json";
import { DTO } from "./DTO";
import { Entity } from "./Entity";
import { EntityType } from "./EntityType";

export abstract class BaseEntity<
    D extends DTO,
    T extends Entity<D>,
>
    implements Entity<D> {

    private _dto : D;

    public constructor (
        dto : D,
    ) {
        if (!isReadonlyJsonObject(dto)) {
            throw new TypeError(`BaseEntity.constructor: The DTO must be JSON serializable object: ${dto}`);
        }
        this._dto = dto;
    }

    protected _setPropertyValue (
        propertyName : string,
        value : unknown
    ) : this {
        if ( isReadonlyJsonAny(value) || value === undefined ) {
            this._dto = {
                ...this._dto,
                [propertyName]: value,
            };
        } else {
            throw new TypeError(`${this.getEntityType().getEntityName()}.${propertyName}: The type of value not supported: ${value}`);
        }
        return this;
    }

    protected _getPropertyValue (
        propertyName : string,
    ) : any | undefined {
        if (has(this._dto, propertyName)) {
            return (this._dto as any)[propertyName];
        } else {
            return undefined;
        }
    }

    public getDTO () : D {
        return this._dto;
    }

    public toJSON () : ReadonlyJsonObject {
        return this._dto as unknown as ReadonlyJsonObject;
    }

    public valueOf () : ReadonlyJsonObject {
        return this.toJSON();
    }

    abstract getEntityType () : EntityType<D, T>;

}
