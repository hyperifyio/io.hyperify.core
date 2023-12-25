// Copyright (c) 2023. Sendanor <info@sendanor.fi>. All rights reserved.

import { RouteDTO } from "../../../entities/route/RouteDTO";
import { RouteEntity } from "../../../entities/route/RouteEntity";
import { LOADING_VIEW_NAME } from "../views/LoadingView";

export type LoadingRoute = RouteDTO;

export function createLoadingRoute (
    name: string,
) : LoadingRoute {
    return (
        RouteEntity.create(name, '/')
                   .setView(LOADING_VIEW_NAME)
                   .getDTO()
    );
}
