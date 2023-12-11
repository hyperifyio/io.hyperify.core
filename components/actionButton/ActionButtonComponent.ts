// Copyright (c) 2023. Sendanor <info@sendanor.fi>. All rights reserved.

import { createComponentDTO, ComponentDTO } from "../../dto/ComponentDTO";
import { HyperComponent } from "../../dto/types/HyperComponent";
import { ComponentFactory } from "../../services/ComponentFactory";

export const ACTION_BUTTON_COMPONENT_NAME: string = 'ActionButtonComponent';

export type ActionButtonComponent = ComponentDTO;

export function createActionButtonComponent (
) : ActionButtonComponent {
    return createComponentDTO(
        ACTION_BUTTON_COMPONENT_NAME,
        HyperComponent.ActionButton,
        [],
        {},
        undefined,
    );
}

export function registerActionButtonComponent (factory: ComponentFactory) : void {
    factory.registerComponentConstructor(ACTION_BUTTON_COMPONENT_NAME, createActionButtonComponent);
}
