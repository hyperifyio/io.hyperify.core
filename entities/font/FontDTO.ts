// Copyright (c) 2023. Heusala Group Oy <info@heusalagroup.fi>. All rights reserved.

import { explain, explainNot, explainOk, explainOr, explainProperty } from "../../types/explain";
import { explainNoOtherKeysInDevelopment, hasNoOtherKeysInDevelopment } from "../../types/OtherKeys";
import { explainRegularObject, isRegularObject } from "../../types/RegularObject";
import { explainStringOrUndefined, isStringOrUndefined } from "../../types/String";
import { isUndefined } from "../../types/undefined";
import { explainFontStyleOrUndefined, FontStyle, isFontStyleOrUndefined } from "./types/FontStyle";
import { explainFontVariantOrUndefined, FontVariant, isFontVariantOrUndefined } from "./types/FontVariant";
import { explainFontWeightOrUndefined, FontWeight, isFontWeightOrUndefined } from "./types/FontWeight";
import { explainSizeDTOOrUndefined, isSizeDTOOrUndefined, SizeDTO } from "../size/SizeDTO";
import { DTO } from "../types/DTO";

export interface FontDTO extends DTO {
    readonly style ?: FontStyle;
    readonly variant ?: FontVariant;
    readonly weight ?: FontWeight;
    readonly size ?: SizeDTO;
    readonly lineHeight ?: SizeDTO;
    readonly family ?: string;
}
