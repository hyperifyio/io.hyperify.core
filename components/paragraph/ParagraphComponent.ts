// Copyright (c) 2023. Sendanor <info@sendanor.fi>. All rights reserved.

import { createComponentDTO, ComponentDTO } from "../../dto/ComponentDTO";
import { HyperComponent } from "../../dto/types/HyperComponent";
import { ComponentFactory } from "../../services/ComponentFactory";

export const PARAGRAPH_COMPONENT_NAME: string = 'ParagraphComponent';

export type ParagraphComponent = ComponentDTO;

export function createParagraphComponent (
) : ParagraphComponent {
    return createComponentDTO(
        PARAGRAPH_COMPONENT_NAME,
        HyperComponent.Paragraph,
        [],
        undefined,
        undefined,
    );
}

export function registerParagraphComponent (factory: ComponentFactory) : void {
    factory.registerComponentConstructor(PARAGRAPH_COMPONENT_NAME, createParagraphComponent);
}
