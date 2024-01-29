// Copyright (c) 2023. Heusala Group Oy <info@heusalagroup.fi>. All rights reserved.

import { DTO } from "../types/DTO";
import { UnitType } from "../types/UnitType";
import { SpecialSize } from "./SpecialSize";

export interface SizeDTO extends DTO {

    readonly value: number | SpecialSize;

    /**
     * Defaults to pixels.
     */
    readonly unit ?: UnitType;
}

/**
 *
 * @deprecated
 */
export function createSizeDTO (
    value : number | SpecialSize,
    unit  ?: UnitType | undefined,
) : SizeDTO {
    return {
        value,
        ...(unit ? {unit} : {}),
    };
}
