// Copyright (c) 2023. Sendanor <info@sendanor.fi>. All rights reserved.

import { ComponentEntity } from "../../entities/ComponentEntity";
import { TITLE_COMPONENT_NAME } from "./TitleComponent";

export class TitleEntity extends ComponentEntity {

    protected constructor (
        name : string,
    ) {
        super(name);
        this.extend(TITLE_COMPONENT_NAME);
    }

    public static create (
        name : string,
    ) : TitleEntity {
        return new this( name );
    }

    public static createText (
        name  : string,
        value : string,
    ) : TitleEntity {
        return this.create(name).addText(value);
    }

    public addText (value: string) : this {
        return this.add(value);
    }

}
