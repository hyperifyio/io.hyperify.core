// Copyright (c) 2023. Sendanor <info@sendanor.fi>. All rights reserved.

import { createComponentDTO, ComponentDTO } from "../../../dto/ComponentDTO";
import { HyperComponent } from "../../../dto/types/HyperComponent";

export const TEXT_COMPONENT_NAME: string = 'TextComponent';

export type TextComponent = ComponentDTO;

export function createTextComponent (
) : TextComponent {
    return createComponentDTO(
        TEXT_COMPONENT_NAME,
        HyperComponent.Article,
        [],
        undefined,
        undefined,
    );
}
