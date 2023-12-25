// Copyright (c) 2023. Sendanor <info@sendanor.fi>. All rights reserved.

import { ComponentContent } from "../../entities/component/ComponentContent";
import { ComponentEntity } from "../../entities/component/ComponentEntity";
import { FORM_COMPONENT_NAME } from "./FormComponent";

export class FormEntity extends ComponentEntity {

    protected constructor (name : string) {
        super(name);
        this.extend( FORM_COMPONENT_NAME );
    }

    public static create (name : string) : FormEntity {
        return new this(name);
    }

    public static createForm (
        name: string,
        content: ComponentContent,
    ) : FormEntity {
        return this.create(name).addContent(content).setMeta({});
    }

}
