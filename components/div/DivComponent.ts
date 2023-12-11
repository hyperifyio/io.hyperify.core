// Copyright (c) 2023. Sendanor <info@sendanor.fi>. All rights reserved.

import { createComponentDTO, ComponentDTO } from "../../dto/ComponentDTO";
import { HyperComponent } from "../../dto/types/HyperComponent";
import { ComponentFactory } from "../../services/ComponentFactory";

export const DIV_COMPONENT_NAME: string = 'DivComponent';

export type DivComponent = ComponentDTO;

export function createDivComponent (
) : DivComponent {
    return createComponentDTO(
        DIV_COMPONENT_NAME,
        HyperComponent.Div,
        [],
        undefined,
        undefined,
    );
}

export function registerDivComponent (factory: ComponentFactory) : void {
    factory.registerComponentConstructor(DIV_COMPONENT_NAME, createDivComponent);
}
