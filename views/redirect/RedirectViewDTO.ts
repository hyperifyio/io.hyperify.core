// Copyright (c) 2023. Sendanor <info@sendanor.fi>. All rights reserved.

import { createViewDTO, ViewDTO } from "../../dto/ViewDTO";
import { RedirectView } from "./RedirectView";

export const REDIRECT_VIEW_NAME: string = 'RedirectView';

export type RedirectViewDTO = ViewDTO;

export function createRedirectViewDTO (
    dto: RedirectView
) : RedirectViewDTO {
    return createViewDTO(
        REDIRECT_VIEW_NAME,
        undefined,
        undefined,
        undefined,
        undefined,
        [
            'Redirecting...'
        ],
        undefined,
        {
            location: dto.location,
        },
    );
}
