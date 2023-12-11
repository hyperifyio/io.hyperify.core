// Copyright (c) 2023. Sendanor <info@sendanor.fi>. All rights reserved.

import { createComponentDTO, ComponentDTO } from "../../dto/ComponentDTO";
import { HyperComponent } from "../../dto/types/HyperComponent";
import { ComponentFactory } from "../../services/ComponentFactory";

export const IMAGE_COMPONENT_NAME: string = 'ImageComponent';

export type ImageComponent = ComponentDTO;

export function createImageComponent (
) : ImageComponent {
    return createComponentDTO(
        IMAGE_COMPONENT_NAME,
        HyperComponent.Image,
        [],
        undefined,
        undefined,
    );
}

export function registerImageComponent (factory: ComponentFactory) : void {
    factory.registerComponentConstructor(IMAGE_COMPONENT_NAME, createImageComponent);
}
