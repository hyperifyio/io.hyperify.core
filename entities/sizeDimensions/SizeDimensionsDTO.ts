// Copyright (c) 2023. Heusala Group Oy <info@heusalagroup.fi>. All rights reserved.

import {
    SizeDTO,
} from "../size/SizeDTO";
import { DTO } from "../types/DTO";

export interface SizeDimensionsDTO extends DTO {
    readonly width ?: SizeDTO;
    readonly height ?: SizeDTO;
}

/**
 *
 * @deprecated
 */
export function createSizeDimensionsDTO (
    width : SizeDTO | undefined,
    height : SizeDTO | undefined,
) : SizeDimensionsDTO {
    return {
        width,
        height,
    };
}

