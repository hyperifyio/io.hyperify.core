// Copyright (c) 2023. Sendanor <info@sendanor.fi>. All rights reserved.

import { ReadonlyJsonObject } from "../../Json";
import { Entity } from "../types/Entity";
import { ActionDTO } from "./ActionDTO";

/**
 * Presents an interface for SeoEntity.
 */
export interface Action extends Entity<ActionDTO> {

    /**
     * @inheritDoc
     */
    valueOf () : ReadonlyJsonObject;

    /**
     * @inheritDoc
     */
    getDTO () : ActionDTO;

    /**
     * @inheritDoc
     */
    toJSON () : ReadonlyJsonObject;

    /**
     * Returns CSS styles.
     */
    getCssStyles () : ReadonlyJsonObject;


    /**
     * Get a label.
     */
    getLabel () : string;

    /**
     * Set a label.
     *
     * @param label
     */
    setLabel (label : string) : this;

    /**
     * Set a label.
     *
     * An alias for `.setLabel(label)`.
     *
     * @param label
     */
    label (label : string) : this;


    /**
     * Get a target.
     */
    getTarget () : string;

    /**
     * Set a target.
     *
     * @param target
     */
    setTarget (target : string) : this;

    /**
     * Set a target.
     *
     * An alias for `.setTarget(target)`.
     *
     * @param target
     */
    target (target : string) : this;


    /**
     * Get a method.
     */
    getMethod () : string;

    /**
     * Set a method.
     *
     * @param method
     */
    setMethod (method : string) : this;

    /**
     * Set a method.
     *
     * An alias for `.setMethod(method)`.
     *
     * @param method
     */
    method (method : string) : this;


    /**
     * Get a body.
     */
    getBody () : ReadonlyJsonObject;

    /**
     * Set a body.
     *
     * @param body
     */
    setBody (body : ReadonlyJsonObject) : this;

    /**
     * Set a body.
     *
     * An alias for `.setBody(body)`.
     *
     * @param body
     */
    body (body : ReadonlyJsonObject) : this;


    /**
     * Get a success redirect.
     */
    getSuccessRedirect () : string | Action | undefined;

    /**
     * Set a successRedirect.
     *
     * @param successRedirect
     */
    setSuccessRedirect (successRedirect : string | Action | undefined) : this;

    /**
     * Set a success redirect.
     *
     * An alias for `.setSuccessRedirect(successRedirect)`.
     *
     * @param successRedirect
     */
    successRedirect (successRedirect : string | Action | undefined) : this;


    /**
     * Get a error redirect.
     */
    getErrorRedirect () : string | Action | undefined;

    /**
     * Set a error redirect.
     *
     * @param errorRedirect
     */
    setErrorRedirect (errorRedirect : string | Action | undefined) : this;

    /**
     * Set a error redirect.
     *
     * An alias for `.setErrorRedirect(errorRedirect)`.
     *
     * @param errorRedirect
     */
    errorRedirect (errorRedirect : string | Action | undefined) : this;


}
