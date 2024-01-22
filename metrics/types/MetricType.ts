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

export enum MetricType {
    COUNTER = "counter",
}

export function isPrometheusMetricType (value: unknown) : value is MetricType {
    return isEnum(MetricType, value);
}

export function explainPrometheusMetricType (value : unknown) : string {
    return explainEnum("PrometheusMetricType", MetricType, isPrometheusMetricType, value);
}

export function stringifyPrometheusMetricType (value : MetricType) : string {
    return stringifyEnum(MetricType, value);
}

export function parsePrometheusMetricType (value: any) : MetricType | undefined {
    return parseEnum(MetricType, value) as MetricType | undefined;
}

export function isPrometheusMetricTypeOrUndefined (value: unknown): value is MetricType | undefined {
    return isUndefined(value) || isPrometheusMetricType(value);
}

export function explainPrometheusMetricTypeOrUndefined (value: unknown): string {
    return isPrometheusMetricTypeOrUndefined(value) ? explainOk() : explainNot(explainOr(['PrometheusMetricType', 'undefined']));
}
