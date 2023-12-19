// Copyright (c) 2023. Heusala Group Oy <info@heusalagroup.fi>. All rights reserved.

import { BackgroundImageDTO} from "../backgroundImage/BackgroundImageDTO";
import { ColorDTO } from "../color/ColorDTO";
import { BackgroundAttachment } from "../types/BackgroundAttachment";
import { BackgroundBlendMode } from "../types/BackgroundBlendMode";
import { BackgroundClip } from "../types/BackgroundClip";
import { BackgroundOrigin } from "../types/BackgroundOrigin";
import { BackgroundPositionOptions } from "../types/BackgroundPositionOptions";
import { BackgroundRepeatDTO } from "../backgroundRepeat/BackgroundRepeatDTO";
import { BackgroundSizeOptions } from "../types/BackgroundSizeOptions";
import { DTO } from "../types/DTO";

export interface BackgroundDTO extends DTO {
    readonly attachment ?: BackgroundAttachment;
    readonly blendMode ?: BackgroundBlendMode;
    readonly clip ?: BackgroundClip;
    readonly color ?: ColorDTO;
    readonly image ?: BackgroundImageDTO;
    readonly origin ?: BackgroundOrigin;
    readonly position ?: BackgroundPositionOptions;
    readonly repeat ?: BackgroundRepeatDTO;
    readonly size ?: BackgroundSizeOptions;
}
