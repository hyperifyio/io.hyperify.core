// Copyright (c) 2024. Sendanor <info@sendanor.fi>. All rights reserved.

import { MetricDTO } from "./MetricDTO";

export interface MetricCollectionDTO {
    readonly payload: readonly MetricDTO[];
}
