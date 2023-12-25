// Copyright (c) 2023. Sendanor <info@sendanor.fi>. All rights reserved.

import { VariableType } from "../types/VariableType";
import {
    FontDTO,
} from "./FontDTO";
import { SizeDTO } from "../size/SizeDTO";
import { ReadonlyJsonObject } from "../../Json";
import {
    SizeEntity,
} from "../size/SizeEntity";
import { EntityFactoryImpl } from "../types/EntityFactoryImpl";
import { Font } from "./Font";
import {
    FontStyle,
    isFontStyle,
} from "./types/FontStyle";
import { FontVariant } from "./types/FontVariant";
import { FontWeight } from "./types/FontWeight";

export const FontEntityFactory = (
    EntityFactoryImpl.create<FontDTO, Font>('Font')
                     .add( EntityFactoryImpl.createProperty("style").setTypes( FontStyle, VariableType.UNDEFINED) )
                     .add( EntityFactoryImpl.createProperty("variant").setTypes( FontVariant, VariableType.UNDEFINED) )
                     .add( EntityFactoryImpl.createProperty("weight").setTypes( FontWeight, VariableType.UNDEFINED) )
                     .add( EntityFactoryImpl.createProperty("size").setTypes( SizeEntity, VariableType.UNDEFINED) )
                     .add( EntityFactoryImpl.createProperty("lineHeight").setTypes( SizeEntity, VariableType.UNDEFINED) )
                     .add( EntityFactoryImpl.createProperty("family").setTypes( VariableType.STRING, VariableType.UNDEFINED) )
);

export const isFontDTO = FontEntityFactory.createTestFunctionOfDTO();

export const isFont = FontEntityFactory.createTestFunctionOfInterface();

export const explainFontDTO = FontEntityFactory.createExplainFunctionOfDTO();

export const isFontDTOOrUndefined = FontEntityFactory.createTestFunctionOfDTOorOneOf(VariableType.UNDEFINED);

export const explainFontDTOOrUndefined = FontEntityFactory.createExplainFunctionOfDTOorOneOf(VariableType.UNDEFINED);

export const BaseFontEntity = FontEntityFactory.createEntityType();


/**
 * Font entity.
 */
export class FontEntity
    extends BaseFontEntity
    implements Font
{

    /**
     * Creates a font entity.
     *
     * @param value
     */
    public static create (
        value ?: string | undefined,
    ) : FontEntity {
        return new FontEntity(
            undefined,
            undefined,
            undefined,
            undefined,
            undefined,
            value,
        );
    }

    /**
     * Creates a font entity from DTO.
     *
     * @param value
     */
    public static createFromDTO (
        value : FontDTO,
    ) : FontEntity {
        return new FontEntity(
            value?.style,
            value?.variant,
            value?.weight,
            value?.size,
            value?.lineHeight,
            value?.family,
        );
    }

    public constructor ();

    public constructor (
        font: FontDTO | FontEntity | Font,
    );

    public constructor (
        style ?: FontStyle | undefined,
        variant ?: FontVariant | undefined,
        weight ?: FontWeight | undefined,
        size ?: SizeDTO | undefined,
        lineHeight ?: SizeDTO | undefined,
        family ?: string | undefined,
    );

    public constructor (
        style ?: FontStyle | FontDTO | FontEntity | Font | undefined,
        variant ?: FontVariant | undefined,
        weight ?: FontWeight | undefined,
        size ?: SizeDTO | undefined,
        lineHeight ?: SizeDTO | undefined,
        family ?: string | undefined,
    ) {
        if (style === undefined && variant === undefined && weight === undefined && size === undefined && lineHeight === undefined && family === undefined) {
            super();
        } else if ( isFontStyle(style) ) {
            super( {
                style,
                variant,
                weight,
                size,
                lineHeight,
                family,
            } );
        } else if (isFontDTO(style)) {
            super( style );
        } else if (isFontEntity(style)) {
            super( style.getDTO() );
        } else {
            throw new TypeError(
                `new FontEntity(): Invalid arguments: ${style}, ${variant }, ${ weight }, ${ size }, ${ lineHeight }, ${ family }`
            );
        }
    }

    /**
     * @inheritDoc
     */
    public getCssStyles (): ReadonlyJsonObject {
        const style = this.getFontStyle();
        const variant = this.getFontVariant();
        const weight = this.getFontWeight();
        const size = this.getFontSize();
        const lineHeight = this.getLineHeight();
        const family = this.getFontFamily();
        return {
            ...(style ? { fontStyle: style } : {}),
            ...(variant ? { fontVariant: variant } : {}),
            ...(weight ? { fontWeight: weight } : {}),
            ...(size ? { fontSize: size.getCssStyles() } : {}),
            ...(lineHeight ? { lineHeight: lineHeight.getCssStyles() } : {}),
            ...(family ? { fontFamily: family } : {}),
        };
    }


}

export function isFontEntity (value: unknown): value is FontEntity {
    return value instanceof FontEntity;
}
