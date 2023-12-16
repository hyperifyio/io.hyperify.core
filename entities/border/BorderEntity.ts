// Copyright (c) 2023. Sendanor <info@sendanor.fi>. All rights reserved.

import {
    BorderDTO,
    createBorderDTO,
    isBorderDTO,
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
import {
    ColorEntity,
} from "../color/ColorEntity";
import {
    SizeEntity,
} from "../size/SizeEntity";
import {
    Border,
    isBorder,
} from "./Border";
import { EntityFactoryImpl } from "../types/EntityFactoryImpl";
import { VariableType } from "../types/EntityProperty";
import { EntityPropertyImpl } from "../types/EntityPropertyImpl";

export const BorderEntityFactory = (
    EntityFactoryImpl.create<BorderDTO, Border>()
                     .add( EntityPropertyImpl.create("style").setTypes(BorderStyle, VariableType.UNDEFINED) )
                     .add( EntityPropertyImpl.create("width").setTypes(SizeEntity, VariableType.UNDEFINED) )
                     .add( EntityPropertyImpl.create("radius").setTypes(SizeEntity, VariableType.UNDEFINED) )
                     .add( EntityPropertyImpl.create("color").setTypes(ColorEntity, VariableType.UNDEFINED) )
);

export const BaseBorderEntity = BorderEntityFactory.createEntityType();

/**
 * Border entity.
 */
export class BorderEntity
    extends BaseBorderEntity
    implements Border
{

    /**
     * Creates a border entity.
     *
     * @param style
     * @param width
     * @param color
     * @param radius
     */
    public static create (
        style ?: BorderStyle | undefined,
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

    public constructor (
    )

    public constructor (
        style : BorderDTO | Border,
    )

    public constructor (
        style ?: BorderStyle,
        width ?: SizeDTO,
        color ?: ColorDTO,
        radius ?: SizeDTO,
    );

    public constructor (
        style ?: BorderStyle | BorderDTO | Border | undefined,
        width ?: SizeDTO | undefined,
        color ?: ColorDTO | undefined,
        radius ?: SizeDTO | undefined,
    ) {
        if ( style === undefined && width === undefined && color === undefined && radius === undefined ) {
            super();
        } else if ( isBorderStyle(style) ) {
            super(
                createBorderDTO(
                    width,
                    style,
                    color,
                    radius,
                )
            );
        } else if ( isBorderDTO(style) ) {
            super(style);
        } else if ( isBorder(style) ) {
            super(style?.getDTO());
        } else {
            throw new TypeError(`new BorderEntity(): Incorrect arguments: ${style}, ${width}, ${color}, ${radius}`);
        }
    }

    public getCssStyles (): ReadonlyJsonObject {
        const width = this.getWidth();
        const color = this.getColor();
        const style = this.getStyle();
        return {
            border: `${ width ? width.getCssStyles() : '0' } ${
                style
            }${ color ? ' ' + color.getCssStyles() : '' }`
        };
    }

}

export function isBorderEntity (value: unknown): value is BorderEntity {
    return value instanceof BorderEntity;
}
