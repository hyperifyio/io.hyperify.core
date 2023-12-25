// Copyright (c) 2023. Sendanor <info@sendanor.fi>. All rights reserved.

import { ReadonlyJsonObject } from "../../Json";
import { SizeDTO } from "../size/SizeDTO";
import { SizeEntity } from "../size/SizeEntity";
import { BackgroundPositionValue } from "../types/BackgroundPositionValue";
import { Entity } from "../types/Entity";
import { BackgroundPositionDTO } from "./BackgroundPositionDTO";

/**
 * Presents an interface for SeoEntity.
 */
export interface BackgroundPosition extends Entity<BackgroundPositionDTO> {

    /**
     * @inheritDoc
     */
    valueOf () : ReadonlyJsonObject;

    /**
     * @inheritDoc
     */
    getDTO () : BackgroundPositionDTO;

    /**
     * @inheritDoc
     */
    toJSON () : ReadonlyJsonObject;

    /**
     * Returns CSS styles.
     */
    getCssStyles () : ReadonlyJsonObject;


    /**
     */
    getPosition () : BackgroundPositionValue | undefined;

    /**
     * @param value
     */
    setPosition (value : BackgroundPositionValue | undefined) : this;

    /**
     * An alias for `.setPosition(value)`.
     *
     * @param value
     */
    position (value : BackgroundPositionValue | undefined) : this;


    /**
     */
    getSize () : SizeEntity | undefined;

    /**
     */
    getSizeDTO () : SizeDTO | undefined;

    /**
     * @param value
     */
    setSize (value : SizeEntity | undefined) : this;

    /**
     * An alias for `.setSize(value)`.
     *
     * @param value
     */
    size (value : SizeEntity | SizeDTO | undefined) : this;


    /**
     */
    getSecondPosition () : BackgroundPositionValue | undefined;

    /**
     * @param value
     */
    setSecondPosition (value : BackgroundPositionValue | undefined) : this;

    /**
     * An alias for `.setPosition(value)`.
     *
     * @param value
     */
    secondPosition (value : BackgroundPositionValue | undefined) : this;


    /**
     */
    getSecondSize () : SizeEntity | undefined;

    /**
     */
    getSecondSizeDTO () : SizeDTO | undefined;

    /**
     * @param value
     */
    setSecondSize (value : SizeEntity | SizeDTO | undefined) : this;

    /**
     * An alias for `.setSize(value)`.
     *
     * @param value
     */
    secondSize (value : SizeEntity | SizeDTO | undefined) : this;


}
