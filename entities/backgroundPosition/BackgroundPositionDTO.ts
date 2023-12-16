// Copyright (c) 2023. Heusala Group Oy <info@heusalagroup.fi>. All rights reserved.

import {
    SizeDTO,
} from "../size/SizeDTO";
import { BackgroundPosition } from "../types/BackgroundPosition";
import { DTO } from "../types/DTO";

export interface BackgroundPositionDTO extends DTO {
    readonly direction ?: BackgroundPosition;
    readonly size ?: SizeDTO;
    readonly secondDirection ?: BackgroundPosition;
    readonly secondSize ?: SizeDTO;
}
