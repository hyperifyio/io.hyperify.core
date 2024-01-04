// Copyright (c) 2023. Heusala Group Oy <info@heusalagroup.fi>. All rights reserved.

import {
    SizeDTO,
} from "../size/SizeDTO";
import { BackgroundPositionValue } from "../types/BackgroundPositionValue";
import { DTO } from "../types/DTO";

export interface BackgroundPositionDTO extends DTO {
    readonly position ?: BackgroundPositionValue;
    readonly size ?: SizeDTO;
    readonly secondPosition ?: BackgroundPositionValue;
    readonly secondSize ?: SizeDTO;
}
