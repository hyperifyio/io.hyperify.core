// Copyright (c) 2023. Sendanor <info@sendanor.fi>. All rights reserved.

import { ReadonlyJsonObject } from "../../Json";
import { StyleDTO } from "../style/StyleDTO";
import { DTOWithContent } from "../types/DTOWithContent";
import { DTOWithName } from "../types/DTOWithName";
import { DTOWithOptionalExtend } from "../types/DTOWithOptionalExtend";
import { ExtendableDTO } from "../types/ExtendableDTO";
import {
    ComponentDTOContent,
} from "./ComponentContent";

export interface ComponentDTO
    extends
        DTOWithName,
        DTOWithOptionalExtend,
        DTOWithContent<ComponentDTO>,
        ExtendableDTO
{
    readonly name     : string;
    readonly content ?: ComponentDTOContent;
    readonly extend  ?: string;
    readonly meta    ?: ReadonlyJsonObject;
    readonly style   ?: StyleDTO;
}
