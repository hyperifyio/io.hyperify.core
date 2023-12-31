// Copyright (c) 2023. Sendanor <info@sendanor.fi>. All rights reserved.

import { ComponentEntity } from "../../entities/component/ComponentEntity";
import { SUB_TITLE_COMPONENT_NAME } from "./SubTitleComponent";

export class SubTitleEntity extends ComponentEntity {

    protected constructor (
        name : string,
    ) {
        super(name);
        this.extend(SUB_TITLE_COMPONENT_NAME);
    }

    public static create (
        name : string,
    ) : SubTitleEntity {
        return new this( name );
    }

    public static createText (
        name  : string,
        value : string,
    ) : SubTitleEntity {
        return this.create(name).addText(value);
    }

    public addText (value: string) : this {
        return this.addContent([value]);
    }

}
