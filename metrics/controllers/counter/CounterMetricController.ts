// Copyright (c) 2024. Sendanor <info@sendanor.fi>. All rights reserved.

import { ReadonlyJsonObject } from "../../../Json";
import { MetricDTO } from "../../MetricDTO";
import { MetricType } from "../../types/MetricType";
import { MetricController } from "../types/MetricController";

/**
 * Interface of MetricControllerImpl
 */
export interface CounterMetricController extends MetricController {
    getAllMetrics() : readonly MetricDTO[];
    getName () : string;
    getHelp () : string;
    getType () : MetricType;
    getLabels () : ReadonlyJsonObject;
    getValue () : string;
    advanceCounter () : this;
}
