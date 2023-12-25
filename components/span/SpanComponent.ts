// Copyright (c) 2023. Sendanor <info@sendanor.fi>. All rights reserved.

import { ComponentDTO } from "../../entities/component/ComponentDTO";
import { ComponentEntity } from "../../entities/component/ComponentEntity";
import { HyperComponent } from "../../entities/types/HyperComponent";
import { ComponentFactory } from "../../services/ComponentFactory";

export const SPAN_COMPONENT_NAME: string = 'SpanComponent';

export type SpanComponent = ComponentDTO;

export function createSpanComponent (
) : SpanComponent {
    return (
        ComponentEntity.create(SPAN_COMPONENT_NAME)
                       .extend(HyperComponent.Span)
                       .getDTO()
    );
}

export function registerSpanComponent (factory: ComponentFactory) : void {
    factory.registerComponentConstructor(SPAN_COMPONENT_NAME, createSpanComponent);
}
