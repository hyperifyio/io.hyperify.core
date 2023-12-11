// Copyright (c) 2023. Sendanor <info@sendanor.fi>. All rights reserved.

import { createAppDTO, AppDTO } from "../../dto/AppDTO";
import { createAnyRoute } from "./routes/AnyRoute";
import { createLoadingRoute } from "./routes/LoadingRoute";
import { createTextComponent } from "./components/TextComponent";
import { createDefaultView } from "./views/DefaultView";
import { createLoadingView } from "./views/LoadingView";

export const LOADING_ROUTE_NAME : string = 'LoadingRoute';

export type LoadingAppDefinition = AppDTO;

export function createLoadingAppDefinition (
    myAppName: string,
    publicUrl: string,
    language: string
) : LoadingAppDefinition {
    return createAppDTO(
        myAppName,
        undefined,
        [
            createLoadingRoute(LOADING_ROUTE_NAME),
            createAnyRoute(LOADING_ROUTE_NAME),
        ],
        publicUrl,
        language,
        [
            createTextComponent()
        ],
        [
            createDefaultView(),
            createLoadingView()
        ]
    );
}
