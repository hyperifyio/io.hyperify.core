// Copyright (c) 2023. Heusala Group Oy <info@heusalagroup.fi>. All rights reserved.

import { BackgroundDTO } from "../background/BackgroundDTO";
import { BorderDTO } from "../border/BorderDTO";
import { BorderBoxDTO } from "../borderBox/BorderBoxDTO";
import { ColorDTO } from "../color/ColorDTO";
import { FontDTO } from "../font/FontDTO";
import { SizeBoxDTO } from "../sizeBox/SizeBoxDTO";
import { SizeDTO } from "../size/SizeDTO";
import { TextDecorationDTO } from "../textDecoration/TextDecorationDTO";
import { BoxSizing} from "../types/BoxSizing";
import { DTO } from "../types/DTO";
import { TextAlign } from "../types/TextAlign";

export interface StyleDTO extends DTO {
    readonly textAlign          ?: TextAlign;
    readonly textColor          ?: ColorDTO;
    readonly width              ?: SizeDTO;
    readonly height             ?: SizeDTO;
    readonly margin             ?: SizeDTO | SizeBoxDTO;
    readonly padding            ?: SizeDTO | SizeBoxDTO;
    readonly border             ?: BorderDTO | BorderBoxDTO;
    readonly font               ?: FontDTO;
    readonly textDecoration     ?: TextDecorationDTO;
    readonly background         ?: BackgroundDTO;
    readonly minWidth           ?: SizeDTO;
    readonly minHeight          ?: SizeDTO;
    readonly maxWidth           ?: SizeDTO;
    readonly maxHeight          ?: SizeDTO;
    readonly boxSizing          ?: BoxSizing;
}
