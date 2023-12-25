// Copyright (c) 2023. Sendanor <info@sendanor.fi>. All rights reserved.

import { ColorEntity } from "../../../entities/color/ColorEntity";
import { ViewDTO } from "../../../entities/view/ViewDTO";
import { StyleEntity } from "../../../entities/style/StyleEntity";
import { ViewEntity } from "../../../entities/view/ViewEntity";
import { DARK_BACKGROUND_COLOR, DARK_TEXT_COLOR } from "../constants/colors";

export const DEFAULT_VIEW_NAME: string = 'DefaultView';

export type DefaultView = ViewDTO;

export function createDefaultView () : DefaultView {
    return (
        ViewEntity.create(DEFAULT_VIEW_NAME)
                  .setStyle(
                      StyleEntity.create()
                                 .setBackgroundColor(
                                     ColorEntity.create(DARK_BACKGROUND_COLOR).getDTO()
                                 )
                                 .setTextColor(
                                     ColorEntity.create(DARK_TEXT_COLOR).getDTO()
                                 )
                                 .getDTO()
                  )
                  .getDTO()
    );
}
