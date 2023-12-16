// Copyright (c) 2023. Sendanor <info@sendanor.fi>. All rights reserved.

import {
    explainNot,
    explainOk,
    explainOr,
} from "../../types/explain";
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
import { VariableType } from "../types/EntityProperty";
import { EntityPropertyImpl } from "../types/EntityPropertyImpl";

export const ColorEntityFactory = (
    EntityFactoryImpl.create<ColorDTO, Color>()
                     .add( EntityPropertyImpl.create("value").setTypes(VariableType.STRING) )
);

export const isColorDTO = ColorEntityFactory.createIsDTO();

export const explainColorDTO = ColorEntityFactory.createExplainDTO();

export const isColorDTOOrUndefined = ColorEntityFactory.createIsDTOOr(VariableType.UNDEFINED);

export function explainColorDTOOrUndefined (value: unknown): string {
    return isColorDTOOrUndefined(value) ? explainOk() : explainNot(explainOr(['ColorDTO', 'undefined']));
}

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
