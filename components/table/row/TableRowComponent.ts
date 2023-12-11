// Copyright (c) 2023. Sendanor <info@sendanor.fi>. All rights reserved.

import { createComponentDTO, ComponentDTO } from "../../../dto/ComponentDTO";
import { HyperComponent } from "../../../dto/types/HyperComponent";
import { ComponentFactory } from "../../../services/ComponentFactory";

export const TABLE_ROW_COMPONENT_NAME: string = 'TableRowComponent';

export type TableRowComponent = ComponentDTO;

export function createTableRowComponent (
) : TableRowComponent {
    return createComponentDTO(
        TABLE_ROW_COMPONENT_NAME,
        HyperComponent.TableRow,
        [],
        undefined,
        undefined,
    );
}

export function registerTableRowComponent (factory: ComponentFactory) : void {
    factory.registerComponentConstructor(TABLE_ROW_COMPONENT_NAME, createTableRowComponent);
}
