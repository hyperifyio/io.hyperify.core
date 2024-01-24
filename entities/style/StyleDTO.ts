// Copyright (c) 2023. Heusala Group Oy <info@heusalagroup.fi>. All rights reserved.

import { BackgroundDTO } from "../background/BackgroundDTO";
import { BorderDTO } from "../border/BorderDTO";
import { ColorDTO } from "../color/ColorDTO";
import { FontDTO } from "../font/FontDTO";
import { SizeBoxDTO } from "../sizeBox/SizeBoxDTO";
import { SizeDTO } from "../size/SizeDTO";
import { TextDecorationDTO } from "../textDecoration/TextDecorationDTO";
import { BoxSizing} from "../types/BoxSizing";
import { DTO } from "../types/DTO";
import { TextAlign } from "../types/TextAlign";
import { FlexDirection } from "../types/FlexDirection";
import { Display } from "../types/Display";
import { FlexWrap } from "../types/FlexWrap";
import { JustifyContent } from "../types/JustifyContent";
import { AlignItems } from "../types/AlignItems";
import { AlignContent } from "../types/AlignContent";
import { AlignSelf } from "../types/AlignSelf";


export interface StyleDTO extends DTO {
    readonly textAlign          ?: TextAlign;
    readonly textColor          ?: ColorDTO;
    readonly width              ?: SizeDTO;
    readonly height             ?: SizeDTO;
    readonly margin             ?: SizeDTO | SizeBoxDTO;
    readonly padding            ?: SizeDTO | SizeBoxDTO;
    readonly border             ?: BorderDTO | [BorderDTO, BorderDTO] | [BorderDTO, BorderDTO, BorderDTO, BorderDTO];
    readonly font               ?: FontDTO;
    readonly textDecoration     ?: TextDecorationDTO;
    readonly background         ?: BackgroundDTO;
    readonly minWidth           ?: SizeDTO;
    readonly minHeight          ?: SizeDTO;
    readonly maxWidth           ?: SizeDTO;
    readonly maxHeight          ?: SizeDTO;
    readonly boxSizing          ?: BoxSizing;
    readonly display            ?: Display;
    readonly flexDirection      ?: FlexDirection;
    readonly flexWrap           ?: FlexWrap;
    readonly justifyContent     ?: JustifyContent;
    readonly alignItems         ?: AlignItems;
    readonly alignContent       ?: AlignContent;
    readonly alignSelf          ?: AlignSelf;
    readonly flexShrink         ?: number;
    readonly flexGrow           ?: number;
    readonly order              ?: number;
}
