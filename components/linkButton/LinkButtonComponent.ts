// Copyright (c) 2023. Sendanor <info@sendanor.fi>. All rights reserved.

import { ComponentDTO, createComponentDTO } from "../../entities/component/ComponentDTO";
import { BorderStyle } from "../../entities/types/BorderStyle";
import { HyperComponent } from "../../entities/types/HyperComponent";
import { BorderEntity } from "../../entities/border/BorderEntity";
import { StyleEntity } from "../../entities/style/StyleEntity";
import { ComponentFactory } from "../../services/ComponentFactory";

export const LINK_BUTTON_COMPONENT_NAME: string = 'LinkButtonComponent';

export type LinkButtonComponent = ComponentDTO;

export function createLinkButtonComponent (
) : LinkButtonComponent {
    return createComponentDTO(
        LINK_BUTTON_COMPONENT_NAME,
        HyperComponent.LinkButton,
        [],
        {},
        StyleEntity.create()
                   .setBorder(
                       BorderEntity.create()
                       .setWidth(1)
                       .setStyle(BorderStyle.SOLID)
                   )
                   .getDTO(),
    );
}

export function registerLinkButtonComponent (factory: ComponentFactory) : void {
    factory.registerComponentConstructor(LINK_BUTTON_COMPONENT_NAME, createLinkButtonComponent);
}
