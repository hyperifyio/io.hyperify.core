// Copyright (c) 2023. Sendanor <info@sendanor.fi>. All rights reserved.

import { RouteDTO } from "../../../entities/route/RouteDTO";
import { RouteEntity } from "../../../entities/route/RouteEntity";

export const ANY_ROUTE_NAME : string = 'AnyRoute';

export type AnyRoute = RouteDTO;

export function createAnyRoute (
    redirect: string
) : AnyRoute {
    return (
        RouteEntity.create(ANY_ROUTE_NAME, '*')
                   .setRedirect(redirect)
                   .getDTO()
    );
}
