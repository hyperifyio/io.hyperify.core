// Copyright (c) 2023. Heusala Group Oy <info@heusalagroup.fi>. All rights reserved.

import {
    SizeDTO,
} from "../size/SizeDTO";
import { DTO } from "../types/DTO";

export interface SizeBoxDTO extends DTO {
    readonly top ?: SizeDTO;
    readonly right ?: SizeDTO;
    readonly bottom ?: SizeDTO;
    readonly left ?: SizeDTO;
}

/**
 *
 * @deprecated
 */
export function createSizeBoxDTO (
    top : SizeDTO | undefined,
    right : SizeDTO | undefined,
    bottom : SizeDTO | undefined,
    left : SizeDTO | undefined,
) : SizeBoxDTO {
    return {
        top,
        right,
        bottom,
        left,
    };
}
