// Copyright (c) 2024. Sendanor <info@sendanor.fi>. All rights reserved.

import { ReadonlyJsonObject } from "../Json";
import { MetricType } from "./types/MetricType";

export interface MetricDTO {
    readonly name       ?: string;
    readonly help       ?: string;
    readonly type       ?: MetricType;
    readonly labels     ?: ReadonlyJsonObject;
    readonly value      ?: string;
}
