// Copyright (c) 2023. Sendanor <info@sendanor.fi>. All rights reserved.

import { ComponentDTO } from "../../entities/component/ComponentDTO";
import { ComponentEntity } from "../../entities/component/ComponentEntity";
import { HyperComponent } from "../../entities/types/HyperComponent";
import { ComponentFactory } from "../../services/ComponentFactory";

export const SUB_TITLE_COMPONENT_NAME: string = 'SubTitleComponent';

export type SubTitleComponent = ComponentDTO;

export function createSubTitleComponent (
) : SubTitleComponent {
    return (
        ComponentEntity.create(SUB_TITLE_COMPONENT_NAME)
                       .extend(HyperComponent.H2)
                       .getDTO()
    );
}

export function registerSubTitleComponent (factory: ComponentFactory) : void {
    factory.registerComponentConstructor(SUB_TITLE_COMPONENT_NAME, createSubTitleComponent);
}
