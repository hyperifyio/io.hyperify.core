// Copyright (c) 2023. Sendanor <info@sendanor.fi>. All rights reserved.

import { ComponentContent } from "../../entities/component/ComponentContent";
import { ComponentEntity } from "../../entities/component/ComponentEntity";
import { find } from "../../functions/find";
import { ComponentDTO } from "../../entities/component/ComponentDTO";
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

    const componentContent: ComponentContent | undefined = component.content;

    if ( !extendComponent ) {
        // Is built in component
        if ( isHyperComponent( extend ) ) {
            return (
                ComponentEntity.create(extend)
                               .content(componentContent)
                               .meta(component.meta)
                               .style(component.style)
                               .getDTO()
            );
        }
        throw new TypeError( `Could not find component by name ${extend} to extend for ${component.name}` );
    }

    const extendContent: ComponentContent | undefined = extendComponent.content;

    return populateComponentDTO(
        (
            ComponentEntity.create(extendComponent.name)
                           .extend(extendComponent.extend)
                           .content( extendContent ? mergeComponentContent(extendContent, componentContent) : componentContent )
                           .meta(
                               {
                                   ...(extendComponent.meta ? extendComponent.meta : {}),
                                   ...(component.meta ? component.meta : {}),
                               }
                           )
                           .style( {
                               ...(extendComponent.style ? extendComponent.style : {}),
                               ...(component.style ? component.style : {}),
                           } )
                           .getDTO()
        ),
        components
    );

}