// Copyright (c) 2023. Heusala Group Oy <info@heusalagroup.fi>. All rights reserved.

import { BorderBoxDTO } from "../borderBox/BorderBoxDTO";
import { SizeBoxDTO } from "../sizeBox/SizeBoxDTO";
import { ReadonlyJsonObject } from "../../Json";
import { BackgroundDTO } from "../background/BackgroundDTO";
import { BorderDTO } from "../border/BorderDTO";
import { ColorDTO } from "../color/ColorDTO";
import { FontDTO } from "../font/FontDTO";
import { SizeDTO } from "../size/SizeDTO";
import { StyleDTO } from "./StyleDTO";
import { TextDecorationDTO } from "../textDecoration/TextDecorationDTO";
import { BoxSizing } from "../types/BoxSizing";
import { TextAlign } from "../types/TextAlign";
import { BackgroundEntity } from "../background/BackgroundEntity";
import { BorderBoxEntity } from "../borderBox/BorderBoxEntity";
import { BorderEntity } from "../border/BorderEntity";
import { ColorEntity } from "../color/ColorEntity";
import { FontEntity } from "../font/FontEntity";
import { SizeBoxEntity } from "../sizeBox/SizeBoxEntity";
import { SizeEntity } from "../size/SizeEntity";
import { TextDecorationEntity } from "../textDecoration/TextDecorationEntity";
import { Background } from "../background/Background";
import { Border } from "../border/Border";
import { BorderBox } from "../borderBox/BorderBox";
import { Entity } from "../types/Entity";
import { Font } from "../font/Font";
import { Size } from "../size/Size";
import { SizeBox } from "../sizeBox/SizeBox";
import { TextDecoration } from "../textDecoration/TextDecoration";

/**
 * Interface for Style entities.
 */
export interface Style
    extends Entity<StyleDTO>
{

    /**
     * Returns the DTO object.
     */
    getDTO () : StyleDTO;

    /**
     * @inheritDoc
     */
    valueOf() : ReadonlyJsonObject;

    /**
     * @inheritDoc
     */
    toJSON () : ReadonlyJsonObject;

    /**
     * Get text color.
     */
    getTextColor () : ColorEntity | undefined;

    /**
     * Set text color.
     *
     * @param value
     */
    setTextColor (value: ColorEntity | ColorDTO | string | undefined) : this;

    /**
     * Get text alignment.
     */
    getTextAlign () : TextAlign | undefined;

    /**
     * Set text alignment.
     *
     * @param value
     */
    setTextAlign (value: TextAlign | undefined) : this;

    /**
     * Get box sizing.
     */
    getBoxSizing () : BoxSizing | undefined;

    /**
     * Set box sizing.
     *
     * @param value
     */
    setBoxSizing (value: BoxSizing | undefined) : this;

    /**
     * Get background color
     */
    getBackgroundColor () : ColorEntity | undefined;

    /**
     * Get background color DTO
     */
    getBackgroundColorDTO () : ColorDTO | undefined;

    /**
     * Set background color.
     *
     * @param value
     */
    setBackgroundColor (value: ColorEntity | ColorDTO | string | undefined) : this;

    /**
     * Returns CSS styles.
     */
    getCssStyles () : ReadonlyJsonObject;

    getMargin () : Size | SizeBox | undefined;
    getTopMargin () : Size | undefined;
    getBottomMargin () : Size | undefined;
    getRightMargin () : Size | undefined;
    getLeftMargin () : Size | undefined;

    setMargin (value: SizeEntity | Size | number | undefined) : this;
    setTopMargin (value: SizeEntity | Size | number | undefined) : this;
    setBottomMargin (value: SizeEntity | Size | number | undefined) : this;
    setRightMargin (value: SizeEntity | Size | number | undefined) : this;
    setLeftMargin (value: SizeEntity | Size | number | undefined) : this;


    getPadding () : Size | SizeBox | undefined;
    getPadding () : SizeDTO | SizeBoxDTO | undefined;
    setPadding (value: SizeEntity | SizeBoxEntity | SizeDTO | SizeBoxDTO | number | undefined) : this;

    getTopPadding () : Size | undefined;
    getBottomPadding () : Size | undefined;
    getRightPadding () : Size | undefined;
    getLeftPadding () : Size | undefined;

    setTopPadding (value: SizeEntity | Size | number | undefined) : this;
    setBottomPadding (value: SizeEntity | Size | number | undefined) : this;
    setRightPadding (value: SizeEntity | Size | number | undefined) : this;
    setLeftPadding (value: SizeEntity | Size | number | undefined) : this;


    getBorder () : Border | BorderBox | undefined;
    getBorderDTO () : BorderDTO | BorderBoxDTO | undefined;
    setBorder (value : BorderEntity | BorderDTO | BorderBoxEntity | BorderBoxDTO | undefined) : this;

    getTopBorder () : Border | undefined;
    getBottomBorder () : Border | undefined;
    getRightBorder () : Border | undefined;
    getLeftBorder () : Border | undefined;

    setTopBorder (value: Border | BorderEntity | number | undefined) : this;
    setBottomBorder (value: Border | BorderEntity | number | undefined) : this;
    setRightBorder (value: Border | BorderEntity | number | undefined) : this;
    setLeftBorder (value: Border | BorderEntity | number | undefined) : this;

    getFontDTO () : FontDTO | undefined;
    getFont () : Font | undefined;
    setFont (value: FontEntity | Font | string | number | undefined) : this;

    /**
     * Get text decorations.
     */
    getTextDecoration () : TextDecorationEntity | undefined;

    /**
     * Get text decorations as a DTO.
     */
    getTextDecorationDTO () : TextDecorationDTO | undefined;

    /**
     * Set text decorations.
     *
     * @param value
     */
    setTextDecoration (value: TextDecoration | TextDecorationEntity | TextDecorationDTO | undefined) : this;

    getWidth () : SizeEntity | undefined;
    getWidthDTO () : SizeDTO | undefined;
    setWidth (value: Size | SizeEntity | number | undefined) : this;

    getHeight () : SizeEntity | undefined;
    getHeightDTO () : SizeDTO | undefined;
    setHeight (value: Size | SizeEntity | number | undefined) : this;

    getMinWidth () : SizeEntity | undefined;
    getMinWidthDTO () : SizeDTO | undefined;
    setMinWidth (value: Size | SizeEntity | number | undefined) : this;

    getMinHeight () : SizeEntity | undefined;
    getMinHeightDTO () : SizeDTO | undefined;
    setMinHeight (value: Size | SizeEntity | number | undefined) : this;

    getMaxWidth () : SizeEntity | undefined;
    getMaxWidthDTO () : SizeDTO | undefined;
    setMaxWidth (value: Size | SizeEntity | number | undefined) : this;

    getMaxHeight () : SizeEntity | undefined;
    getMaxHeightDTO () : SizeDTO | undefined;
    setMaxHeight (value: Size | SizeEntity | number | undefined) : this;

    getBackground () : Background | undefined;
    getBackgroundDTO () : BackgroundDTO | undefined;
    setBackground (value: Background | BackgroundEntity | number | undefined) : this;

}
