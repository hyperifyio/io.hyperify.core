// Copyright (c) 2023-2024. Heusala Group Oy <info@heusalagroup.fi>. All rights reserved.

import { BackgroundDTO } from "../background/BackgroundDTO";
import {
    BorderDTO,
} from "../border/BorderDTO";
import { BorderBox } from "../borderBox/BorderBox";
import {
    ColorDTO,
} from "../color/ColorDTO";
import {
    FontDTO,
} from "../font/FontDTO";
import {
    SizeDTO,
} from "../size/SizeDTO";
import { SizeBox } from "../sizeBox/SizeBox";
import { VariableType } from "../types/VariableType";
import {
    StyleDTO,
} from "./StyleDTO";
import { BorderStyle } from "../types/BorderStyle";
import { BoxSizing } from "../types/BoxSizing";
import { TextAlign } from "../types/TextAlign";
import { map } from "../../functions/map";
import { reduce } from "../../functions/reduce";
import { ReadonlyJsonObject } from "../../Json";
import { isArray } from "../../types/Array";
import { isNumber } from "../../types/Number";
import { isString } from "../../types/String";
import {
    BackgroundEntity,
    isBackgroundEntity,
} from "../background/BackgroundEntity";
import {
    BorderBoxEntity,
    isBorderBox,
    isBorderBoxEntity,
} from "../borderBox/BorderBoxEntity";
import {
    BorderEntity,
    isBorderDTO,
    isBorderEntity,
} from "../border/BorderEntity";
import {
    ColorEntity,
} from "../color/ColorEntity";
import {
    FontEntity,
    isFontEntity,
} from "../font/FontEntity";
import {
    isSizeBox,
    isSizeBoxEntity,
    SizeBoxEntity,
} from "../sizeBox/SizeBoxEntity";
import {
    isSizeDTO,
    isSizeEntity,
    SizeEntity,
} from "../size/SizeEntity";
import {
    TextDecorationEntity,
} from "../textDecoration/TextDecorationEntity";
import {
    isBackground,
} from "../background/Background";
import {
    Border,
    isBorder,
} from "../border/Border";
import { EntityFactoryImpl } from "../types/EntityFactoryImpl";
import {
    Font,
    isFont,
} from "../font/Font";
import {
    isSize,
    Size,
} from "../size/Size";
import {
    Style,
} from "./Style";
import { UnitType } from "../types/UnitType";

const TOP_AND_BOTTOM_MARGIN_INDEX = 0;
const LEFT_AND_RIGHT_MARGIN_INDEX = 1;
const TOP_MARGIN_INDEX = 0;
const RIGHT_MARGIN_INDEX = 1;
const BOTTOM_MARGIN_INDEX = 2;
const LEFT_MARGIN_INDEX = 3;

export const StyleEntityFactory = (
    EntityFactoryImpl.create<StyleDTO, Style>('Style')
                     .add( EntityFactoryImpl.createProperty("textAlign").setTypes(TextAlign, VariableType.UNDEFINED) )
                     .add( EntityFactoryImpl.createProperty("textColor").setTypes(ColorEntity, VariableType.UNDEFINED) )
                     .add( EntityFactoryImpl.createProperty("width").setTypes(SizeEntity, VariableType.UNDEFINED) )
                     .add( EntityFactoryImpl.createProperty("height").setTypes(SizeEntity, VariableType.UNDEFINED) )
                     .add( EntityFactoryImpl.createProperty("margin").setTypes(SizeEntity, SizeBoxEntity, VariableType.UNDEFINED) )
                     .add( EntityFactoryImpl.createProperty("padding").setTypes(SizeEntity, SizeBoxEntity, VariableType.UNDEFINED) )
                     .add( EntityFactoryImpl.createProperty("border").setTypes(BorderEntity, BorderBoxEntity, VariableType.UNDEFINED) )
                     .add( EntityFactoryImpl.createProperty("font").setTypes(FontEntity, VariableType.UNDEFINED) )
                     .add( EntityFactoryImpl.createProperty("textDecoration").setTypes(TextDecorationEntity, VariableType.UNDEFINED) )
                     .add( EntityFactoryImpl.createProperty("background").setTypes(BackgroundEntity, VariableType.UNDEFINED) )
                     .add( EntityFactoryImpl.createProperty("minWidth").setTypes(SizeEntity, VariableType.UNDEFINED) )
                     .add( EntityFactoryImpl.createProperty("minHeight").setTypes(SizeEntity, VariableType.UNDEFINED) )
                     .add( EntityFactoryImpl.createProperty("maxWidth").setTypes(SizeEntity, VariableType.UNDEFINED) )
                     .add( EntityFactoryImpl.createProperty("maxHeight").setTypes(SizeEntity, VariableType.UNDEFINED) )
                     .add( EntityFactoryImpl.createProperty("boxSizing").setTypes(BoxSizing, VariableType.UNDEFINED) )
);

export const isStyleDTO = StyleEntityFactory.createTestFunctionOfDTO();

export const isStyle = StyleEntityFactory.createTestFunctionOfInterface();

export const explainStyleDTO = StyleEntityFactory.createExplainFunctionOfDTO();

export const isStyleDTOOrUndefined = StyleEntityFactory.createTestFunctionOfDTOorOneOf(VariableType.UNDEFINED);

export const explainStyleDTOOrUndefined = StyleEntityFactory.createExplainFunctionOfDTOorOneOf(VariableType.UNDEFINED);

export const BaseStyleEntity = StyleEntityFactory.createEntityType();



/**
 * Style entity.
 */
export class StyleEntity
    extends BaseStyleEntity
    implements Style
{

    public static create (
        dto ?: StyleDTO,
    ) : StyleEntity {
        return new this(dto);
    }

    /**
     * Construct a style entity.
     *
     * @param style
     */
    public static createFromDTO (
        style : StyleDTO,
    ) : StyleEntity {
        return new this( style );
    }

    public static prepareBackgroundDTO (
        value : BackgroundEntity | BackgroundDTO | undefined
    ) : BackgroundDTO | undefined {
        if (value === undefined) return undefined;
        if (isBackgroundEntity(value)) return value.getDTO();
        if (isBackground(value)) return value.getDTO();
        return value;
    }

    public static prepareSizeDTO (
        value : SizeEntity | Size | SizeDTO | number | undefined
    ) : SizeDTO | undefined {
        if (value === undefined) return undefined;
        if (isNumber(value)) return {value, unit: UnitType.PX};
        if (isSizeEntity(value)) return value.getDTO();
        if (isSize(value)) return value.getDTO();
        return value;
    }

    public static prepareFontDTO (
        value : Font | FontEntity | FontDTO | number | string | undefined
    ) : FontDTO | undefined {
        if (value === undefined) return undefined;
        if (isNumber(value)) {
            return FontEntity.create().setFontSize( SizeEntity.create(value).getDTO() ).getDTO();
        }
        if (isString(value)) {
            return FontEntity.create().setFontFamily( value ).getDTO();
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
            return BorderEntity.create().setWidth(value).getDTO();
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
        if (isNumber(value)) return {value, unit: UnitType.PX};
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
            return BorderEntity.create().setWidth( SizeEntity.create(value) ).getDTO();
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
                border: BorderEntity.create(value).getCssStyles()
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
                {},
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
     * Construct a style entity.
     */
    public constructor (
        style ?: StyleDTO | StyleEntity | Style,
    ) {
        super(
            isStyleEntity(style) || isStyle(style) ? style.getDTO() : style
        );
    }

    public getCssStyles () : ReadonlyJsonObject {

        const textColor = this.getTextColor();
        const textAlign = this.getTextAlign();
        const boxSizing = this.getBoxSizing();
        const background = this.getBackground();
        const width = this.getWidth();
        const height = this.getHeight();
        const minWidth = this.getMinWidth();
        const minHeight = this.getMinHeight();
        const maxWidth = this.getMaxWidth();
        const maxHeight = this.getMaxHeight();
        const margin = this.getMargin();
        const padding = this.getPadding();
        const border = this.getBorder();
        const font = this.getFont();
        const textDecoration = this.getTextDecoration();

        return {
            ...(textColor ? { color: textColor.getCssStyles() } : {}),
            ...(textAlign ? { textAlign: textAlign } : {}),
            ...(boxSizing ? { boxSizing: boxSizing } : {}),
            ...(background ? background.getCssStyles() : {}),
            ...(width ? { width: width.getCssStyles() } : {}),
            ...(height ? { height: height.getCssStyles() } : {}),
            ...(minWidth ? { minWidth: minWidth.getCssStyles() } : {}),
            ...(minHeight ? { minHeight: minHeight.getCssStyles() } : {}),
            ...(maxWidth ? { maxWidth: maxWidth.getCssStyles() } : {}),
            ...(maxHeight ? { maxHeight: maxHeight.getCssStyles() } : {}),
            ...(margin? { margin: margin.getCssStyles() } : {}),
            ...(padding ? { padding : padding.getCssStyles() } : {}),
            ...(border ? border.getCssStyles() : {}),
            ...(font ? font.getCssStyles() : {}),
            ...(textDecoration ? textDecoration.getCssStyles() : {}),
        };
    }

    public getBackgroundColor () : ColorEntity | undefined {
        const bg = this.getBackground();
        return bg ? bg.getColor() : undefined;
    }

    public getBackgroundColorDTO () : ColorDTO | undefined {
        const bg = this.getBackground();
        return bg ? bg.getColor()?.getDTO() : undefined;
    }

    public setBackgroundColor ( value : ColorEntity | ColorDTO | string | undefined ) : this {
        const color = value ? ColorEntity.toDTO(value) : undefined;
        const bg = (this.getBackground() ?? BackgroundEntity.create()).setColor(color);
        return this.setBackground( bg );
    }

    public getTopMargin () : Size | undefined {
        const margin = this.getMargin();
        if (isSizeBox(margin)) {
            return margin.getTop();
        }
        return margin;
    }

    public getBottomMargin () : Size | undefined {
        const margin = this.getMargin();
        if (isSizeBox(margin)) {
            return margin.getBottom();
        }
        return margin;
    }

    public getLeftMargin () : Size | undefined {
        const margin = this.getMargin();
        if (isSizeBox(margin)) {
            return margin.getLeft();
        }
        return margin;
    }

    public getRightMargin () : Size | undefined {
        const margin = this.getMargin();
        if (isSizeBox(margin)) {
            return margin.getRight();
        }
        return margin;
    }

    public setTopMargin ( value : SizeEntity | Size | number | undefined ) : this {
        const dto : SizeDTO | undefined = SizeEntity.toDTO(value);
        const current : Size | SizeBox | undefined = this.getMargin();
        if (isSizeBoxEntity(current)) {
            return this.setMargin( dto ? current.setTop(dto) : current.setTop(undefined) );
        }
        if (isSizeEntity(current)) {
            const currentDTO : SizeDTO = current.getDTO();
            return this.setMargin(
                dto
                ? SizeBoxEntity.create().setRight(currentDTO).setBottom(currentDTO).setLeft(currentDTO).setTop(dto)
                : SizeBoxEntity.create().setRight(currentDTO).setBottom(currentDTO).setLeft(currentDTO)
            );
        }
        return this.setMargin( dto ? SizeBoxEntity.create().setTop(dto) : SizeBoxEntity.create() );
    }

    public setRightMargin ( value : SizeEntity | Size | number | undefined ) : this {
        const dto : SizeDTO | undefined = SizeEntity.toDTO(value);
        const current : Size | SizeBox | undefined = this.getMargin();
        if (isSizeBoxEntity(current)) {
            return this.setMargin( dto ? current.setRight(dto) : current.setRight(undefined) );
        }
        if (isSizeEntity(current)) {
            const currentDTO : SizeDTO = current.getDTO();
            return this.setMargin(
                dto
                ? SizeBoxEntity.create().setTop(currentDTO).setBottom(currentDTO).setLeft(currentDTO).setRight(dto)
                : SizeBoxEntity.create().setTop(currentDTO).setBottom(currentDTO).setLeft(currentDTO)
            );
        }
        return this.setMargin( dto ? SizeBoxEntity.create().setRight(dto) : SizeBoxEntity.create() );
    }

    public setBottomMargin ( value : SizeEntity | Size | number | undefined ) : this {
        const dto : SizeDTO | undefined = SizeEntity.toDTO(value);
        const current : Size | SizeBox | undefined = this.getMargin();
        if (isSizeBoxEntity(current)) {
            return this.setMargin( dto ? current.setBottom(dto) : current.setBottom(undefined) );
        }
        if (isSizeEntity(current)) {
            const currentDTO : SizeDTO = current.getDTO();
            return this.setMargin(
                dto
                ? SizeBoxEntity.create().setTop(currentDTO).setRight(currentDTO).setLeft(currentDTO).setBottom(dto)
                : SizeBoxEntity.create().setTop(currentDTO).setRight(currentDTO).setLeft(currentDTO)
            );
        }
        return this.setMargin( dto ? SizeBoxEntity.create().setBottom(dto) : SizeBoxEntity.create() );
    }

    public setLeftMargin ( value : SizeEntity | Size | number | undefined ) : this {
        const dto : SizeDTO | undefined = SizeEntity.toDTO(value);
        const current : Size | SizeBox | undefined = this.getMargin();
        if (isSizeBoxEntity(current)) {
            return this.setMargin( dto ? current.setLeft(dto) : current.setLeft(undefined) );
        }
        if (isSizeEntity(current)) {
            const currentDTO : SizeDTO = current.getDTO();
            return this.setMargin(
                dto
                ? SizeBoxEntity.create().setTop(currentDTO).setRight(currentDTO).setBottom(currentDTO).setLeft(dto)
                : SizeBoxEntity.create().setTop(currentDTO).setRight(currentDTO).setBottom(currentDTO)
            );
        }
        return this.setMargin( dto ? SizeBoxEntity.create().setLeft(dto) : SizeBoxEntity.create() );
    }


    public getTopPadding () : Size | undefined {
        const padding = this.getPadding();
        if (isSizeBox(padding)) {
            return padding.getTop();
        }
        return padding;
    }

    public getBottomPadding () : Size | undefined {
        const padding = this.getPadding();
        if (isSizeBox(padding)) {
            return padding.getBottom();
        }
        return padding;
    }

    public getLeftPadding () : Size | undefined {
        const padding = this.getPadding();
        if (isSizeBox(padding)) {
            return padding.getLeft();
        }
        return padding;
    }

    public getRightPadding () : Size | undefined {
        const padding = this.getPadding();
        if (isSizeBox(padding)) {
            return padding.getRight();
        }
        return padding;
    }

    public setTopPadding ( value : SizeEntity | Size | number | undefined ) : this {
        const dto : SizeDTO | undefined = SizeEntity.toDTO(value);
        const current : Size | SizeBox | undefined = this.getPadding();
        if (isSizeBoxEntity(current)) {
            return this.setPadding( dto ? current.setTop(dto) : current.setTop(undefined) );
        }
        if (isSizeEntity(current)) {
            const currentDTO : SizeDTO = current.getDTO();
            return this.setPadding(
                dto
                ? SizeBoxEntity.create().setRight(currentDTO).setBottom(currentDTO).setLeft(currentDTO).setTop(dto)
                : SizeBoxEntity.create().setRight(currentDTO).setBottom(currentDTO).setLeft(currentDTO)
            );
        }
        return this.setPadding( dto ? SizeBoxEntity.create().setTop(dto) : SizeBoxEntity.create() );
    }

    public setRightPadding ( value : SizeEntity | Size | number | undefined ) : this {
        const dto : SizeDTO | undefined = SizeEntity.toDTO(value);
        const current : Size | SizeBox | undefined = this.getPadding();
        if (isSizeBoxEntity(current)) {
            return this.setPadding( dto ? current.setRight(dto) : current.setRight(undefined) );
        }
        if (isSizeEntity(current)) {
            const currentDTO : SizeDTO = current.getDTO();
            return this.setPadding(
                dto
                ? SizeBoxEntity.create().setTop(currentDTO).setBottom(currentDTO).setLeft(currentDTO).setRight(dto)
                : SizeBoxEntity.create().setTop(currentDTO).setBottom(currentDTO).setLeft(currentDTO)
            );
        }
        return this.setPadding( dto ? SizeBoxEntity.create().setRight(dto) : SizeBoxEntity.create() );
    }

    public setBottomPadding ( value : SizeEntity | Size | number | undefined ) : this {
        const dto : SizeDTO | undefined = SizeEntity.toDTO(value);
        const current : Size | SizeBox | undefined = this.getPadding();
        if (isSizeBoxEntity(current)) {
            return this.setPadding( dto ? current.setBottom(dto) : current.setBottom(undefined) );
        }
        if (isSizeEntity(current)) {
            const currentDTO : SizeDTO = current.getDTO();
            return this.setPadding(
                dto
                ? SizeBoxEntity.create().setTop(currentDTO).setRight(currentDTO).setLeft(currentDTO).setBottom(dto)
                : SizeBoxEntity.create().setTop(currentDTO).setRight(currentDTO).setLeft(currentDTO)
            );
        }
        return this.setPadding( dto ? SizeBoxEntity.create().setBottom(dto) : SizeBoxEntity.create() );
    }

    public setLeftPadding ( value : SizeEntity | Size | number | undefined ) : this {
        const dto : SizeDTO | undefined = SizeEntity.toDTO(value);
        const current : Size | SizeBox | undefined = this.getPadding();
        if (isSizeBoxEntity(current)) {
            return this.setPadding( dto ? current.setLeft(dto) : current.setLeft(undefined) );
        }
        if (isSizeEntity(current)) {
            const currentDTO : SizeDTO = current.getDTO();
            return this.setPadding(
                dto
                ? SizeBoxEntity.create().setTop(currentDTO).setRight(currentDTO).setBottom(currentDTO).setLeft(dto)
                : SizeBoxEntity.create().setTop(currentDTO).setRight(currentDTO).setBottom(currentDTO)
            );
        }
        return this.setPadding( dto ? SizeBoxEntity.create().setLeft(dto) : SizeBoxEntity.create() );
    }



    public getTopBorder () : Border | undefined {
        const border = this.getBorder();
        if (isBorderBox(border)) {
            return border.getTop();
        }
        return border;
    }

    public getBottomBorder () : Border | undefined {
        const border = this.getBorder();
        if (isBorderBox(border)) {
            return border.getBottom();
        }
        return border;
    }

    public getLeftBorder () : Border | undefined {
        const border = this.getBorder();
        if (isBorderBox(border)) {
            return border.getLeft();
        }
        return border;
    }

    public getRightBorder () : Border | undefined {
        const border = this.getBorder();
        if (isBorderBox(border)) {
            return border.getRight();
        }
        return border;
    }

    public setTopBorder ( value : BorderEntity | Border | number | undefined ) : this {
        const dto : BorderDTO | undefined = BorderEntity.toDTO(value);
        const current : Border | BorderBox | undefined = this.getBorder();
        if (isBorderBoxEntity(current)) {
            return this.setBorder( dto ? current.setTop(dto) : current.setTop(undefined) );
        }
        if (isBorderEntity(current)) {
            const currentDTO : BorderDTO = current.getDTO();
            return this.setBorder(
                dto
                ? BorderBoxEntity.create().setRight(currentDTO).setBottom(currentDTO).setLeft(currentDTO).setTop(dto)
                : BorderBoxEntity.create().setRight(currentDTO).setBottom(currentDTO).setLeft(currentDTO)
            );
        }
        return this.setBorder( dto ? BorderBoxEntity.create().setTop(dto) : BorderBoxEntity.create() );
    }

    public setRightBorder ( value : BorderEntity | Border | number | undefined ) : this {
        const dto : BorderDTO | undefined = BorderEntity.toDTO(value);
        const current : Border | BorderBox | undefined = this.getBorder();
        if (isBorderBoxEntity(current)) {
            return this.setBorder( dto ? current.setRight(dto) : current.setRight(undefined) );
        }
        if (isBorderEntity(current)) {
            const currentDTO : BorderDTO = current.getDTO();
            return this.setBorder(
                dto
                ? BorderBoxEntity.create().setTop(currentDTO).setBottom(currentDTO).setLeft(currentDTO).setRight(dto)
                : BorderBoxEntity.create().setTop(currentDTO).setBottom(currentDTO).setLeft(currentDTO)
            );
        }
        return this.setBorder( dto ? BorderBoxEntity.create().setRight(dto) : BorderBoxEntity.create() );
    }

    public setBottomBorder ( value : BorderEntity | Border | number | undefined ) : this {
        const dto : BorderDTO | undefined = BorderEntity.toDTO(value);
        const current : Border | BorderBox | undefined = this.getBorder();
        if (isBorderBoxEntity(current)) {
            return this.setBorder( dto ? current.setBottom(dto) : current.setBottom(undefined) );
        }
        if (isBorderEntity(current)) {
            const currentDTO : BorderDTO = current.getDTO();
            return this.setBorder(
                dto
                ? BorderBoxEntity.create().setTop(currentDTO).setRight(currentDTO).setLeft(currentDTO).setBottom(dto)
                : BorderBoxEntity.create().setTop(currentDTO).setRight(currentDTO).setLeft(currentDTO)
            );
        }
        return this.setBorder( dto ? BorderBoxEntity.create().setBottom(dto) : BorderBoxEntity.create() );
    }

    public setLeftBorder ( value : BorderEntity | Border | number | undefined ) : this {
        const dto : BorderDTO | undefined = BorderEntity.toDTO(value);
        const current : Border | BorderBox | undefined = this.getBorder();
        if (isBorderBoxEntity(current)) {
            return this.setBorder( dto ? current.setLeft(dto) : current.setLeft(undefined) );
        }
        if (isBorderEntity(current)) {
            const currentDTO : BorderDTO = current.getDTO();
            return this.setBorder(
                dto
                ? BorderBoxEntity.create().setTop(currentDTO).setRight(currentDTO).setBottom(currentDTO).setLeft(dto)
                : BorderBoxEntity.create().setTop(currentDTO).setRight(currentDTO).setBottom(currentDTO)
            );
        }
        return this.setBorder( dto ? BorderBoxEntity.create().setLeft(dto) : BorderBoxEntity.create() );
    }

}

export function isStyleEntity (value: unknown): value is StyleEntity {
    return value instanceof StyleEntity;
}
