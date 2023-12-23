// Copyright (c) 2023. Sendanor <info@sendanor.fi>. All rights reserved.

import { VariableType } from "../types/VariableType";
import {
    SizeDimensionsDTO,
    createSizeDimensionsDTO,
    isSizeDimensionsDTO,
} from "./SizeDimensionsDTO";
import {
    isSizeDTO,
    SizeDTO,
} from "../size/SizeDTO";
import { reduce } from "../../functions/reduce";
import { SizeEntity } from "../size/SizeEntity";
import {
    SizeDimensions,
    isSizeDimensions,
} from "./SizeDimensions";
import { EntityFactoryImpl } from "../types/EntityFactoryImpl";
import { EntityPropertyImpl } from "../types/EntityPropertyImpl";

export const SizeDimensionsEntityFactory = (
    EntityFactoryImpl.create<SizeDimensionsDTO, SizeDimensions>('SizeDimensions')
                     .add( EntityPropertyImpl.create("width").setTypes(SizeEntity, VariableType.UNDEFINED) )
                     .add( EntityPropertyImpl.create("height").setTypes(SizeEntity, VariableType.UNDEFINED) )
);

export const BaseSizeDimensionsEntity = SizeDimensionsEntityFactory.createEntityType();

/**
 * SizeDimensions entity.
 */
export class SizeDimensionsEntity
    extends BaseSizeDimensionsEntity
    implements SizeDimensions
{

    public static create () : SizeDimensionsEntity;

    /**
     * Creates a size box entity.
     *
     * @param width
     * @param height
     * @param bottom
     * @param left
     */
    public static create (
        width    : SizeDTO,
        height  : SizeDTO,
    ) : SizeDimensionsEntity;

    /**
     * Creates a size box entity.
     *
     * @param width
     * @param height
     */
    public static create (
        width   ?: SizeDTO | SizeDimensionsDTO | SizeDimensionsEntity,
        height  ?: SizeDTO,
    ) : SizeDimensionsEntity {
        if ( width === undefined && height === undefined ) {
            return new SizeDimensionsEntity();
        } else if ( isSizeDimensionsDTO(width) ) {
            return new SizeDimensionsEntity(width);
        } else if ( isSizeDimensionsEntity(width) ) {
            return new SizeDimensionsEntity(width.getDTO());
        } else if ( isSizeDimensions(width) ) {
            return new SizeDimensionsEntity(width.getDTO());
        } else if ( isSizeDTO(width) && isSizeDTO(height) ) {
            return new SizeDimensionsEntity( createSizeDimensionsDTO(width, height) );
        } else {
            throw new TypeError(`Invalid arguments for create: ${width}, ${height}`);
        }
    }

    /**
     * Creates a size box entity from DTO.
     *
     * @param value
     */
    public static createFromDTO (
        value : SizeDimensionsDTO,
    ) : SizeDimensionsEntity {
        return new SizeDimensionsEntity(value);
    }

    public static merge (
        ...values: readonly (SizeDimensionsDTO | SizeDimensions | SizeDimensionsEntity)[]
    ) : SizeDimensionsEntity {
        return SizeDimensionsEntity.createFromDTO(
            reduce(
                values,
                (
                    prev: SizeDimensionsDTO,
                    item: SizeDimensionsDTO | SizeDimensions | SizeDimensionsEntity,
                ) : SizeDimensionsDTO => {
                    const dto : SizeDimensionsDTO = this.toDTO(item);
                    return {
                        ...prev,
                        ...dto,
                    };
                },
                createSizeDimensionsDTO(
                    undefined,
                    undefined,
                ),
            )
        );
    }

    public static toDTO (
        value: SizeDimensionsDTO | SizeDimensions | SizeDimensionsEntity,
    ) : SizeDimensionsDTO {
        if (isSizeDimensionsEntity(value)) {
            return value.getDTO();
        } else if (isSizeDimensions(value)) {
            return value.getDTO();
        } else {
            return value;
        }
    }

    protected constructor (
        value ?: SizeDimensionsDTO | SizeDimensions,
    ) {
        super(
            isSizeDimensionsDTO(value)
                ? value
                : (
                    isSizeDimensions(value)
                        ? value.getDTO()
                        : undefined
                )
        );
    }

    /**
     * @inheritDoc
     */
    public getCssStyles (): string {
        const width = (this.getWidth() ?? SizeEntity.createZero()).getCssStyles();
        const height = (this.getHeight() ?? SizeEntity.createZero()).getCssStyles();
        if ( width === height ) {
            return `${ width }`;
        }
        return `${ width } ${ height }`;
    }

}

export function isSizeDimensionsEntity (value: unknown): value is SizeDimensionsEntity {
    return value instanceof SizeDimensionsEntity;
}
