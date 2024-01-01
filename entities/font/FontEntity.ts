// Copyright (c) 2023. Sendanor <info@sendanor.fi>. All rights reserved.

import { ReadonlyJsonObject } from "../../Json";
import { LogUtils } from "../../LogUtils";
import { isNumber } from "../../types/Number";
import { isString } from "../../types/String";
import { SizeDTO } from "../size/SizeDTO";
import {
    isSizeDTO,
    isSizeEntity,
    SizeEntity,
} from "../size/SizeEntity";
import { EntityFactoryImpl } from "../types/EntityFactoryImpl";
import { EntityMethodImpl } from "../types/EntityMethodImpl";
import { UnitType } from "../types/UnitType";
import { VariableType } from "../types/VariableType";
import { Font } from "./Font";
import { FontDTO } from "./FontDTO";
import {
    FontStyle,
    isFontStyle,
    isFontStyleOrUndefined,
} from "./types/FontStyle";
import { FontVariant } from "./types/FontVariant";
import { FontWeight } from "./types/FontWeight";

export const FontEntityFactory = (
    EntityFactoryImpl.create<FontDTO, Font>('Font')
                     .addStaticMethod(
                         EntityMethodImpl.create('create')
                                         .addArgument(VariableType.NUMBER)
                                         .returnType('Font')
                     )
                     .addStaticMethod(
                         EntityMethodImpl.create('create')
                                         .addArgument(VariableType.STRING)
                                         .returnType('Font')
                     )
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

    public static create () : FontEntity;
    public static create (value : string) : FontEntity;
    public static create (value : number) : FontEntity;
    public static create (value : FontDTO) : FontEntity;

    /**
     * Creates a font entity.
     *
     * @param value
     */
    public static create (
        value ?: FontDTO | number | string | undefined,
    ) : FontEntity {
        if (value === undefined) return new FontEntity();
        if (isFontDTO(value)) return new FontEntity(value);
        if (isNumber(value)) return new FontEntity(value);
        if (isString(value)) return new FontEntity(value);
        throw new TypeError(
            `FontEntity.create(): Invalid argument: ${LogUtils.stringifyValue(value)}`
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

    public static toDTO (
        value : FontStyle | FontDTO | SizeEntity | SizeDTO | FontEntity | Font | number | string | undefined,
    ) : FontDTO {
        if ( value === undefined ) return {};
        if ( isFontDTO(value) ) return value;
        if ( isFontEntity(value) ) return value.getDTO();
        if ( isFontStyle(value) ) {
            return {
                style: value,
            };
        }
        if ( isSizeEntity(value) ) {
            return {
                size: value.getDTO(),
            };
        }
        if ( isSizeDTO(value) ) {
            return {
                size: value,
            };
        }
        if ( isNumber(value) ) {
            return {
                size: {
                    value,
                    unit: UnitType.PX,
                },
            };
        }
        throw new TypeError(
            `FontEntity.toDTO(): Invalid argument: ${LogUtils.stringifyValue(value)}`
        );
    }

    public constructor ();
    public constructor ( font: FontDTO );
    public constructor ( font: FontEntity );
    public constructor ( font: Font );
    public constructor ( font: number );
    public constructor ( font: string );
    public constructor (
        style      ?: FontStyle | undefined,
        variant    ?: FontVariant | undefined,
        weight     ?: FontWeight | undefined,
        size       ?: SizeDTO | undefined,
        lineHeight ?: SizeDTO | undefined,
        family     ?: string | undefined,
    );

    public constructor (
        style      ?: FontStyle | FontDTO | FontEntity | Font | number | string | undefined,
        variant    ?: FontVariant | undefined,
        weight     ?: FontWeight | undefined,
        size       ?: SizeDTO | undefined,
        lineHeight ?: SizeDTO | undefined,
        family     ?: string | undefined,
    ) {
        if ( isFontStyleOrUndefined(style) ) {
            super( {
                style,
                variant,
                weight,
                size,
                lineHeight,
                family,
            } );
        } else {
            const dto: FontDTO | undefined = FontEntity.toDTO(style);
            if (dto) {
                super(dto);
            } else {
                throw new TypeError(
                    `new FontEntity(): Invalid arguments: ${
                        LogUtils.stringifyValue(style) }, ${
                        LogUtils.stringifyValue(variant) }, ${
                        LogUtils.stringifyValue(weight) }, ${
                        LogUtils.stringifyValue(size) }, ${
                        LogUtils.stringifyValue(lineHeight) }, ${
                        LogUtils.stringifyValue(family) }`
                );
            }
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
