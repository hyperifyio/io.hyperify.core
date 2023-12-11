// Copyright (c) 2023. Sendanor <info@sendanor.fi>. All rights reserved.

import { createComponentDTO, ComponentDTO } from "../../../dto/ComponentDTO";
import { HyperComponent } from "../../../dto/types/HyperComponent";
import { ComponentFactory } from "../../../services/ComponentFactory";

export const TABLE_COLUMN_COMPONENT_NAME: string = 'TableColumnComponent';

export type TableColumnComponent = ComponentDTO;

export function createTableColumnComponent () : TableColumnComponent {
    return createComponentDTO(
        TABLE_COLUMN_COMPONENT_NAME,
        HyperComponent.TableColumn,
        [],
        undefined,
        undefined,
    );
}

export function registerTableColumnComponent (factory: ComponentFactory) : void {
    factory.registerComponentConstructor(TABLE_COLUMN_COMPONENT_NAME, createTableColumnComponent);
}
