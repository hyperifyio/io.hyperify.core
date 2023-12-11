// Copyright (c) 2023. Sendanor <info@sendanor.fi>. All rights reserved.

import { ComponentEntity } from "../../entities/ComponentEntity";
import { ARTICLE_COMPONENT_NAME } from "./ArticleComponent";

export class ArticleEntity extends ComponentEntity {

    protected constructor (name : string) {
        super(name);
        this.extend( ARTICLE_COMPONENT_NAME );
    }

    public addText (value: string) : this {
        return this.add(value);
    }

    public static create (name : string) : ArticleEntity {
        return new this(name);
    }

    public static createText (
        name : string,
        text : string,
    ) : ArticleEntity {
        return this.create(name).addText(text);
    }

}
