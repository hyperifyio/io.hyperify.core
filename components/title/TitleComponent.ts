// Copyright (c) 2023. Sendanor <info@sendanor.fi>. All rights reserved.

import { createComponentDTO, ComponentDTO } from "../../dto/ComponentDTO";
import { HyperComponent } from "../../dto/types/HyperComponent";
import { ComponentFactory } from "../../services/ComponentFactory";

export const TITLE_COMPONENT_NAME: string = 'TitleComponent';

export type TitleComponent = ComponentDTO;

export function createTitleComponent (
) : TitleComponent {
    return createComponentDTO(
        TITLE_COMPONENT_NAME,
        HyperComponent.H1,
        [],
        undefined,
        undefined,
    );
}

export function registerTitleComponent (factory: ComponentFactory) : void {
    factory.registerComponentConstructor(TITLE_COMPONENT_NAME, createTitleComponent);
}
