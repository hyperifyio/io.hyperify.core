// Copyright (c) 2023. Sendanor <info@sendanor.fi>. All rights reserved.

import { createComponentDTO, ComponentDTO } from "../../dto/ComponentDTO";
import { HyperComponent } from "../../dto/types/HyperComponent";
import { ComponentFactory } from "../../services/ComponentFactory";

export const FORM_COMPONENT_NAME: string = 'FormComponent';

export type FormComponent = ComponentDTO;

export function createFormComponent (
) : FormComponent {
    return createComponentDTO(
        FORM_COMPONENT_NAME,
        HyperComponent.Form,
        [],
        {},
        undefined,
    );
}

export function registerFormComponent (factory: ComponentFactory) : void {
    factory.registerComponentConstructor(FORM_COMPONENT_NAME, createFormComponent);
}
