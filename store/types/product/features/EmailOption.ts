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

export enum EmailOption {
    ADMIN_CONFIGURABLE = "ADMIN_CONFIGURABLE",
}

export function isEmailOption (value: unknown) : value is EmailOption {
    return isEnum(EmailOption, value);
}

export function explainEmailOption (value : unknown) : string {
    return explainEnum("EmailOption", EmailOption, isEmailOption, value);
}

export function stringifyEmailOption (value : EmailOption) : string {
    return stringifyEnum(EmailOption, value);
}

export function parseEmailOption (value: any) : EmailOption | undefined {
    return parseEnum(EmailOption, value) as EmailOption | undefined;
}

export function isEmailOptionOrUndefined (value: unknown): value is EmailOption | undefined {
    return isUndefined(value) || isEmailOption(value);
}

export function explainEmailOptionOrUndefined (value: unknown): string {
    return isEmailOptionOrUndefined(value) ? explainOk() : explainNot(explainOr(['EmailOption', 'undefined']));
}
