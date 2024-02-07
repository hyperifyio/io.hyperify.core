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

export const MetricEntityFactory = (
    EntityFactoryImpl.create<MetricDTO, Metric>('Metric')
                     .add( EntityFactoryImpl.createProperty("name").setTypes(VariableType.STRING, VariableType.UNDEFINED) )
                     .add( EntityFactoryImpl.createProperty("help").setTypes(VariableType.STRING, VariableType.UNDEFINED) )
                     .add( EntityFactoryImpl.createProperty("type").setTypes(MetricType, VariableType.UNDEFINED) )
                     .add( EntityFactoryImpl.createProperty("labels").setTypes(VariableType.JSON, VariableType.UNDEFINED) )
                     .add( EntityFactoryImpl.createProperty("value").setTypes(VariableType.STRING, VariableType.UNDEFINED) )
);

export const isMetricDTO = MetricEntityFactory.createTestFunctionOfDTO();

export const isMetric = MetricEntityFactory.createTestFunctionOfInterface();

export const explainMetricDTO = MetricEntityFactory.createExplainFunctionOfDTO();

export const isMetricDTOOrUndefined = MetricEntityFactory.createTestFunctionOfDTOorOneOf(VariableType.UNDEFINED);

export const explainMetricDTOOrUndefined = MetricEntityFactory.createExplainFunctionOfDTOorOneOf(VariableType.UNDEFINED);

export const BaseMetricEntity = MetricEntityFactory.createEntityType();

/**
 * Metric entity.
 */
export class MetricEntity
    extends BaseMetricEntity
    implements Metric
{

    /**
     * Creates a metric entity.
     *
     * @param value The optional DTO of Metric
     */
    public static create (
        value ?: MetricDTO,
    ) : MetricEntity {
        return new MetricEntity(value);
    }

    /**
     * Creates a Metric entity from DTO.
     *
     * @param dto The optional DTO of Metric
     */
    public static createFromDTO (
        dto : MetricDTO,
    ) : MetricEntity {
        return new MetricEntity(dto);
    }

    /**
     * Merges multiple values as one entity.
     */
    public static merge (
        ...values: readonly (MetricDTO | Metric | MetricEntity)[]
    ) : MetricEntity {
        return MetricEntity.createFromDTO(
            reduce(
                values,
                (
                    prev: MetricDTO,
                    item: MetricDTO | Metric | MetricEntity,
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
        value: MetricDTO | Metric | MetricEntity,
    ) : MetricDTO {
        if (isMetricEntity(value)) {
            return value.getDTO();
        } else if (isMetric(value)) {
            return value.getDTO();
        } else {
            return value;
        }
    }

    /**
     * Construct an entity of MetricEntity.
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
        if (labels) {
            if (!has(labels, labelName)) return undefined;
            const labelValue =  (labels as any)[labelName];
            return `${labelValue}`;
        }
        return undefined;
    }

    public toString () : string {
        const name = this.getName();
        if ( !name ) return '';
        const metricName = escapeMetricName( name );
        const helpText = this.getHelp();
        const type = this.getType();
        const metricValue = this.getValue();
        const labels = this.getLabels() ?? {};
        const labelStrings : readonly string[] = map(
            keys( labels ),
            ( labelKey : string ) : string => {
                const labelValue : string = `${ labels[labelKey] }`;
                return `${ escapeMetricName( labelKey ) }="${ escapeMetricLabelValue( labelValue ) }"`;
            },
        );
        const lines = [
            metricName && helpText ? `# HELP ${ metricName } ${ escapeMetricHelp( helpText ) }` : '',
            metricName && type ? `# TYPE ${ metricName } counter` : '',
            metricName && metricValue ? `${ metricName }${
                labelStrings.length ? `{${ labelStrings.join( ', ' ) }}` : ''
            } ${ metricValue }` : '',
        ];
        return filter( lines, line => !!trim( line ) ).join( '\n' ) + '\n';
    }

}

export function isMetricEntity ( value: unknown): value is MetricEntity {
    return value instanceof MetricEntity;
}

export function escapeMetricName ( value : string) : string {
    return value.replace(
        /[^a-zA-Z0-9:_]/g,
        "_"
    );
}

export function escapeMetricHelp ( value : string) : string {
    return (
        value.replace(/\\/g, '\\\\')
             .replace(/\n/g, '\\n')
    );
}

export function escapeMetricLabelValue ( value : string) : string {
    return (
        value.replace(/\\/g, '\\\\')
             .replace(/"/g, '\\"')
             .replace(/\n/g, '\\n')
    );
}
