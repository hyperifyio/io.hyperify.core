// Copyright (c) 2023. Sendanor <info@sendanor.fi>. All rights reserved.

import {
    explainComponentDTO,
    isComponentDTO,
} from "../entities/component/ComponentEntity";
import {
    explainRouteDTO,
    isRouteDTO,
} from "../entities/route/RouteEntity";
import {
    explainViewDTO,
    isViewDTO,
} from "../entities/view/ViewEntity";
import { some } from "../functions/some";
import { ViewDTO } from "../entities/view/ViewDTO";
import { AppDTO } from "../entities/app/AppDTO";
import { HttpService } from "../HttpService";
import { LogService } from "../LogService";
import { ReadonlyJsonAny } from "../Json";
import { ComponentDTO } from "../entities/component/ComponentDTO";
import { RouteDTO } from "../entities/route/RouteDTO";

const LOG = LogService.createLogger('populateAppDTO');

export async function fetchMissingViews (
    views: readonly ViewDTO[],
    baseUrl: string,
) : Promise<ViewDTO[]> {
    let newViews : ViewDTO[] = [];
    for (const view of views) {

        let extend: string | undefined = view.extend;
        if (extend === undefined) {
            newViews.push(view);
            continue;
        }
        if (extend.startsWith('/')) {
            extend = baseUrl + extend;
        }

        if (extend.startsWith('http://') || extend.startsWith('https://')) {

            newViews.push({
                ...view,
                extend
            });

            // Skip if we already have the resource
            if (some(
                [...newViews, ...views],
                (item: ViewDTO) : boolean => item.name === extend
            )) {
                continue;
            }

            // Fetch missing resources
            const response: ReadonlyJsonAny | ViewDTO | undefined = await HttpService.getJson(extend);
            if ( isViewDTO(response) ) {
                newViews.push( {
                    ...(response as ViewDTO),
                    name: extend,
                } );
            } else {
                LOG.debug( `response: ${explainViewDTO(response)}: `, response );
                throw new TypeError( `Response was not HyperViewDTO` );
            }

        } else {
            newViews.push(view);
        }
    }
    return newViews;
}

export async function fetchMissingComponents (
    components : readonly ComponentDTO[],
    baseUrl : string,
) : Promise<ComponentDTO[]> {
    let newComponents : ComponentDTO[] = [];
    for (const component of components) {
        newComponents.push(component);
        let extend: string | undefined = component.extend;

        if (extend === undefined) {
            continue;
        }
        if (extend.startsWith('/')) {
            extend = baseUrl + extend;
        }
        if (extend.startsWith('http://') || extend.startsWith('https://')) {

            // Skip if we already have the resource
            if (some(
                [...newComponents, ...components],
                (item: ComponentDTO) : boolean => item.name === extend
            )) {
                continue;
            }

            // Fetch missing resources
            const response: ReadonlyJsonAny | undefined = await HttpService.getJson(extend);
            if ( isComponentDTO( response ) ) {
                newComponents.push( {
                    ...(response as ComponentDTO),
                    name: extend
                } );
            } else {
                LOG.debug( `response: ${explainComponentDTO( response )}: `, response );
                throw new TypeError( `Response was not HyperComponentDTO` );
            }

        }
    }
    return newComponents;
}

export async function fetchMissingRoutes (
    routes : readonly RouteDTO[],
    baseUrl: string,
): Promise<RouteDTO[]> {
    let newRoutes : RouteDTO[] = [];
    for (const route of routes) {
        newRoutes.push(route);
        let extend: string | undefined = route.extend;

        if (extend === undefined) {
            continue;
        }
        if (extend.startsWith('/')) {
            extend = baseUrl + extend;
        }
        if (extend.startsWith('http://') || extend.startsWith('https://')) {

            // Skip if we already have the resource
            if (some(
                [...newRoutes, ...routes],
                (item: RouteDTO) : boolean => item.name === extend
            )) {
                continue;
            }

            // Fetch missing resources
            const response: ReadonlyJsonAny | undefined = await HttpService.getJson(extend);
            if ( isRouteDTO( response ) ) {
                newRoutes.push( {
                    ...(response as RouteDTO),
                    name: extend
                } );
            } else {
                LOG.debug( `response: ${explainRouteDTO( response )}: `, response );
                throw new TypeError( `Response was not HyperRouteDTO` );
            }
            newRoutes.push(response);

        }
    }
    return newRoutes;
}

export async function populateAppDTO (
    hyper: AppDTO,
    baseUrl: string | undefined = undefined,
): Promise<AppDTO> {

    baseUrl = baseUrl ?? hyper.publicUrl ?? '';

    const newViewsPromise = fetchMissingViews(hyper.views, baseUrl);
    const newComponentsPromise = fetchMissingComponents(hyper.components, baseUrl);
    const newRoutesPromise = fetchMissingRoutes(hyper.routes, baseUrl);

    const newViews = await newViewsPromise;
    const newComponents = await newComponentsPromise;
    const newRoutes = await newRoutesPromise;

    return {
        ...hyper,
        views: newViews,
        components: newComponents,
        routes: newRoutes,
    };

}
