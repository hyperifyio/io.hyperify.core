// Copyright (c) 2023. Sendanor <info@sendanor.fi>. All rights reserved.

import { ReadonlyJsonObject } from "../Json";
import { ColorDTO } from "../dto/ColorDTO";
import { TextDecorationDTO, createTextDecorationDTO } from "../dto/TextDecorationDTO";
import { SizeDTO } from "../dto/SizeDTO";
import {
    ColorEntity,
    isColorEntity,
} from "./ColorEntity";
import { isSizeEntity, SizeEntity } from "./SizeEntity";
import {
    Color,
    isColor,
} from "./types/Color";
import { TextDecoration } from "./types/TextDecoration";
import { TextDecorationLineType } from "./types/TextDecorationLineType";
import { TextDecorationStyle } from "./types/TextDecorationStyle";
import { Size, isSize } from "./types/Size";

/**
 * Text decoration entity.
 */
export class TextDecorationEntity
    implements TextDecoration
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
        return new TextDecorationEntity(
            value?.lineType,
            value?.color,
            value?.style,
            value?.thickness,
        );
    }

    private _lineType : TextDecorationLineType | undefined;
    private _color : ColorDTO | undefined;
    private _style : TextDecorationStyle | undefined;
    private _thickness : SizeDTO | undefined;

    protected constructor (
        lineType : TextDecorationLineType | undefined,
        color : ColorDTO | undefined,
        style : TextDecorationStyle | undefined,
        thickness : SizeDTO | undefined,
    ) {
        this._lineType = lineType;
        this._color = color;
        this._style = style;
        this._thickness = thickness;
    }

    /**
     * Returns the DTO object.
     */
    public getDTO () : TextDecorationDTO {
        return createTextDecorationDTO(
            this._lineType,
            this._color,
            this._style,
            this._thickness,
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

    /**
     * @inheritDoc
     */
    public getCssStyles (): ReadonlyJsonObject {
        return {
            ...(this._lineType ? { textDecorationLine: this._lineType } : {}),
            ...(this._color ? { textDecorationColor: ColorEntity.createFromDTO(this._color).getCssStyles() } : {}),
            ...(this._style ? { textDecorationStyle: this._style } : {}),
            ...(this._thickness ? { textDecorationThickness: SizeEntity.createFromDTO( this._thickness ).getCssStyles() } : {}),
        };
    }


    /**
     * @inheritDoc
     */
    public setLineType (value : TextDecorationLineType | undefined) : this {
        this._lineType = value;
        return this;
    }

    /**
     * @inheritDoc
     */
    public getLineType () : TextDecorationLineType | undefined {
        return this._lineType;
    }



    /**
     * @inheritDoc
     */
    public setColor (value : Color | ColorDTO | undefined) : this {
        if (isColorEntity(value)) {
            this._color = value.getDTO();
        } else if (isColor(value)) {
            this._color = value.getDTO();
        } else {
            this._color = value;
        }
        return this;
    }

    /**
     * @inheritDoc
     */
    public getColor () : Color | undefined {
        return this._color ? ColorEntity.createFromDTO(this._color) : undefined;
    }

    /**
     * @inheritDoc
     */
    public getColorDTO () : ColorDTO | undefined {
        return this._color;
    }


    /**
     * @inheritDoc
     */
    public setStyle (value : TextDecorationStyle | undefined) : this {
        this._style = value;
        return this;
    }

    /**
     * @inheritDoc
     */
    public getStyle () : TextDecorationStyle | undefined {
        return this._style;
    }


    /**
     * @inheritDoc
     */
    public setThickness (value : SizeEntity | Size | SizeDTO | undefined) : this {
        if (isSizeEntity(value)) {
            this._thickness = value.getDTO();
        } else if (isSize(value)) {
            this._thickness = value.getDTO();
        } else {
            this._thickness = value;
        }
        return this;
    }

    /**
     * @inheritDoc
     */
    public getThickness () : Size | undefined {
        return this._thickness ? SizeEntity.createFromDTO(this._thickness) : undefined;
    }

    /**
     * @inheritDoc
     */
    public getThicknessDTO () : SizeDTO | undefined {
        return this._thickness;
    }

}

export function isTextDecorationEntity (value: unknown): value is TextDecorationEntity {
    return value instanceof TextDecorationEntity;
}
