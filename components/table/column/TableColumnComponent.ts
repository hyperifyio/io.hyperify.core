// Copyright (c) 2023. Sendanor <info@sendanor.fi>. All rights reserved.

import { ComponentDTO } from "../../../entities/component/ComponentDTO";
import { ComponentEntity } from "../../../entities/component/ComponentEntity";
import { HyperComponent } from "../../../entities/types/HyperComponent";
import { ComponentFactory } from "../../../services/ComponentFactory";

export const TABLE_COLUMN_COMPONENT_NAME: string = 'TableColumnComponent';

export type TableColumnComponent = ComponentDTO;

export function createTableColumnComponent () : TableColumnComponent {
    return (
        ComponentEntity.create(TABLE_COLUMN_COMPONENT_NAME)
                       .extend(HyperComponent.TableColumn)
                       .getDTO()
    );
}

export function registerTableColumnComponent (factory: ComponentFactory) : void {
    factory.registerComponentConstructor(TABLE_COLUMN_COMPONENT_NAME, createTableColumnComponent);
}
