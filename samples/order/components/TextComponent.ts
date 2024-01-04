// Copyright (c) 2023. Sendanor <info@sendanor.fi>. All rights reserved.

import { ComponentDTO } from "../../../entities/component/ComponentDTO";
import { ComponentEntity } from "../../../entities/component/ComponentEntity";
import { HyperComponent } from "../../../entities/types/HyperComponent";

export const TEXT_COMPONENT_NAME: string = 'TextComponent';

export type TextComponent = ComponentDTO;

export function createTextComponent (
) : TextComponent {
    return (
        ComponentEntity.create(TEXT_COMPONENT_NAME)
                       .extend(HyperComponent.Article)
                       .setContent([])
                       .getDTO()
    );
}
