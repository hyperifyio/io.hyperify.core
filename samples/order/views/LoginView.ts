// Copyright (c) 2023. Sendanor <info@sendanor.fi>. All rights reserved.

import { createViewDTO, ViewDTO } from "../../../dto/ViewDTO";
import { createText } from "../components/Text";
import { DEFAULT_VIEW_NAME } from "./DefaultView";

export const LOGIN_VIEW_NAME: string = 'LoginView';

export type LoginView = ViewDTO;

export function createLoginView () : LoginView {
    return createViewDTO(
        LOGIN_VIEW_NAME,
        DEFAULT_VIEW_NAME,
        undefined,
        undefined,
        undefined,
        [
            createText('project', 'Example'),
            createText('appName', 'OrderApp'),
        ],
        undefined,
        undefined,
    );
}
