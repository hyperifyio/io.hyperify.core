// Copyright (c) 2023. Sendanor <info@sendanor.fi>. All rights reserved.

import { createRouteDTO, RouteDTO } from "../../../dto/RouteDTO";
import { LOADING_VIEW_NAME } from "../views/LoadingView";

export type LoadingRoute = RouteDTO;

export function createLoadingRoute (
    name: string,
) : LoadingRoute {
    return createRouteDTO(
        name,
        '/',
        undefined,
        undefined,
        undefined,
        LOADING_VIEW_NAME,
        undefined
    );
}
