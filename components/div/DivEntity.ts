// Copyright (c) 2023. Sendanor <info@sendanor.fi>. All rights reserved.

import { ComponentEntity } from "../../entities/ComponentEntity";
import { DIV_COMPONENT_NAME } from "./DivComponent";

export class DivEntity extends ComponentEntity {

    protected constructor (
        name : string,
    ) {
        super(name);
        this.extend(DIV_COMPONENT_NAME);
    }

    public static create (
        name : string,
    ) : DivEntity {
        return new this( name );
    }

    public static createText (
        name  : string,
        value : string,
    ) : DivEntity {
        return this.create(name).addText(value);
    }

    public addText (value: string) : this {
        return this.add(value);
    }

}
