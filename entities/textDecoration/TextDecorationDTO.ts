// Copyright (c) 2023. Heusala Group Oy <info@heusalagroup.fi>. All rights reserved.

import {
    TextDecorationLineType,
} from "../types/TextDecorationLineType";
import {
    TextDecorationStyle,
} from "../types/TextDecorationStyle";
import {
    ColorDTO,
} from "../color/ColorDTO";
import {
    SizeDTO,
} from "../size/SizeDTO";
import { DTO } from "../types/DTO";

export interface TextDecorationDTO extends DTO {
    readonly lineType ?: TextDecorationLineType;
    readonly color ?: ColorDTO;
    readonly style ?: TextDecorationStyle;
    readonly thickness ?: SizeDTO;
}
