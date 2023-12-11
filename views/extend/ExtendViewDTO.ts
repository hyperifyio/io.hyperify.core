// Copyright (c) 2023. Sendanor <info@sendanor.fi>. All rights reserved.

import { createViewDTO, ViewDTO } from "../../dto/ViewDTO";
import { ExtendView } from "./ExtendView";

export const EXTEND_VIEW_NAME: string = 'ExtendView';

export type ExtendViewDTO = ViewDTO;

export function createExtendViewDTO (
    dto: ExtendView
) : ExtendViewDTO {
    return createViewDTO(
        EXTEND_VIEW_NAME,
        dto.extend,
        undefined,
        undefined,
        undefined,
        [],
        undefined,
        undefined,
    );
}
