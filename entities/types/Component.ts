// Copyright (c) 2023. Sendanor <info@sendanor.fi>. All rights reserved.

import { ReadonlyJsonAny, ReadonlyJsonArray, ReadonlyJsonArrayOf, ReadonlyJsonObject } from "../../Json";
import { isFunction } from "../../types/Function";
import { isObject } from "../../types/Object";
import { TestCallbackNonStandard } from "../../types/TestCallback";
import { ComponentDTO } from "../../dto/ComponentDTO";
import { StyleDTO } from "../../dto/StyleDTO";
import { ComponentEntityContent } from "../ComponentEntity";
import { StyleEntity } from "../StyleEntity";
import { ExtendableEntity } from "./ExtendableEntity";
import { Style } from "./Style";

/**
 * Interface for Component entities.
 */
export interface Component
    extends ExtendableEntity<ComponentDTO>
{

    /**
     * @inheritDoc
     */
    getName () : string;

    /**
     * @inheritDoc
     */
    extend (name : string) : this;

    /**
     * @inheritDoc
     */
    getExtend () : string | undefined;

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

    /**
     * Returns true if the meta property exists.
     *
     * @param name
     */
    hasMeta (name : string) : boolean;

    /**
     * Returns the value of a meta property.
     * @param name
     */
    getMeta (name : string) : any | undefined;

    /**
     * Set internal meta object.
     *
     * @param value
     */
    setMeta (value: ReadonlyJsonObject) : this;

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
    getMetaNumber (name : string) : number | undefined;

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
    getMetaBoolean (name : string) : boolean | undefined;

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
    getMetaArrayOf<T extends ReadonlyJsonAny = ReadonlyJsonAny> (name : string, isItemOf : TestCallbackNonStandard) : ReadonlyJsonArrayOf<T> | undefined;

    /**
     * Set a value of internal array meta property.
     *
     * @param name
     * @param value
     */
    setMetaArray (name : string, value: ReadonlyJsonArray) : this;

    /**
     * Add inner content.
     *
     * @param value
     */
    add (value : ComponentEntityContent) : this;

    /**
     * Add inner content as a string.
     *
     * @param value
     */
    addText (value : string) : this;

    /**
     * Set internal style entity.
     *
     * @param style
     */
    setStyle (style : Style | StyleEntity | StyleDTO | undefined) : this;

    /**
     * Merges more styles.
     *
     * @param style
     */
    addStyles (style : Style | StyleEntity | StyleDTO | undefined) : this;

    /**
     * Get internal style entity.
     */
    getStyle () : Style;

}

/**
 * Tries to detect if this value is an interface for Component.
 *
 * This function cannot really detect if the value has the correct interface.
 * It can only detect that the object has a create function.
 *
 * @param value
 */
export function isComponent (value: unknown): value is Component {
    return (
        isObject(value)
        && isFunction(value?.getName)
        && isFunction(value?.getDTO)
        && isFunction(value?.valueOf)
        && isFunction(value?.toJSON)
        && isFunction(value?.hasMeta)
        && isFunction(value?.getMeta)
        && isFunction(value?.setMeta)
        && isFunction(value?.getMetaString)
        && isFunction(value?.setMetaString)
        && isFunction(value?.getMetaNumber)
        && isFunction(value?.setMetaNumber)
        && isFunction(value?.getMetaBoolean)
        && isFunction(value?.setMetaBoolean)
        && isFunction(value?.getMetaObject)
        && isFunction(value?.setMetaObject)
        && isFunction(value?.extend)
        && isFunction(value?.getExtend)
        && isFunction(value?.add)
        && isFunction(value?.addText)
    );
}
