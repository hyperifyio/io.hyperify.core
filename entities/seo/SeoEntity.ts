// Copyright (c) 2023. Sendanor <info@sendanor.fi>. All rights reserved.

import { reduce } from "../../functions/reduce";
import { EntityFactoryImpl } from "../types/EntityFactoryImpl";
import { VariableType } from "../types/VariableType";
import { Seo } from "./Seo";
import { SeoDTO } from "./SeoDTO";

export const SeoEntityFactory = (
    EntityFactoryImpl.create<SeoDTO, Seo>('Seo')
                     .add( EntityFactoryImpl.createProperty("title").setTypes(VariableType.STRING, VariableType.UNDEFINED) )
                     .add( EntityFactoryImpl.createProperty("description").setTypes(VariableType.STRING, VariableType.UNDEFINED) )
                     .add( EntityFactoryImpl.createProperty("siteName").setTypes(VariableType.STRING, VariableType.UNDEFINED) )
);

export const isSeoDTO = SeoEntityFactory.createTestFunctionOfDTO();

export const isSeo = SeoEntityFactory.createTestFunctionOfInterface();

export const explainSeoDTO = SeoEntityFactory.createExplainFunctionOfDTO();

export const isSeoDTOOrUndefined = SeoEntityFactory.createTestFunctionOfDTOorOneOf(VariableType.UNDEFINED);

export const explainSeoDTOOrUndefined = SeoEntityFactory.createExplainFunctionOfDTOorOneOf(VariableType.UNDEFINED);

export const BaseSeoEntity = SeoEntityFactory.createEntityType();

/**
 * Seo entity.
 */
export class SeoEntity
    extends BaseSeoEntity
    implements Seo
{

    /**
     * Creates a Seo entity.
     *
     * @param value The optional DTO of Seo
     */
    public static create (
        value ?: SeoDTO,
    ) : SeoEntity {
        return new SeoEntity(value);
    }

    /**
     * Creates a Seo entity from DTO.
     *
     * @param dto The optional DTO of Seo
     */
    public static createFromDTO (
        dto : SeoDTO,
    ) : SeoEntity {
        return new SeoEntity(dto);
    }

    /**
     * Merges multiple values as one entity.
     */
    public static merge (
        ...values: readonly (SeoDTO | Seo | SeoEntity)[]
    ) : SeoEntity {
        return SeoEntity.createFromDTO(
            reduce(
                values,
                (
                    prev: SeoDTO,
                    item: SeoDTO | Seo | SeoEntity,
                ) : SeoDTO => {
                    const dto : SeoDTO = this.toDTO(item);
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
        value: SeoDTO | Seo | SeoEntity,
    ) : SeoDTO {
        if (isSeoEntity(value)) {
            return value.getDTO();
        } else if (isSeo(value)) {
            return value.getDTO();
        } else {
            return value;
        }
    }

    /**
     * Construct an entity of SeoEntity.
     */
    public constructor (
        dto ?: SeoDTO | undefined,
    ) {
        super(dto);
    }

}

export function isSeoEntity (value: unknown): value is SeoEntity {
    return value instanceof SeoEntity;
}
