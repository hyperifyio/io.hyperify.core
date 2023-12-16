// Copyright (c) 2023. Sendanor <info@sendanor.fi>. All rights reserved.

import {
    BackgroundRepeatDTO,
    createBackgroundRepeatDTO,
    isBackgroundRepeatDTO,
} from "./BackgroundRepeatDTO";
import {
    BackgroundRepeatType,
    isBackgroundRepeatType,
} from "../types/BackgroundRepeatType";
import { BackgroundRepeat } from "./BackgroundRepeat";
import { EntityFactoryImpl } from "../types/EntityFactoryImpl";
import { EntityPropertyImpl } from "../types/EntityPropertyImpl";

export const BackgroundRepeatEntityFactory = (
    EntityFactoryImpl.create<BackgroundRepeatDTO, BackgroundRepeat>()
                     .add( EntityPropertyImpl.create("x").setTypes(BackgroundRepeatType) )
                     .add( EntityPropertyImpl.create("y").setTypes(BackgroundRepeatType) )
);

export const BaseBackgroundRepeatEntity = BackgroundRepeatEntityFactory.createEntityType();

/**
 * Background repeat entity.
 */
export class BackgroundRepeatEntity
    extends BaseBackgroundRepeatEntity
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

    public constructor (
        x ?: BackgroundRepeatType | BackgroundRepeatDTO,
        y ?: BackgroundRepeatType,
    ) {
        if (x === undefined) {
            super();
        } else if ( isBackgroundRepeatType(x) && isBackgroundRepeatType(y) ) {
            super( createBackgroundRepeatDTO(x, y) );
        } else if (isBackgroundRepeatDTO(x) ) {
            super( x );
        } else {
            throw new TypeError(`new BackgroundRepeatEntity(): Unsupported arguments: ${x}, ${y}`);
        }
    }

    /**
     * @inheritDoc
     */
    public getCssStyles (): string {

        const x = this.getX();
        const y = this.getY();

        if (x === BackgroundRepeatType.REPEAT && y === BackgroundRepeatType.NO_REPEAT) {
            return "repeat-x";
        }
        if (x === BackgroundRepeatType.REPEAT && y === BackgroundRepeatType.REPEAT) {
            return "repeat";
        }

        if (x === BackgroundRepeatType.NO_REPEAT && y === BackgroundRepeatType.REPEAT) {
            return "repeat-y";
        }
        if (x === BackgroundRepeatType.NO_REPEAT && y === BackgroundRepeatType.NO_REPEAT) {
            return "no-repeat";
        }

        if (x === BackgroundRepeatType.SPACE && y === BackgroundRepeatType.SPACE) {
            return "space";
        }

        if (x === BackgroundRepeatType.ROUND && y === BackgroundRepeatType.ROUND) {
            return "round";
        }

        return `${x} ${y}`;
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
