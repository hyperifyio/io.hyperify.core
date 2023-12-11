// Copyright (c) 2023. Sendanor <info@sendanor.fi>. All rights reserved.

import { ComponentEntity } from "../../entities/ComponentEntity";
import { BUTTON_COMPONENT_NAME } from "./ButtonComponent";

export class ButtonEntity extends ComponentEntity {

    protected constructor (name : string) {
        super(name);
        this.extend( BUTTON_COMPONENT_NAME );
    }

    public static create (name : string) : ButtonEntity {
        return new this(name);
    }

    public static createButton (
        name : string,
        text : string,
        eventName : string,
    ) : ButtonEntity {
        return this.create(name).addText(text).setEventName(eventName);
    }

    public setEventName (eventName : string) : this {
        return this.setMeta({eventName});
    }

}
