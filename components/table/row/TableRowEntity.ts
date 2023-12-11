// Copyright (c) 2023. Sendanor <info@sendanor.fi>. All rights reserved.

import { ComponentEntity, ComponentEntityContent } from "../../../entities/ComponentEntity";
import { TableColumnEntity } from "../column/TableColumnEntity";
import { TABLE_ROW_COMPONENT_NAME } from "./TableRowComponent";

export class TableRowEntity extends ComponentEntity {

    protected constructor (name : string) {
        super(name);
        this.extend(TABLE_ROW_COMPONENT_NAME);
    }

    public addColumn (item : TableColumnEntity) : this {
        return this.add(item);
    }

    public static create (name : string) : TableRowEntity {
        return new this(name);
    }

    public static createRow (
        name: string,
        data: ComponentEntityContent,
    ) : TableRowEntity {
        return this.create(name).add(data);
    }

}
