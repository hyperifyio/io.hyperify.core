// Copyright (c) 2024. Sendanor <info@sendanor.fi>. All rights reserved.

import { ReadonlyJsonObject } from "../../../Json";
import { MetricDTO } from "../../MetricDTO";
import { MetricEntity } from "../../MetricEntity";
import { MetricType } from "../../types/MetricType";
import { CounterMetricController } from "./CounterMetricController";

export class CounterMetricControllerImpl
    implements CounterMetricController
{

    private readonly _details : MetricDTO;
    private _counter : number;

    public static create (
        name     : string,
        help     : string,
        labels   : ReadonlyJsonObject,
        counter ?: number,
    ) : CounterMetricControllerImpl {
        return new CounterMetricControllerImpl(
            (
                MetricEntity.create()
                            .setName(name)
                            .setHelp(help)
                            .setLabels(labels)
                            .setType(MetricType.COUNTER)
                            .getDTO()
            ),
            counter ?? 0,
        );
    }

    private constructor (
        details : MetricDTO,
        counter : number,
    ) {
        this._details = details;
        this._counter = counter;
    }

    public getName () : string {
        return this._details?.name ?? '';
    }

    public getHelp () : string {
        return this._details?.help ?? '';
    }

    public getType () : MetricType {
        return this._details?.type ?? MetricType.COUNTER;
    }

    public getLabels () : ReadonlyJsonObject {
        return this._details?.labels ?? {};
    }

    public getValue () : string {
        return `${this._counter}`;
    }

    public advanceCounter () : this {
        this._counter += 1;
        return this;
    }

    public getAllMetrics () : readonly MetricDTO[] {
        return [
            {
                ...this._details,
                value: `${this._counter}`,
            }
        ];
    }

}
