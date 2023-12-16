// Copyright (c) 2023. Sendanor <info@sendanor.fi>. All rights reserved.

import { createViewDTO, ViewDTO } from "../../../entities/view/ViewDTO";
import { StyleEntity } from "../../../entities/style/StyleEntity";
import { DARK_BACKGROUND_COLOR, DARK_TEXT_COLOR } from "../constants/colors";

export const DEFAULT_VIEW_NAME: string = 'DefaultView';

export type DefaultView = ViewDTO;

export function createDefaultView () : DefaultView {
    return createViewDTO(
        DEFAULT_VIEW_NAME,
        undefined,
        undefined,
        undefined,
        undefined,
        undefined,
        (
            StyleEntity.create()
                       .setBackgroundColor(DARK_BACKGROUND_COLOR)
                       .setTextColor(DARK_TEXT_COLOR)
                       .getDTO()
        ),
        undefined,
    );
}
