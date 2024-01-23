// Copyright (c) 2024. Sendanor <info@sendanor.fi>. All rights reserved.

import { ReadonlyJsonObject } from "../../../Json";
import { MetricDTO } from "../../MetricDTO";
import { MetricController } from "../types/MetricController";

/**
 * Interface of MetricControllerImpl
 */
export interface EndPointMetricController
    extends MetricController
{
    getAllMetrics() : readonly MetricDTO[];
    destroy () : void;
    advanceCounter (
        labels ?: ReadonlyJsonObject
    ) : this;
}
