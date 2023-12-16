// Copyright (c) 2023. Sendanor <info@sendanor.fi>. All rights reserved.

import { ReadonlyJsonObject } from "../../Json";
import { ComponentDTO } from "../component/ComponentDTO";
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
     *
     */
    getDTO () : ViewDTO;

    /**
     * Add inner content.
     *
     * @param value
     */
    add (value : string | ComponentDTO | readonly (string|ComponentDTO|ComponentEntity)[] | ComponentEntity ) : this;

    /**
     * Add inner text content.
     *
     * @param value
     */
    addText (value : string) : this;

    /**
     *
     */
    getLanguage () : string | undefined;

    /**
     *
     * @param value
     */
    setLanguage (value : string) : this;

    /**
     *
     */
    getPublicUrl () : string | undefined;

    /**
     *
     * @param value
     */
    setPublicUrl (value : string) : this;

    /**
     *
     * @param value
     */
    setMeta (value: ReadonlyJsonObject) : this;

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

}
