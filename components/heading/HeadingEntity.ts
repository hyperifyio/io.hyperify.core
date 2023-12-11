// Copyright (c) 2023. Sendanor <info@sendanor.fi>. All rights reserved.

import { ComponentEntity } from "../../entities/ComponentEntity";
import { HEADING_COMPONENT_NAME } from "./HeadingComponent";

export class HeadingEntity extends ComponentEntity {

    protected constructor (
        name : string,
    ) {
        super(name);
        this.extend(HEADING_COMPONENT_NAME);
    }

    public static create (
        name : string,
    ) : HeadingEntity {
        return new this( name );
    }

    public static createText (
        name  : string,
        value : string,
    ) : HeadingEntity {
        return this.create(name).addText(value);
    }

    public addText (value: string) : this {
        return this.add(value);
    }

}
