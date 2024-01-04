// Copyright (c) 2023. Heusala Group Oy <info@heusalagroup.fi>. All rights reserved.

import {
    isSizeDTO,
    SizeEntity,
} from "../size/SizeEntity";
import { SizeDTO } from "../size/SizeDTO";
import { SizeDimensionsDTO } from "../sizeDimensions/SizeDimensionsDTO";
import { isSizeDimensionsDTO } from "../sizeDimensions/SizeDimensionsEntity";
import { BackgroundSize, isBackgroundSize } from "./BackgroundSize";

export type BackgroundSizeOptions  = (
    BackgroundSize
    | SizeDTO
    | SizeDimensionsDTO
);

export function getCssStylesForBackgroundSizeOptions (value : BackgroundSizeOptions) : string {

    if ( isBackgroundSize(value) ) {
        return `${value}`;
    }

    if ( isSizeDTO(value) ) {
        return `${ SizeEntity.createFromDTO(value).getCssStyles() }`;
    }

    if ( isSizeDimensionsDTO(value) && value.width && value.height ) {
        return `${
            SizeEntity.createFromDTO(value.width).getCssStyles()
        } ${
            SizeEntity.createFromDTO(value.height).getCssStyles()
        }`;
    }

    throw new TypeError(`getCssStylesForBackgroundSizeOptions: Unsupported value: ${value}`);

}
