// Copyright (c) 2023-2024. Sendanor <info@sendanor.fi>. All rights reserved.

import { BackgroundPositionDTO } from "../backgroundPosition/BackgroundPositionDTO";
import { BackgroundPositionEntity } from "../backgroundPosition/BackgroundPositionEntity";
import { BackgroundPositionValue } from "../types/BackgroundPositionValue";
import { BackgroundSize } from "../types/BackgroundSize";
import { ReadonlyJsonObject } from "../../Json";
import { VariableType } from "../types/VariableType";
import { BackgroundDTO } from "./BackgroundDTO";
import { BackgroundImageDTO } from "../backgroundImage/BackgroundImageDTO";
import { BackgroundRepeatDTO } from "../backgroundRepeat/BackgroundRepeatDTO";
import { ColorDTO } from "../color/ColorDTO";
import { BackgroundAttachment } from "../types/BackgroundAttachment";
import { BackgroundBlendMode } from "../types/BackgroundBlendMode";
import { BackgroundClip } from "../types/BackgroundClip";
import { BackgroundOrigin } from "../types/BackgroundOrigin";
import { BackgroundSizeOptions, getCssStylesForBackgroundSizeOptions } from "../types/BackgroundSizeOptions";
import { BackgroundImageEntity } from "../backgroundImage/BackgroundImageEntity";
import { BackgroundRepeatEntity } from "../backgroundRepeat/BackgroundRepeatEntity";
import { ColorEntity } from "../color/ColorEntity";
import { SizeDimensionsEntity } from "../sizeDimensions/SizeDimensionsEntity";
import { SizeEntity } from "../size/SizeEntity";
import { Background } from "./Background";
import { BackgroundImage } from "../backgroundImage/BackgroundImage";
import { EntityFactoryImpl } from "../types/EntityFactoryImpl";

export const BackgroundEntityFactory = (
    EntityFactoryImpl.create<BackgroundDTO, Background>('Background')
                     .add( EntityFactoryImpl.createProperty("attachment").setTypes(BackgroundAttachment, VariableType.UNDEFINED) )
                     .add( EntityFactoryImpl.createProperty("blendMode").setTypes(BackgroundBlendMode, VariableType.UNDEFINED) )
                     .add( EntityFactoryImpl.createProperty("clip").setTypes(BackgroundClip, VariableType.UNDEFINED) )
                     .add( EntityFactoryImpl.createProperty("color").setTypes(ColorEntity, VariableType.UNDEFINED) )
                     .add( EntityFactoryImpl.createProperty("image").setTypes(BackgroundImageEntity, VariableType.UNDEFINED) )
                     .add( EntityFactoryImpl.createProperty("origin").setTypes(BackgroundOrigin, VariableType.UNDEFINED) )
                     .add( EntityFactoryImpl.createProperty("position").setTypes(BackgroundPositionEntity, VariableType.UNDEFINED) )
                     .add( EntityFactoryImpl.createProperty("repeat").setTypes(BackgroundRepeatEntity, VariableType.UNDEFINED) )
                     .add( EntityFactoryImpl.createProperty("size").setTypes(BackgroundSize, SizeEntity, SizeDimensionsEntity, VariableType.UNDEFINED) )
);

export const BaseBackgroundEntity = BackgroundEntityFactory.createEntityType();

/**
 * Background entity.
 */
export class BackgroundEntity
    extends BaseBackgroundEntity
    implements Background
{

    /**
     * Creates a background entity.
     *
     */
    public static create () : BackgroundEntity {
        return new BackgroundEntity();
    }

    /**
     * Creates a background entity from DTO.
     *
     * @param value
     */
    public static createFromDTO (
        value : BackgroundDTO,
    ) : BackgroundEntity {
        return new BackgroundEntity(value);
    }

    /**
     */
    public static attachment (value : BackgroundAttachment | undefined) : BackgroundEntity {
        return this.create().attachment(value);
    }

    /**
     */
    public static blendMode (value : BackgroundBlendMode | undefined) : BackgroundEntity {
        return this.create().blendMode(value);
    }

    /**
     */
    public static clip (value : BackgroundClip | undefined) : BackgroundEntity {
        return this.create().clip(value);
    }

    /**
     */
    public static color (value : ColorEntity | ColorDTO | undefined) : BackgroundEntity {
        return this.create().setColor(value);
    }

    /**
     */
    public static image (value : BackgroundImageEntity | BackgroundImage | BackgroundImageDTO | undefined) : BackgroundEntity {
        return this.create().image(value);
    }

    /**
     */
    public static imageUrl (value : string) : BackgroundEntity {
        return this.create().imageUrl(value);
    }

    /**
     */
    public static origin (value : BackgroundOrigin | undefined) : BackgroundEntity {
        return this.create().origin(value);
    }

    /**
     */
    public static position (value : BackgroundPositionValue | BackgroundPositionDTO | BackgroundPositionEntity | undefined) : BackgroundEntity {
        return this.create().setPosition(value);
    }

    /**
     */
    public static repeat (value : BackgroundRepeatDTO | undefined) : BackgroundEntity {
        return this.create().repeat(value);
    }

    /**
     */
    public static size (value : BackgroundSizeOptions | undefined) : BackgroundEntity {
        return this.create().size(value);
    }


    public constructor (
        dto ?: BackgroundDTO
    ) {
        super(dto);
    }

    /**
     * @inheritDoc
     */
    public getCssStyles (): ReadonlyJsonObject {
        const attachment = this.getAttachment();
        const blendMode = this.getBlendMode();
        const clip = this.getClip();
        const color = this.getColor();
        const image = this.getImage();
        const origin = this.getOrigin();
        const position = this.getPosition();
        const repeat = this.getRepeat();
        const size = this.getSize();
        return {
            ...(attachment ? { backgroundAttachment: attachment } : {}),
            ...(blendMode ? { backgroundBlendMode: blendMode } : {}),
            ...(clip ? { backgroundClip: clip } : {}),
            ...(color ? { backgroundColor: color.getCssStyles() } : {}),
            ...(image ? { backgroundImage: image.getCssStyles() } : {}),
            ...(origin ? { backgroundOrigin: origin } : {}),
            ...(position ? position.getCssStyles() : {}),
            ...(repeat ? { backgroundRepeat: repeat.getCssStyles() } : {}),
            ...(size ? { backgroundSize: getCssStylesForBackgroundSizeOptions(size) } : {}),
        };
    }

    /**
     * @inheritDoc
     */
    public imageUrl (
        value : string,
    ) : this {
        return this.setImage( BackgroundImageEntity.url(value) );
    }

    /**
     * @inheritDoc
     */
    public setTransparentColor () : this {
        return this.setColor('transparent');
    }

    /**
     * @inheritDoc
     */
    public transparentColor () : this {
        return this.setTransparentColor();
    }

}

export function isBackgroundEntity (value: unknown): value is BackgroundEntity {
    return value instanceof BackgroundEntity;
}
