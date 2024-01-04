// Copyright (c) 2023. Sendanor <info@sendanor.fi>. All rights reserved.

import { ReadonlyJsonObject } from "../../Json";
import { isFunction } from "../../types/Function";
import { isObject } from "../../types/Object";
import { ColorDTO } from "../color/ColorDTO";
import { TextDecorationDTO } from "./TextDecorationDTO";
import { SizeDTO } from "../size/SizeDTO";
import { ColorEntity } from "../color/ColorEntity";
import { SizeEntity } from "../size/SizeEntity";
import { Color } from "../color/Color";
import { Entity } from "../types/Entity";
import { Size } from "../size/Size";
import { TextDecorationLineType } from "../types/TextDecorationLineType";
import { TextDecorationStyle } from "../types/TextDecorationStyle";

/**
 * Presents a font value.
 */
export interface TextDecoration
    extends Entity<TextDecorationDTO>
{

    /**
     * @inheritDoc
     */
    valueOf () : ReadonlyJsonObject;

    /**
     *
     */
    getDTO () : TextDecorationDTO;

    /**
     * @inheritDoc
     */
    toJSON () : ReadonlyJsonObject;

    /**
     * Returns CSS styles.
     */
    getCssStyles () : ReadonlyJsonObject;


    /**
     * Get a text decoration color.
     */
    getLineType () : TextDecorationLineType | undefined;

    /**
     * Set a text decoration color.
     *
     * @param value
     */
    setLineType (value : TextDecorationLineType | undefined) : this;


    /**
     * Get a text decoration style.
     */
    getStyle () : TextDecorationStyle | undefined;

    /**
     * Set a font style.
     *
     * @param value
     */
    setStyle (value : TextDecorationStyle | undefined) : this;


    /**
     * Get a text decoration color.
     */
    getColor () : Color | undefined;

    /**
     * Get a text decoration color as a DTO.
     */
    getColorDTO () : ColorDTO | undefined;

    /**
     * Set a text decoration color.
     *
     * @param value
     */
    setColor (value : Color | ColorEntity | ColorDTO | undefined) : this;


    /**
     * Get a text decoration thickness.
     */
    getThickness () : Size | undefined;

    /**
     * Get a text decoration thickness as a SizeDTO.
     */
    getThicknessDTO () : SizeDTO | undefined;

    /**
     * Set a text decoration thickness.
     *
     * @param value
     */
    setThickness (value : SizeDTO | Size | SizeEntity | number | undefined) : this;

}

export function isTextDecoration (value : unknown) : value is TextDecoration {
    return (
        isObject(value)
        && isFunction(value?.valueOf)
        && isFunction(value?.getDTO)
        && isFunction(value?.toJSON)
        && isFunction(value?.getCssStyles)

        && isFunction(value?.getLineType)
        && isFunction(value?.setLineType)

        && isFunction(value?.getStyle)
        && isFunction(value?.setStyle)

        && isFunction(value?.getColor)
        && isFunction(value?.getColorDTO)
        && isFunction(value?.setColor)

        && isFunction(value?.getThickness)
        && isFunction(value?.getThicknessDTO)
        && isFunction(value?.setThickness)
    );
}
