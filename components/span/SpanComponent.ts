// Copyright (c) 2023. Sendanor <info@sendanor.fi>. All rights reserved.

import { createComponentDTO, ComponentDTO } from "../../dto/ComponentDTO";
import { HyperComponent } from "../../dto/types/HyperComponent";
import { ComponentFactory } from "../../services/ComponentFactory";

export const SPAN_COMPONENT_NAME: string = 'SpanComponent';

export type SpanComponent = ComponentDTO;

export function createSpanComponent (
) : SpanComponent {
    return createComponentDTO(
        SPAN_COMPONENT_NAME,
        HyperComponent.Span,
        [],
        undefined,
        undefined,
    );
}

export function registerSpanComponent (factory: ComponentFactory) : void {
    factory.registerComponentConstructor(SPAN_COMPONENT_NAME, createSpanComponent);
}
