// Copyright (c) 2023. Sendanor <info@sendanor.fi>. All rights reserved.

import { isNumber } from "../../types/Number";
import { EntityFactoryImpl } from "../types/EntityFactoryImpl";
import { EntityMethodImpl } from "../types/EntityMethodImpl";
import {
    isUnitTypeOrUndefined,
    UnitType,
} from "../types/UnitType";
import { VariableType } from "../types/VariableType";
import { Size } from "./Size";
import { SizeDTO } from "./SizeDTO";
import {
    isAutoSpecialSize,
    SpecialSize,
} from "./SpecialSize";

export const SizeEntityFactory = (
    EntityFactoryImpl.create<SizeDTO, Size>('Size')
                     .addStaticMethod(
                         EntityMethodImpl.create('create')
                                         .addArgument(VariableType.NUMBER)
                                         .returnType('Size')
                     )
                     .addStaticMethod(
                         EntityMethodImpl.create('create')
                                         .addArgument(SpecialSize)
                                         .returnType('Size')
                     )
                     .add( EntityFactoryImpl.createProperty("value").setTypes(VariableType.NUMBER, SpecialSize) )
                     .add( EntityFactoryImpl.createProperty("unit", "unitType").setTypes(VariableType.STRING, VariableType.UNDEFINED) )
);

export const isSizeDTO = SizeEntityFactory.createTestFunctionOfDTO();

export const isSize = SizeEntityFactory.createTestFunctionOfInterface();

export const explainSizeDTO = SizeEntityFactory.createExplainFunctionOfDTO();

export const isSizeDTOOrUndefined = SizeEntityFactory.createTestFunctionOfDTOorOneOf(VariableType.UNDEFINED);

export const explainSizeDTOOrUndefined = SizeEntityFactory.createExplainFunctionOfDTOorOneOf(VariableType.UNDEFINED);

export const BaseSizeEntity = SizeEntityFactory.createEntityType();

/**
 * Size entity.
 */
export class SizeEntity
    extends BaseSizeEntity
    implements Size
{

    public static createAuto () : SizeEntity {
        return new SizeEntity(SpecialSize.AUTO);
    }

    /**
     * Creates a size entity with auto size.
     */
    public static create () : SizeEntity;

    /**
     * Creates a size with pixels.
     *
     * @param value
     */
    public static create (
        value  : Size,
    ) : SizeEntity;

    /**
     * Creates a size with pixels.
     *
     * @param value
     */
    public static create (
        value  : number,
    ) : SizeEntity;

    /**
     * Creates a auto size entity.
     *
     * @param value
     */
    public static create (
        value  : SpecialSize.AUTO,
    ) : SizeEntity;

    /**
     * Creates a size entity with a unit type.
     *
     * @param value
     * @param unit Defaults to pixels.
     */
    public static create (
        value  : number,
        unit   : UnitType,
    ) : SizeEntity;

    /**
     * Creates a size entity.
     *
     * @param value
     * @param unit Defaults to pixels.
     */
    public static create (
        value ?: Size | number | SpecialSize.AUTO,
        unit  ?: UnitType,
    ) : SizeEntity {

        if (value === undefined) {
            return new SizeEntity(SpecialSize.AUTO)
        }

        if (isAutoSpecialSize(value)) {
            return new SizeEntity(SpecialSize.AUTO);
        }

        if (isSizeEntity(value) || isSize(value)) {
            const v = value.getValue();
            if (v === SpecialSize.AUTO) return new SizeEntity(SpecialSize.AUTO);
            return new SizeEntity(
                v,
                unit ?? UnitType.PX,
            );
        }

        return new SizeEntity(
            value,
            unit ?? UnitType.PX,
        );
    }

    /**
     * Creates a size entity using percents.
     *
     * @param value Value in percents.
     */
    public static createPercent (
        value  : number,
    ) : SizeEntity {
        return this.create(
            value,
            UnitType.PERCENT,
        );
    }

    /**
     * Creates a size entity using view height (vh).
     *
     * @param value Value in percents.
     */
    public static createViewHeight (
        value  : number,
    ) : SizeEntity {
        return this.create(
            value,
            UnitType.VH,
        );
    }

    /**
     * Creates a size entity using view width (vw).
     *
     * @param value Value in percents.
     */
    public static createViewWidth (
        value  : number,
    ) : SizeEntity {
        return this.create(
            value,
            UnitType.VW,
        );
    }

    /**
     * Creates a size entity using pixels.
     *
     * @param value Value in pixels.
     */
    public static createPx (
        value  : number,
    ) : SizeEntity {
        return this.create(
            value,
            UnitType.PX,
        );
    }

    /**
     * Creates a size entity using pixels.
     *
     * @param value Value in pixels.
     */
    public static createPixels (
        value  : number,
    ) : SizeEntity {
        return this.create(
            value,
            UnitType.PX,
        );
    }

    /**
     * Creates a size entity using points.
     *
     * @param value Value in points.
     */
    public static createPt (
        value  : number,
    ) : SizeEntity {
        return this.create(
            value,
            UnitType.PT,
        );
    }

    /**
     * Creates a size entity using em.
     *
     * @param value Value in em.
     */
    public static createEm (
        value  : number,
    ) : SizeEntity {
        return this.create(
            value,
            UnitType.EM,
        );
    }

    public static createZero () : SizeEntity {
        return SizeEntity.create(0);
    }

    /**
     * Creates a size entity from a DTO.
     *
     * @param dto
     */
    public static createFromDTO (
        dto : SizeDTO,
    ) : SizeEntity {

        if (isAutoSpecialSize(dto.value)) {
            return SizeEntity.createAuto();
        }

        return SizeEntity.create(
            dto.value,
            dto.unit ?? UnitType.PX,
        );
    }


    /**
     * Construct empty entity
     *
     * @protected
     */
    public constructor ();

    /**
     * Construct empty from DTO
     */
    public constructor (
        dto: SizeDTO
    );

    /**
     * Construct the entity with unit type.
     *
     * @param value
     * @param unit
     * @public
     */
    public constructor (
        value : number,
        unit  : UnitType,
    );

    /**
     * Construct the entity as a special auto size.
     *
     * @param value
     * @protected
     */
    public constructor (
        value : SpecialSize.AUTO,
    );

    /**
     * Implementations.
     *
     * @param value
     * @param unit
     * @protected
     */
    public constructor (
        value ?: SizeDTO | number | SpecialSize.AUTO,
        unit  ?: UnitType,
    ) {
        if (value === undefined && unit === undefined) {
            super();
        } else if ( isNumber(value) && isUnitTypeOrUndefined(unit) ) {
            super( { value, unit } );
        } else if ( isAutoSpecialSize(value) ) {
            super( { value: SpecialSize.AUTO } );
        } else if ( isSizeDTO(value) ) {
            super( value );
        } else if ( isSizeEntity(value) ) {
            super( value.getDTO() );
        } else {
            throw new TypeError(`new SizeEntity(): Invalid arguments: ${value}, ${unit}`);
        }
    }


    public isAuto (): boolean {
        return this.getValue() === SpecialSize.AUTO;
    }

    public setAuto (): this {
        this.setValue(SpecialSize.AUTO);
        return this;
    }

    public getCssStyles (): string {
        const value = this.getValue();
        if (value === SpecialSize.AUTO) return 'auto';
        if (value === 0) return `0`;
        return `${value}${this.getUnitType()}`;
    }

}

export function isSizeEntity (value: unknown): value is SizeEntity {
    return value instanceof SizeEntity;
}
