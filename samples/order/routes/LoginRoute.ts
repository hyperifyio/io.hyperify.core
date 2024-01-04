// Copyright (c) 2023. Sendanor <info@sendanor.fi>. All rights reserved.

import { RouteDTO } from "../../../entities/route/RouteDTO";
import { RouteEntity } from "../../../entities/route/RouteEntity";
import { LOGIN_VIEW_NAME } from "../views/LoginView";

export type LoginRoute = RouteDTO;

export function createLoginRoute (
    name: string,
) : LoginRoute {
    return (
        RouteEntity.create(name, '/')
                   .setView(LOGIN_VIEW_NAME)
                   .getDTO()
    );
}
