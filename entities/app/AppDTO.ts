// Copyright (c) 2023. Sendanor <info@sendanor.fi>. All rights reserved.

import { ExtendableDTO } from "../types/ExtendableDTO";
import { ComponentDTO } from "../component/ComponentDTO";
import { RouteDTO } from "../route/RouteDTO";
import { ViewDTO } from "../view/ViewDTO";
import { DTOWithName } from "../types/DTOWithName";
import { DTOWithOptionalExtend } from "../types/DTOWithOptionalExtend";
import { DTOWithOptionalLanguage } from "../types/DTOWithOptionalLanguage";
import { DTOWithOptionalPublicUrl } from "../types/DTOWithOptionalPublicUrl";

export interface AppDTO
    extends
        DTOWithName,
        DTOWithOptionalExtend,
        DTOWithOptionalLanguage,
        DTOWithOptionalPublicUrl,
        ExtendableDTO
{
    readonly name       : string;
    readonly components : readonly ComponentDTO[];
    readonly views      : readonly ViewDTO[];
    readonly routes     : readonly RouteDTO[];
    readonly extend    ?: string | undefined;
    readonly publicUrl ?: string | undefined;
    readonly language  ?: string | undefined;
}
