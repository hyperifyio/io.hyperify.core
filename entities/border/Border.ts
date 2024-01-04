// Copyright (c) 2023. Sendanor <info@sendanor.fi>. All rights reserved.

import { ReadonlyJsonObject } from "../../Json";
import { isFunction } from "../../types/Function";
import { isObject } from "../../types/Object";
import { BorderDTO } from "./BorderDTO";
import { ColorDTO } from "../color/ColorDTO";
import { SizeDTO } from "../size/SizeDTO";
import { BorderStyle } from "../types/BorderStyle";
import { ColorEntity } from "../color/ColorEntity";
import { Color } from "../color/Color";
import { Entity } from "../types/Entity";
import { Size } from "../size/Size";

/**
 * Presents a border value
 */
export interface Border extends Entity<BorderDTO> {

    /**
     * @inheritDoc
     */
    valueOf() : ReadonlyJsonObject;

    getDTO () : BorderDTO;

    /**
     * @inheritDoc
     */
    toJSON () : ReadonlyJsonObject;

    /**
     * Returns CSS styles.
     */
    getCssStyles () : ReadonlyJsonObject;

    setStyle (value : BorderStyle) : this;
    getStyle () : BorderStyle | undefined;

    setWidth (value : Size | SizeDTO | number | undefined) : this;
    getWidth () : Size | undefined;
    getWidthDTO () : SizeDTO | undefined;

    setRadius (value : Size | SizeDTO | number | undefined) : this;
    getRadius () : Size | undefined;
    getRadiusDTO () : SizeDTO | undefined;

    setColor (value : Color | ColorDTO | ColorEntity | string) : this;
    getColor () : Color | undefined;
    getColorDTO () : ColorDTO | undefined;

}

export function isBorder (
    value: unknown
): value is Border {
    return (
        isObject(value)
        && isFunction(value?.valueOf)
        && isFunction(value?.getDTO)
        && isFunction(value?.toJSON)
        && isFunction(value?.getCssStyles)
        && isFunction(value?.setStyle)
        && isFunction(value?.getStyle)
        && isFunction(value?.setWidth)
        && isFunction(value?.getWidth)
        && isFunction(value?.setColor)
        && isFunction(value?.getColor)
    );
}
