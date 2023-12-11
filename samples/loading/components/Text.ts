// Copyright (c) 2023. Sendanor <info@sendanor.fi>. All rights reserved.

import { createComponentDTO, ComponentDTO } from "../../../dto/ComponentDTO";
import { TEXT_COMPONENT_NAME } from "./TextComponent";

export type Text = ComponentDTO;

export function createText (
    name: string,
    text: string,
) : Text {
    return createComponentDTO(
        name,
        TEXT_COMPONENT_NAME,
        [
            text
        ],
        undefined,
        undefined,
    );
}
