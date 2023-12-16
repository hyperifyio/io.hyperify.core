// Copyright (c) 2023. Sendanor <info@sendanor.fi>. All rights reserved.

import {
    BorderBoxDTO,
    createBorderBoxDTO,
    isBorderBoxDTO,
} from "./BorderBoxDTO";
import {
    isBorderDTO,
    BorderDTO,
} from "../border/BorderDTO";
import { reduce } from "../../functions/reduce";
import { ReadonlyJsonObject } from "../../Json";
import { BorderEntity } from "../border/BorderEntity";
import {
    BorderBox,
    isBorderBox,
} from "./BorderBox";
import { EntityFactoryImpl } from "../types/EntityFactoryImpl";
import { VariableType } from "../types/EntityProperty";
import { EntityPropertyImpl } from "../types/EntityPropertyImpl";

export const BorderBoxEntityFactory = (
    EntityFactoryImpl.create<BorderBoxDTO, BorderBox>()
                     .add( EntityPropertyImpl.create("top").setTypes(BorderEntity, VariableType.UNDEFINED) )
                     .add( EntityPropertyImpl.create("right").setTypes(BorderEntity, VariableType.UNDEFINED) )
                     .add( EntityPropertyImpl.create("bottom").setTypes(BorderEntity, VariableType.UNDEFINED) )
                     .add( EntityPropertyImpl.create("left").setTypes(BorderEntity, VariableType.UNDEFINED) )
);

export const BaseBorderBoxEntity = BorderBoxEntityFactory.createEntityType();

/**
 * BorderBox entity.
 */
export class BorderBoxEntity
    extends BaseBorderBoxEntity
    implements BorderBox
{

    public static create () : BorderBoxEntity;

    /**
     * Creates a size box entity.
     *
     * @param topAndBottom
     * @param rightAndLeft
     */
    public static create (
        topAndBottom : BorderDTO,
        rightAndLeft : BorderDTO,
    ) : BorderBoxEntity;

    /**
     * Creates a size box entity.
     *
     * @param top
     * @param right
     * @param bottom
     * @param left
     */
    public static create (
        top    : BorderDTO,
        right  : BorderDTO,
        bottom : BorderDTO,
        left   : BorderDTO,
    ) : BorderBoxEntity;

    /**
     * Creates a size box entity.
     *
     * @param top
     * @param right
     * @param bottom
     * @param left
     */
    public static create (
        top    ?: BorderDTO | BorderBoxDTO | BorderBoxEntity,
        right  ?: BorderDTO,
        bottom ?: BorderDTO,
        left   ?: BorderDTO,
    ) : BorderBoxEntity {
        if ( top === undefined && right === undefined && bottom === undefined && left === undefined ) {
            return new BorderBoxEntity();
        } else if ( isBorderBoxDTO(top) ) {
            return new BorderBoxEntity(top);
        } else if ( isBorderBoxEntity(top) ) {
            return new BorderBoxEntity(top.getDTO());
        } else if ( isBorderBox(top) ) {
            return new BorderBoxEntity(top.getDTO());
        } else if ( isBorderDTO(top) && isBorderDTO(right) && bottom === undefined && left === undefined  ) {
            return new BorderBoxEntity( createBorderBoxDTO(top, right, top, right) );
        } else if ( isBorderDTO(top) && isBorderDTO(right) && isBorderDTO(bottom) && isBorderDTO(left) ) {
            return new BorderBoxEntity( createBorderBoxDTO(top, right, bottom, left) );
        } else {
            throw new TypeError(`Invalid arguments for create: ${top}, ${right}, ${bottom}, ${left}`);
        }
    }

    /**
     * Creates a size box entity from DTO.
     *
     * @param value
     */
    public static createFromDTO (
        value : BorderBoxDTO,
    ) : BorderBoxEntity {
        return new BorderBoxEntity(value);
    }

    public static merge (
        ...values: readonly (BorderBoxDTO | BorderBox | BorderBoxEntity)[]
    ) : BorderBoxEntity {
        return BorderBoxEntity.createFromDTO(
            reduce(
                values,
                (
                    prev: BorderBoxDTO,
                    item: BorderBoxDTO | BorderBox | BorderBoxEntity,
                ) : BorderBoxDTO => {
                    const dto : BorderBoxDTO = this.toDTO(item);
                    return {
                        ...prev,
                        ...dto,
                    };
                },
                createBorderBoxDTO(
                    undefined,
                    undefined,
                    undefined,
                    undefined,
                ),
            )
        );
    }

    public static toDTO (
        value: BorderBoxDTO | BorderBox | BorderBoxEntity,
    ) : BorderBoxDTO {
        if (isBorderBoxEntity(value)) {
            return value.getDTO();
        } else if (isBorderBox(value)) {
            return value.getDTO();
        } else {
            return value;
        }
    }

    protected constructor (
        value ?: BorderBoxDTO | BorderBox,
    ) {
        super(
            isBorderBoxDTO(value)
                ? value
                : (
                    isBorderBox(value)
                        ? value.getDTO()
                        : undefined
                )
        );
    }

    /**
     * @inheritDoc
     */
    public getCssStyles (): ReadonlyJsonObject {
        const top = this.getTop();
        const right = this.getRight();
        const bottom = this.getBottom();
        const left = this.getLeft();
        return {
            ...( top !== undefined ? { 'border-top': top.getCssStyles() }: {}),
            ...( right !== undefined ? { 'border-right': right.getCssStyles() }: {}),
            ...( bottom !== undefined ? { 'border-bottom': bottom.getCssStyles() }: {}),
            ...( left !== undefined ? { 'border-left': left.getCssStyles() }: {}),
        };
    }

}

export function isBorderBoxEntity (value: unknown): value is BorderBoxEntity {
    return value instanceof BorderBoxEntity;
}
