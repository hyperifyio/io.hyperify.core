// Copyright (c) 2023. Sendanor <info@sendanor.fi>. All rights reserved.

import { createRouteDTO, RouteDTO } from "../../../dto/RouteDTO";
import { LOGIN_VIEW_NAME } from "../views/LoginView";

export type LoginRoute = RouteDTO;

export function createLoginRoute (
    name: string,
) : LoginRoute {
    return createRouteDTO(
        name,
        '/',
        undefined,
        undefined,
        undefined,
        LOGIN_VIEW_NAME,
        undefined
    );
}
