// Copyright (c) 2024. Sendanor <info@sendanor.fi>. All rights reserved.

import { ReadonlyJsonObject } from "../Json";
import { PrometheusMetricType } from "./types/PrometheusMetricType";

export interface PrometheusMetricDTO {
    readonly name       ?: string;
    readonly help       ?: string;
    readonly type       ?: PrometheusMetricType;
    readonly labels     ?: ReadonlyJsonObject;
    readonly value      ?: string;
}
