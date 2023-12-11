// Copyright (c) 2023. Sendanor <info@sendanor.fi>. All rights reserved.

import { ComponentEntity } from "../../entities/ComponentEntity";
import { SPAN_COMPONENT_NAME } from "./SpanComponent";

export class SpanEntity extends ComponentEntity {

    protected constructor (
        name : string,
    ) {
        super(name);
        this.extend(SPAN_COMPONENT_NAME);
    }

    public static create (
        name : string,
    ) : SpanEntity {
        return new this( name );
    }

    public static createText (
        name  : string,
        value : string,
    ) : SpanEntity {
        return this.create(name).addText(value);
    }

    public addText (value: string) : this {
        return this.add(value);
    }

}
