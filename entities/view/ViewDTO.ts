// Copyright (c) 2023. Sendanor <info@sendanor.fi>. All rights reserved.

import { ReadonlyJsonObject } from "../../Json";
import {
    ComponentContent,
} from "../component/ComponentContent";
import { DTO } from "../types/DTO";
import { ExtendableDTO } from "../types/ExtendableDTO";
import { SeoDTO } from "../seo/SeoDTO";
import { StyleDTO } from "../style/StyleDTO";
import { DTOWithOptionalExtend } from "../types/DTOWithOptionalExtend";
import { DTOWithName } from "../types/DTOWithName";

export interface ViewDTO
    extends DTO,
        DTOWithOptionalExtend,
        DTOWithName,
        ExtendableDTO
{
    readonly name            : string;
    readonly extend         ?: string;
    readonly publicUrl      ?: string;
    readonly language       ?: string;
    readonly seo            ?: SeoDTO;
    readonly style          ?: StyleDTO;
    readonly content        ?: ComponentContent;
    readonly meta           ?: ReadonlyJsonObject;
}

/**
 * 
 * @deprecated
 */
export function createViewDTO (
    name      : string,
    extend    : string | undefined,
    publicUrl : string | undefined,
    language  : string | undefined,
    seo       : SeoDTO | undefined,
    content   : ComponentContent | undefined,
    style     : StyleDTO | undefined,
    meta      : ReadonlyJsonObject | undefined,
) : ViewDTO {
    return {
        name,
        ...(extend !== undefined ? {extend} : {}),
        ...(publicUrl !== undefined ? {publicUrl} : {}),
        ...(seo !== undefined ? {seo} : {}),
        ...(language !== undefined ? {language} : {}),
        ...(content !== undefined ? {content} : {}),
        ...(style !== undefined ? {style} : {}),
        ...(meta !== undefined ? {meta} : {}),
    };
}
