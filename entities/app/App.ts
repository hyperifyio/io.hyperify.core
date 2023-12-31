// Copyright (c) 2023. Sendanor <info@sendanor.fi>. All rights reserved.

import { ReadonlyJsonObject } from "../../Json";
import { Component } from "../component/Component";
import { ComponentDTO } from "../component/ComponentDTO";
import { Route } from "../route/Route";
import { View } from "../view/View";
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


    ////////////////////////////////////////////////////////////////////////////
    //////////////////////////////  standard methods  //////////////////////////
    ////////////////////////////////////////////////////////////////////////////


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


    ////////////////////////////////////////////////////////////////////////////
    //////////////////////////////  name methods  //////////////////////////////
    ////////////////////////////////////////////////////////////////////////////


    /**
     * @inheritDoc
     */
    getName () : string;

    /**
     * @inheritDoc
     */
    setName (name : string) : this;

    /**
     * @inheritDoc
     */
    name (name : string) : this;


    ////////////////////////////////////////////////////////////////////////////
    ////////////////////////////  component methods  ///////////////////////////
    ////////////////////////////////////////////////////////////////////////////


    /**
     * Get components.
     */
    getComponents () : RouteEntity[];

    /**
     * Get components.
     */
    getComponentsDTO () : RouteDTO[];

    /**
     * Set components.
     *
     * @param components
     */
    setComponents (
        components : readonly (ComponentDTO | ComponentEntity | Component)[]
    ) : this;

    /**
     * Add a component.
     *
     * @param component
     */
    addComponent (component : ComponentDTO | ComponentEntity | readonly (ComponentDTO | ComponentEntity)[] ) : this;


    ////////////////////////////////////////////////////////////////////////////
    //////////////////////////////  view methods  //////////////////////////////
    ////////////////////////////////////////////////////////////////////////////


    /**
     * Get views.
     */
    getViews () : RouteEntity[];

    /**
     * Get views.
     */
    getViewsDTO () : RouteDTO[];

    /**
     * Set views.
     *
     * @param views
     */
    setViews (
        views : readonly (ViewDTO | ViewEntity | View)[]
    ) : this;

    /**
     * Add a view.
     *
     * @param view
     */
    addView (view : ViewDTO | ViewEntity | readonly (ViewDTO | ViewEntity)[]) : this;

    /**
     * Add a view.
     *
     * @param view
     */
    addViews (view : ViewDTO | ViewEntity | readonly (ViewDTO | ViewEntity)[]) : this;


    ////////////////////////////////////////////////////////////////////////////
    //////////////////////////////  route methods  /////////////////////////////
    ////////////////////////////////////////////////////////////////////////////


    /**
     * Get routes.
     *
     * @param routes
     */
    getRoutes () : RouteEntity[];

    /**
     * Get routes.
     *
     * @param routes
     */
    getRoutesDTO () : RouteDTO[];

    /**
     * Set routes.
     *
     * @param routes
     */
    setRoutes (
        routes : readonly (RouteDTO | RouteEntity | Route)[]
    ) : this;

    /**
     * Add a route.
     *
     * @param route
     */
    addRoute (
        route : RouteDTO | RouteEntity | readonly (RouteDTO | RouteEntity)[]
    ) : this;


    ////////////////////////////////////////////////////////////////////////////
    //////////////////////////////  extend methods  ////////////////////////////
    ////////////////////////////////////////////////////////////////////////////


    /**
     * @inheritDoc
     */
    getExtend () : string | undefined;

    /**
     * @inheritDoc
     */
    setExtend (name : string | undefined) : this;

    /**
     * @inheritDoc
     */
    extend (name : string | undefined) : this;


    ////////////////////////////////////////////////////////////////////////////
    ////////////////////////////  publicUrl methods  ///////////////////////////
    ////////////////////////////////////////////////////////////////////////////


    /**
     * Get the public URL.
     */
    getPublicUrl () : string | undefined;

    /**
     * Set the public URL.
     *
     * @param value
     */
    setPublicUrl (value : string | undefined) : this;

    /**
     * Set the public URL.
     *
     * @param value
     */
    publicUrl (value : string | undefined) : this;


    ////////////////////////////////////////////////////////////////////////////
    /////////////////////////////  language methods  ///////////////////////////
    ////////////////////////////////////////////////////////////////////////////


    /**
     * Get the language.
     */
    getLanguage () : string | undefined;

    /**
     * Set the language.
     *
     * @param value
     */
    setLanguage (value : string | undefined) : this;

    /**
     * Set the language.
     *
     * @param value
     */
    language (value : string | undefined) : this;


}
