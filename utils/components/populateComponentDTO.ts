// Copyright (c) 2023. Sendanor <info@sendanor.fi>. All rights reserved.

import { find } from "../../functions/find";
import { createComponentDTO, ComponentContent, ComponentDTO } from "../../entities/component/ComponentDTO";
import { isHyperComponent } from "../../entities/types/HyperComponent";
import { mergeComponentContent } from "./mergeComponentContent";

export function populateComponentDTO (
    component  : ComponentDTO,
    components : readonly ComponentDTO[]
): ComponentDTO {

    const extend: string | undefined = component.extend;
    if ( extend === undefined ) {
        return component;
    }

    const extendComponent: ComponentDTO | undefined = find(
        components,
        (c: ComponentDTO): boolean => c.name === extend
    );

    const componentContent: ComponentContent = component.content;

    if ( !extendComponent ) {
        // Is built in component
        if ( isHyperComponent( extend ) ) {
            return createComponentDTO(
                extend,
                undefined,
                componentContent,
                component.meta,
                component.style,
            );
        }
        throw new TypeError( `Could not find component by name ${extend} to extend for ${component.name}` );
    }

    const extendContent: ComponentContent = extendComponent.content;

    return populateComponentDTO(
        createComponentDTO(
            extendComponent.name,
            extendComponent.extend,
            mergeComponentContent(extendContent, componentContent),
            {
                ...(extendComponent.meta ? extendComponent.meta : {}),
                ...(component.meta ? component.meta : {}),
            },
            {
                ...(extendComponent.style ? extendComponent.style : {}),
                ...(component.style ? component.style : {}),
            }
        ),
        components
    );

}