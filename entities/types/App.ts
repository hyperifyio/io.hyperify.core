// Copyright (c) 2023. Sendanor <info@sendanor.fi>. All rights reserved.

import { ReadonlyJsonObject } from "../../Json";
import { ComponentDTO } from "../../dto/ComponentDTO";
import { AppDTO } from "../../dto/AppDTO";
import { RouteDTO } from "../../dto/RouteDTO";
import { ViewDTO } from "../../dto/ViewDTO";
import { ComponentEntity } from "../ComponentEntity";
import { ExtendableEntity } from "./ExtendableEntity";
import { RouteEntity } from "../RouteEntity";
import { ViewEntity } from "../ViewEntity";

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
