// Copyright (c) 2023. Sendanor <info@sendanor.fi>. All rights reserved.

import { createRouteDTO, RouteDTO } from "../../../dto/RouteDTO";

export const ANY_ROUTE_NAME : string = 'AnyRoute';

export type AnyRoute = RouteDTO;

export function createAnyRoute (
    redirect: string
) : AnyRoute {
    return createRouteDTO(
        ANY_ROUTE_NAME,
        '*',
        undefined,
        undefined,
        undefined,
        undefined,
        redirect
    );
}
