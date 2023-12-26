// Copyright (c) 2023. Sendanor <info@sendanor.fi>. All rights reserved.

import { ReadonlyJsonObject } from "../../Json";
import { Component } from "../component/Component";
import { UnreparedComponentContent } from "../component/ComponentContent";
import { ComponentDTO } from "../component/ComponentDTO";
import { Seo } from "../seo/Seo";
import { SeoDTO } from "../seo/SeoDTO";
import { SeoEntity } from "../seo/SeoEntity";
import { StyleDTO } from "../style/StyleDTO";
import { ViewDTO } from "./ViewDTO";
import { ComponentEntity } from "../component/ComponentEntity";
import { StyleEntity } from "../style/StyleEntity";
import { ExtendableEntity } from "../types/ExtendableEntity";
import { Style } from "../style/Style";

/**
 * Interface for Hyper views.
 */
export interface View
 extends ExtendableEntity<ViewDTO>
{


    ////////////////////////////////////////////////////////////////////////////
    //////////////////////////////  standard methods  //////////////////////////
    ////////////////////////////////////////////////////////////////////////////


    /**
     * @inheritDoc
     */
    valueOf() : ReadonlyJsonObject;

    /**
     * @inheritDoc
     */
    toJSON () : ReadonlyJsonObject;

    /**
     *
     */
    getDTO () : ViewDTO;


    ////////////////////////////////////////////////////////////////////////////
    //////////////////////////////  name property  /////////////////////////////
    ////////////////////////////////////////////////////////////////////////////


    /**
     * @inheritDoc
     */
    getName () : string;
    setName (name : string) : this;
    name (name : string) : this;


    ////////////////////////////////////////////////////////////////////////////
    ////////////////////////////  extend property  /////////////////////////////
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
    ////////////////////////////  publicUrl property  //////////////////////////
    ////////////////////////////////////////////////////////////////////////////


    /**
     *
     */
    getPublicUrl () : string | undefined;

    /**
     *
     * @param value
     */
    setPublicUrl (value : string | undefined) : this;

    /**
     *
     * @param value
     */
    publicUrl (value : string | undefined) : this;


    ////////////////////////////////////////////////////////////////////////////
    /////////////////////////////  language property  //////////////////////////
    ////////////////////////////////////////////////////////////////////////////


    /**
     *
     */
    getLanguage () : string | undefined;

    /**
     *
     * @param value
     */
    setLanguage (value : string | undefined) : this;

    /**
     *
     * @param value
     */
    language (value : string | undefined) : this;


    ////////////////////////////////////////////////////////////////////////////
    ///////////////////////////////  seo property  /////////////////////////////
    ////////////////////////////////////////////////////////////////////////////


    getSeo () : SeoEntity | undefined;
    getSeoDTO () : SeoDTO | undefined;
    setSeo (value: SeoEntity | Seo | SeoDTO | undefined) : this;
    seo (value: SeoEntity | Seo | SeoDTO | undefined) : this;


    ////////////////////////////////////////////////////////////////////////////
    //////////////////////////////  style property  ////////////////////////////
    ////////////////////////////////////////////////////////////////////////////


    /**
     * Returns the style entity.
     */
    getStyle () : Style | undefined;

    /**
     * Returns the style DTO.
     */
    getStyleDTO () : StyleDTO | undefined;

    /**
     * Sets the style.
     *
     * @param value
     */
    setStyle (value : StyleEntity | Style | StyleDTO | undefined) : this;

    /**
     * Sets the style.
     *
     * @param value
     */
    style (value : StyleEntity | Style | StyleDTO | undefined) : this;


    ////////////////////////////////////////////////////////////////////////////
    ////////////////////////////  content property  ////////////////////////////
    ////////////////////////////////////////////////////////////////////////////


    getContent () : readonly (string|ComponentDTO)[];

    getContentDTO () : readonly (string|ComponentDTO)[];

    /**
     * Set inner content.
     *
     * @param value
     */
    setContent (value : readonly (string|ComponentDTO)[] ) : this;

    /**
     * Add inner content.
     *
     * @param value
     */
    add (value : UnreparedComponentContent ) : this;

    /**
     * Add inner content.
     *
     * @param value
     */
    addContent (value : UnreparedComponentContent ) : this;

    /**
     * Add inner text content.
     *
     * @param value
     */
    addText (value : string) : this;


    ////////////////////////////////////////////////////////////////////////////
    //////////////////////////////  meta property  /////////////////////////////
    ////////////////////////////////////////////////////////////////////////////

    getMeta () : ReadonlyJsonObject | undefined;

    /**
     *
     * @param value
     */
    setMeta (value: ReadonlyJsonObject | undefined) : this;

    /**
     *
     * @param value
     */
    meta (value: ReadonlyJsonObject | undefined) : this;

    /**
     * Set automatic refresh of the view after a timeout.
     *
     * See also `.setTimestamp()`.
     *
     * @param value
     */
    setRefresh (value: number) : this;

    /**
     * Set automatic refresh of the view after a timeout.
     *
     * @param value
     */
    setIntervalRefresh (value: number) : this;

    /**
     * Set timestamp of the view.
     *
     * This should be in ISO format like `'2023-11-29T21:38:38.483Z'`.
     *
     * Together with `.setRefresh()` this enables the view to update by intervals.
     *
     * @param value
     */
    setTimestamp (value: string) : this;

}
