// Copyright (c) 2023. Sendanor <info@sendanor.fi>. All rights reserved.

import { ComponentDTO } from "../../entities/component/ComponentDTO";
import { ComponentEntity } from "../../entities/component/ComponentEntity";
import { HyperComponent } from "../../entities/types/HyperComponent";
import { ComponentFactory } from "../../services/ComponentFactory";

export const FORM_COMPONENT_NAME: string = 'FormComponent';

export type FormComponent = ComponentDTO;

export function createFormComponent (
) : FormComponent {
    return (
        ComponentEntity.create(FORM_COMPONENT_NAME)
                       .extend(HyperComponent.Form)
                       .getDTO()
    );
}

export function registerFormComponent (factory: ComponentFactory) : void {
    factory.registerComponentConstructor(FORM_COMPONENT_NAME, createFormComponent);
}
