// Copyright (c) 2023. Sendanor <info@sendanor.fi>. All rights reserved.

import { ReadonlyJsonObject } from "../../Json";
import {
    ColorDTO,
} from "../color/ColorDTO";
import { VariableType } from "../types/VariableType";
import {
    TextDecorationDTO,
} from "./TextDecorationDTO";
import { SizeDTO } from "../size/SizeDTO";
import {
    ColorEntity,
} from "../color/ColorEntity";
import { SizeEntity } from "../size/SizeEntity";
import { EntityFactoryImpl } from "../types/EntityFactoryImpl";
import { EntityPropertyImpl } from "../types/EntityPropertyImpl";
import {
    TextDecoration,
} from "./TextDecoration";
import {
    isTextDecorationLineType,
    TextDecorationLineType,
} from "../types/TextDecorationLineType";
import { TextDecorationStyle } from "../types/TextDecorationStyle";


export const TextDecorationEntityFactory = (
    EntityFactoryImpl.create<TextDecorationDTO, TextDecoration>('TextDecoration')
                     .add( EntityPropertyImpl.create("lineType").setTypes(TextDecorationLineType, VariableType.UNDEFINED) )
                     .add( EntityPropertyImpl.create("color").setTypes(ColorEntity, VariableType.UNDEFINED) )
                     .add( EntityPropertyImpl.create("style").setTypes(TextDecorationStyle, VariableType.UNDEFINED) )
                     .add( EntityPropertyImpl.create("thickness").setTypes(SizeEntity, VariableType.UNDEFINED) )
);

export const BaseTextDecorationEntity = TextDecorationEntityFactory.createEntityType();

export const isTextDecorationDTO = TextDecorationEntityFactory.createTestFunctionOfDTO();

export const isTextDecoration = TextDecorationEntityFactory.createTestFunctionOfInterface();

export const explainTextDecorationDTO = TextDecorationEntityFactory.createExplainFunctionOfDTO();

export const isTextDecorationDTOOrUndefined = TextDecorationEntityFactory.createTestFunctionOfDTOorOneOf(VariableType.UNDEFINED);

export const explainTextDecorationDTOOrUndefined = TextDecorationEntityFactory.createExplainFunctionOfDTOorOneOf(VariableType.UNDEFINED);


/**
 * Text decoration entity.
 */
export class TextDecorationEntity
    extends BaseTextDecorationEntity
{

    /**
     * Creates a text decoration entity.
     *
     * @param lineType
     */
    public static create (
        lineType ?: TextDecorationLineType | undefined,
    ) : TextDecorationEntity {
        return new TextDecorationEntity(
            lineType,
            undefined,
            undefined,
            undefined,
        );
    }

    /**
     * Creates a font entity from DTO.
     *
     * @param value
     */
    public static createFromDTO (
        value : TextDecorationDTO,
    ) : TextDecorationEntity {
        return new TextDecorationEntity( value );
    }

    public constructor ();

    public constructor (
        dto: TextDecorationDTO
    );

    public constructor (
        lineType : TextDecorationLineType | undefined,
        color : ColorDTO | undefined,
        style : TextDecorationStyle | undefined,
        thickness : SizeDTO | undefined,
    );

    public constructor (
        lineType  ?: TextDecorationLineType | TextDecorationDTO | TextDecoration | undefined,
        color     ?: ColorDTO | undefined,
        style     ?: TextDecorationStyle | undefined,
        thickness ?: SizeDTO | undefined,
    ) {
        if ( lineType === undefined && color === undefined && style === undefined && thickness === undefined ) {
            super();
        } else if ( isTextDecorationDTO(lineType) && color === undefined && style === undefined && thickness === undefined ) {
            super( lineType );
        } else if ( isTextDecoration(lineType) && color === undefined && style === undefined && thickness === undefined ) {
            super( lineType.getDTO() );
        } else if ( isTextDecorationLineType(lineType) ) {
            super(
                {
                    lineType,
                    color,
                    style,
                    thickness,
                }
            );
        } else {
            throw new TypeError(`Unknown new TextDecorationEntity() signature: ${lineType}, ${color}, ${style}, ${thickness}`);
        }
    }

    /**
     * @inheritDoc
     */
    public getCssStyles (): ReadonlyJsonObject {
        const lineType = this.getLineType();
        const color = this.getColorDTO();
        const style = this.getStyle();
        const thickness = this.getThicknessDTO();
        return {
            ...(lineType ? { textDecorationLine: lineType } : {}),
            ...(color ? { textDecorationColor: ColorEntity.createFromDTO(color).getCssStyles() } : {}),
            ...(style ? { textDecorationStyle: style } : {}),
            ...(thickness ? { textDecorationThickness: SizeEntity.createFromDTO( thickness ).getCssStyles() } : {}),
        };
    }

}

export function isTextDecorationEntity (value: unknown): value is TextDecorationEntity {
    return value instanceof TextDecorationEntity;
}
