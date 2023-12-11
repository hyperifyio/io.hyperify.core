// Copyright (c) 2023. Sendanor <info@sendanor.fi>. All rights reserved.

import { ReadonlyJsonObject } from "../Json";
import { isNumber } from "../types/Number";
import { isString } from "../types/String";
import { BorderDTO, createBorderDTO } from "../dto/BorderDTO";
import { ColorDTO, createColorDTO } from "../dto/ColorDTO";
import { createSizeDTO, SizeDTO } from "../dto/SizeDTO";
import { BorderStyle } from "../dto/types/BorderStyle";
import { ColorEntity, isColorEntity } from "./ColorEntity";
import {
    isSizeEntity,
    SizeEntity,
} from "./SizeEntity";
import { Border } from "./types/Border";
import { Color, isColor } from "./types/Color";
import {
    isSize,
    Size,
} from "./types/Size";

/**
 * Border entity.
 */
export class BorderEntity
    implements Border
{

    /**
     * Creates a border entity.
     *
     * @param style
     * @param width
     * @param color
     */
    public static create (
        style ?: BorderStyle | undefined,
        width ?: SizeDTO | undefined,
        color ?: ColorDTO | undefined,
        radius ?: SizeDTO | undefined,
    ) : BorderEntity {
        return new BorderEntity(
            style ?? BorderStyle.NONE,
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

    private _style : BorderStyle;
    private _width : SizeDTO | undefined;
    private _radius : SizeDTO | undefined;
    private _color : ColorDTO | undefined;

    protected constructor (
        style : BorderStyle,
        width : SizeDTO | undefined,
        color : ColorDTO | undefined,
        radius : SizeDTO | undefined,
    ) {
        this._style = style;
        this._width = width;
        this._color = color;
        this._radius = radius;
    }

    /**
     * Returns the DTO object.
     */
    public getDTO () : BorderDTO {
        return createBorderDTO(
            this._width,
            this._style,
            this._color,
            this._radius,
        );
    }

    /**
     * @inheritDoc
     */
    public valueOf() : ReadonlyJsonObject {
        return this.toJSON();
    }

    /**
     * @inheritDoc
     */
    public toJSON () : ReadonlyJsonObject {
        return this.getDTO() as unknown as ReadonlyJsonObject;
    }

    public getCssStyles (): string {
        return `${ this._width ? SizeEntity.createFromDTO(this._width).getCssStyles() : '0' } ${
            this._style
        }${ this._color ? ' ' + ColorEntity.createFromDTO(this._color).getCssStyles() : '' }`;
    }

    public setStyle (value : BorderStyle) : this {
        this._style = value;
        return this;
    }

    public getStyle () : BorderStyle | undefined {
        return this._style;
    }

    public setWidth (value : Size | SizeEntity | SizeDTO | number | undefined) : this {
        if (isSizeEntity(value)) {
            this._width = value.getDTO();
        } else if (isSize(value)) {
            this._width = value.getDTO();
        } else if (isNumber(value)) {
            this._width = createSizeDTO(value);
        } else {
            this._width = value;
        }
        return this;
    }

    public getWidth () : Size | undefined {
        return this._width ? SizeEntity.createFromDTO(this._width) : undefined;
    }

    public getWidthDTO () : SizeDTO | undefined {
        return this._width;
    }

    public setRadius (value : Size | SizeEntity | SizeDTO | number | undefined) : this {
        if (isSizeEntity(value)) {
            this._radius = value.getDTO();
        } else if (isSize(value)) {
            this._radius = value.getDTO();
        } else if (isNumber(value)) {
            this._radius = createSizeDTO(value);
        } else {
            this._radius = value;
        }
        return this;
    }

    public getRadius () : Size | undefined {
        return this._radius ? SizeEntity.createFromDTO(this._radius) : undefined;
    }

    public getRadiusDTO () : SizeDTO | undefined {
        return this._radius;
    }

    public setColor (value : Color | ColorEntity | ColorDTO | string) : this {
        if (isString(value)) {
            this._color = createColorDTO( value );
        } else if (isColorEntity(value)) {
            this._color = value.getDTO();
        } else if (isColor(value)) {
            this._color = value.getDTO();
        } else {
            this._color = value;
        }
        return this;
    }

    public getColor () : Color | undefined {
        return this._color ? ColorEntity.createFromDTO( this._color ) : undefined;
    }

    public getColorDTO () : ColorDTO | undefined {
        return this._color;
    }

}

export function isBorderEntity (value: unknown): value is BorderEntity {
    return value instanceof BorderEntity;
}
