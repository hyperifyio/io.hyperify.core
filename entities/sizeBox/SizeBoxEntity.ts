// Copyright (c) 2023. Sendanor <info@sendanor.fi>. All rights reserved.

import { VariableType } from "../types/VariableType";
import { SizeBoxDTO } from "./SizeBoxDTO";
import { SizeDTO } from "../size/SizeDTO";
import { reduce } from "../../functions/reduce";
import {
    isSizeDTO,
    SizeEntity,
} from "../size/SizeEntity";
import { SizeBox } from "./SizeBox";
import { EntityFactoryImpl } from "../types/EntityFactoryImpl";

export const SizeBoxEntityFactory = (
    EntityFactoryImpl.create<SizeBoxDTO, SizeBox>('SizeBox')
                     .add( EntityFactoryImpl.createProperty("top").setTypes(SizeEntity, VariableType.UNDEFINED) )
                     .add( EntityFactoryImpl.createProperty("right").setTypes(SizeEntity, VariableType.UNDEFINED) )
                     .add( EntityFactoryImpl.createProperty("bottom").setTypes(SizeEntity, VariableType.UNDEFINED) )
                     .add( EntityFactoryImpl.createProperty("left").setTypes(SizeEntity, VariableType.UNDEFINED) )
);

export const isSizeBoxDTO = SizeBoxEntityFactory.createTestFunctionOfDTO();

export const isSizeBox = SizeBoxEntityFactory.createTestFunctionOfInterface();

export const explainSizeBoxDTO = SizeBoxEntityFactory.createExplainFunctionOfDTO();

export const isSizeBoxDTOOrUndefined = SizeBoxEntityFactory.createTestFunctionOfDTOorOneOf(VariableType.UNDEFINED);

export const explainSizeBoxDTOOrUndefined = SizeBoxEntityFactory.createExplainFunctionOfDTOorOneOf(VariableType.UNDEFINED);

export const BaseSizeBoxEntity = SizeBoxEntityFactory.createEntityType();



/**
 * SizeBox entity.
 */
export class SizeBoxEntity
    extends BaseSizeBoxEntity
    implements SizeBox
{

    public static create () : SizeBoxEntity;

    /**
     * Creates a size box entity.
     *
     * @param topAndBottom
     * @param rightAndLeft
     */
    public static create (
        topAndBottom : SizeDTO,
        rightAndLeft : SizeDTO,
    ) : SizeBoxEntity;

    /**
     * Creates a size box entity.
     *
     * @param top
     * @param right
     * @param bottom
     * @param left
     */
    public static create (
        top    : SizeDTO,
        right  : SizeDTO,
        bottom : SizeDTO,
        left   : SizeDTO,
    ) : SizeBoxEntity;

    /**
     * Creates a size box entity.
     *
     * @param top
     * @param right
     * @param bottom
     * @param left
     */
    public static create (
        top    ?: SizeDTO | SizeBoxDTO | SizeBoxEntity,
        right  ?: SizeDTO,
        bottom ?: SizeDTO,
        left   ?: SizeDTO,
    ) : SizeBoxEntity {
        if ( top === undefined && right === undefined && bottom === undefined && left === undefined ) {
            return new SizeBoxEntity();
        } else if ( isSizeBoxDTO(top) ) {
            return new SizeBoxEntity(top);
        } else if ( isSizeBoxEntity(top) ) {
            return new SizeBoxEntity(top.getDTO());
        } else if ( isSizeBox(top) ) {
            return new SizeBoxEntity(top.getDTO());
        } else if ( isSizeDTO(top) && isSizeDTO(right) && bottom === undefined && left === undefined  ) {
            return new SizeBoxEntity( {top, right, bottom: top, left: right} );
        } else if ( isSizeDTO(top) && isSizeDTO(right) && isSizeDTO(bottom) && isSizeDTO(left) ) {
            return new SizeBoxEntity( {top, right, bottom, left} );
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
        value : SizeBoxDTO,
    ) : SizeBoxEntity {
        return new SizeBoxEntity(value);
    }

    public static merge (
        ...values: readonly (SizeBoxDTO | SizeBox | SizeBoxEntity)[]
    ) : SizeBoxEntity {
        return SizeBoxEntity.createFromDTO(
            reduce(
                values,
                (
                    prev: SizeBoxDTO,
                    item: SizeBoxDTO | SizeBox | SizeBoxEntity,
                ) : SizeBoxDTO => {
                    const dto : SizeBoxDTO = this.toDTO(item);
                    return {
                        ...prev,
                        ...dto,
                    };
                },
                {},
            )
        );
    }

    public static toDTO (
        value: SizeBoxDTO | SizeBox | SizeBoxEntity,
    ) : SizeBoxDTO {
        if (isSizeBoxEntity(value)) {
            return value.getDTO();
        } else if (isSizeBox(value)) {
            return value.getDTO();
        } else {
            return value;
        }
    }

    protected constructor (
        value ?: SizeBoxDTO | SizeBox,
    ) {
        super(
            isSizeBoxDTO(value)
                ? value
                : (
                    isSizeBox(value)
                        ? value.getDTO()
                        : undefined
                )
        );
    }

    /**
     * @inheritDoc
     */
    public getCssStyles (): string {
        const top = (this.getTop() ?? SizeEntity.createZero()).getCssStyles();
        const right = (this.getRight() ?? SizeEntity.createZero()).getCssStyles();
        const bottom = (this.getBottom() ?? SizeEntity.createZero()).getCssStyles();
        const left = (this.getLeft() ?? SizeEntity.createZero()).getCssStyles();
        if ( top === bottom && right === left ) {
            if ( top === right ) {
                return `${ top }`;
            }
            return `${ top } ${ right }`;
        }
        return `${ top } ${ right } ${ bottom } ${ left }`;
    }

}

export function isSizeBoxEntity (value: unknown): value is SizeBoxEntity {
    return value instanceof SizeBoxEntity;
}
