// Copyright (c) 2023. Sendanor <info@sendanor.fi>. All rights reserved.

import { ReadonlyJsonObject } from "../Json";
import { BackgroundRepeatDTO, createBackgroundRepeatDTO } from "../dto/BackgroundRepeatDTO";
import { BackgroundRepeatType } from "../dto/types/BackgroundRepeatType";
import { BackgroundRepeat } from "./types/BackgroundRepeat";

/**
 * Background repeat entity.
 */
export class BackgroundRepeatEntity
    implements BackgroundRepeat
{

    /**
     * Creates a background repeat entity.
     *
     * @param x
     * @param y
     */
    public static create (
        x : BackgroundRepeatType | undefined = undefined,
        y : BackgroundRepeatType | undefined = undefined,
    ) : BackgroundRepeatEntity {
        return new BackgroundRepeatEntity(
            x ?? BackgroundRepeatType.NO_REPEAT,
            y ?? BackgroundRepeatType.NO_REPEAT,
        );
    }

    /**
     * Creates a background repeat entity from DTO.
     *
     * @param value
     */
    public static createFromDTO (
        value : BackgroundRepeatDTO,
    ) : BackgroundRepeatEntity {
        return BackgroundRepeatEntity.create(
            value?.x,
            value?.y,
        );
    }

    public static x (x : BackgroundRepeatType | undefined) : BackgroundRepeatEntity {
        return BackgroundRepeatEntity.create(x, BackgroundRepeatType.NO_REPEAT);
    }

    public static y (y : BackgroundRepeatType | undefined) : BackgroundRepeatEntity {
        return BackgroundRepeatEntity.create(BackgroundRepeatType.NO_REPEAT, y);
    }

    public static repeatX() : BackgroundRepeatEntity {
        return this.create(BackgroundRepeatType.REPEAT, BackgroundRepeatType.NO_REPEAT);
    }

    public static repeatY() : BackgroundRepeatEntity {
        return this.create(BackgroundRepeatType.NO_REPEAT, BackgroundRepeatType.REPEAT);
    }

    public static repeat() : BackgroundRepeatEntity {
        return this.create(BackgroundRepeatType.REPEAT, BackgroundRepeatType.REPEAT);
    }

    public static space() : BackgroundRepeatEntity {
        return this.create(BackgroundRepeatType.SPACE, BackgroundRepeatType.SPACE);
    }

    public static round() : BackgroundRepeatEntity {
        return this.create(BackgroundRepeatType.ROUND, BackgroundRepeatType.ROUND);
    }

    public static noRepeat() : BackgroundRepeatEntity {
        return this.create(BackgroundRepeatType.NO_REPEAT, BackgroundRepeatType.NO_REPEAT);
    }

    private _x : BackgroundRepeatType;
    private _y : BackgroundRepeatType;

    protected constructor (
        x : BackgroundRepeatType,
        y : BackgroundRepeatType,
    ) {
        this._x = x;
        this._y = y;
    }

    /**
     * Returns the DTO object.
     */
    public getDTO () : BackgroundRepeatDTO {
        return createBackgroundRepeatDTO(
            this._x,
            this._y,
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

        if (this._x === BackgroundRepeatType.REPEAT && this._y === BackgroundRepeatType.NO_REPEAT) {
            return "repeat-x";
        }
        if (this._x === BackgroundRepeatType.REPEAT && this._y === BackgroundRepeatType.REPEAT) {
            return "repeat";
        }

        if (this._x === BackgroundRepeatType.NO_REPEAT && this._y === BackgroundRepeatType.REPEAT) {
            return "repeat-y";
        }
        if (this._x === BackgroundRepeatType.NO_REPEAT && this._y === BackgroundRepeatType.NO_REPEAT) {
            return "no-repeat";
        }

        if (this._x === BackgroundRepeatType.SPACE && this._y === BackgroundRepeatType.SPACE) {
            return "space";
        }

        if (this._x === BackgroundRepeatType.ROUND && this._y === BackgroundRepeatType.ROUND) {
            return "round";
        }

        return `${this._x} ${this._y}`;
    }

    /**
     * @inheritDoc
     */
    public getX () : BackgroundRepeatType {
        return this._x;
    }

    /**
     * @inheritDoc
     */
    public getY () : BackgroundRepeatType {
        return this._y;
    }

    /**
     * @inheritDoc
     */
    public x (value : BackgroundRepeatType) : this {
        this._x = value;
        return this;
    }

    /**
     * @inheritDoc
     */
    public y (value : BackgroundRepeatType) : this {
        this._y = value;
        return this;
    }

    /**
     * @inheritDoc
     */
    public repeatX() : this {
        return this.x(BackgroundRepeatType.REPEAT).y(BackgroundRepeatType.NO_REPEAT);
    }

    /**
     * @inheritDoc
     */
    public repeatY() : this {
        return this.x(BackgroundRepeatType.NO_REPEAT).y(BackgroundRepeatType.REPEAT);
    }

    /**
     * @inheritDoc
     */
    public repeat() : this {
        return this.x(BackgroundRepeatType.REPEAT).y(BackgroundRepeatType.REPEAT);
    }

    /**
     * @inheritDoc
     */
    public space() : this {
        return this.x(BackgroundRepeatType.SPACE).y(BackgroundRepeatType.SPACE);
    }

    /**
     * @inheritDoc
     */
    public round() : this {
        return this.x(BackgroundRepeatType.ROUND).y(BackgroundRepeatType.ROUND);
    }

    /**
     * @inheritDoc
     */
    public noRepeat() : this {
        return this.x(BackgroundRepeatType.NO_REPEAT).y(BackgroundRepeatType.NO_REPEAT);
    }

}

export function isBackgroundRepeatEntity (value: unknown): value is BackgroundRepeatEntity {
    return value instanceof BackgroundRepeatEntity;
}
