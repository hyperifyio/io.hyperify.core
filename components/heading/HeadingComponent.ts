// Copyright (c) 2023. Sendanor <info@sendanor.fi>. All rights reserved.

import { createComponentDTO, ComponentDTO } from "../../dto/ComponentDTO";
import { HyperComponent } from "../../dto/types/HyperComponent";
import { ComponentFactory } from "../../services/ComponentFactory";

export const HEADING_COMPONENT_NAME: string = 'HeadingComponent';

export type HeadingComponent = ComponentDTO;

export function createHeadingComponent (
) : HeadingComponent {
    return createComponentDTO(
        HEADING_COMPONENT_NAME,
        HyperComponent.H3,
        [],
        undefined,
        undefined,
    );
}

export function registerHeadingComponent (factory: ComponentFactory) : void {
    factory.registerComponentConstructor(HEADING_COMPONENT_NAME, createHeadingComponent);
}
