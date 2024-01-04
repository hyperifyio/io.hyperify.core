// Copyright (c) 2023. Heusala Group Oy <info@heusalagroup.fi>. All rights reserved.

import { explainEnum, isEnum, parseEnum, stringifyEnum } from "../../types/Enum";
import { explainNot, explainOk, explainOr } from "../../types/explain";
import { isUndefined } from "../../types/undefined";

/**
 * Units
 */
export enum UnitType {

    /**
     * `cm` - Centimeters
     */
    CM = "cm",

    /**
     * `mm` - Millimeters
     */
    MM = "mm",

    /**
     * `in` - Inches
     */
    IN = "in",

    /**
     * `px` - Pixels
     */
    PX = "px",

    /**
     * `pt` - Points
     */
    PT = "pt",

    /**
     * `pc` - Picas
     */
    PC = "pc",

    /**
     * `em` - Relative to the font-size of the element
     */
    EM = "em",

    /**
     * `ex` - Relative to x-height of the current font
     */
    EX = "ex",

    /**
     * `ch` - Relative to width of the "0" (zero)
     */
    CH = "ch",

    /**
     * `rem` - Relative to font-size of the root element
     */
    REM = "rem",

    /**
     * `vw` - Relative to 1% of the width of the viewport
     */
    VW = "vw",

    /**
     * `vh` - Relative to 1% of the height of the viewport
     */
    VH = "vh",

    /**
     * `vmin` - Relative to 1% of viewport's smaller dimension
     */
    VMIN = "vmin",

    /**
     * `vmax` - Relative to 1% of viewport's larger dimension
     */
    VMAX = "vmax",

    /**
     * `%` - Relative to the parent element
     */
    PERCENT = "%",

}

export function isUnitType (value: unknown) : value is UnitType {
    return isEnum(UnitType, value);
}

export function explainUnitType (value : unknown) : string {
    return explainEnum("UnitType", UnitType, isUnitType, value);
}

export function stringifyUnitType (value : UnitType) : string {
    return stringifyEnum(UnitType, value);
}

export function parseUnitType (value: any) : UnitType | undefined {
    return parseEnum(UnitType, value) as UnitType | undefined;
}

export function isUnitTypeOrUndefined (value: unknown): value is UnitType | undefined {
    return isUndefined(value) || isUnitType(value);
}

export function explainUnitTypeOrUndefined (value: unknown): string {
    return isUnitTypeOrUndefined(value) ? explainOk() : explainNot(explainOr(['UnitType', 'undefined']));
}
