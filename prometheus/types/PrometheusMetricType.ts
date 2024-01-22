// Copyright (c) 2024. Heusala Group Oy <info@heusalagroup.fi>. All rights reserved.

import { isUndefined } from "node:util";
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

export enum PrometheusMetricType {
    COUNTER = "counter",
}

export function isPrometheusMetricType (value: unknown) : value is PrometheusMetricType {
    return isEnum(PrometheusMetricType, value);
}

export function explainPrometheusMetricType (value : unknown) : string {
    return explainEnum("PrometheusMetricType", PrometheusMetricType, isPrometheusMetricType, value);
}

export function stringifyPrometheusMetricType (value : PrometheusMetricType) : string {
    return stringifyEnum(PrometheusMetricType, value);
}

export function parsePrometheusMetricType (value: any) : PrometheusMetricType | undefined {
    return parseEnum(PrometheusMetricType, value) as PrometheusMetricType | undefined;
}

export function isPrometheusMetricTypeOrUndefined (value: unknown): value is PrometheusMetricType | undefined {
    return isUndefined(value) || isPrometheusMetricType(value);
}

export function explainPrometheusMetricTypeOrUndefined (value: unknown): string {
    return isPrometheusMetricTypeOrUndefined(value) ? explainOk() : explainNot(explainOr(['PrometheusMetricType', 'undefined']));
}
