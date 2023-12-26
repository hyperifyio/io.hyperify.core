// Copyright (c) 2023. Sendanor <info@sendanor.fi>. All rights reserved.

import { AppDTO } from "../../entities/app/AppDTO";
import { AppEntity } from "../../entities/app/AppEntity";
import { createAnyRoute } from "./routes/AnyRoute";
import { createLoginRoute } from "./routes/LoginRoute";
import { createTextComponent } from "./components/TextComponent";
import { createDefaultView } from "./views/DefaultView";
import { createLoginView } from "./views/LoginView";

export const LOGIN_ROUTE_NAME : string = 'LoginRoute';

export type OrderAppDefinition = AppDTO;

export function createOrderAppDefinitions (
    myAppName: string,
    publicUrl: string,
    language: string
) : OrderAppDefinition {
    return (
        AppEntity.create(myAppName)
                 .setRoutes([
                     createLoginRoute(LOGIN_ROUTE_NAME),
                     createAnyRoute(LOGIN_ROUTE_NAME),
                 ])
                 .setPublicUrl(publicUrl)
                 .setLanguage(language)
                 .setComponents([
                     createTextComponent(),
                 ])
                 .setViews([
                     createDefaultView(),
                     createLoginView(),
                 ])
                 .getDTO()
    );
}
