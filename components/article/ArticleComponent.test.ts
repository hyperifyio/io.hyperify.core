// Copyright (c) 2023. Sendanor <info@sendanor.fi>. All rights reserved.

import { HyperComponent } from "../../entities/types/HyperComponent";
import {ARTICLE_COMPONENT_NAME, ArticleComponent, createArticleComponent} from "./ArticleComponent";

describe('createArticleComponent', () => {
    it('should create ArticleComponent with default values', () => {

        const articleComponent: ArticleComponent = createArticleComponent();

        expect(articleComponent).toEqual(
            expect.objectContaining({
                name: ARTICLE_COMPONENT_NAME,
                extend: HyperComponent.Article,
            })
        );
    });
});
