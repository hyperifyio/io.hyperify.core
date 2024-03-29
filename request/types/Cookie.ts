// Copyright (c) 2023-2024. Heusala Group Oy <info@heusalagroup.fi>. All rights reserved.

import { CookieLike } from "./CookieLike";
import { SameSite } from "../../types/SameSite";
import { CookieOptionsLike } from "./CookieOptionsLike";

export class Cookie implements CookieLike {

    private _name : string;
    private _path : string | undefined;
    private _value : string | undefined;
    private _domain : string | undefined;
    private _expires : string | undefined;
    private _httpOnly : boolean | undefined;
    private _partitioned : boolean | undefined;
    private _secure : boolean | undefined;
    private _maxAge : number | undefined;
    private _sameSite : SameSite | undefined;

    private constructor (
        name        : string,
        value       : string | undefined,
        path        : string | undefined,
        domain      : string | undefined,
        expires     : string | undefined,
        httpOnly    : boolean | undefined,
        secure      : boolean | undefined,
        partitioned : boolean | undefined,
        maxAge      : number | undefined,
        sameSite    : SameSite | undefined,
    ) {
        this._path = path;
        this._name = name;
        this._value = value;
        this._domain = domain;
        this._expires = expires;
        this._httpOnly = httpOnly;
        this._secure = secure;
        this._partitioned = partitioned;
        this._maxAge = maxAge;
        this._sameSite = sameSite;
    }

    public static create (
        name       : string,
        value      : string | undefined = undefined,
        options   ?: CookieOptionsLike | undefined,
    ) : CookieLike {
        return new Cookie(
            name,
            value,
            options ? options.getPath() : undefined,
            options ? options.getDomain() : undefined,
            options ? options.getExpires() : undefined,
            options ? options.getHttpOnly() : undefined,
            options ? options.getSecure() : undefined,
            options ? options.getPartitioned() : undefined,
            options ? options.getMaxAge() : undefined,
            options ? options.getSameSite() : undefined,
        );
    }

    public getName (): string {
        return this._name;
    }

    public setName (name: string): this {
        this._name = name;
        return this;
    }


    public getValue (): string | undefined {
        return this._value;
    }

    public setValue (value: string | undefined): this {
        this._value = value;
        return this;
    }


    public getDomain (): string | undefined {
        return this._domain;
    }

    public getExpires (): string | undefined {
        return this._expires;
    }

    public getHttpOnly (): boolean | undefined {
        return this._httpOnly;
    }

    public getMaxAge (): number | undefined {
        return this._maxAge;
    }

    public getPath (): string | undefined {
        return this._path;
    }

    public getSameSite (): SameSite | undefined {
        return this._sameSite;
    }

    public getSecure (): boolean | undefined {
        return this._secure;
    }

    public getPartitioned (): boolean | undefined {
        return this._partitioned;
    }

    public setDomain (domain: string | undefined): this {
        this._domain = domain;
        return this;
    }

    public setExpires (expires: string | undefined): this {
        this._expires = expires;
        return this;
    }

    public setHttpOnly (httpOnly: boolean | undefined): this {
        this._httpOnly = httpOnly;
        return this;
    }

    public setMaxAge (maxAge: number | undefined): this {
        this._maxAge = maxAge;
        return this;
    }

    public setPath (path: string | undefined): this {
        this._path = path;
        return this;
    }

    public setSameSite (sameSite: SameSite | undefined): this {
        this._sameSite = sameSite;
        return this;
    }

    public setSecure (secure: boolean): this {
        this._secure = secure;
        return this;
    }

    public setPartitioned (partitioned: boolean): this {
        this._partitioned = partitioned;
        return this;
    }

}
