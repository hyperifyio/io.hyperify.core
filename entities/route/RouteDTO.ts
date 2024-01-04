// Copyright (c) 2023. Sendanor <info@sendanor.fi>. All rights reserved.

import { DTO } from "../types/DTO";
import { ExtendableDTO } from "../types/ExtendableDTO";
import { DTOWithOptionalExtend } from "../types/DTOWithOptionalExtend";
import { DTOWithName } from "../types/DTOWithName";
import { DTOWithOptionalLanguage } from "../types/DTOWithOptionalLanguage";
import { DTOWithOptionalPublicUrl } from "../types/DTOWithOptionalPublicUrl";

export interface RouteDTO
    extends
        DTO,
        DTOWithName,
        DTOWithOptionalExtend,
        DTOWithOptionalPublicUrl,
        DTOWithOptionalLanguage,
        ExtendableDTO
{
    readonly name       : string;
    readonly path       : string;
    readonly extend    ?: string;
    readonly publicUrl ?: string;
    readonly language  ?: string;
    readonly view      ?: string;
    readonly redirect  ?: string;
}
