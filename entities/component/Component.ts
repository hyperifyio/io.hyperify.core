// Copyright (c) 2023-2024. Sendanor <info@sendanor.fi>. All rights reserved.

import { ReadonlyJsonAny, ReadonlyJsonArray, ReadonlyJsonArrayOf, ReadonlyJsonObject } from "../../Json";
import { TestCallbackNonStandard } from "../../types/TestCallback";
import {
    ComponentContent,
    ComponentDTOContent,
    UnreparedComponentContent,
} from "./ComponentContent";
import { ComponentDTO } from "./ComponentDTO";
import { StyleDTO } from "../style/StyleDTO";
import { StyleEntity } from "../style/StyleEntity";
import { ExtendableEntity } from "../types/ExtendableEntity";
import { Style } from "../style/Style";

/**
 * Interface for Component entities.
 *
 * @see {@link ComponentEntity} for the implementation.
 * @see {@link ComponentType} for the static API.
 */
export interface Component
    extends ExtendableEntity<ComponentDTO>
{

    ////////////////////////////////////////////////////////////////////////////
    //////////////////////////////  standard methods  //////////////////////////
    ////////////////////////////////////////////////////////////////////////////


    /**
     * Get component DTO
     */
    getDTO () : ComponentDTO;

    /**
     * Get value of component, e.g. a JSON object.
     */
    valueOf() : ReadonlyJsonObject;

    /**
     * Get JSON presentation of the component.
     */
    toJSON () : ReadonlyJsonObject;


    ////////////////////////////////////////////////////////////////////////////
    ////////////////////////////////  name methods  ////////////////////////////
    ////////////////////////////////////////////////////////////////////////////


    /**
     * @inheritDoc
     */
    getName () : string;

    setName (name : string) : this;

    name (name : string) : this;


    ////////////////////////////////////////////////////////////////////////////
    //////////////////////////////  content methods  ///////////////////////////
    ////////////////////////////////////////////////////////////////////////////


    /**
     * Get inner content.
     */
    getContent () : ComponentContent | undefined;

    /**
     * Get inner content.
     */
    getContentDTO () : ComponentDTOContent | undefined;

    /**
     * Get inner content.
     */
    setContent (value : UnreparedComponentContent | undefined) : this;

    /**
     * Get inner content.
     */
    content (value : UnreparedComponentContent | undefined) : this;

    /**
     * Add inner content.
     *
     * @param value
     */
    add (value : UnreparedComponentContent) : this;

    /**
     * Add inner content.
     *
     * @param value
     */
    addContent (value : UnreparedComponentContent) : this;

    /**
     * Add inner content as a string.
     *
     * @param value
     */
    addText (value : string) : this;


    ////////////////////////////////////////////////////////////////////////////
    ///////////////////////////////  extend methods  ///////////////////////////
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
    ///////////////////////////////  meta methods  /////////////////////////////
    ////////////////////////////////////////////////////////////////////////////


    /**
     * Get internal meta object.
     */
    getMeta () : ReadonlyJsonObject | undefined;

    /**
     * Set internal meta object.
     *
     * @param value
     */
    setMeta ( value: ReadonlyJsonObject | undefined ) : this;

    /**
     * Set internal meta object.
     *
     * @param value
     */
    meta ( value: ReadonlyJsonObject | undefined ) : this;


    /**
     * Returns true if the meta property exists.
     *
     * @param name
     */
    hasMetaProperty (name : string) : boolean;

    /**
     * Returns the value of a meta property.
     * @param name
     */
    getMetaProperty (name : string) : any | undefined;

    /**
     * Get a value of internal string meta property.
     *
     * @param name
     */
    getMetaString (name : string) : string | undefined;

    /**
     * Set a value of internal string meta property.
     *
     * @param name
     * @param value
     */
    setMetaString (name : string, value: string) : this;

    /**
     * Get a value of internal number meta property.
     *
     * @param name
     */
    getMetaNumber (name : string) : number | null | undefined;

    /**
     * Set a value of internal number meta property.
     *
     * @param name
     * @param value
     */
    setMetaNumber (name : string, value: number) : this;

    /**
     * Get a value of internal boolean meta property.
     *
     * @param name
     */
    getMetaBoolean (name : string) : boolean | null | undefined;

    /**
     * Set a value of internal boolean meta property.
     *
     * @param name
     * @param value
     */
    setMetaBoolean (name : string, value: boolean) : this;

    /**
     * Get a value of internal object meta property.
     *
     * @param name
     */
    getMetaObject (name : string) : ReadonlyJsonObject | null | undefined;

    /**
     * Set a value of internal object meta property.
     *
     * @param name
     * @param value
     */
    setMetaObject (name : string, value: ReadonlyJsonObject | null) : this;

    /**
     * Get a value of internal array meta property.
     *
     * @param name
     */
    getMetaArray (name : string) : ReadonlyJsonArray | undefined;

    /**
     * Get a value of internal array meta property.
     *
     * @param name
     */
    getMetaArrayOf<T extends ReadonlyJsonAny = ReadonlyJsonAny> (
        name : string,
        isItemOf : TestCallbackNonStandard,
    ) : ReadonlyJsonArrayOf<T> | undefined;

    /**
     * Set a value of internal array meta property.
     *
     * @param name
     * @param value
     */
    setMetaArray (name : string, value: ReadonlyJsonArray) : this;


    ////////////////////////////////////////////////////////////////////////////
    ///////////////////////////////  style methods  ////////////////////////////
    ////////////////////////////////////////////////////////////////////////////


    /**
     * Get internal style entity.
     */
    getStyle () : Style;

    /**
     * Get internal style DTO.
     */
    getStyleDTO () : StyleDTO;

    /**
     * Set internal style entity.
     *
     * @param style
     */
    setStyle (style : Style | StyleEntity | StyleDTO | undefined) : this;

    /**
     * Alias for setStyle().
     *
     * @param style
     */
    style (style : Style | StyleEntity | StyleDTO | undefined) : this;

    /**
     * Merges more styles.
     *
     * @param style
     */
    addStyle (style : Style | StyleEntity | StyleDTO | undefined) : this;
    addStyles (style : Style | StyleEntity | StyleDTO | undefined) : this;


}
