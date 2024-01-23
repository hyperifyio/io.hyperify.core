// Copyright (c) 2024. Sendanor <info@sendanor.fi>. All rights reserved.

import { MetricDTO } from "../../MetricDTO";

/**
 * Interface of MetricControllerImpl
 */
export interface MetricController {
    getAllMetrics() : readonly MetricDTO[];
}
