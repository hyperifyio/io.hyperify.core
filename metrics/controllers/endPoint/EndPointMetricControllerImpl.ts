// Copyright (c) 2024. Sendanor <info@sendanor.fi>. All rights reserved.

import { find } from "../../../functions/find";
import { forEach } from "../../../functions/forEach";
import { isEqual } from "../../../functions/isEqual";
import { reduce } from "../../../functions/reduce";
import { ReadonlyJsonObject } from "../../../Json";
import { LogService } from "../../../LogService";
import { MetricDTO } from "../../MetricDTO";
import { MetricType } from "../../types/MetricType";
import { MetricControllerCollection } from "../controllerCollection/MetricControllerCollection";
import { CounterMetricController } from "../counter/CounterMetricController";
import { CounterMetricControllerImpl } from "../counter/CounterMetricControllerImpl";
import { EndPointMetricController } from "./EndPointMetricController";

export const API_REQUESTS_METRIC_NAME : string = 'api_http_requests_total';
export const API_REQUESTS_METRIC_HELP_TEXT : string = 'Total HTTP API requests';
export const METRIC_END_POINT_LABEL_NAME : string = 'handler';

const LOG = LogService.createLogger( 'EndPointMetricControllerImpl' );

export class EndPointMetricControllerImpl
    implements EndPointMetricController
{

    public static create (
        collection  : MetricControllerCollection,
        endPoint    : string,
        labels     ?: ReadonlyJsonObject,
    ) : EndPointMetricControllerImpl {
        return new EndPointMetricControllerImpl(
            collection,
            endPoint,
            labels,
        );
    }

    private readonly _collection : MetricControllerCollection;
    private readonly _defaultName : string;
    private readonly _defaultHelp : string;
    private readonly _defaultType : MetricType;
    private readonly _defaultLabels : ReadonlyJsonObject;
    private _counters   : CounterMetricController[];

    private constructor (
        collection   : MetricControllerCollection,
        endPoint     : string,
        labels      ?: ReadonlyJsonObject,
    ) {
        this._counters = [];
        this._collection = collection;
        this._defaultName = API_REQUESTS_METRIC_NAME;
        this._defaultHelp = API_REQUESTS_METRIC_HELP_TEXT;
        this._defaultType = MetricType.COUNTER;
        this._defaultLabels = {
            [METRIC_END_POINT_LABEL_NAME]: endPoint,
            ...(labels? labels : {}),
        };
    }

    public destroy () : void {
        forEach(
            this._counters,
            (counter) => {
                this._collection.detachMetricController(counter);
            }
        );
        this._counters = [];
    }

    public advanceCounter (
        labels ?: ReadonlyJsonObject
    ) : this {
        const counter = this._findCounter(labels);
        counter.advanceCounter();
        return this;
    }

    public getAllMetrics () : readonly MetricDTO[] {
        return reduce(
            this._counters,
            (results: readonly MetricDTO[], counter: CounterMetricController) : readonly MetricDTO[] => {
                return [
                    ...results,
                    ...counter.getAllMetrics(),
                ];
            },
            []
        );
    }

    protected _findCounter (
        labels ?: ReadonlyJsonObject
    ) : CounterMetricController {

        const allLabels : ReadonlyJsonObject = {
            ...this._defaultLabels,
            ...(labels ? labels : {}),
        };

        let counter : CounterMetricController | undefined = find(
            this._counters,
            (counter : CounterMetricController) : boolean => {
                return (
                    counter.getName() === this._defaultName
                    && counter.getType() === this._defaultType
                    && isEqual(counter.getLabels(), allLabels)
                );
            }
        );

        if (counter === undefined) {
            counter = CounterMetricControllerImpl.create(
                this._defaultName,
                this._defaultHelp,
                allLabels,
            );
            this._counters.push(counter);
            this._collection.attachMetricController( counter );
        }

        return counter;
    }

}
