// Copyright (c) 2024. Sendanor <info@sendanor.fi>. All rights reserved.

import { EntityFactoryImpl } from "../../entities/types/EntityFactoryImpl";
import { VariableType } from "../../entities/types/VariableType";
import { Banner } from "./Banner";
import { BannerDTO } from "./BannerDTO";
import { BannerLanguage } from "./BannerLanguage";
import { BannerLocation } from "./BannerLocation";
import { BannerState } from "./BannerState";
import { BannerType } from "./BannerType";

export const BannerEntityFactory = (
    EntityFactoryImpl.create<BannerDTO, Banner>('Banner')
                     .add( EntityFactoryImpl.createProperty("state").setTypes(BannerState) )
                     .add( EntityFactoryImpl.createProperty("type").setTypes(BannerType) )
                     .add( EntityFactoryImpl.createProperty("addTitleText").setTypes(VariableType.BOOLEAN) )
                     .add( EntityFactoryImpl.createProperty("addAltText").setTypes(VariableType.BOOLEAN) )
                     .add( EntityFactoryImpl.createProperty("title").setTypes(VariableType.STRING) )
                     .add( EntityFactoryImpl.createProperty("url").setTypes(VariableType.STRING) )
                     .add( EntityFactoryImpl.createProperty("imageUrl").setTypes(VariableType.STRING) )
                     .add( EntityFactoryImpl.createProperty("imageAlt").setTypes(VariableType.STRING) )
                     .add( EntityFactoryImpl.createOptionalArrayProperty("languages").setTypes(BannerLanguage) )
                     .add( EntityFactoryImpl.createOptionalArrayProperty("locations").setTypes(BannerLocation) )
                     .add( EntityFactoryImpl.createProperty("draftTime").setTypes(VariableType.STRING, VariableType.UNDEFINED) )
                     .add( EntityFactoryImpl.createProperty("startTime").setTypes(VariableType.STRING, VariableType.UNDEFINED) )
                     .add( EntityFactoryImpl.createProperty("publishTime").setTypes(VariableType.STRING, VariableType.UNDEFINED) )
                     .add( EntityFactoryImpl.createProperty("endTime").setTypes(VariableType.STRING, VariableType.UNDEFINED) )
                     .add( EntityFactoryImpl.createProperty("started").setTypes(VariableType.BOOLEAN, VariableType.UNDEFINED) )
                     .add( EntityFactoryImpl.createProperty("published").setTypes(VariableType.BOOLEAN, VariableType.UNDEFINED) )
                     .add( EntityFactoryImpl.createProperty("ended").setTypes(VariableType.BOOLEAN, VariableType.UNDEFINED) )
                     .add( EntityFactoryImpl.createProperty("owner").setTypes(VariableType.STRING, VariableType.UNDEFINED) )
);

export const isBannerDTO = BannerEntityFactory.createTestFunctionOfDTO();

export const isBanner = BannerEntityFactory.createTestFunctionOfInterface();

export const explainBannerDTO = BannerEntityFactory.createExplainFunctionOfDTO();

export const isBannerDTOOrUndefined = BannerEntityFactory.createTestFunctionOfDTOorOneOf(VariableType.UNDEFINED);

export const explainBannerDTOOrUndefined = BannerEntityFactory.createExplainFunctionOfDTOorOneOf(VariableType.UNDEFINED);

export const BaseBannerEntity = BannerEntityFactory.createEntityType();

/**
 * Banner entity.
 */
export class BannerEntity
    extends BaseBannerEntity
    implements Banner
{

    /**
     * Creates a Banner entity.
     *
     * @param value The optional DTO of Banner
     */
    public static create (
        value ?: BannerDTO,
    ) : BannerEntity {
        return new BannerEntity(value);
    }

    /**
     * Creates a Banner entity from DTO.
     *
     * @param dto The optional DTO of Banner
     */
    public static createFromDTO (
        dto : BannerDTO,
    ) : BannerEntity {
        return new BannerEntity(dto);
    }

    /**
     * Normalizes the value as a DTO.
     */
    public static toDTO (
        value: BannerDTO | Banner | BannerEntity,
    ) : BannerDTO {
        if (isBannerEntity(value)) {
            return value.getDTO();
        } else if (isBanner(value)) {
            return value.getDTO();
        } else {
            return value;
        }
    }

    /**
     * Construct an entity of BannerEntity.
     */
    public constructor (
        dto ?: BannerDTO | undefined,
    ) {
        super(dto);
    }

}

export function isBannerEntity (value: unknown): value is BannerEntity {
    return value instanceof BannerEntity;
}
