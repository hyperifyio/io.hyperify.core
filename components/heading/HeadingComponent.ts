// Copyright (c) 2023. Sendanor <info@sendanor.fi>. All rights reserved.

import { ComponentDTO } from "../../entities/component/ComponentDTO";
import { ComponentEntity } from "../../entities/component/ComponentEntity";
import { HyperComponent } from "../../entities/types/HyperComponent";
import { ComponentFactory } from "../../services/ComponentFactory";

export const HEADING_COMPONENT_NAME: string = 'HeadingComponent';

export type HeadingComponent = ComponentDTO;

export function createHeadingComponent (
) : HeadingComponent {
    return (
        ComponentEntity.create(HEADING_COMPONENT_NAME)
                       .extend(HyperComponent.H3)
                       .getDTO()
    );
}

export function registerHeadingComponent (factory: ComponentFactory) : void {
    factory.registerComponentConstructor(HEADING_COMPONENT_NAME, createHeadingComponent);
}
