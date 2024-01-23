// Copyright (c) 2024. Sendanor <info@sendanor.fi>. All rights reserved.

import { filter } from "../../../functions/filter";
import { reduce } from "../../../functions/reduce";
import { MetricCollectionDTO } from "../../MetricCollectionDTO";
import { MetricCollectionEntity } from "../../MetricCollectionEntity";
import { MetricDTO } from "../../MetricDTO";
import { EndPointMetricController } from "../endPoint/EndPointMetricController";
import { EndPointMetricControllerImpl } from "../endPoint/EndPointMetricControllerImpl";
import { MetricController } from "../types/MetricController";
import { MetricControllerCollection } from "./MetricControllerCollection";

export class MetricControllerCollectionImpl
    implements MetricControllerCollection
{

    public static create (
        endPoint : string
    ) : MetricControllerCollectionImpl {
        return new MetricControllerCollectionImpl(
            endPoint,
        );
    }

    private _metrics : MetricController[];
    protected readonly _endPointCounters : EndPointMetricController;

    private constructor (
        endPoint : string
    ) {
        this._metrics = [];
        this._endPointCounters = EndPointMetricControllerImpl.create(
            this,
            endPoint
        );
    }

    public destroy() : void {
        this._metrics = [];
    }

    public attachMetricController ( controller : MetricController ) : this {
        this._metrics.push( controller );
        return this;
    }

    public detachMetricController ( controller : MetricController ) : this {
        this._metrics = filter(
            this._metrics,
            (item: MetricController) : boolean => item !== controller
        );
        return this;
    }

    public getMetricCollectionDTO (): MetricCollectionDTO {
        const collection = MetricCollectionEntity.create();
        collection.setPayload( reduce(
            this._metrics,
            ( list: MetricDTO[], metric: MetricController) : MetricDTO[] => {
                return [
                    ...list,
                    ...metric.getAllMetrics(),
                ];
            },
            []
        ));
        return collection.getDTO();
    }

}
