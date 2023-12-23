// Copyright (c) 2023. Heusala Group Oy <info@heusalagroup.fi>. All rights reserved.

import { FontStyle } from "./types/FontStyle";
import { FontVariant } from "./types/FontVariant";
import { FontWeight } from "./types/FontWeight";
import { SizeDTO } from "../size/SizeDTO";
import { DTO } from "../types/DTO";

export interface FontDTO extends DTO {
    readonly style ?: FontStyle;
    readonly variant ?: FontVariant;
    readonly weight ?: FontWeight;
    readonly size ?: SizeDTO;
    readonly lineHeight ?: SizeDTO;
    readonly family ?: string;
}
