// Copyright (c) 2023. Sendanor <info@sendanor.fi>. All rights reserved.

import { createAppDTO, AppDTO } from "../../dto/AppDTO";
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
    return createAppDTO(
        myAppName,
        undefined,
        [
            createLoginRoute(LOGIN_ROUTE_NAME),
            createAnyRoute(LOGIN_ROUTE_NAME),
        ],
        publicUrl,
        language,
        [
            createTextComponent()
        ],
        [
            createDefaultView(),
            createLoginView()
        ]
    );
}
