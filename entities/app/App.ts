// Copyright (c) 2023. Sendanor <info@sendanor.fi>. All rights reserved.

import { ReadonlyJsonObject } from "../../Json";
import { ComponentDTO } from "../component/ComponentDTO";
import { AppDTO } from "./AppDTO";
import { RouteDTO } from "../route/RouteDTO";
import { ViewDTO } from "../view/ViewDTO";
import { ComponentEntity } from "../component/ComponentEntity";
import { ExtendableEntity } from "../types/ExtendableEntity";
import { RouteEntity } from "../route/RouteEntity";
import { ViewEntity } from "../view/ViewEntity";

/**
 * Interface for application definitions.
 */
export interface App
    extends ExtendableEntity<AppDTO> {


    /**
     * @inheritDoc
     */
    getName () : string;

    /**
     * @inheritDoc
     */
    name (name : string) : this;

    /**
     * @inheritDoc
     */
    setName (name : string) : this;


    /**
     * Get DTO presentation.
     */
    getDTO () : AppDTO;

    /**
     * @inheritDoc
     */
    valueOf() : ReadonlyJsonObject;

    /**
     * @inheritDoc
     */
    toJSON () : ReadonlyJsonObject;


    /**
     * @inheritDoc
     */
    getExtend () : string | undefined;

    /**
     * @inheritDoc
     */
    extend (name : string) : this;

    /**
     * @inheritDoc
     */
    setExtend (name : string) : this;


    /**
     * Add a route.
     *
     * @param route
     */
    addRoute (
        route : RouteDTO | RouteEntity | readonly (RouteDTO | RouteEntity)[]
    ) : this;

    /**
     * Add a view.
     *
     * @param view
     */
    addView (view : ViewDTO | ViewEntity | readonly (ViewDTO | ViewEntity)[]) : this;

    /**
     * Add a component.
     *
     * @param component
     */
    addComponent (component : ComponentDTO | ComponentEntity | readonly (ComponentDTO | ComponentEntity)[] ) : this;

    /**
     * Get the language.
     */
    getLanguage () : string | undefined;

    /**
     * Set the language.
     *
     * @param value
     */
    setLanguage (value : string) : this;

    /**
     * Get the public URL.
     */
    getPublicUrl () : string | undefined;

    /**
     * Set the public URL.
     *
     * @param value
     */
    setPublicUrl (value : string) : this;

}
