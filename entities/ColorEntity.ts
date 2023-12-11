// Copyright (c) 2023. Sendanor <info@sendanor.fi>. All rights reserved.

import { reduce } from "../functions/reduce";
import { ReadonlyJsonObject } from "../Json";
import { isString } from "../types/String";
import { ColorDTO, createColorDTO } from "../dto/ColorDTO";
import { Color, isColor } from "./types/Color";

/**
 * Color entity.
 */
export class ColorEntity
    implements Color
{

    /**
     * Creates a color entity.
     *
     * @param value
     */
    public static create (
        value : string,
    ) : ColorEntity {
        return new ColorEntity(value);
    }

    /**
     * Creates a transparent color entity.
     */
    public static createTransparent (
    ) : ColorEntity {
        return new ColorEntity("transparent");
    }

    /**
     * Creates a color entity from DTO.
     *
     * @param value
     */
    public static createFromDTO (
        value : ColorDTO,
    ) : ColorEntity {
        return new ColorEntity(value.value);
    }

    public static merge (
        ...values: readonly (ColorDTO | Color | ColorEntity | string)[]
    ) : ColorEntity {
        return ColorEntity.createFromDTO(
            reduce(
                values,
                (
                    prev: ColorDTO,
                    item: ColorDTO | Color | ColorEntity | string,
                ) : ColorDTO => {
                    const dto : ColorDTO = this.toDTO(item);
                    return {
                        ...prev,
                        ...dto,
                    };
                },
                createColorDTO(
                    '',
                ),
            )
        );
    }

    public static toDTO (
        value: ColorDTO | Color | ColorEntity | string,
    ) : ColorDTO {
        if (isString(value)) {
            return ColorEntity.create(value).getDTO();
        } else if (isColorEntity(value)) {
            return value.getDTO();
        } else if (isColor(value)) {
            return value.getDTO();
        } else {
            return value;
        }
    }

    private _value : string;

    protected constructor (
        value : string,
    ) {
        this._value = value;
    }

    /**
     * Returns the DTO object.
     */
    public getDTO () : ColorDTO {
        return createColorDTO(this._value);
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
    public setValue (value : string ) : this {
        this._value = value;
        return this;
    }

    /**
     * @inheritDoc
     */
    public getValue () : string {
        return this._value;
    }

    /**
     * @inheritDoc
     */
    public getCssStyles (): string {
        return `${this._value}`;
    }

}

export function isColorEntity (value: unknown): value is ColorEntity {
    return value instanceof ColorEntity;
}
