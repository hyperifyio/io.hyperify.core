// Copyright (c) 2024. Heusala Group Oy <info@heusalagroup.fi>. All rights reserved.

import {
    explainEnum,
    isEnum,
    parseEnum,
    stringifyEnum,
} from "../../types/Enum";
import {
    explainNot,
    explainOk,
    explainOr,
} from "../../types/explain";
import { isUndefined } from "../../types/undefined";

export enum FacebookResponseType {
    CODE = "code",
}

export function isFacebookResponseType (value: unknown) : value is FacebookResponseType {
    return isEnum(FacebookResponseType, value);
}

export function explainFacebookResponseType (value : unknown) : string {
    return explainEnum("FacebookResponseType", FacebookResponseType, isFacebookResponseType, value);
}

export function stringifyFacebookResponseType (value : FacebookResponseType) : string {
    return stringifyEnum(FacebookResponseType, value);
}

export function parseFacebookResponseType (value: any) : FacebookResponseType | undefined {
    return parseEnum(FacebookResponseType, value) as FacebookResponseType | undefined;
}

export function isFacebookResponseTypeOrUndefined (value: unknown): value is FacebookResponseType | undefined {
    return isUndefined(value) || isFacebookResponseType(value);
}

export function explainFacebookResponseTypeOrUndefined (value: unknown): string {
    return isFacebookResponseTypeOrUndefined(value) ? explainOk() : explainNot(explainOr(['FacebookResponseType', 'undefined']));
}
