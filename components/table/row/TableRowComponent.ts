// Copyright (c) 2023. Sendanor <info@sendanor.fi>. All rights reserved.

import { ComponentDTO } from "../../../entities/component/ComponentDTO";
import { ComponentEntity } from "../../../entities/component/ComponentEntity";
import { HyperComponent } from "../../../entities/types/HyperComponent";
import { ComponentFactory } from "../../../services/ComponentFactory";

export const TABLE_ROW_COMPONENT_NAME: string = 'TableRowComponent';

export type TableRowComponent = ComponentDTO;

export function createTableRowComponent (
) : TableRowComponent {
    return (
        ComponentEntity.create(TABLE_ROW_COMPONENT_NAME)
                       .extend(HyperComponent.TableRow)
                       .getDTO()
    );
}

export function registerTableRowComponent (factory: ComponentFactory) : void {
    factory.registerComponentConstructor(TABLE_ROW_COMPONENT_NAME, createTableRowComponent);
}
