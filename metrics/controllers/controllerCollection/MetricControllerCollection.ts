// Copyright (c) 2024. Sendanor <info@sendanor.fi>. All rights reserved.

import { MetricCollectionDTO } from "../../MetricCollectionDTO";
import { MetricController } from "../types/MetricController";

/**
 * Interface of MetricControllerCollectionImpl
 */
export interface MetricControllerCollection {
    destroy () : void;
    attachMetricController ( controller : MetricController ) : this;
    detachMetricController ( controller : MetricController ) : this;
    getMetricCollectionDTO (): MetricCollectionDTO;
}
