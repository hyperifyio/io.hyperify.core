// Copyright (c) 2023. Heusala Group Oy <info@heusalagroup.fi>. All rights reserved.

import { explain, explainNot, explainOk, explainOr, explainProperty } from "../../types/explain";
import { explainNoOtherKeysInDevelopment, hasNoOtherKeysInDevelopment } from "../../types/OtherKeys";
import { explainRegularObject, isRegularObject } from "../../types/RegularObject";
import { isUndefined } from "../../types/undefined";
import {
    explainBorderDTOOrUndefined,
    isBorderDTOOrUndefined,
    BorderDTO,
} from "../border/BorderDTO";
import { DTO } from "../types/DTO";

export interface BorderBoxDTO extends DTO {
    readonly top ?: BorderDTO;
    readonly right ?: BorderDTO;
    readonly bottom ?: BorderDTO;
    readonly left ?: BorderDTO;
}
