// Copyright (c) 2023. Sendanor <info@sendanor.fi>. All rights reserved.

import { ReadonlyJsonObject } from "../../Json";
import { isFunction } from "../../types/Function";
import { isObject } from "../../types/Object";
import { FontDTO } from "../../dto/FontDTO";
import { SizeDTO } from "../../dto/SizeDTO";
import { Entity } from "./Entity";
import { FontStyle } from "./FontStyle";
import { FontVariant } from "./FontVariant";
import { FontWeight } from "./FontWeight";

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
     * Set a font style.
     *
     * @param value
     */
    setFontStyle (value : FontStyle | undefined) : this;

    /**
     * Get a font variant.
     */
    getFontVariant () : FontVariant | undefined;

    /**
     * Set a font variant.
     *
     * @param value
     */
    setFontVariant (value : FontVariant | undefined) : this;

    /**
     * Get a font weight.
     */
    getFontWeight () : FontWeight | undefined;

    /**
     * Set a font weight.
     *
     * @param value
     */
    setFontWeight (value : FontWeight | undefined) : this;

    /**
     * Get a font size.
     */
    getFontSize () : SizeDTO | undefined;

    /**
     * Set a font size.
     *
     * @param value
     */
    setFontSize (value : SizeDTO | undefined) : this;

    /**
     * Get a font line-height.
     */
    getLineHeight () : SizeDTO | undefined;

    /**
     * Set a font line-height.
     *
     * @param value
     */
    setLineHeight (value : SizeDTO | undefined) : this;

    /**
     * Get a font family.
     */
    getFontFamily () : string | undefined;

    /**
     * Set a font family.
     *
     * @param value
     */
    setFontFamily (value : string | undefined) : this;

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
