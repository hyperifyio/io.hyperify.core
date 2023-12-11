// Copyright (c) 2023. Sendanor <info@sendanor.fi>. All rights reserved.

import { createComponentDTO, ComponentDTO } from "../../dto/ComponentDTO";
import { HyperComponent } from "../../dto/types/HyperComponent";
import { ComponentFactory } from "../../services/ComponentFactory";

export const BUTTON_COMPONENT_NAME: string = 'ButtonComponent';

export type ButtonComponent = ComponentDTO;

export function createButtonComponent (
) : ButtonComponent {
    return createComponentDTO(
        BUTTON_COMPONENT_NAME,
        HyperComponent.Button,
        [],
        undefined,
        undefined,
    );
}

export function registerButtonComponent (factory: ComponentFactory) : void {
    factory.registerComponentConstructor(BUTTON_COMPONENT_NAME, createButtonComponent);
}
