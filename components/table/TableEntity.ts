// Copyright (c) 2023. Sendanor <info@sendanor.fi>. All rights reserved.

import { ComponentContent } from "../../dto/ComponentDTO";
import { ComponentEntity } from "../../entities/ComponentEntity";
import { TABLE_COMPONENT_NAME } from "./TableComponent";
import { TableRowEntity } from "./row/TableRowEntity";

export class TableEntity extends ComponentEntity {

    protected constructor (name : string) {
        super(name);
        this.extend(TABLE_COMPONENT_NAME);
    }

    public addRow (row : TableRowEntity) : this {
        return this.add(row);
    }

    public static create (name: string) : TableEntity {
        return new this(name);
    }

    public static createTable (
        name: string,
        data: ComponentContent,
    ) : TableEntity {
        return this.create(name).add(data);
    }

}
