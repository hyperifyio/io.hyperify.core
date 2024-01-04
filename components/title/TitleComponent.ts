// Copyright (c) 2023. Sendanor <info@sendanor.fi>. All rights reserved.

import { ComponentDTO } from "../../entities/component/ComponentDTO";
import { ComponentEntity } from "../../entities/component/ComponentEntity";
import { HyperComponent } from "../../entities/types/HyperComponent";
import { ComponentFactory } from "../../services/ComponentFactory";

export const TITLE_COMPONENT_NAME: string = 'TitleComponent';

export type TitleComponent = ComponentDTO;

export function createTitleComponent (
) : TitleComponent {
    return (
        ComponentEntity.create(TITLE_COMPONENT_NAME)
                       .extend(HyperComponent.H1)
                       .getDTO()
    );
}

export function registerTitleComponent (factory: ComponentFactory) : void {
    factory.registerComponentConstructor(TITLE_COMPONENT_NAME, createTitleComponent);
}
