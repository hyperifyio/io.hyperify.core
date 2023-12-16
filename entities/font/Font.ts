// Copyright (c) 2023. Sendanor <info@sendanor.fi>. All rights reserved.

import { ReadonlyJsonObject } from "../../Json";
import { isFunction } from "../../types/Function";
import { isObject } from "../../types/Object";
import { FontDTO } from "./FontDTO";
import { SizeDTO } from "../size/SizeDTO";
import { Entity } from "../types/Entity";
import { FontStyle } from "./types/FontStyle";
import { FontVariant } from "./types/FontVariant";
import { FontWeight } from "./types/FontWeight";
import { Size } from "../size/Size";

/**
 * Presents a font value.
 */
export interface Font
    extends Entity<FontDTO> {

    /**
     * @inheritDoc
     */
    valueOf () : ReadonlyJsonObject;

    /**
     *
     */
    getDTO () : FontDTO;

    /**
     * @inheritDoc
     */
    toJSON () : ReadonlyJsonObject;

    /**
     * Returns CSS styles.
     */
    getCssStyles () : ReadonlyJsonObject;

    /**
     * Get a font style.
     */
    getFontStyle () : FontStyle | undefined;

    /**
     * Get a font style.
     */
    getStyle () : FontStyle | undefined;

    /**
     * Set a font style.
     *
     * @param value
     */
    setFontStyle (value : FontStyle | undefined) : this;

    /**
     * Set a font style.
     *
     * @param value
     */
    setStyle (value : FontStyle | undefined) : this;

    /**
     * Get a font variant.
     */
    getFontVariant () : FontVariant | undefined;

    /**
     * Get a font variant.
     */
    getVariant () : FontVariant | undefined;

    /**
     * Set a font variant.
     *
     * @param value
     */
    setFontVariant (value : FontVariant | undefined) : this;

    /**
     * Set a font variant.
     *
     * @param value
     */
    setVariant (value : FontVariant | undefined) : this;

    /**
     * Get a font weight.
     */
    getFontWeight () : FontWeight | undefined;

    /**
     * Get a font weight.
     */
    getWeight () : FontWeight | undefined;

    /**
     * Set a font weight.
     *
     * @param value
     */
    setFontWeight (value : FontWeight | undefined) : this;

    /**
     * Set a font weight.
     *
     * @param value
     */
    setWeight (value : FontWeight | undefined) : this;

    /**
     * Get a font size.
     */
    getFontSize () : Size | undefined;

    /**
     * Get a font size.
     */
    getSize () : Size | undefined;

    /**
     * Get a font size.
     */
    getFontSizeDTO () : SizeDTO | undefined;

    /**
     * Get a font size.
     */
    getSizeDTO () : SizeDTO | undefined;

    /**
     * Set a font size.
     *
     * @param value
     */
    setSize (value : SizeDTO | undefined) : this;

    /**
     * Set a font size.
     *
     * @param value
     */
    setFontSize (value : SizeDTO | undefined) : this;

    /**
     * Get a font line-height.
     */
    getLineHeight () : Size | undefined;

    /**
     * Get a font line-height.
     */
    getLineHeightDTO () : SizeDTO | undefined;

    /**
     * Set a font line-height.
     *
     * @param value
     */
    setLineHeight (value : SizeDTO | undefined) : this;

    /**
     * Get a font family.
     */
    getFamily () : string | undefined;

    /**
     * Get a font family.
     * Alias for `./getFamily()`.
     */
    getFontFamily () : string | undefined;

    /**
     * Set a font family.
     *
     * @param value
     */
    setFontFamily (value : string | undefined) : this;

    /**
     * Set a font family.
     *
     * Alias for `./setFamily()`.
     * @param value
     */
    setFamily (value : string | undefined) : this;

}

export function isFont (value : unknown) : value is Font {
    return (
        isObject(value)
        && isFunction(value?.valueOf)
        && isFunction(value?.getDTO)
        && isFunction(value?.toJSON)
        && isFunction(value?.getCssStyles)
        && isFunction(value?.getFontStyle)
        && isFunction(value?.getFontVariant)
        && isFunction(value?.getFontWeight)
        && isFunction(value?.getFontSize)
        && isFunction(value?.getLineHeight)
        && isFunction(value?.getFontFamily)
        && isFunction(value?.setFontStyle)
        && isFunction(value?.setFontVariant)
        && isFunction(value?.setFontWeight)
        && isFunction(value?.setFontSize)
        && isFunction(value?.setLineHeight)
        && isFunction(value?.setFontFamily)
    );
}
