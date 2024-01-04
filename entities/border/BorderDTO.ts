// Copyright (c) 2023. Heusala Group Oy <info@heusalagroup.fi>. All rights reserved.

import { ColorDTO } from "../color/ColorDTO";
import { SizeDTO } from "../size/SizeDTO";
import { BorderStyle } from "../types/BorderStyle";
import { DTO } from "../types/DTO";

export interface BorderDTO extends DTO {

    /**
     * Defaults to NONE
     */
    readonly style ?: BorderStyle | undefined;

    readonly width ?: SizeDTO | undefined;

    readonly radius ?: SizeDTO | undefined;

    readonly color ?: ColorDTO | undefined;

}
