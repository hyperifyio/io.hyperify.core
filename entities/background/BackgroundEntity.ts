// Copyright (c) 2023. Sendanor <info@sendanor.fi>. All rights reserved.

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
import { BackgroundPositionOptions, getCssStylesForBackgroundPosition } from "../types/BackgroundPositionOptions";
import { BackgroundSizeOptions, getCssStylesForBackgroundSizeOptions } from "../types/BackgroundSizeOptions";
import { BackgroundImageEntity } from "../backgroundImage/BackgroundImageEntity";
import { BackgroundRepeatEntity } from "../backgroundRepeat/BackgroundRepeatEntity";
import { ColorEntity } from "../color/ColorEntity";
import { SizeBoxEntity } from "../sizeBox/SizeBoxEntity";
import { SizeDimensionsEntity } from "../sizeDimensions/SizeDimensionsEntity";
import { SizeEntity } from "../size/SizeEntity";
import { Background } from "./Background";
import { BackgroundImage } from "../backgroundImage/BackgroundImage";
import { EntityFactoryImpl } from "../types/EntityFactoryImpl";
import { EntityPropertyImpl } from "../types/EntityPropertyImpl";

export const BackgroundEntityFactory = (
    EntityFactoryImpl.create<BackgroundDTO, Background>('BackgroundEntity')
                     .add( EntityPropertyImpl.create("attachment").setTypes(BackgroundAttachment, VariableType.UNDEFINED) )
                     .add( EntityPropertyImpl.create("blendMode").setTypes(BackgroundBlendMode, VariableType.UNDEFINED) )
                     .add( EntityPropertyImpl.create("clip").setTypes(BackgroundClip, VariableType.UNDEFINED) )
                     .add( EntityPropertyImpl.create("color").setTypes(ColorEntity, VariableType.UNDEFINED) )
                     .add( EntityPropertyImpl.create("image").setTypes(BackgroundImageEntity, VariableType.UNDEFINED) )
                     .add( EntityPropertyImpl.create("origin").setTypes(BackgroundOrigin, VariableType.UNDEFINED) )
                     .add( EntityPropertyImpl.create("position").setTypes(SizeBoxEntity, VariableType.UNDEFINED) )
                     .add( EntityPropertyImpl.create("repeat").setTypes(BackgroundRepeatEntity, VariableType.UNDEFINED) )
                     .add( EntityPropertyImpl.create("size").setTypes(BackgroundSize, SizeEntity, SizeDimensionsEntity, VariableType.UNDEFINED) )
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
    public static position (value : BackgroundPositionOptions | undefined) : BackgroundEntity {
        return this.create().position(value);
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
            ...(position ? { backgroundPosition: getCssStylesForBackgroundPosition(position) } : {}),
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

}

export function isBackgroundEntity (value: unknown): value is BackgroundEntity {
    return value instanceof BackgroundEntity;
}
