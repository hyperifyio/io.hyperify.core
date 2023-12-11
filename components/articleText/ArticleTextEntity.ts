// Copyright (c) 2023. Sendanor <info@sendanor.fi>. All rights reserved.

import { ArticleEntity } from "../article/ArticleEntity";

export class ArticleTextEntity extends ArticleEntity {

    public static create (name : string) : ArticleTextEntity {
        return new this(name);
    }

    public static createText (
        name : string,
        text : string,
    ) : ArticleTextEntity {
        return this.create(name).addText(text);
    }

}
