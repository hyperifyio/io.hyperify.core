// Copyright (c) 2023. Sendanor <info@sendanor.fi>. All rights reserved.

import { ComponentEntity } from "../../entities/ComponentEntity";
import { PARAGRAPH_COMPONENT_NAME } from "./ParagraphComponent";

export class ParagraphEntity extends ComponentEntity {

    protected constructor (
        name : string,
    ) {
        super(name);
        this.extend(PARAGRAPH_COMPONENT_NAME);
    }

    public static create (
        name : string,
    ) : ParagraphEntity {
        return new this( name );
    }

    public static createText (
        name  : string,
        value : string,
    ) : ParagraphEntity {
        return this.create(name).addText(value);
    }

    public addText (value: string) : this {
        return this.add(value);
    }

}
