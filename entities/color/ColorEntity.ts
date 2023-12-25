// Copyright (c) 2023. Sendanor <info@sendanor.fi>. All rights reserved.

import { VariableType } from "../types/VariableType";
import {
    ColorDTO,
} from "./ColorDTO";
import { reduce } from "../../functions/reduce";
import { isString } from "../../types/String";
import {
    Color,
    isColor,
} from "./Color";
import { EntityFactoryImpl } from "../types/EntityFactoryImpl";

export const ColorEntityFactory = (
    EntityFactoryImpl.create<ColorDTO, Color>('Color')
                     .add( EntityFactoryImpl.createProperty("value").setTypes(VariableType.STRING) )
);

export const isColorDTO = ColorEntityFactory.createTestFunctionOfDTO();

export const explainColorDTO = ColorEntityFactory.createExplainFunctionOfDTO();

export const isColorDTOOrUndefined = ColorEntityFactory.createTestFunctionOfDTOorOneOf(VariableType.UNDEFINED);

export const explainColorDTOOrUndefined = ColorEntityFactory.createExplainFunctionOfDTOorOneOf(VariableType.UNDEFINED);

export const BaseColorEntity = ColorEntityFactory.createEntityType();

/**
 * Color entity.
 */
export class ColorEntity
    extends BaseColorEntity
    implements Color
{

    /**
     * Creates a color entity.
     *
     * @param value
     */
    public static create (
        value ?: string,
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
                {value: ''},
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

    protected constructor (
        value ?: string | ColorDTO | Color,
    ) {
        super(
            isColorDTO(value)
                ? value
                : (
                    isColor(value)
                        ? value.getDTO()
                        : (
                            value
                                ? { value }
                                : undefined
                        )
                )
        );
    }

    /**
     * @inheritDoc
     */
    public getCssStyles (): string {
        return `${this.getValue()}`;
    }

}

export function isColorEntity (value: unknown): value is ColorEntity {
    return value instanceof ColorEntity;
}
