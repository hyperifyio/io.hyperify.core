// Copyright (c) 2024. Sendanor <info@sendanor.fi>. All rights reserved.

import { EntityFactoryImpl } from "../entities/types/EntityFactoryImpl";
import { VariableType } from "../entities/types/VariableType";
import { MetricEntity } from "./MetricEntity";
import { MetricCollection } from "./MetricCollection";
import { MetricCollectionDTO } from "./MetricCollectionDTO";

export const MetricCollectionEntityFactory = (
    EntityFactoryImpl.create<MetricCollectionDTO, MetricCollection>('MetricCollection')
                     .add( EntityFactoryImpl.createArrayProperty("payload").setTypes(MetricEntity) )
);

export const isMetricCollectionDTO = MetricCollectionEntityFactory.createTestFunctionOfDTO();

export const isMetricCollection = MetricCollectionEntityFactory.createTestFunctionOfInterface();

export const explainMetricCollectionDTO = MetricCollectionEntityFactory.createExplainFunctionOfDTO();

export const isMetricCollectionDTOOrUndefined = MetricCollectionEntityFactory.createTestFunctionOfDTOorOneOf(VariableType.UNDEFINED);

export const explainMetricCollectionDTOOrUndefined = MetricCollectionEntityFactory.createExplainFunctionOfDTOorOneOf(VariableType.UNDEFINED);

export const BaseMetricCollectionEntity = MetricCollectionEntityFactory.createEntityType();

/**
 * Metric Collection entity.
 */
export class MetricCollectionEntity
    extends BaseMetricCollectionEntity
    implements MetricCollection
{

    /**
     * Creates a Metric Collection entity.
     *
     * @param value The optional DTO of Metric Collection
     */
    public static create (
        value ?: MetricCollectionDTO,
    ) : MetricCollectionEntity {
        return new MetricCollectionEntity(value);
    }

    /**
     * Creates a Metric Collection entity from DTO.
     *
     * @param dto The optional DTO of Metric Collection
     */
    public static createFromDTO (
        dto : MetricCollectionDTO,
    ) : MetricCollectionEntity {
        return new MetricCollectionEntity(dto);
    }

    /**
     * Normalizes the value as a DTO.
     */
    public static toDTO (
        value: MetricCollectionDTO | MetricCollection | MetricCollectionEntity,
    ) : MetricCollectionDTO {
        if (isMetricCollectionEntity(value)) {
            return value.getDTO();
        } else if (isMetricCollection(value)) {
            return value.getDTO();
        } else {
            return value;
        }
    }

    /**
     * Construct an entity of MetricCollectionEntity.
     */
    public constructor (
        dto ?: MetricCollectionDTO | undefined,
    ) {
        super(dto);
    }

}

export function isMetricCollectionEntity ( value: unknown): value is MetricCollectionEntity {
    return value instanceof MetricCollectionEntity;
}
