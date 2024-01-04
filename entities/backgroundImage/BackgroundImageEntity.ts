// Copyright (c) 2023. Sendanor <info@sendanor.fi>. All rights reserved.

import { VariableType } from "../types/VariableType";
import {
    BackgroundImageDTO,
} from "./BackgroundImageDTO";
import { isString } from "../../types/String";
import {
    BackgroundImage,
} from "./BackgroundImage";
import { EntityFactoryImpl } from "../types/EntityFactoryImpl";

export const BackgroundImageEntityFactory = (
    EntityFactoryImpl.create<BackgroundImageDTO, BackgroundImage>('BackgroundImage')
                     .add( EntityFactoryImpl.createProperty("url").setTypes(VariableType.STRING) )
);

export const BaseBackgroundImageEntity = BackgroundImageEntityFactory.createEntityType();

export const isBackgroundImageDTO = BackgroundImageEntityFactory.createTestFunctionOfDTO();

export const isBackgroundImage = BackgroundImageEntityFactory.createTestFunctionOfInterface();

export const explainBackgroundImageDTO = BackgroundImageEntityFactory.createExplainFunctionOfDTO();

export const isBackgroundImageDTOOrUndefined = BackgroundImageEntityFactory.createTestFunctionOfDTOorOneOf(VariableType.UNDEFINED);

export const explainBackgroundImageDTOOrUndefined = BackgroundImageEntityFactory.createExplainFunctionOfDTOorOneOf(VariableType.UNDEFINED);


/**
 * Background image entity.
 */
export class BackgroundImageEntity
    extends BaseBackgroundImageEntity
    implements BackgroundImage
{

    /**
     * Creates a background image entity.
     *
     * @param url
     */
    public static create (
        url ?: string | undefined,
    ) : BackgroundImageEntity {
        return new BackgroundImageEntity( url );
    }

    /**
     * Creates a background image entity from DTO.
     *
     * @param value
     */
    public static createFromDTO (
        value : BackgroundImageDTO,
    ) : BackgroundImageEntity {
        return new BackgroundImageEntity( value );
    }

    public static url (
        url : string,
    ) : BackgroundImageEntity {
        return new BackgroundImageEntity( url );
    }

    public constructor (
        arg ?: string | BackgroundImage | BackgroundImageEntity | BackgroundImageDTO | undefined,
    ) {
        if (arg === undefined) {
            super();
        } else if (isString(arg)) {
            super( { url: arg });
        } else if (isBackgroundImageDTO(arg)) {
            super(arg);
        } else if (isBackgroundImageEntity(arg) || isBackgroundImage(arg)) {
            super(arg.getDTO());
        } else {
            throw new TypeError(`new BackgroundImageEntity(): Unsupported runtime type: ${arg}`);
        }
    }

    /**
     * @inheritDoc
     */
    public getCssStyles (): string {
        return `url(${this.getUrl()})`;
    }

}

export function isBackgroundImageEntity (value: unknown): value is BackgroundImageEntity {
    return value instanceof BackgroundImageEntity;
}
