// Copyright (c) 2023. Sendanor <info@sendanor.fi>. All rights reserved.

import { ReadonlyJsonObject } from "../Json";
import { BackgroundImageDTO, createBackgroundImageDTO } from "../dto/BackgroundImageDTO";
import { BackgroundImage } from "./types/BackgroundImage";

/**
 * Background image entity.
 */
export class BackgroundImageEntity
    implements BackgroundImage
{

    /**
     * Creates a background image entity.
     *
     * @param url
     */
    public static create (
        url : string,
    ) : BackgroundImageEntity {
        return new BackgroundImageEntity(
            url,
        );
    }

    /**
     * Creates a background image entity from DTO.
     *
     * @param value
     */
    public static createFromDTO (
        value : BackgroundImageDTO,
    ) : BackgroundImageEntity {
        return BackgroundImageEntity.create(
            value?.url,
        );
    }

    public static url (
        url : string,
    ) : BackgroundImageEntity {
        return BackgroundImageEntity.create(url);
    }

    private _url : string;

    protected constructor (
        url : string,
    ) {
        this._url = url;
    }

    /**
     * Returns the DTO object.
     */
    public getDTO () : BackgroundImageDTO {
        return createBackgroundImageDTO(
            this._url,
        );
    }

    /**
     * @inheritDoc
     */
    public valueOf() : ReadonlyJsonObject {
        return this.toJSON();
    }

    /**
     * @inheritDoc
     */
    public toJSON () : ReadonlyJsonObject {
        return this.getDTO() as unknown as ReadonlyJsonObject;
    }

    /**
     * @inheritDoc
     */
    public getCssStyles (): string {
        return `url(${this._url})`;
    }

    /**
     * @inheritDoc
     */
    public getUrl () : string {
        return this._url;
    }

    /**
     * @inheritDoc
     */
    public url (value: string) : this {
        this._url = value;
        return this;
    }

}

export function isBackgroundImageEntity (value: unknown): value is BackgroundImageEntity {
    return value instanceof BackgroundImageEntity;
}
