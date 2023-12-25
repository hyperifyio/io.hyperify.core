// Copyright (c) 2023. Sendanor <info@sendanor.fi>. All rights reserved.

import { ComponentDTO } from "../../entities/component/ComponentDTO";
import { ComponentEntity } from "../../entities/component/ComponentEntity";
import { HyperComponent } from "../../entities/types/HyperComponent";
import { ComponentFactory } from "../../services/ComponentFactory";

export const ACTION_BUTTON_COMPONENT_NAME: string = 'ActionButtonComponent';

export type ActionButtonComponent = ComponentDTO;

export function createActionButtonComponent (
) : ActionButtonComponent {
    return (
        ComponentEntity.create(ACTION_BUTTON_COMPONENT_NAME)
                       .extend(HyperComponent.ActionButton)
                       .getDTO()
    );
}

export function registerActionButtonComponent (factory: ComponentFactory) : void {
    factory.registerComponentConstructor(ACTION_BUTTON_COMPONENT_NAME, createActionButtonComponent);
}
