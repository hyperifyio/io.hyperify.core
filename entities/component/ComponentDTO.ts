// Copyright (c) 2023. Sendanor <info@sendanor.fi>. All rights reserved.

import { ReadonlyJsonObject } from "../../Json";
import { ExtendableDTO } from "../types/ExtendableDTO";
import { StyleDTO } from "../style/StyleDTO";
import { DTOWithContent } from "../types/DTOWithContent";
import { DTOWithOptionalExtend } from "../types/DTOWithOptionalExtend";
import { DTOWithName } from "../types/DTOWithName";
import { ComponentContent } from "./ComponentContent";

export interface ComponentDTO
    extends
        DTOWithName,
        DTOWithOptionalExtend,
        DTOWithContent<ComponentDTO>,
        ExtendableDTO
{
    readonly name     : string;
    readonly content ?: ComponentContent;
    readonly extend  ?: string;
    readonly meta    ?: ReadonlyJsonObject;
    readonly style   ?: StyleDTO;
}
