// Copyright (c) 2023. Heusala Group Oy <info@heusalagroup.fi>. All rights reserved.

import { BackgroundRepeatType } from "../types/BackgroundRepeatType";
import { DTO } from "../types/DTO";

export interface BackgroundRepeatDTO extends DTO {
    readonly x: BackgroundRepeatType;
    readonly y: BackgroundRepeatType;
}
