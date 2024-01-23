// Copyright (c) 2023-2024. Sendanor <info@sendanor.fi>. All rights reserved.

import { LogUtils } from "../../LogUtils";
import { isNumber } from "../../types/Number";
import { EntityMethodImpl } from "../types/EntityMethodImpl";
import { UnitType } from "../types/UnitType";
import { VariableType } from "../types/VariableType";
import {
    BorderDTO,
} from "./BorderDTO";
import {
    ColorDTO,
} from "../color/ColorDTO";
import {
    SizeDTO,
} from "../size/SizeDTO";
import {
    BorderStyle,
    isBorderStyle,
} from "../types/BorderStyle";
import { ReadonlyJsonObject } from "../../Json";
import { ColorEntity } from "../color/ColorEntity";
import {
    isSizeDTO,
    SizeEntity,
} from "../size/SizeEntity";
import {
    Border,
    isBorder,
} from "./Border";
import { EntityFactoryImpl } from "../types/EntityFactoryImpl";

export const BorderEntityFactory = (
    EntityFactoryImpl.create<BorderDTO, Border>('Border')
                     .addStaticMethod(
                         EntityMethodImpl.create('create')
                                         .addArgument(VariableType.NUMBER)
                                         .returnType('Border')
                     )
                     .add( EntityFactoryImpl.createProperty("style").setTypes(BorderStyle, VariableType.UNDEFINED) )
                     .add( EntityFactoryImpl.createProperty("width").setTypes(SizeEntity, VariableType.UNDEFINED) )
                     .add( EntityFactoryImpl.createProperty("radius").setTypes(SizeEntity, VariableType.UNDEFINED) )
                     .add( EntityFactoryImpl.createProperty("color").setTypes(ColorEntity, VariableType.UNDEFINED) )
);

export const isBorderDTO = BorderEntityFactory.createTestFunctionOfDTO();

export const explainBorderDTO = BorderEntityFactory.createExplainFunctionOfDTO();

export const isBorderDTOOrUndefined = BorderEntityFactory.createTestFunctionOfDTOorOneOf(VariableType.UNDEFINED);

export const explainBorderDTOOrUndefined = BorderEntityFactory.createExplainFunctionOfDTOorOneOf(VariableType.UNDEFINED);

export const BaseBorderEntity = BorderEntityFactory.createEntityType();

/**
 * Border entity.
 */
export class BorderEntity
    extends BaseBorderEntity
    implements Border
{

    public static create () : BorderEntity;
    public static create ( width : number ) : BorderEntity;
    public static create ( style : BorderDTO ) : BorderEntity;

    public static create (
        style ?: BorderStyle | undefined,
        width ?: SizeDTO | undefined,
        color ?: ColorDTO | undefined,
        radius ?: SizeDTO | undefined,
    ) : BorderEntity;

    /**
     * Creates a border entity.
     *
     * @param style
     * @param width
     * @param color
     * @param radius
     */
    public static create (
        style ?: BorderDTO | BorderStyle | number | undefined,
        width ?: SizeDTO | undefined,
        color ?: ColorDTO | undefined,
        radius ?: SizeDTO | undefined,
    ) : BorderEntity {
        return new BorderEntity(
            style,
            width,
            color,
            radius,
        );
    }

    public static createEmptyBorder () : BorderEntity {
        return this.create(
            undefined,
            undefined,
            undefined,
            undefined,
        );
    }

    /**
     * Creates a border entity from a DTO.
     *
     * @param dto
     */
    public static createFromDTO (
        dto : BorderDTO,
    ) : BorderEntity {
        return BorderEntity.create(
            dto?.style,
            dto?.width,
            dto?.color,
            dto?.radius,
        );
    }

    public static toDTO (
        value: BorderEntity | Border | number | undefined,
    ) : BorderDTO | undefined {
        if (value === undefined) {
            return undefined;
        }
        if (isBorderEntity(value)) {
            return value.getDTO();
        }
        if (isBorder(value)) {
            return value.getDTO();
        }
        if (isNumber(value)) {
            return {
                width: {
                    value: value,
                    unit: UnitType.PX,
                },
            };
        }
        throw new TypeError(`BorderEntity.toDTO(): Could not turn into DTO: ${LogUtils.stringifyValue(value)}`);
    }


    public constructor (
        style ?: BorderStyle | BorderDTO | number | undefined,
        width ?: SizeDTO | undefined,
        color ?: ColorDTO | undefined,
        radius ?: SizeDTO | undefined,
    ) {

        if ( isNumber(style) ) {
            width = SizeEntity.create(style).getDTO();
            style = undefined;
        }

        if ( style === undefined && width === undefined && color === undefined && radius === undefined ) {
            super();
        } else if ( isBorderStyle(style) ) {
            super(
                {
                    width,
                    style,
                    color,
                    radius,
                }
            );
        } else if ( style === undefined && isSizeDTO(width) ) {
            super(
                {
                    width,
                    style,
                    color,
                    radius,
                }
            );
        } else if ( style === undefined && isSizeDTO(radius) ) {
            super(
                {
                    width,
                    style,
                    color,
                    radius,
                }
            );
        } else if ( isBorderDTO(style) ) {
            super(style);
        } else {
            throw new TypeError(`new BorderEntity(): Incorrect arguments: ${LogUtils.stringifyValue(style)}, ${LogUtils.stringifyValue(width)}, ${LogUtils.stringifyValue(color)}, ${LogUtils.stringifyValue(radius)}`);
        }
    }

    public getCssStyles (): ReadonlyJsonObject {
        const width = this.getWidth();
        const color = this.getColor();
        const style = this.getStyle();
        const radius = this.getRadius();
        return {
            border: `${ width ? width.getCssStyles() : '0' } ${
                style
            }${ color ? ' ' + color.getCssStyles() : '' }`,
            ...(radius ? { borderRadius : radius.getCssStyles() } : {}),
        };
    }

}

export function isBorderEntity (value: unknown): value is BorderEntity {
    return value instanceof BorderEntity;
}
