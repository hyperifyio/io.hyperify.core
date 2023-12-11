// Copyright (c) 2023. Heusala Group Oy <info@hg.fi>. All rights reserved.

import { describe, it, expect } from '@jest/globals';
import { StyleEntity } from "./StyleEntity";
import { UnitType } from "./types/UnitType";

describe('StyleEntity', () => {

    describe('#create', () => {
        it('can create style entities', () => {
            let obj = StyleEntity.create();
            expect(obj.getDTO()).toStrictEqual({});
        });
    });

    describe('.setWidth', () => {
        it('can set width by number', () => {
            let obj = StyleEntity.create().setWidth(100);
            expect(obj.getDTO()?.width?.value).toStrictEqual(100);
            expect(obj.getDTO()?.width?.unit).toStrictEqual(UnitType.PX);
        });
    });

    describe('.setHeight', () => {
        it('can set height by number', () => {
            let obj = StyleEntity.create().setHeight(100);
            expect(obj.getDTO()?.height?.value).toStrictEqual(100);
            expect(obj.getDTO()?.height?.unit).toStrictEqual(UnitType.PX);
        });
    });

    describe('#merge', () => {
        it('can merge multiple styles', () => {

            const styles = StyleEntity.merge(
                StyleEntity.create().setWidth(100),
                StyleEntity.create().setHeight(200),
            );

            expect(styles.getWidthDTO()?.value).toBe(100);
            expect(styles.getWidthDTO()?.unit).toBe(UnitType.PX);
            expect(styles.getHeightDTO()?.value).toBe(200);
            expect(styles.getHeightDTO()?.unit).toBe(UnitType.PX);

        });
    });

});
