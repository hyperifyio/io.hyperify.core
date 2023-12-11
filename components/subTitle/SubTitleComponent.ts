// Copyright (c) 2023. Sendanor <info@sendanor.fi>. All rights reserved.

import { createComponentDTO, ComponentDTO } from "../../dto/ComponentDTO";
import { HyperComponent } from "../../dto/types/HyperComponent";
import { ComponentFactory } from "../../services/ComponentFactory";

export const SUB_TITLE_COMPONENT_NAME: string = 'SubTitleComponent';

export type SubTitleComponent = ComponentDTO;

export function createSubTitleComponent (
) : SubTitleComponent {
    return createComponentDTO(
        SUB_TITLE_COMPONENT_NAME,
        HyperComponent.H2,
        [],
        undefined,
        undefined,
    );
}

export function registerSubTitleComponent (factory: ComponentFactory) : void {
    factory.registerComponentConstructor(SUB_TITLE_COMPONENT_NAME, createSubTitleComponent);
}
