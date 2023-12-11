// Copyright (c) 2023. Sendanor <info@sendanor.fi>. All rights reserved.

import { has } from "../../functions/has";
import {
    isReadonlyJsonAny,
    ReadonlyJsonObject,
} from "../../Json";
import { DTO } from "../../dto/types/DTO";
import { Entity } from "./Entity";
import { EntityType } from "./EntityType";

export abstract class BaseEntity<
    D extends DTO,
    T extends Entity<D>,
>
    implements Entity<D> {

    protected _dto : D;

    public constructor (
        dto : D,
    ) {
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
            throw new TypeError(`The type of value not supported: ${value}`);
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
