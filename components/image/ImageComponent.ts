// Copyright (c) 2023. Sendanor <info@sendanor.fi>. All rights reserved.

import { ComponentDTO } from "../../entities/component/ComponentDTO";
import { ComponentEntity } from "../../entities/component/ComponentEntity";
import { HyperComponent } from "../../entities/types/HyperComponent";
import { ComponentFactory } from "../../services/ComponentFactory";

export const IMAGE_COMPONENT_NAME: string = 'ImageComponent';

export type ImageComponent = ComponentDTO;

export function createImageComponent (
) : ImageComponent {
    return (
        ComponentEntity.create(IMAGE_COMPONENT_NAME)
                       .extend(HyperComponent.Image)
                       .getDTO()
    );
}

export function registerImageComponent (factory: ComponentFactory) : void {
    factory.registerComponentConstructor(IMAGE_COMPONENT_NAME, createImageComponent);
}
