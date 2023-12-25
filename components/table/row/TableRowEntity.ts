// Copyright (c) 2023. Sendanor <info@sendanor.fi>. All rights reserved.

import { ComponentContent } from "../../../entities/component/ComponentContent";
import { ComponentEntity } from "../../../entities/component/ComponentEntity";
import { TableColumnEntity } from "../column/TableColumnEntity";
import { TABLE_ROW_COMPONENT_NAME } from "./TableRowComponent";

export class TableRowEntity extends ComponentEntity {

    protected constructor (name : string) {
        super(name);
        this.extend(TABLE_ROW_COMPONENT_NAME);
    }

    public addColumn (item : TableColumnEntity) : this {
        return this.addContent([item.getDTO()]);
    }

    public static create (name : string) : TableRowEntity {
        return new this(name);
    }

    public static createRow (
        name: string,
        data: ComponentContent,
    ) : TableRowEntity {
        return this.create(name).addContent(data);
    }

}
