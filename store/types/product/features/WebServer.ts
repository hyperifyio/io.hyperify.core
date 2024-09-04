// Copyright (c) 2024. Heusala Group Oy <info@heusalagroup.fi>. All rights reserved.

import {
    explainEnum,
    isEnum,
    parseEnum,
    stringifyEnum,
} from "../../../../types/Enum";
import {
    explainNot,
    explainOk,
    explainOr,
} from "../../../../types/explain";
import { isUndefined } from "../../../../types/undefined";

export enum WebServer {
    APACHE = "APACHE",
    NGINX = "NGINX",
    NODEJS = "NODEJS",
    OTHER = "OTHER",
}

export function isWebServer (value: unknown) : value is WebServer {
    return isEnum(WebServer, value);
}

export function explainWebServer (value : unknown) : string {
    return explainEnum("WebServer", WebServer, isWebServer, value);
}

export function stringifyWebServer (value : WebServer) : string {
    return stringifyEnum(WebServer, value);
}

export function parseWebServer (value: any) : WebServer | undefined {
    return parseEnum(WebServer, value) as WebServer | undefined;
}

export function isWebServerOrUndefined (value: unknown): value is WebServer | undefined {
    return isUndefined(value) || isWebServer(value);
}

export function explainWebServerOrUndefined (value: unknown): string {
    return isWebServerOrUndefined(value) ? explainOk() : explainNot(explainOr(['WebServer', 'undefined']));
}
