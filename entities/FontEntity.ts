// Copyright (c) 2023. Sendanor <info@sendanor.fi>. All rights reserved.

import { ReadonlyJsonObject } from "../Json";
import { FontDTO, createFontDTO } from "../dto/FontDTO";
import { SizeDTO } from "../dto/SizeDTO";
import { isSizeEntity, SizeEntity } from "./SizeEntity";
import { Font } from "./types/Font";
import { FontStyle } from "./types/FontStyle";
import { FontVariant } from "./types/FontVariant";
import { FontWeight } from "./types/FontWeight";
import { Size, isSize } from "./types/Size";

/**
 * Font entity.
 */
export class FontEntity
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

    private _style : FontStyle | undefined;
    private _variant : FontVariant | undefined;
    private _weight : FontWeight | undefined;
    private _size : SizeDTO | undefined;
    private _lineHeight : SizeDTO | undefined;
    private _family : string | undefined;

    protected constructor (
        style : FontStyle | undefined,
        variant : FontVariant | undefined,
        weight : FontWeight | undefined,
        size : SizeDTO | undefined,
        lineHeight : SizeDTO | undefined,
        family : string | undefined,
    ) {
        this._style = style;
        this._variant = variant;
        this._weight = weight;
        this._size = size;
        this._lineHeight = lineHeight;
        this._family = family;
    }

    /**
     * Returns the DTO object.
     */
    public getDTO () : FontDTO {
        return createFontDTO(
            this._style,
            this._variant,
            this._weight,
            this._size,
            this._lineHeight,
            this._family,
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
            ...(this._style ? { fontStyle: this._style } : {}),
            ...(this._variant ? { fontVariant: this._variant } : {}),
            ...(this._weight ? { fontWeight: this._weight } : {}),
            ...(this._size ? { fontSize: SizeEntity.createFromDTO(this._size).getCssStyles() } : {}),
            ...(this._lineHeight ? { lineHeight: SizeEntity.createFromDTO(this._lineHeight).getCssStyles() } : {}),
            ...(this._family ? { fontFamily: this._family } : {}),
        };
    }


    /**
     * @inheritDoc
     */
    public setFontStyle (value : FontStyle | undefined) : this {
        this._style = value;
        return this;
    }

    /**
     * @inheritDoc
     */
    public getFontStyle () : FontStyle | undefined {
        return this._style;
    }


    /**
     * @inheritDoc
     */
    public setFontVariant (value : FontVariant | undefined) : this {
        this._variant = value;
        return this;
    }

    /**
     * @inheritDoc
     */
    public getFontVariant () : FontVariant | undefined {
        return this._variant;
    }


    /**
     * @inheritDoc
     */
    public setFontWeight (value : FontWeight | undefined) : this {
        this._weight = value;
        return this;
    }

    /**
     * @inheritDoc
     */
    public getFontWeight () : FontWeight | undefined {
        return this._weight;
    }


    /**
     * @inheritDoc
     */
    public setFontSize (value : SizeEntity | Size | SizeDTO | undefined) : this {
        if (isSizeEntity(value)) {
            this._size = value.getDTO();
        } else if (isSize(value)) {
            this._size = value.getDTO();
        } else {
            this._size = value;
        }
        return this;
    }

    /**
     * @inheritDoc
     */
    public getFontSize () : SizeDTO | undefined {
        return this._size;
    }


    /**
     * @inheritDoc
     */
    public setLineHeight (value : SizeDTO | undefined) : this {
        this._lineHeight = value;
        return this;
    }

    /**
     * @inheritDoc
     */
    public getLineHeight () : SizeDTO | undefined {
        return this._lineHeight;
    }


    /**
     * @inheritDoc
     */
    public setFontFamily (value : string | undefined) : this {
        this._family = value;
        return this;
    }

    /**
     * @inheritDoc
     */
    public getFontFamily () : string | undefined {
        return this._family;
    }

}

export function isFontEntity (value: unknown): value is FontEntity {
    return value instanceof FontEntity;
}
