// Copyright (c) 2023. Heusala Group Oy <info@heusalagroup.fi>. All rights reserved.

import { map } from "../functions/map";
import { reduce } from "../functions/reduce";
import { ReadonlyJsonObject } from "../Json";
import { isArray } from "../types/Array";
import { isNumber } from "../types/Number";
import { isString } from "../types/String";
import { BackgroundDTO } from "../dto/BackgroundDTO";
import {
    BorderDTO,
    createBorderDTO,
    isBorderDTO,
} from "../dto/BorderDTO";
import {
    ColorDTO,
    createColorDTO,
} from "../dto/ColorDTO";
import {
    createFontDTO,
    FontDTO,
} from "../dto/FontDTO";
import {
    createSizeDTO,
    isSizeDTO,
    SizeDTO,
} from "../dto/SizeDTO";
import {
    createStyleDTO,
    StyleDTO,
} from "../dto/StyleDTO";
import {
    TextDecorationDTO,
} from "../dto/TextDecorationDTO";
import { BorderStyle } from "../dto/types/BorderStyle";
import { BoxSizing } from "../dto/types/BoxSizing";
import { TextAlign } from "../dto/types/TextAlign";
import { BackgroundEntity, isBackgroundEntity } from "./BackgroundEntity";
import {
    BorderEntity,
    isBorderEntity,
} from "./BorderEntity";
import {
    ColorEntity,
    isColorEntity,
} from "./ColorEntity";
import {
    FontEntity,
    isFontEntity,
} from "./FontEntity";
import {
    isSizeEntity,
    SizeEntity,
} from "./SizeEntity";
import {
    isTextDecorationEntity,
    TextDecorationEntity,
} from "./TextDecorationEntity";
import { Background, isBackground } from "./types/Background";
import {
    Border,
    isBorder,
} from "./types/Border";
import {
    Font,
    isFont,
} from "./types/Font";
import { isSize, Size } from "./types/Size";
import { isStyle, Style } from "./types/Style";
import {
    isTextDecoration,
    TextDecoration,
} from "./types/TextDecoration";
import { UnitType } from "./types/UnitType";

const TOP_AND_BOTTOM_MARGIN_INDEX = 0;
const LEFT_AND_RIGHT_MARGIN_INDEX = 1;
const TOP_MARGIN_INDEX = 0;
const RIGHT_MARGIN_INDEX = 1;
const BOTTOM_MARGIN_INDEX = 2;
const LEFT_MARGIN_INDEX = 3;

/**
 * Style entity.
 */
export class StyleEntity
    implements Style
{

    /**
     * Width of the element.
     *
     * @protected
     */
    protected _width : SizeDTO | undefined;

    /**
     * Height of the element.
     *
     * @protected
     */
    protected _height : SizeDTO | undefined;

    /**
     * Minimum width of the element.
     *
     * @protected
     */
    protected _minWidth : SizeDTO | undefined;

    /**
     * Maximum height of the element.
     *
     * @protected
     */
    protected _maxHeight : SizeDTO | undefined;

    /**
     * Maximum width of the element.
     *
     * @protected
     */
    protected _maxWidth : SizeDTO | undefined;

    /**
     * Minimum height of the element.
     *
     * @protected
     */
    protected _minHeight : SizeDTO | undefined;

    /**
     * Padding of the element.
     *
     * @protected
     */
    protected _padding : SizeDTO | [SizeDTO, SizeDTO, SizeDTO, SizeDTO] | undefined;

    /**
     * Margin of the element.
     *
     * @protected
     */
    protected _margin : SizeDTO | [SizeDTO, SizeDTO, SizeDTO, SizeDTO] | undefined;

    /**
     * Border element(s).
     *
     * @protected
     */
    protected _border : BorderDTO | [BorderDTO, BorderDTO, BorderDTO, BorderDTO] | undefined;

    /**
     * Text color.
     *
     * @protected
     */
    protected _textColor : ColorDTO | undefined;

    /**
     * Text alignment.
     *
     * @protected
     */
    protected _textAlign : TextAlign | undefined;

    /**
     * Box sizing.
     *
     * @protected
     */
    protected _boxSizing : BoxSizing | undefined;

    /**
     * Background options.
     *
     * @protected
     */
    protected _background : BackgroundDTO | undefined;

    /**
     * Font settings.
     *
     * @protected
     */
    protected _font : FontDTO | undefined;

    /**
     * Text decorations.
     *
     * @protected
     */
    protected _textDecoration : TextDecorationDTO | undefined;

    public static create (
    ) : StyleEntity {
        return new this(
            undefined,
            undefined,
            undefined,
            undefined,
            undefined,
            undefined,
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
     * Construct a style entity.
     *
     * @param style
     */
    public static createFromDTO (
        style ?: StyleDTO | undefined,
    ) : StyleEntity {
        return new this(
            StyleEntity.prepareColorDTO(style?.textColor),
            StyleEntity.prepareBackgroundDTO(style?.background),
            StyleEntity.prepareSizeDTO(style?.width),
            StyleEntity.prepareSizeDTO(style?.height),
            StyleEntity.prepareSizeListDTO(style?.margin),
            StyleEntity.prepareSizeListDTO(style?.padding),
            StyleEntity.prepareBorderListDTO(style?.border),
            StyleEntity.prepareFontDTO(style?.font),
            style?.textDecoration,
            StyleEntity.prepareSizeDTO(style?.minWidth),
            StyleEntity.prepareSizeDTO(style?.minHeight),
            StyleEntity.prepareSizeDTO(style?.maxWidth),
            StyleEntity.prepareSizeDTO(style?.maxHeight),
            style?.textAlign,
            style?.boxSizing,
        );
    }

    /**
     * Construct a style entity.
     *
     * @param textColor
     * @param background
     * @param width
     * @param height
     * @param margin
     * @param padding
     * @param border
     * @param font
     * @param textDecoration
     * @param minWidth
     * @param minHeight
     * @param maxWidth
     * @param maxHeight
     * @param textAlign
     * @param boxSizing
     * @protected
     */
    protected constructor (
        textColor : ColorDTO | undefined,
        background : BackgroundDTO | undefined,
        width : SizeDTO | undefined,
        height : SizeDTO | undefined,
        margin : SizeDTO | [SizeDTO, SizeDTO, SizeDTO, SizeDTO] | undefined,
        padding : SizeDTO | [SizeDTO, SizeDTO, SizeDTO, SizeDTO] | undefined,
        border : BorderDTO | [BorderDTO, BorderDTO, BorderDTO, BorderDTO] | undefined,
        font : FontDTO | undefined,
        textDecoration : TextDecorationDTO | undefined,
        minWidth : SizeDTO | undefined,
        minHeight : SizeDTO | undefined,
        maxWidth : SizeDTO | undefined,
        maxHeight : SizeDTO | undefined,
        textAlign : TextAlign | undefined,
        boxSizing : BoxSizing | undefined,
    ) {
        this._textColor = textColor;
        this._background = background;
        this._width = width;
        this._height = height;
        this._margin = margin;
        this._padding = padding;
        this._border = border;
        this._font = font;
        this._textDecoration = textDecoration;
        this._minWidth = minWidth;
        this._minHeight = minHeight;
        this._maxWidth = maxWidth;
        this._maxHeight = maxHeight;
        this._textAlign = textAlign;
        this._boxSizing = boxSizing;
    }

    public static prepareBackgroundDTO (
        value : BackgroundEntity | BackgroundDTO | undefined
    ) : BackgroundDTO | undefined {
        if (value === undefined) return undefined;
        if (isBackgroundEntity(value)) return value.getDTO();
        if (isBackground(value)) return value.getDTO();
        return value;
    }

    public static prepareColorDTO (
        value : ColorEntity | ColorDTO | string | undefined
    ) : ColorDTO | undefined {
        if (value === undefined) return undefined;
        if (isString(value)) return createColorDTO(value);
        if (isColorEntity(value)) return value.getDTO();
        return value;
    }

    public static prepareSizeDTO (
        value : SizeEntity | Size | SizeDTO | number | undefined
    ) : SizeDTO | undefined {
        if (value === undefined) return undefined;
        if (isNumber(value)) return createSizeDTO(value, UnitType.PX);
        if (isSizeEntity(value)) return value.getDTO();
        if (isSize(value)) return value.getDTO();
        return value;
    }

    public static prepareFontDTO (
        value : Font | FontEntity | FontDTO | number | string | undefined
    ) : FontDTO | undefined {
        if (value === undefined) return undefined;
        if (isNumber(value)) {
            return createFontDTO(
                undefined,
                undefined,
                undefined,
                SizeEntity.create(value).getDTO(),
                undefined,
                undefined,
            );
        }
        if (isString(value)) {
            return createFontDTO(
                undefined,
                undefined,
                undefined,
                undefined,
                undefined,
                value,
            );
        }
        if (isFontEntity(value)) return value.getDTO();
        if (isFont(value)) return value.getDTO();
        return value;
    }

    public static prepareBorderDTO (
        value : Border | BorderDTO | number | undefined
    ) : BorderDTO | undefined {
        if (value === undefined) return undefined;
        if (isNumber(value)) {
            return createBorderDTO(
                createSizeDTO(value),
                undefined,
                undefined,
                undefined,
            );
        }
        if (isBorderEntity(value)) return value.getDTO();
        if (isBorder(value)) return value.getDTO();
        return value;
    }

    public static prepareSizeListDTO (
        value : (
            SizeEntity
            | [
                SizeEntity | SizeDTO | number | undefined,
                SizeEntity | SizeDTO | number | undefined,
            ]
            | [
                SizeEntity | SizeDTO | number | undefined,
                SizeEntity | SizeDTO | number | undefined,
                SizeEntity | SizeDTO | number | undefined,
                SizeEntity | SizeDTO | number | undefined,
            ]
            | SizeDTO
            | number
            | undefined
            )
    ) : SizeDTO | [SizeDTO, SizeDTO, SizeDTO, SizeDTO] | undefined {
        if (value === undefined) return undefined;
        if (isNumber(value)) return createSizeDTO(value, UnitType.PX);
        if (isSizeEntity(value)) return value.getDTO();
        if (isArray(value)) {

            if (value.length === 2) {
                const top_and_bottom : SizeDTO | undefined = StyleEntity.prepareSizeDTO(value[TOP_AND_BOTTOM_MARGIN_INDEX]);
                if (!top_and_bottom) throw new TypeError(`prepareSizeListDTO: Invalid [undefined, *] array provided`);
                const right_and_left: SizeDTO | undefined = StyleEntity.prepareSizeDTO(value[LEFT_AND_RIGHT_MARGIN_INDEX]);
                if (!right_and_left) throw new TypeError(`prepareSizeListDTO: Invalid [SizeDTO, undefined] array provided`);
                return [
                    top_and_bottom, // top
                    right_and_left, // right
                    top_and_bottom, // bottom
                    right_and_left, // left
                ];
            }

            if (value.length === 4) {
                const top : SizeDTO | undefined = StyleEntity.prepareSizeDTO( value[TOP_MARGIN_INDEX] );
                if (!top) throw new TypeError(`prepareSizeListDTO: Invalid [undefined, *, *, *] array provided`);
                const right : SizeDTO | undefined = StyleEntity.prepareSizeDTO( value[RIGHT_MARGIN_INDEX] );
                if (!right) throw new TypeError(`prepareSizeListDTO: Invalid [SizeDTO, undefined, *, *] array provided`);
                const bottom : SizeDTO | undefined = StyleEntity.prepareSizeDTO( value[BOTTOM_MARGIN_INDEX] );
                if (!bottom) throw new TypeError(`prepareSizeListDTO: Invalid [SizeDTO, SizeDTO, undefined, *] array provided`);
                const left : SizeDTO | undefined = StyleEntity.prepareSizeDTO( value[LEFT_MARGIN_INDEX] );
                if (!left) throw new TypeError(`prepareSizeListDTO: Invalid [SizeDTO, SizeDTO, SizeDTO, undefined] array provided`);
                return [
                    top,
                    right,
                    bottom,
                    left,
                ];
            }

            // Runtime assert, should not happen.
            // @ts-ignore
            throw new TypeError(`prepareSizeListDTO: Incorrect array length: ${value.length}`);

        }
        return value;
    }

    public static prepareBorderListDTO (
        value : (
            Border
            | [
                Border | BorderDTO | number | undefined,
                Border | BorderDTO | number | undefined,
            ]
            | [
                Border | BorderDTO | number | undefined,
                Border | BorderDTO | number | undefined,
                Border | BorderDTO | number | undefined,
                Border | BorderDTO | number | undefined,
            ]
            | BorderDTO
            | number
            | undefined
            )
    ) : BorderDTO | [BorderDTO, BorderDTO, BorderDTO, BorderDTO] | undefined {
        if (value === undefined) return undefined;
        if (isNumber(value)) {
            return createBorderDTO(
                createSizeDTO( value ),
                undefined,
                undefined,
                undefined,
            );
        }
        if (isBorderEntity(value)) return value.getDTO();
        if (isBorder(value)) return value.getDTO();
        if (isArray(value)) {

            if (value.length === 2) {
                const top_and_bottom : BorderDTO | undefined = StyleEntity.prepareBorderDTO(value[TOP_AND_BOTTOM_MARGIN_INDEX]);
                if (!top_and_bottom) throw new TypeError(`prepareBorderListDTO: Invalid [undefined, *] array provided`);
                const right_and_left: BorderDTO | undefined = StyleEntity.prepareBorderDTO(value[LEFT_AND_RIGHT_MARGIN_INDEX]);
                if (!right_and_left) throw new TypeError(`prepareBorderListDTO: Invalid [BorderDTO, undefined] array provided`);
                return [
                    top_and_bottom, // top
                    right_and_left, // right
                    top_and_bottom, // bottom
                    right_and_left, // left
                ];
            }

            if (value.length === 4) {
                const top : BorderDTO | undefined = StyleEntity.prepareBorderDTO( value[0] );
                if (!top) throw new TypeError(`prepareBorderListDTO: Invalid [undefined, *, *, *] array provided`);
                const right : BorderDTO | undefined = StyleEntity.prepareBorderDTO( value[1] );
                if (!right) throw new TypeError(`prepareBorderListDTO: Invalid [BorderDTO, undefined, *, *] array provided`);
                const bottom : BorderDTO | undefined = StyleEntity.prepareBorderDTO( value[2] );
                if (!bottom) throw new TypeError(`prepareBorderListDTO: Invalid [BorderDTO, BorderDTO, undefined, *] array provided`);
                const left : BorderDTO | undefined = StyleEntity.prepareBorderDTO( value[3] );
                if (!left) throw new TypeError(`prepareBorderListDTO: Invalid [BorderDTO, BorderDTO, BorderDTO, undefined] array provided`);
                return [
                    top,
                    right,
                    bottom,
                    left,
                ];
            }

            // Runtime assert, should not happen.
            // @ts-ignore
            throw new TypeError(`prepareBorderListDTO: Incorrect array length: ${value.length}`);

        }
        return value;
    }

    public static prepareSizeListCssStyles (
        key : string,
        value : SizeDTO | [SizeDTO, SizeDTO, SizeDTO, SizeDTO] | undefined
    ) : ReadonlyJsonObject {

        if (isSizeDTO(value)) {
            return {
                [key]: SizeEntity.createFromDTO(value).getCssStyles()
            };
        }

        if (isArray(value)) {
            return {
                [key]: map(
                    value,
                    (item: SizeDTO) : string => SizeEntity.createFromDTO(item).getCssStyles()
                ).join(' ')
            };
        }

        return {};

    }

    public static prepareBorderListCssStyles (
        value : BorderDTO | [BorderDTO, BorderDTO, BorderDTO, BorderDTO] | undefined
    ) : ReadonlyJsonObject {

        if (isBorderDTO(value)) {
            return {
                border: BorderEntity.createFromDTO(value).getCssStyles()
            };
        }

        if (isArray(value)) {
            return {
                borderStyle: map(
                    value,
                    (item: BorderDTO) : string => (BorderEntity.createFromDTO(item).getStyle() ?? BorderStyle.NONE),
                ).join(' '),
                borderWidth: map(
                    value,
                    (item: BorderDTO) : string => (BorderEntity.createFromDTO(item).getWidth() ?? SizeEntity.createZero()).getCssStyles(),
                ).join(' '),
                borderColor: map(
                    value,
                    (item: BorderDTO) : string => (BorderEntity.createFromDTO(item).getColor() ?? ColorEntity.createTransparent()).getCssStyles(),
                ).join(' '),
            };
        }

        return {};

    }

    /**
     *
     * @param style
     */
    public static getCssStyles (
        style: Style,
    ) : ReadonlyJsonObject {
        return style.getCssStyles();
    }

    public static merge (
        ...values: readonly (StyleDTO | Style | StyleEntity)[]
    ) : StyleEntity {
        return StyleEntity.createFromDTO(
            reduce(
                values,
                (
                    prev: StyleDTO,
                    item: StyleDTO | Style | StyleEntity,
                ) : StyleDTO => {
                    const dto : StyleDTO = this.toDTO(item);
                    return {
                        ...prev,
                        ...dto,
                    };
                },
                createStyleDTO(
                    undefined,
                    undefined,
                    undefined,
                    undefined,
                    undefined,
                    undefined,
                    undefined,
                    undefined,
                    undefined,
                    undefined,
                    undefined,
                    undefined,
                    undefined,
                    undefined,
                    undefined,
                ),
            )
        );
    }

    public static toDTO (
        value: StyleDTO | Style | StyleEntity,
    ) : StyleDTO {
        if (isStyleEntity(value)) {
            return value.getDTO();
        } else if (isStyle(value)) {
            return value.getDTO();
        } else {
            return value;
        }
    }



    /**
     * @inheritDoc
     */
    public getDTO () : StyleDTO {
        return createStyleDTO(
            this._textColor,
            this._background,
            this._width,
            this._height,
            this._margin,
            this._padding,
            this._border,
            this._font,
            this._textDecoration,
            this._minWidth,
            this._minHeight,
            this._maxWidth,
            this._maxHeight,
            this._textAlign,
            this._boxSizing,
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
    public getWidth () : SizeEntity | undefined {
        return this._width ? SizeEntity.createFromDTO(this._width) : undefined;
    }

    /**
     * @inheritDoc
     */
    public getWidthDTO () : SizeDTO | undefined {
        return this._width;
    }

    /**
     * @inheritDoc
     */
    public setWidth (value: Size | SizeEntity | number | undefined) : this {
        this._width = StyleEntity.prepareSizeDTO(value);
        return this;
    }


    /**
     * @inheritDoc
     */
    public getHeight () : SizeEntity | undefined {
        return this._height ? SizeEntity.createFromDTO(this._height) : undefined;
    }

    /**
     * @inheritDoc
     */
    public getHeightDTO () : SizeDTO | undefined {
        return this._height;
    }

    /**
     * @inheritDoc
     */
    public setHeight (value: Size | SizeEntity | number | undefined) : this {
        this._height = StyleEntity.prepareSizeDTO(value);
        return this;
    }


    /**
     * @inheritDoc
     */
    public getMinWidth () : SizeEntity | undefined {
        return this._minWidth ? SizeEntity.createFromDTO(this._minWidth) : undefined;
    }

    /**
     * @inheritDoc
     */
    public getMinWidthDTO () : SizeDTO | undefined {
        return this._minWidth;
    }

    /**
     * @inheritDoc
     */
    public setMinWidth (value: Size | SizeEntity | number | undefined) : this {
        this._minWidth = StyleEntity.prepareSizeDTO(value);
        return this;
    }


    /**
     * @inheritDoc
     */
    public getMinHeight () : SizeEntity | undefined {
        return this._minHeight ? SizeEntity.createFromDTO(this._minHeight) : undefined;
    }

    /**
     * @inheritDoc
     */
    public getMinHeightDTO () : SizeDTO | undefined {
        return this._minHeight;
    }

    /**
     * @inheritDoc
     */
    public setMinHeight (value: Size | SizeEntity | number | undefined) : this {
        this._minHeight = StyleEntity.prepareSizeDTO(value);
        return this;
    }


    /**
     * @inheritDoc
     */
    public getMaxWidth () : SizeEntity | undefined {
        return this._maxWidth ? SizeEntity.createFromDTO(this._maxWidth) : undefined;
    }

    /**
     * @inheritDoc
     */
    public getMaxWidthDTO () : SizeDTO | undefined {
        return this._maxWidth;
    }

    /**
     * @inheritDoc
     */
    public setMaxWidth (value: Size | SizeEntity | number | undefined) : this {
        this._maxWidth = StyleEntity.prepareSizeDTO(value);
        return this;
    }


    /**
     * @inheritDoc
     */
    public getMaxHeight () : SizeEntity | undefined {
        return this._maxHeight ? SizeEntity.createFromDTO(this._maxHeight) : undefined;
    }

    /**
     * @inheritDoc
     */
    public getMaxHeightDTO () : SizeDTO | undefined {
        return this._maxHeight;
    }

    /**
     * @inheritDoc
     */
    public setMaxHeight (value: Size | SizeEntity | number | undefined) : this {
        this._maxHeight = StyleEntity.prepareSizeDTO(value);
        return this;
    }


    /**
     * @inheritDoc
     */
    public getTextColor () : ColorEntity | undefined {
        return this._textColor ? ColorEntity.create(this._textColor.value) : undefined;
    }

    /**
     * @inheritDoc
     */
    public setTextColor (value: ColorEntity | string | undefined) : this {
        this._textColor = StyleEntity.prepareColorDTO(value);
        return this;
    }

    /**
     * @inheritDoc
     */
    public getTextAlign () : TextAlign | undefined {
        return this._textAlign;
    }

    /**
     * @inheritDoc
     */
    public setTextAlign (value: TextAlign | undefined) : this {
        this._textAlign = value;
        return this;
    }

    /**
     * @inheritDoc
     */
    public getBoxSizing () : BoxSizing | undefined {
        return this._boxSizing;
    }

    /**
     * @inheritDoc
     */
    public setBoxSizing (value: BoxSizing | undefined) : this {
        this._boxSizing = value;
        return this;
    }

    /**
     * @inheritDoc
     */
    public getTextDecoration () : TextDecorationEntity | undefined {
        return this._textDecoration ? TextDecorationEntity.createFromDTO(this._textDecoration) : undefined;
    }

    /**
     * @inheritDoc
     */
    public getTextDecorationDTO () : TextDecorationDTO | undefined {
        return this._textDecoration;
    }

    /**
     * @inheritDoc
     */
    public setTextDecoration (value: TextDecoration | TextDecorationEntity | TextDecorationDTO | undefined) : this {
        if (isTextDecorationEntity(value)) {
            this._textDecoration = value.getDTO();
        } else if (isTextDecoration(value)) {
            this._textDecoration = value.getDTO();
        } else {
            this._textDecoration = value;
        }
        return this;
    }

    /**
     * @inheritDoc
     */
    public getBackgroundColor () : ColorEntity | undefined {
        const color = this._background?.color;
        return color ? ColorEntity.createFromDTO(color) : undefined;
    }

    /**
     * @inheritDoc
     */
    public getBackgroundColorDTO () : ColorDTO | undefined {
        const color = this._background?.color;
        return color ? color : undefined;
    }

    /**
     * @inheritDoc
     */
    public setBackgroundColor (value: ColorEntity | string | undefined) : this {
        if (this._background === undefined) {
            this._background = BackgroundEntity.color(value).getDTO();
        } else {
            this._background = BackgroundEntity.createFromDTO(this._background).color(value).getDTO();
        }
        return this;
    }

    /**
     * @inheritDoc
     */
    public getFontDTO () : FontDTO | undefined {
        return this._font ? this._font : undefined;
    }

    /**
     * @inheritDoc
     */
    public getFont () : Font | undefined {
        return this._font ? FontEntity.createFromDTO(this._font) : undefined;
    }

    /**
     * @inheritDoc
     */
    public setFont (value: FontEntity | Font | string | number | undefined) : this {
        this._font = StyleEntity.prepareFontDTO(value);
        return this;
    }


    /**
     * @inheritDoc
     */
    public getMargin () : SizeDTO | [SizeDTO, SizeDTO] | [SizeDTO, SizeDTO, SizeDTO, SizeDTO] | undefined {
        return this._margin;
    }

    public getTopMargin () : SizeDTO | undefined {
        if (isArray(this._margin)) {
            return this._margin[0];
        }
        return this._margin;
    }

    public getBottomMargin () : SizeDTO | undefined {
        if (isArray(this._margin)) {
            return this._margin[2];
        }
        return this._margin;
    }

    public getRightMargin () : SizeDTO | undefined {
        if (isArray(this._margin)) {
            return this._margin[1];
        }
        return this._margin;
    }

    public getLeftMargin () : SizeDTO | undefined {
        if (isArray(this._margin)) {
            return this._margin[3];
        }
        return this._margin;
    }

    /**
     * @inheritDoc
     */
    public setMargin (value: SizeEntity | SizeDTO | number | undefined) : this {
        this._margin = StyleEntity.prepareSizeDTO(value);
        return this;
    }

    /**
     * @inheritDoc
     */
    public setTopMargin (value: SizeEntity | SizeDTO | number | undefined) : this {
        if (this._margin === undefined) {
            const empty = SizeEntity.createZero().getDTO();
            this._margin = [
                StyleEntity.prepareSizeDTO(value) ?? empty, // top
                empty, // right
                empty, // bottom
                empty, // left
            ];
        } else if (isArray(this._margin)) {
            this._margin[TOP_MARGIN_INDEX] = StyleEntity.prepareSizeDTO(value) ?? SizeEntity.createZero().getDTO();
        } else {
            this._margin = [
                StyleEntity.prepareSizeDTO(value) ?? SizeEntity.createZero().getDTO(), // top
                this._margin, // right
                this._margin, // bottom
                this._margin, // left
            ];
        }
        return this;
    }

    /**
     * @inheritDoc
     */
    public setBottomMargin (value: SizeEntity | SizeDTO | number | undefined) : this {
        if (this._margin === undefined) {
            const empty = SizeEntity.createZero().getDTO();
            this._margin = [
                empty, // top
                empty, // right
                StyleEntity.prepareSizeDTO(value) ?? empty, // bottom
                empty, // left
            ];
        } else if (isArray(this._margin)) {
            this._margin[BOTTOM_MARGIN_INDEX] = StyleEntity.prepareSizeDTO(value) ?? SizeEntity.createZero().getDTO();
        } else {
            this._margin = [
                this._margin, // top
                this._margin, // right
                StyleEntity.prepareSizeDTO(value) ?? SizeEntity.createZero().getDTO(), // bottom
                this._margin, // left
            ];
        }
        return this;
    }

    /**
     * @inheritDoc
     */
    public setRightMargin (value: SizeEntity | SizeDTO | number | undefined) : this {
        if (this._margin === undefined) {
            const empty = SizeEntity.createZero().getDTO();
            this._margin = [
                empty, // top
                StyleEntity.prepareSizeDTO(value) ?? SizeEntity.createZero().getDTO(), // right
                empty, // bottom
                empty, // left
            ];
        } else if (isArray(this._margin)) {
            this._margin[RIGHT_MARGIN_INDEX] = StyleEntity.prepareSizeDTO(value) ?? SizeEntity.createZero().getDTO();
        } else {
            this._margin = [
                this._margin, // top
                StyleEntity.prepareSizeDTO(value) ?? SizeEntity.createZero().getDTO(), // right
                this._margin, // bottom
                this._margin, // left
            ];
        }
        return this;
    }

    /**
     * @inheritDoc
     */
    public setLeftMargin (value: SizeEntity | SizeDTO | number | undefined) : this {
        if (this._margin === undefined) {
            const empty = SizeEntity.createZero().getDTO();
            this._margin = [
                empty, // top
                empty, // right
                empty, // bottom
                StyleEntity.prepareSizeDTO(value) ?? empty, // left
            ];
        } else if (isArray(this._margin)) {
            this._margin[LEFT_MARGIN_INDEX] = StyleEntity.prepareSizeDTO(value) ?? SizeEntity.createZero().getDTO();
        } else {
            this._margin = [
                this._margin, // top
                this._margin, // right
                this._margin, // bottom
                StyleEntity.prepareSizeDTO(value) ?? SizeEntity.createZero().getDTO(), // left
            ];
        }
        return this;
    }



    /**
     * @inheritDoc
     */
    public getPadding () : SizeDTO | [SizeDTO, SizeDTO] | [SizeDTO, SizeDTO, SizeDTO, SizeDTO] | undefined {
        return this._padding;
    }

    public getTopPadding () : SizeDTO | undefined {
        if (isArray(this._padding)) {
            return this._padding[0];
        }
        return this._padding;
    }

    public getBottomPadding () : SizeDTO | undefined {
        if (isArray(this._padding)) {
            return this._padding[2];
        }
        return this._padding;
    }

    public getRightPadding () : SizeDTO | undefined {
        if (isArray(this._padding)) {
            return this._padding[1];
        }
        return this._padding;
    }

    public getLeftPadding () : SizeDTO | undefined {
        if (isArray(this._padding)) {
            return this._padding[3];
        }
        return this._padding;
    }

    /**
     * @inheritDoc
     */
    public setPadding (value: SizeEntity | SizeDTO | number | undefined) : this {
        this._padding = StyleEntity.prepareSizeDTO(value);
        return this;
    }

    /**
     * @inheritDoc
     */
    public setTopPadding (value: SizeEntity | SizeDTO | number | undefined) : this {
        if (this._padding === undefined) {
            const empty = SizeEntity.createZero().getDTO();
            this._padding = [
                StyleEntity.prepareSizeDTO(value) ?? empty, // top
                empty, // right
                empty, // bottom
                empty, // left
            ];
        } else if (isArray(this._padding)) {
            this._padding[TOP_MARGIN_INDEX] = StyleEntity.prepareSizeDTO(value) ?? SizeEntity.createZero().getDTO();
        } else {
            this._padding = [
                StyleEntity.prepareSizeDTO(value) ?? SizeEntity.createZero().getDTO(), // top
                this._padding, // right
                this._padding, // bottom
                this._padding, // left
            ];
        }
        return this;
    }

    /**
     * @inheritDoc
     */
    public setBottomPadding (value: SizeEntity | SizeDTO | number | undefined) : this {
        if (this._padding === undefined) {
            const empty = SizeEntity.createZero().getDTO();
            this._padding = [
                empty, // top
                empty, // right
                StyleEntity.prepareSizeDTO(value) ?? empty, // bottom
                empty, // left
            ];
        } else if (isArray(this._padding)) {
            this._padding[BOTTOM_MARGIN_INDEX] = StyleEntity.prepareSizeDTO(value) ?? SizeEntity.createZero().getDTO();
        } else {
            this._padding = [
                this._padding, // top
                this._padding, // right
                StyleEntity.prepareSizeDTO(value) ?? SizeEntity.createZero().getDTO(), // bottom
                this._padding, // left
            ];
        }
        return this;
    }

    /**
     * @inheritDoc
     */
    public setRightPadding (value: SizeEntity | SizeDTO | number | undefined) : this {
        if (this._padding === undefined) {
            const empty = SizeEntity.createZero().getDTO();
            this._padding = [
                empty, // top
                StyleEntity.prepareSizeDTO(value) ?? empty, // right
                empty, // bottom
                empty, // left
            ];
        } else if (isArray(this._padding)) {
            this._padding[RIGHT_MARGIN_INDEX] = StyleEntity.prepareSizeDTO(value) ?? SizeEntity.createZero().getDTO();
        } else {
            this._padding = [
                this._padding, // top
                StyleEntity.prepareSizeDTO(value) ?? SizeEntity.createZero().getDTO(), // right
                this._padding, // bottom
                this._padding, // left
            ];
        }
        return this;
    }

    /**
     * @inheritDoc
     */
    public setLeftPadding (value: SizeEntity | SizeDTO | number | undefined) : this {
        if (this._padding === undefined) {
            const empty = SizeEntity.createZero().getDTO();
            this._padding = [
                empty, // top
                empty, // right
                empty, // bottom
                StyleEntity.prepareSizeDTO(value) ?? empty, // left
            ];
        } else if (isArray(this._padding)) {
            this._padding[LEFT_MARGIN_INDEX] = StyleEntity.prepareSizeDTO(value) ?? SizeEntity.createZero().getDTO();
        } else {
            this._padding = [
                this._padding, // top
                this._padding, // right
                this._padding, // bottom
                StyleEntity.prepareSizeDTO(value) ?? SizeEntity.createZero().getDTO(), // left
            ];
        }
        return this;
    }






    /**
     * @inheritDoc
     */
    public getBorder () : BorderDTO | [BorderDTO, BorderDTO] | [BorderDTO, BorderDTO, BorderDTO, BorderDTO] | undefined {
        return this._border;
    }

    public getTopBorder () : BorderDTO | undefined {
        if (isArray(this._border)) {
            return this._border[0];
        }
        return this._border;
    }

    public getBottomBorder () : BorderDTO | undefined {
        if (isArray(this._border)) {
            return this._border[2];
        }
        return this._border;
    }

    public getRightBorder () : BorderDTO | undefined {
        if (isArray(this._border)) {
            return this._border[1];
        }
        return this._border;
    }

    public getLeftBorder () : BorderDTO | undefined {
        if (isArray(this._border)) {
            return this._border[3];
        }
        return this._border;
    }

    /**
     * @inheritDoc
     */
    public setBorder (
        value: Border | BorderDTO | number | undefined
    ) : this {
        this._border = StyleEntity.prepareBorderDTO(value);
        return this;
    }

    /**
     * @inheritDoc
     */
    public setTopBorder (value: Border | BorderDTO | number | undefined) : this {
        if (this._border === undefined) {
            const empty = BorderEntity.createEmptyBorder().getDTO();
            this._border = [
                StyleEntity.prepareBorderDTO(value) ?? empty, // top
                empty, // right
                empty, // bottom
                empty, // left
            ];
        } else if (isArray(this._border)) {
            this._border[TOP_MARGIN_INDEX] = StyleEntity.prepareBorderDTO(value) ?? BorderEntity.createEmptyBorder().getDTO();
        } else {
            this._border = [
                StyleEntity.prepareBorderDTO(value) ?? BorderEntity.createEmptyBorder().getDTO(), // top
                this._border, // right
                this._border, // bottom
                this._border, // left
            ];
        }
        return this;
    }

    /**
     * @inheritDoc
     */
    public setBottomBorder (value: Border | BorderDTO | number | undefined) : this {
        if (this._border === undefined) {
            const empty = BorderEntity.createEmptyBorder().getDTO();
            this._border = [
                empty, // top
                empty, // right
                StyleEntity.prepareBorderDTO(value) ?? empty, // bottom
                empty, // left
            ];
        } else if (isArray(this._border)) {
            this._border[BOTTOM_MARGIN_INDEX] = StyleEntity.prepareBorderDTO(value) ?? BorderEntity.createEmptyBorder().getDTO();
        } else {
            this._border = [
                this._border, // top
                this._border, // right
                StyleEntity.prepareBorderDTO(value) ?? BorderEntity.createEmptyBorder().getDTO(), // bottom
                this._border, // left
            ];
        }
        return this;
    }

    /**
     * @inheritDoc
     */
    public setRightBorder (value: Border | BorderDTO | number | undefined) : this {
        if (this._border === undefined) {
            const empty = BorderEntity.createEmptyBorder().getDTO();
            this._border = [
                empty, // top
                StyleEntity.prepareBorderDTO(value) ?? empty, // right
                empty, // bottom
                empty, // left
            ];
        } else if (isArray(this._border)) {
            this._border[RIGHT_MARGIN_INDEX] = StyleEntity.prepareBorderDTO(value) ?? BorderEntity.createEmptyBorder().getDTO();
        } else {
            this._border = [
                this._border, // top
                StyleEntity.prepareBorderDTO(value) ?? BorderEntity.createEmptyBorder().getDTO(), // right
                this._border, // bottom
                this._border, // left
            ];
        }
        return this;
    }

    /**
     * @inheritDoc
     */
    public setLeftBorder (value: Border | BorderDTO | number | undefined) : this {
        const v = StyleEntity.prepareBorderDTO(value);
        if (this._border === undefined) {
            const empty = BorderEntity.createEmptyBorder().getDTO();
            this._border = [
                empty, // top
                empty, // right
                empty, // bottom
                v ?? empty, // left
            ];
        } else if (isArray(this._border)) {
            this._border[LEFT_MARGIN_INDEX] = v ?? BorderEntity.createEmptyBorder().getDTO();
        } else {
            this._border = [
                this._border, // top
                this._border, // right
                this._border, // bottom
                v ?? BorderEntity.createEmptyBorder().getDTO(), // left
            ];
        }
        return this;
    }

    public setBackground (value: Background | BackgroundEntity | undefined): this {
        if (isBackgroundEntity(value)) {
            this._background = value.getDTO();
        } else if (isBackground(value)) {
            this._background = value.getDTO();
        } else {
            this._background = value;
        }
        return this;
    }

    public getBackground (): Background | undefined {
        return this._background ? BackgroundEntity.createFromDTO(this._background) : undefined;
    }

    public getBackgroundDTO (): BackgroundDTO | undefined {
        return this._background;
    }

    public getCssStyles () : ReadonlyJsonObject {
        return {
            ...(this._textColor ? { color: ColorEntity.createFromDTO(this._textColor).getCssStyles() } : {}),
            ...(this._textAlign ? { textAlign: this._textAlign } : {}),
            ...(this._boxSizing ? { boxSizing: this._boxSizing } : {}),
            ...(this._background ? BackgroundEntity.createFromDTO(this._background).getCssStyles() : {}),
            ...(this._width ? { width: SizeEntity.createFromDTO(this._width).getCssStyles() } : {}),
            ...(this._height ? { height: SizeEntity.createFromDTO(this._height).getCssStyles() } : {}),
            ...(this._minWidth ? { minWidth: SizeEntity.createFromDTO(this._minWidth).getCssStyles() } : {}),
            ...(this._minHeight ? { minHeight: SizeEntity.createFromDTO(this._minHeight).getCssStyles() } : {}),
            ...(this._maxWidth ? { maxWidth: SizeEntity.createFromDTO(this._maxWidth).getCssStyles() } : {}),
            ...(this._maxHeight ? { maxHeight: SizeEntity.createFromDTO(this._maxHeight).getCssStyles() } : {}),
            ...(this._margin ? StyleEntity.prepareSizeListCssStyles("margin", this._margin) : {}),
            ...(this._padding ? StyleEntity.prepareSizeListCssStyles("padding", this._padding) : {}),
            ...(this._border ? StyleEntity.prepareBorderListCssStyles( this._border ) : {}),
            ...(this._font ? FontEntity.createFromDTO(this._font).getCssStyles() : {}),
            ...(this._textDecoration ? TextDecorationEntity.createFromDTO(this._textDecoration).getCssStyles() : {}),
        };
    }

}

export function isStyleEntity (value: unknown): value is StyleEntity {
    return value instanceof StyleEntity;
}
