// Copyright (c) 2023. Sendanor <info@sendanor.fi>. All rights reserved.

import {
    BackgroundImageDTO,
    createBackgroundImageDTO,
    isBackgroundImageDTO,
} from "./BackgroundImageDTO";
import { isString } from "../../types/String";
import {
    BackgroundImage,
    isBackgroundImage,
} from "./BackgroundImage";
import { EntityFactoryImpl } from "../types/EntityFactoryImpl";
import { VariableType } from "../types/EntityProperty";
import { EntityPropertyImpl } from "../types/EntityPropertyImpl";

export const BackgroundImageEntityFactory = (
    EntityFactoryImpl.create<BackgroundImageDTO, BackgroundImage>()
                     .add( EntityPropertyImpl.create("url").setTypes(VariableType.STRING) )
);

export const BaseBackgroundImageEntity = BackgroundImageEntityFactory.createEntityType();

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
            super(createBackgroundImageDTO(arg));
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
