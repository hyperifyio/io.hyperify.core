// Copyright (c) 2023. Sendanor <info@sendanor.fi>. All rights reserved.

import { reduce } from "../../functions/reduce";
import { ReadonlyJsonObject } from "../../Json";
import { SizeEntity } from "../size/SizeEntity";
import { BackgroundPositionValue } from "../types/BackgroundPositionValue";
import { EntityFactoryImpl } from "../types/EntityFactoryImpl";
import { VariableType } from "../types/VariableType";
import { BackgroundPosition } from "./BackgroundPosition";
import { BackgroundPositionDTO } from "./BackgroundPositionDTO";

export const BackgroundPositionEntityFactory = (
    EntityFactoryImpl.create<BackgroundPositionDTO, BackgroundPosition>('BackgroundPosition')
                     .add( EntityFactoryImpl.createProperty("position").setTypes(BackgroundPositionValue, VariableType.UNDEFINED) )
                     .add( EntityFactoryImpl.createProperty("size").setTypes(SizeEntity, VariableType.UNDEFINED) )
                     .add( EntityFactoryImpl.createProperty("secondPosition").setTypes(BackgroundPositionValue, VariableType.UNDEFINED) )
                     .add( EntityFactoryImpl.createProperty("secondSize").setTypes(SizeEntity, VariableType.UNDEFINED) )
);

export const isBackgroundPositionDTO = BackgroundPositionEntityFactory.createTestFunctionOfDTO();

export const isBackgroundPosition = BackgroundPositionEntityFactory.createTestFunctionOfInterface();

export const explainBackgroundPositionDTO = BackgroundPositionEntityFactory.createExplainFunctionOfDTO();

export const isBackgroundPositionDTOOrUndefined = BackgroundPositionEntityFactory.createTestFunctionOfDTOorOneOf(VariableType.UNDEFINED);

export const explainBackgroundPositionDTOOrUndefined = BackgroundPositionEntityFactory.createExplainFunctionOfDTOorOneOf(VariableType.UNDEFINED);

export const BaseBackgroundPositionEntity = BackgroundPositionEntityFactory.createEntityType();

/**
 * BackgroundPosition entity.
 */
export class BackgroundPositionEntity
    extends BaseBackgroundPositionEntity
    implements BackgroundPosition
{

    /**
     * Creates a BackgroundPosition entity.
     *
     * @param value The optional DTO of BackgroundPosition
     */
    public static create (
        value ?: BackgroundPositionDTO,
    ) : BackgroundPositionEntity {
        return new BackgroundPositionEntity(value);
    }

    /**
     * Creates a BackgroundPosition entity from DTO.
     *
     * @param dto The optional DTO of BackgroundPosition
     */
    public static createFromDTO (
        dto : BackgroundPositionDTO,
    ) : BackgroundPositionEntity {
        return new BackgroundPositionEntity(dto);
    }

    /**
     * Merges multiple values as one entity.
     */
    public static merge (
        ...values: readonly (BackgroundPositionDTO | BackgroundPosition | BackgroundPositionEntity)[]
    ) : BackgroundPositionEntity {
        return BackgroundPositionEntity.createFromDTO(
            reduce(
                values,
                (
                    prev: BackgroundPositionDTO,
                    item: BackgroundPositionDTO | BackgroundPosition | BackgroundPositionEntity,
                ) : BackgroundPositionDTO => {
                    const dto : BackgroundPositionDTO = this.toDTO(item);
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
        value: BackgroundPositionDTO | BackgroundPosition | BackgroundPositionEntity,
    ) : BackgroundPositionDTO {
        if (isBackgroundPositionEntity(value)) {
            return value.getDTO();
        } else if (isBackgroundPosition(value)) {
            return value.getDTO();
        } else {
            return value;
        }
    }

    /**
     * Construct an entity of BackgroundPositionEntity.
     */
    public constructor (
        dto ?: BackgroundPositionDTO | undefined,
    ) {
        super(dto);
    }

    /**
     * @inheritDoc
     */
    public getCssStyles (): ReadonlyJsonObject {

        const position = this.getPosition();
        const size = this.getSize()?.getCssStyles();
        const secondPosition = this.getSecondPosition();
        const secondSize = this.getSecondSize()?.getCssStyles();

        if ( position && size && secondPosition && secondSize ) {
            return {
                backgroundPosition: `${position} ${size} ${secondPosition} ${secondSize}`
            };
        }

        if ( position && secondPosition && secondSize ) {
            return {
                backgroundPosition: `${position} ${secondPosition} ${secondSize}`
            };
        }

        if ( position && size && secondPosition ) {
            return {
                backgroundPosition: `${position} ${size} ${secondPosition}`
            };
        }

        if ( position && size ) {
            return {
                backgroundPosition : `${ position } ${ size }`
            };
        }

        if ( size && secondSize ) {
            return {
                backgroundPosition : `${ size } ${ secondSize }`
            };
        }

        if ( size ) {
            return {
                backgroundPosition : `${ size }`
            };
        }

        if ( position ) {
            return {
                backgroundPosition : `${ position }`
            };
        }

        return {};
    }

}

export function isBackgroundPositionEntity (value: unknown): value is BackgroundPositionEntity {
    return value instanceof BackgroundPositionEntity;
}
