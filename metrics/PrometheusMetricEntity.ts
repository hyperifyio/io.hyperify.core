// Copyright (c) 2024. Sendanor <info@sendanor.fi>. All rights reserved.

import { EntityFactoryImpl } from "../entities/types/EntityFactoryImpl";
import { VariableType } from "../entities/types/VariableType";
import { filter } from "../functions/filter";
import { has } from "../functions/has";
import { keys } from "../functions/keys";
import { map } from "../functions/map";
import { reduce } from "../functions/reduce";
import { trim } from "../functions/trim";
import { Metric } from "./Metric";
import { MetricDTO } from "./MetricDTO";
import { MetricType } from "./types/MetricType";

export const PrometheusMetricEntityFactory = (
    EntityFactoryImpl.create<MetricDTO, Metric>('PrometheusMetric')
                     .add( EntityFactoryImpl.createProperty("name").setTypes(VariableType.STRING, VariableType.UNDEFINED) )
                     .add( EntityFactoryImpl.createProperty("help").setTypes(VariableType.STRING, VariableType.UNDEFINED) )
                     .add( EntityFactoryImpl.createProperty("type").setTypes(MetricType, VariableType.UNDEFINED) )
                     .add( EntityFactoryImpl.createProperty("labels").setTypes(VariableType.JSON, VariableType.UNDEFINED) )
                     .add( EntityFactoryImpl.createProperty("value").setTypes(VariableType.STRING, VariableType.UNDEFINED) )
);

export const isPrometheusMetricDTO = PrometheusMetricEntityFactory.createTestFunctionOfDTO();

export const isPrometheusMetric = PrometheusMetricEntityFactory.createTestFunctionOfInterface();

export const explainPrometheusMetricDTO = PrometheusMetricEntityFactory.createExplainFunctionOfDTO();

export const isPrometheusMetricDTOOrUndefined = PrometheusMetricEntityFactory.createTestFunctionOfDTOorOneOf(VariableType.UNDEFINED);

export const explainPrometheusMetricDTOOrUndefined = PrometheusMetricEntityFactory.createExplainFunctionOfDTOorOneOf(VariableType.UNDEFINED);

export const BasePrometheusMetricEntity = PrometheusMetricEntityFactory.createEntityType();

/**
 * PrometheusMetric entity.
 */
export class PrometheusMetricEntity
    extends BasePrometheusMetricEntity
    implements Metric
{

    /**
     * Creates a PrometheusMetric entity.
     *
     * @param value The optional DTO of PrometheusMetric
     */
    public static create (
        value ?: MetricDTO,
    ) : PrometheusMetricEntity {
        return new PrometheusMetricEntity(value);
    }

    /**
     * Creates a PrometheusMetric entity from DTO.
     *
     * @param dto The optional DTO of PrometheusMetric
     */
    public static createFromDTO (
        dto : MetricDTO,
    ) : PrometheusMetricEntity {
        return new PrometheusMetricEntity(dto);
    }

    /**
     * Merges multiple values as one entity.
     */
    public static merge (
        ...values: readonly (MetricDTO | Metric | PrometheusMetricEntity)[]
    ) : PrometheusMetricEntity {
        return PrometheusMetricEntity.createFromDTO(
            reduce(
                values,
                (
                    prev: MetricDTO,
                    item: MetricDTO | Metric | PrometheusMetricEntity,
                ) : MetricDTO => {
                    const dto : MetricDTO = this.toDTO(item);
                    return {
                        ...prev,
                        ...dto,
                    };
                },
                {},
            )
        );
    }

    /**
     * Normalizes the value as a DTO.
     */
    public static toDTO (
        value: MetricDTO | Metric | PrometheusMetricEntity,
    ) : MetricDTO {
        if (isPrometheusMetricEntity(value)) {
            return value.getDTO();
        } else if (isPrometheusMetric(value)) {
            return value.getDTO();
        } else {
            return value;
        }
    }

    /**
     * Construct an entity of PrometheusMetricEntity.
     */
    public constructor (
        dto ?: MetricDTO | undefined,
    ) {
        super(dto);
    }

    public setLabel ( labelName : string, labelValue : string ) : this {
        const previousLabels = this.getLabels();
        return this.setLabels({
            ...(previousLabels ? previousLabels : {}),
            [labelName]: labelValue,
        });
    }

    public getLabel ( labelName : string ) : string | undefined {
        const labels = this.getLabels();
        if (!has(labels, labelName)) return undefined;
        const labelValue =  labels[labelName];
        return `${labelValue}`;
    }

    public toString () : string {
        const metricName = this.getName();
        const helpText = this.getHelp();
        const type = this.getType();
        const metricValue = this.getValue();
        const labels = this.getLabels() ?? {};
        const labelStrings : readonly string[] = map(
            keys(labels),
            (labelKey: string) : string => {
                const labelValue : string = `${labels[labelKey]}`;
                return `${labelKey}="${labelValue}"`;
            }
        );
        const lines = [
            metricName && helpText ? `# HELP ${ metricName } ${ helpText }` : '',
            metricName && type ? `# TYPE ${ metricName } counter` : '',
            metricName && metricValue ? `${ metricName }${
                labelStrings.length ? `{${labelStrings.join(', ')}}` : ''
            } ${ metricValue }` : ''
        ];
        return filter(lines, line => !!trim(line)).join('\n') + '\n';
    }

}

export function isPrometheusMetricEntity (value: unknown): value is PrometheusMetricEntity {
    return value instanceof PrometheusMetricEntity;
}
