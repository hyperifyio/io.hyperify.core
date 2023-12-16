// Copyright (c) 2023. Sendanor <info@sendanor.fi>. All rights reserved.

import { BackgroundSize } from "../backgroundSize/BackgroundSize";
import { ReadonlyJsonObject } from "../../Json";
import { isString } from "../../types/String";
import { BackgroundDTO, createBackgroundDTO } from "./BackgroundDTO";
import { BackgroundImageDTO } from "../backgroundImage/BackgroundImageDTO";
import { BackgroundRepeatDTO } from "../backgroundRepeat/BackgroundRepeatDTO";
import { ColorDTO } from "../color/ColorDTO";
import { BackgroundAttachment } from "../types/BackgroundAttachment";
import { BackgroundBlendMode } from "../types/BackgroundBlendMode";
import { BackgroundClip } from "../types/BackgroundClip";
import { BackgroundOrigin } from "../types/BackgroundOrigin";
import { BackgroundPosition, isBackgroundPosition } from "../types/BackgroundPosition";
import { BackgroundPositionOptions, getCssStylesForBackgroundPosition } from "../types/BackgroundPositionOptions";
import { BackgroundRepeatType, isBackgroundRepeatType } from "../types/BackgroundRepeatType";
import { BackgroundSizeOptions, getCssStylesForBackgroundSizeOptions } from "../types/BackgroundSizeOptions";
import { BackgroundImageEntity, isBackgroundImageEntity } from "../backgroundImage/BackgroundImageEntity";
import { BackgroundRepeatEntity, isBackgroundRepeatEntity } from "../backgroundRepeat/BackgroundRepeatEntity";
import { ColorEntity, isColorEntity } from "../color/ColorEntity";
import { SizeBoxEntity } from "../sizeBox/SizeBoxEntity";
import { SizeDimensionsEntity } from "../sizeDimensions/SizeDimensionsEntity";
import { SizeEntity } from "../size/SizeEntity";
import { Background } from "./Background";
import { BackgroundImage, isBackgroundImage } from "../backgroundImage/BackgroundImage";
import { BackgroundRepeat, isBackgroundRepeat } from "../backgroundRepeat/BackgroundRepeat";
import { Color, isColor } from "../color/Color";
import { EntityFactoryImpl } from "../types/EntityFactoryImpl";
import { VariableType } from "../types/EntityProperty";
import { EntityPropertyImpl } from "../types/EntityPropertyImpl";

export const BackgroundEntityFactory = (
    EntityFactoryImpl.create<BackgroundDTO, Background>()
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
    implements Background
{

    /**
     * Creates a background entity.
     *
     */
    public static create () : BackgroundEntity {
        return new BackgroundEntity(
            undefined,
            undefined,
            undefined,
            undefined,
            undefined,
            undefined,
            undefined,
            undefined,
            undefined,
        );
    }

    /**
     * Creates a background entity from DTO.
     *
     * @param value
     */
    public static createFromDTO (
        value : BackgroundDTO,
    ) : BackgroundEntity {
        return (
            BackgroundEntity.create()
                .attachment(value?.attachment)
                .blendMode(value?.blendMode)
                .clip(value?.clip)
                .color(value?.color)
                .image(value?.image)
                .origin(value?.origin)
                .position(value?.position)
                .repeat(value?.repeat)
                .size(value?.size)
        );
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
    public static color (value : ColorEntity | ColorDTO | string | undefined) : BackgroundEntity {
        return this.create().color(value);
    }

    /**
     */
    public static image (value : BackgroundImageEntity | BackgroundImage | BackgroundImageDTO | string | undefined) : BackgroundEntity {
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


    private _attachment : BackgroundAttachment | undefined;
    private _blendMode : BackgroundBlendMode | undefined;
    private _clip : BackgroundClip | undefined;
    private _color : ColorDTO | undefined;
    private _image : BackgroundImageDTO | undefined;
    private _origin : BackgroundOrigin | undefined;
    private _position : BackgroundPositionOptions | undefined;
    private _repeat : BackgroundRepeatDTO | undefined;
    private _size : BackgroundSizeOptions | undefined;

    protected constructor (
        attachment : BackgroundAttachment | undefined,
        blendMode : BackgroundBlendMode | undefined,
        clip : BackgroundClip | undefined,
        color : ColorDTO | undefined,
        image : BackgroundImageDTO | undefined,
        origin : BackgroundOrigin | undefined,
        position : BackgroundPositionOptions | undefined,
        repeat : BackgroundRepeatDTO | undefined,
        size : BackgroundSizeOptions | undefined,
    ) {
        this._attachment = attachment;
        this._blendMode = blendMode;
        this._clip = clip;
        this._color = color;
        this._image = image;
        this._origin = origin;
        this._position = position;
        this._repeat = repeat;
        this._size = size;
    }

    /**
     * Returns the DTO object.
     */
    public getDTO () : BackgroundDTO {
        return createBackgroundDTO(
            this._attachment,
            this._blendMode,
            this._clip,
            this._color,
            this._image,
            this._origin,
            this._position,
            this._repeat,
            this._size,
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
    public getCssStyles (): ReadonlyJsonObject {
        return {
            ...(this._attachment ? { backgroundAttachment: this._attachment } : {}),
            ...(this._blendMode ? { backgroundBlendMode: this._blendMode } : {}),
            ...(this._clip ? { backgroundClip: this._clip } : {}),
            ...(this._color ? { backgroundColor: ColorEntity.createFromDTO(this._color).getCssStyles() } : {}),
            ...(this._image ? { backgroundImage: BackgroundImageEntity.createFromDTO(this._image).getCssStyles() } : {}),
            ...(this._origin ? { backgroundOrigin: this._origin } : {}),
            ...(this._position ? { backgroundPosition: getCssStylesForBackgroundPosition(this._position) } : {}),
            ...(this._repeat ? { backgroundRepeat: BackgroundRepeatEntity.createFromDTO(this._repeat).getCssStyles() } : {}),
            ...(this._size ? { backgroundSize: getCssStylesForBackgroundSizeOptions(this._size) } : {}),
        };
    }

    /**
     * @inheritDoc
     */
    public getAttachment () : BackgroundAttachment | undefined {
        return this._attachment;
    }

    /**
     * @inheritDoc
     */
    public getBlendMode () : BackgroundBlendMode | undefined {
        return this._blendMode;
    }

    /**
     * @inheritDoc
     */
    public getClip () : BackgroundClip | undefined {
        return this._clip;
    }

    /**
     * @inheritDoc
     */
    public getColor () : Color | undefined {
        return this._color ? ColorEntity.createFromDTO(this._color) : undefined;
    }

    /**
     * @inheritDoc
     */
    public getColorDTO () : ColorDTO | undefined {
        return this._color;
    }

    /**
     * @inheritDoc
     */
    public getImage () : BackgroundImage | undefined {
        return this._image ? BackgroundImageEntity.createFromDTO(this._image) : undefined;
    }

    /**
     * @inheritDoc
     */
    public getImageDTO () : BackgroundImageDTO | undefined {
        return this._image;
    }

    /**
     * @inheritDoc
     */
    public getOrigin () : BackgroundOrigin | undefined {
        return this._origin;
    }

    /**
     * @inheritDoc
     */
    public getPosition () : BackgroundPositionOptions | undefined {
        return this._position;
    }

    /**
     * @inheritDoc
     */
    public getRepeat () : BackgroundRepeat | undefined {
        return this._repeat ? BackgroundRepeatEntity.createFromDTO(this._repeat) : undefined;
    }

    /**
     * @inheritDoc
     */
    public getRepeatDTO () : BackgroundRepeatDTO | undefined {
        return this._repeat;
    }

    /**
     * @inheritDoc
     */
    public getSize () : BackgroundSizeOptions | undefined {
        return this._size;
    }

    /**
     * @inheritDoc
     */
    public attachment (value : BackgroundAttachment | undefined) : this {
        this._attachment = value;
        return this;
    }

    /**
     * @inheritDoc
     */
    public blendMode (value : BackgroundBlendMode | undefined) : this {
        this._blendMode = value;
        return this;
    }

    /**
     * @inheritDoc
     */
    public clip (value : BackgroundClip | undefined) : this {
        this._clip = value;
        return this;
    }

    /**
     * @inheritDoc
     */
    public color (value : ColorEntity | Color | ColorDTO | string | undefined) : this {
        if (isString(value)) {
            this._color = ColorEntity.create(value).getDTO();
        } else if (isColorEntity(value)) {
            this._color = value.getDTO();
        } else if (isColor(value)) {
            this._color = value.getDTO();
        } else {
            this._color = value;
        }
        return this;
    }

    public transparentColor () : this {
        return this.setTransparentColor();
    }

    public setTransparentColor () : this {
        this._color = ColorEntity.create("transparent").getDTO();
        return this;
    }

    /**
     * @inheritDoc
     */
    public image (
        value : BackgroundImageEntity | BackgroundImage | BackgroundImageDTO | string | undefined
    ) : this {
        if (isString(value)) {
            return this.imageUrl(value);
        } else if (isBackgroundImageEntity(value)) {
            this._image = value.getDTO();
        } else if (isBackgroundImage(value)) {
            this._image = value.getDTO();
        } else {
            this._image = value;
        }
        return this;
    }

    /**
     * @inheritDoc
     */
    public imageUrl (
        value : string,
    ) : this {
        this._image = BackgroundImageEntity.url(value).getDTO();
        return this;
    }

    /**
     * @inheritDoc
     */
    public origin (value : BackgroundOrigin | undefined) : this {
        this._origin = value;
        return this;
    }

    /**
     * @inheritDoc
     */
    public position (
        a : BackgroundPositionOptions | undefined,
        b : BackgroundPosition | undefined = undefined,
    ) : this {
        if ( isBackgroundPosition(a) && isBackgroundPosition(b) ) {
            this._position = [a, b];
        } else {
            this._position = a;
        }
        return this;
    }

    /**
     * @inheritDoc
     */
    public repeat (
        value : BackgroundRepeatEntity | BackgroundRepeat | BackgroundRepeatDTO | BackgroundRepeatType | undefined,
    ) : this {
        if (isBackgroundRepeatType(value)) {
            this._repeat = BackgroundRepeatEntity.create(value, value).getDTO();
        } else if (isBackgroundRepeatEntity(value)) {
            this._repeat = value.getDTO();
        } else if (isBackgroundRepeat(value)) {
            this._repeat = value.getDTO();
        } else {
            this._repeat = value;
        }
        return this;
    }

    /**
     * @inheritDoc
     */
    public size (value : BackgroundSizeOptions | undefined) : this {
        this._size = value;
        return this;
    }

}

export function isBackgroundEntity (value: unknown): value is BackgroundEntity {
    return value instanceof BackgroundEntity;
}
