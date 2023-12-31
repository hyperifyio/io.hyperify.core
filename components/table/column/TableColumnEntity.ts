// Copyright (c) 2023. Sendanor <info@sendanor.fi>. All rights reserved.

import {
    UnreparedComponentContent,
} from "../../../entities/component/ComponentContent";
import { ComponentEntity } from "../../../entities/component/ComponentEntity";
import { TABLE_COLUMN_COMPONENT_NAME } from "./TableColumnComponent";

export class TableColumnEntity extends ComponentEntity {

    protected constructor (name : string) {
        super(name);
        this.extend(TABLE_COLUMN_COMPONENT_NAME);
    }

    public static create (name : string) : TableColumnEntity {
        return new this(name);
    }

    public static createColumn (
        name: string,
        data: UnreparedComponentContent,
    ) : TableColumnEntity {
        return this.create(name).addContent(data);
    }

}
