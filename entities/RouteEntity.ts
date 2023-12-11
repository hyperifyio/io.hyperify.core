// Copyright (c) 2023. Heusala Group Oy <info@heusalagroup.fi>. All rights reserved.

import { ReadonlyJsonObject } from "../Json";
import { createRouteDTO, RouteDTO } from "../dto/RouteDTO";
import { Extendable } from "./types/Extendable";
import { JsonSerializable } from "./types/JsonSerializable";

export class RouteEntity
    implements
        Extendable,
        JsonSerializable
{

    public static create (
        name : string,
        path : string,
    ) : RouteEntity {
        return new RouteEntity( name, path );
    }


    protected _name : string;
    protected _path : string;
    protected _extend : string | undefined;
    protected _view : string | undefined;
    protected _language : string | undefined;
    protected _publicUrl : string | undefined;
    protected _redirect : string | undefined;

    protected constructor (
        name : string,
        path : string,
    ) {
        this._name = name;
        this._path = path;
        this._extend = undefined;
    }

    /**
     * @inheritDoc
     */
    public getName () : string {
        return this._name;
    }

    public getPath () : string {
        return this._path;
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

    public getView () : string | undefined {
        return this._view;
    }

    public setView (view : string) : this {
        this._view = view;
        return this;
    }

    public getLanguage () : string | undefined {
        return this._language;
    }

    public getPublicUrl () : string | undefined {
        return this._publicUrl;
    }

    public getRedirect () : string | undefined {
        return this._redirect;
    }

    public setRedirect (redirect : string | undefined) : this {
        this._redirect = redirect;
        return this;
    }

    public getDTO () : RouteDTO {
        return createRouteDTO(
            this._name,
            this._path,
            this._extend,
            this._publicUrl,
            this._language,
            this._view,
            this._redirect,
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

}

export function isRouteEntity (value: unknown): value is RouteEntity {
    return value instanceof RouteEntity;
}

