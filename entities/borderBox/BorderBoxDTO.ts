// Copyright (c) 2023. Heusala Group Oy <info@heusalagroup.fi>. All rights reserved.

import {
    BorderDTO,
} from "../border/BorderDTO";
import { DTO } from "../types/DTO";

export interface BorderBoxDTO extends DTO {
    readonly top ?: BorderDTO;
    readonly right ?: BorderDTO;
    readonly bottom ?: BorderDTO;
    readonly left ?: BorderDTO;
}
