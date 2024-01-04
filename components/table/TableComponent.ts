// Copyright (c) 2023. Sendanor <info@sendanor.fi>. All rights reserved.

import { ComponentDTO } from "../../entities/component/ComponentDTO";
import { ComponentEntity } from "../../entities/component/ComponentEntity";
import { HyperComponent } from "../../entities/types/HyperComponent";
import { ComponentFactory } from "../../services/ComponentFactory";

export const TABLE_COMPONENT_NAME: string = 'TableComponent';

export type TableComponent = ComponentDTO;

export function createTableComponent (
) : TableComponent {
    return (
        ComponentEntity.create(TABLE_COMPONENT_NAME)
                       .extend(HyperComponent.Table)
                       .getDTO()
    );
}

export function registerTableComponent (factory: ComponentFactory) : void {
    factory.registerComponentConstructor(TABLE_COMPONENT_NAME, createTableComponent);
}
