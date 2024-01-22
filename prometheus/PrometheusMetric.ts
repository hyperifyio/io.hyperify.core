// Copyright (c) 2024. Sendanor <info@sendanor.fi>. All rights reserved.

import { Entity } from "../entities/types/Entity";
import { ReadonlyJsonObject } from "../Json";
import { PrometheusMetricDTO } from "./PrometheusMetricDTO";
import { PrometheusMetricType } from "./types/PrometheusMetricType";

/**
 * Presents an interface for SeoEntity.
 */
export interface PrometheusMetric extends Entity<PrometheusMetricDTO> {

    /**
     * @inheritDoc
     */
    valueOf () : ReadonlyJsonObject;

    /**
     * @inheritDoc
     */
    getDTO () : PrometheusMetricDTO;

    /**
     * @inheritDoc
     */
    toJSON () : ReadonlyJsonObject;


    /**
     * Get a metric name.
     */
    getName () : string | undefined;

    /**
     * Set a metric name.
     *
     * @param metricName
     */
    setName (metricName : string | undefined) : this;

    /**
     * Set a metric name.
     *
     * An alias for `.setName(metricName)`.
     *
     * @param metricName
     */
    name (metricName : string | undefined) : this;


    /**
     * Get a help.
     */
    getHelp () : string | undefined;

    /**
     * Set a help.
     *
     * @param help
     */
    setHelp (help : string | undefined) : this;

    /**
     * Set a help.
     *
     * An alias for `.setHelp(help)`.
     *
     * @param help
     */
    help (help : string | undefined) : this;


    /**
     * Get a type.
     */
    getType () : PrometheusMetricType | undefined;

    /**
     * Set a type.
     *
     * @param type
     */
    setType (type : PrometheusMetricType | undefined) : this;

    /**
     * Set a type.
     *
     * An alias for `.setType(type)`.
     *
     * @param type
     */
    type (type : PrometheusMetricType | undefined) : this;


    /**
     * Get a labels.
     */
    getLabels () : ReadonlyJsonObject | undefined;

    /**
     * Set a labels.
     *
     * @param labels
     */
    setLabels (labels : ReadonlyJsonObject | undefined) : this;

    /**
     * Set a labels.
     *
     * An alias for `.setLabels(labels)`.
     *
     * @param labels
     */
    labels (labels : ReadonlyJsonObject | undefined) : this;

    /**
     * Set specific label
     *
     * @param labelName
     * @param labelValue
     */
    setLabel(
        labelName: string,
        labelValue: string,
    ) : this;

    /**
     * Returns specific label by name
     * @param labelName
     */
    getLabel(
        labelName: string
    ) : string | undefined;

    /**
     * Get a value.
     */
    getValue () : string | undefined;

    /**
     * Set a value.
     *
     * @param value
     */
    setValue (value : string | undefined) : this;

    /**
     * Set a value.
     *
     * An alias for `.setValue(value)`.
     *
     * @param value
     */
    value (value : string | undefined) : this;

    /**
     * Returns the text version
     */
    toString () : string;

}
