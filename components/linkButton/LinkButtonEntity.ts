// Copyright (c) 2023. Sendanor <info@sendanor.fi>. All rights reserved.

import { ComponentEntity } from "../../entities/ComponentEntity";
import { LINK_BUTTON_COMPONENT_NAME } from "./LinkButtonComponent";

export class LinkButtonEntity extends ComponentEntity {

    protected constructor (name : string) {
        super(name);
        this.extend(LINK_BUTTON_COMPONENT_NAME);
    }

    public setText (value : string) : this {
        return this.add(value);
    }

    public setHref (href : string) : this {
        return this.setMeta({href});
    }

    public static create (name : string) : LinkButtonEntity {
        return new this(name);
    }

    public static createButton (
        name: string,
        text: string,
        href: string,
    ) : LinkButtonEntity {
        return (
            this.create(name)
                .setText(text)
                .setHref(href)
        );
    }

}
