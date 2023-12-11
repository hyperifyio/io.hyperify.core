// Copyright (c) 2023. Sendanor <info@sendanor.fi>. All rights reserved.

import { createComponentDTO, ComponentDTO } from "../../dto/ComponentDTO";
import { HyperComponent } from "../../dto/types/HyperComponent";
import { ComponentFactory } from "../../services/ComponentFactory";

export const TABLE_COMPONENT_NAME: string = 'TableComponent';

export type TableComponent = ComponentDTO;

export function createTableComponent (
) : TableComponent {
    return createComponentDTO(
        TABLE_COMPONENT_NAME,
        HyperComponent.Table,
        [],
        undefined,
        undefined,
    );
}

export function registerTableComponent (factory: ComponentFactory) : void {
    factory.registerComponentConstructor(TABLE_COMPONENT_NAME, createTableComponent);
}
