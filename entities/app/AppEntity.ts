// Copyright (c) 2023. Sendanor <info@sendanor.fi>. All rights reserved.

import { forEach } from "../../functions/forEach";
import { ReadonlyJsonObject } from "../../Json";
import { isArray } from "../../types/Array";
import { ComponentDTO } from "../component/ComponentDTO";
import { createAppDTO, AppDTO } from "./AppDTO";
import { RouteDTO } from "../route/RouteDTO";
import { ViewDTO } from "../view/ViewDTO";
import { App } from "./App";
import { ComponentEntity, isComponentEntity } from "../component/ComponentEntity";
import { Extendable } from "../types/Extendable";
import { JsonSerializable } from "../types/JsonSerializable";
import { isRouteEntity, RouteEntity } from "../route/RouteEntity";
import { isViewEntity, ViewEntity } from "../view/ViewEntity";

export class AppEntity
    implements
        App
{

    public static create (name : string) : AppEntity {
        return new this(name);
    }

    protected _name : string;
    protected _extend : string | undefined;
    protected _components : ComponentDTO[];
    protected _views : ViewDTO[];
    protected _routes : RouteDTO[];
    protected _publicUrl ?: string;
    protected _language ?: string;

    protected constructor (
        name : string,
    ) {
        this._name = name;
        this._extend = undefined;
        this._components = [];
        this._views = [];
        this._routes = [];
        this._publicUrl = undefined;
        this._language = undefined;
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
    public getDTO () : AppDTO {
        return createAppDTO(
            this._name,
            this._extend,
            this._routes,
            this._publicUrl,
            this._language,
            this._components,
            this._views,
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
    public addRoute (
        route : RouteDTO | RouteEntity | readonly (RouteDTO | RouteEntity)[]
    ) : this {
        if ( isArray(route) ) {
            forEach(
                route,
                (item: RouteDTO | RouteEntity) : void => {
                    this.addRoute(item);
                }
            );
        } else if( isRouteEntity(route) ) {
            this._routes.push( route.getDTO() );
        } else {
            this._routes.push( route );
        }
        return this;
    }

    /**
     * @inheritDoc
     */
    public addView (view : ViewDTO | ViewEntity | readonly (ViewDTO | ViewEntity)[]) : this {
        if ( isArray(view) ) {
            forEach(
                view,
                (item: ViewDTO | ViewEntity) : void => {
                    this.addView(item);
                }
            );
        } else if( isViewEntity(view) ) {
            this._views.push( view.getDTO() );
        } else {
            this._views.push( view );
        }
        return this;
    }

    /**
     * @inheritDoc
     */
    public addComponent (component : ComponentDTO | ComponentEntity | readonly (ComponentDTO | ComponentEntity)[] ) : this {
        if ( isArray(component) ) {
            forEach(
                component,
                (item: ComponentDTO | ComponentEntity) : void => {
                    this.addComponent(item);
                }
            );
        } else if( isComponentEntity(component) ) {
            this._components.push( component.getDTO() );
        } else {
            this._components.push( component );
        }
        return this;
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
    public setPublicUrl (value : string) : this {
        this._publicUrl = value;
        return this;
    }

}

export function isHyperEntity (value: unknown): value is AppEntity {
    return value instanceof AppEntity;
}

