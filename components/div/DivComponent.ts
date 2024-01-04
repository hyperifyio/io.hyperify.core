// Copyright (c) 2023. Sendanor <info@sendanor.fi>. All rights reserved.

import { ComponentDTO } from "../../entities/component/ComponentDTO";
import { ComponentEntity } from "../../entities/component/ComponentEntity";
import { HyperComponent } from "../../entities/types/HyperComponent";
import { ComponentFactory } from "../../services/ComponentFactory";

export const DIV_COMPONENT_NAME: string = 'DivComponent';

export type DivComponent = ComponentDTO;

export function createDivComponent (
) : DivComponent {
    return (
        ComponentEntity.create(DIV_COMPONENT_NAME)
                       .extend(HyperComponent.Div)
                       .getDTO()
    );
}

export function registerDivComponent (factory: ComponentFactory) : void {
    factory.registerComponentConstructor(DIV_COMPONENT_NAME, createDivComponent);
}
