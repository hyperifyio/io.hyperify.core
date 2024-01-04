// Copyright (c) 2023. Heusala Group Oy <info@heusalagroup.fi>. All rights reserved.

import { BackgroundImageDTO} from "../backgroundImage/BackgroundImageDTO";
import { BackgroundPositionDTO } from "../backgroundPosition/BackgroundPositionDTO";
import { ColorDTO } from "../color/ColorDTO";
import { SizeDTO } from "../size/SizeDTO";
import { SizeDimensionsDTO } from "../sizeDimensions/SizeDimensionsDTO";
import { BackgroundAttachment } from "../types/BackgroundAttachment";
import { BackgroundBlendMode } from "../types/BackgroundBlendMode";
import { BackgroundClip } from "../types/BackgroundClip";
import { BackgroundOrigin } from "../types/BackgroundOrigin";
import { BackgroundRepeatDTO } from "../backgroundRepeat/BackgroundRepeatDTO";
import { BackgroundSize } from "../types/BackgroundSize";
import { DTO } from "../types/DTO";

export interface BackgroundDTO extends DTO {
    readonly attachment ?: BackgroundAttachment;
    readonly blendMode ?: BackgroundBlendMode;
    readonly clip ?: BackgroundClip;
    readonly color ?: ColorDTO;
    readonly image ?: BackgroundImageDTO;
    readonly origin ?: BackgroundOrigin;
    readonly position ?: BackgroundPositionDTO;
    readonly repeat ?: BackgroundRepeatDTO;
    readonly size ?: BackgroundSize | SizeDTO | SizeDimensionsDTO;
}
