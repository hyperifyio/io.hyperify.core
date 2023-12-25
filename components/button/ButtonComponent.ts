// Copyright (c) 2023. Sendanor <info@sendanor.fi>. All rights reserved.

import { ComponentDTO } from "../../entities/component/ComponentDTO";
import { ComponentEntity } from "../../entities/component/ComponentEntity";
import { HyperComponent } from "../../entities/types/HyperComponent";
import { ComponentFactory } from "../../services/ComponentFactory";

export const BUTTON_COMPONENT_NAME: string = 'ButtonComponent';

export type ButtonComponent = ComponentDTO;

export function createButtonComponent (
) : ButtonComponent {
    return (
        ComponentEntity.create(BUTTON_COMPONENT_NAME)
                       .extend(HyperComponent.Button)
                       .getDTO()
    );
}

export function registerButtonComponent (factory: ComponentFactory) : void {
    factory.registerComponentConstructor(BUTTON_COMPONENT_NAME, createButtonComponent);
}
