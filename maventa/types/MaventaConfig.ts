// Copyright (c) 2024. Sendanor <info@sendanor.fi>. All rights reserved.

import {
  explain,
  explainNot,
  explainOk,
  explainOr,
  explainProperty,
} from "../../types/explain";
import {
  explainNoOtherKeysInDevelopment,
  hasNoOtherKeysInDevelopment,
} from "../../types/OtherKeys";
import {
  explainRegularObject,
  isRegularObject,
} from "../../types/RegularObject";
import {
  explainString,
  isString,
} from "../../types/String";
import { isUndefined } from "../../types/undefined";

export interface MaventaConfig {
  readonly baseUrl: string;
  readonly clientId: string;
  readonly clientSecret: string;
  readonly scope: string;
  readonly vendorApiKey: string;
  readonly companyEDI: string;
}

export function createMaventaConfig (
    baseUrl : string,
    clientId : string,
    clientSecret : string,
    scope : string,
    vendorApiKey : string,
    companyEDI : string,
) : MaventaConfig {
    return {
        baseUrl,
        clientId,
        clientSecret,
        scope,
        vendorApiKey,
        companyEDI,
    };
}

export function isMaventaConfig (value: unknown) : value is MaventaConfig {
    return (
        isRegularObject(value)
        && hasNoOtherKeysInDevelopment(value, [
            'baseUrl',
            'clientId',
            'clientSecret',
            'scope',
            'vendorApiKey',
            'companyEDI',
        ])
        && isString(value?.baseUrl)
        && isString(value?.clientId)
        && isString(value?.clientSecret)
        && isString(value?.scope)
        && isString(value?.vendorApiKey)
        && isString(value?.companyEDI)
    );
}

export function explainMaventaConfig (value: any) : string {
    return explain(
        [
            explainRegularObject(value),
            explainNoOtherKeysInDevelopment(value, [
                'baseUrl',
                'clientId',
                'clientSecret',
                'scope',
                'vendorApiKey',
                'companyEDI',
            ])
            , explainProperty("baseUrl", explainString(value?.baseUrl))
            , explainProperty("clientId", explainString(value?.clientId))
            , explainProperty("clientSecret", explainString(value?.clientSecret))
            , explainProperty("scope", explainString(value?.scope))
            , explainProperty("vendorApiKey", explainString(value?.vendorApiKey))
            , explainProperty("companyEDI", explainString(value?.companyEDI))
        ]
    );
}

export function stringifyMaventaConfig (value : MaventaConfig) : string {
    return `MaventaConfig(${value})`;
}

export function parseMaventaConfig (value: unknown) : MaventaConfig | undefined {
    if (isMaventaConfig(value)) return value;
    return undefined;
}

export function isMaventaConfigOrUndefined (value: unknown): value is MaventaConfig | undefined {
    return isUndefined(value) || isMaventaConfig(value);
}

export function explainMaventaConfigOrUndefined (value: unknown): string {
    return isMaventaConfigOrUndefined(value) ? explainOk() : explainNot(explainOr(['MaventaConfig', 'undefined']));
}
