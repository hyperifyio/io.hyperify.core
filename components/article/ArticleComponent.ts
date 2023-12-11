// Copyright (c) 2023. Sendanor <info@sendanor.fi>. All rights reserved.

import { createComponentDTO, ComponentDTO } from "../../dto/ComponentDTO";
import { HyperComponent } from "../../dto/types/HyperComponent";
import { ComponentFactory } from "../../services/ComponentFactory";

export const ARTICLE_COMPONENT_NAME: string = 'ArticleComponent';

export type ArticleComponent = ComponentDTO;

export function createArticleComponent (
) : ArticleComponent {
    return createComponentDTO(
        ARTICLE_COMPONENT_NAME,
        HyperComponent.Article,
        [],
        undefined,
        undefined,
    );
}

export function registerArticleComponent (factory: ComponentFactory) : void {
    factory.registerComponentConstructor(ARTICLE_COMPONENT_NAME, createArticleComponent);
}
