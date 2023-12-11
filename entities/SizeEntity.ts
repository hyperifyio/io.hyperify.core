// Copyright (c) 2023. Sendanor <info@sendanor.fi>. All rights reserved.

import { ReadonlyJsonObject } from "../Json";
import { SizeDTO, createSizeDTO, AUTO_KEYWORD, AutoSizeType, isAutoSizeType } from "../dto/SizeDTO";
import { Size } from "./types/Size";
import { UnitType } from "./types/UnitType";

/**
 * Size entity.
 */
export class SizeEntity
    implements Size
{

    public static createAuto () : SizeEntity {
        return new SizeEntity(AUTO_KEYWORD);
    }

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
        value  : AutoSizeType,
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
        value  : number | AutoSizeType,
        unit  ?: UnitType,
    ) : SizeEntity {

        if (isAutoSizeType(value)) {
            return new SizeEntity(AUTO_KEYWORD);
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

        if (isAutoSizeType(dto.value)) {
            return SizeEntity.createAuto();
        }

        return SizeEntity.create(
            dto.value,
            dto.unit ?? UnitType.PX,
        );
    }

    private _value : number | "auto";
    private _unit : UnitType | undefined;

    /**
     * Construct the entity with unit type.
     *
     * @param value
     * @param unit
     * @protected
     */
    protected constructor (
        value : number,
        unit  : UnitType,
    );

    /**
     * Construct the entity as a special auto size.
     *
     * @param value
     * @protected
     */
    protected constructor (
        value : AutoSizeType,
    );

    /**
     * Implementations.
     *
     * @param value
     * @param unit
     * @protected
     */
    protected constructor (
        value : number | AutoSizeType,
        unit ?: UnitType,
    ) {
        this._value = value;
        this._unit = unit;
    }

    /**
     * @inheritDoc
     */
    public getDTO () : SizeDTO {
        return createSizeDTO(
            this._value,
            this._unit,
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
    public setValue (
        value  : number,
        unit  ?: UnitType | undefined,
    ) : this {
        this._value = value;
        if (unit !== undefined) {
            this._unit = unit;
        }
        return this;
    }

    /**
     * @inheritDoc
     */
    public getValue () : number | AutoSizeType {
        return this._value;
    }

    /**
     * @inheritDoc
     */
    public getUnitType () : UnitType | undefined {
        return this._unit;
    }

    public isAuto (): boolean {
        return this._value === AUTO_KEYWORD;
    }

    public setAuto (): this {
        this._value = AUTO_KEYWORD;
        this._unit = undefined;
        return this;
    }

    public getCssStyles (): string {
        if (this.isAuto()) return 'auto';
        if (this._value === 0) return `0`;
        return `${this._value}${this._unit}`;
    }

}

export function isSizeEntity (value: unknown): value is SizeEntity {
    return value instanceof SizeEntity;
}
