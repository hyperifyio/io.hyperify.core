// Copyright (c) 2023. Sendanor <info@sendanor.fi>. All rights reserved.

import { ComponentDTO } from "../../entities/component/ComponentDTO";
import { ComponentEntity } from "../../entities/component/ComponentEntity";
import { HyperComponent } from "../../entities/types/HyperComponent";
import { ComponentFactory } from "../../services/ComponentFactory";

export const PARAGRAPH_COMPONENT_NAME: string = 'ParagraphComponent';

export type ParagraphComponent = ComponentDTO;

export function createParagraphComponent (
) : ParagraphComponent {
    return (
        ComponentEntity.create(PARAGRAPH_COMPONENT_NAME)
                       .extend(HyperComponent.Paragraph)
                       .getDTO()
    );
}

export function registerParagraphComponent (factory: ComponentFactory) : void {
    factory.registerComponentConstructor(PARAGRAPH_COMPONENT_NAME, createParagraphComponent);
}
