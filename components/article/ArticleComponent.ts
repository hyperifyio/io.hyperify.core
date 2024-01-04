// Copyright (c) 2023. Sendanor <info@sendanor.fi>. All rights reserved.

import { ComponentDTO } from "../../entities/component/ComponentDTO";
import { ComponentEntity } from "../../entities/component/ComponentEntity";
import { HyperComponent } from "../../entities/types/HyperComponent";
import { ComponentFactory } from "../../services/ComponentFactory";

export const ARTICLE_COMPONENT_NAME: string = 'ArticleComponent';

export type ArticleComponent = ComponentDTO;

export function createArticleComponent (
) : ArticleComponent {
    return ComponentEntity.create().name(ARTICLE_COMPONENT_NAME).extend(HyperComponent.Article).getDTO();
}

export function registerArticleComponent (factory: ComponentFactory) : void {
    factory.registerComponentConstructor(ARTICLE_COMPONENT_NAME, createArticleComponent);
}
