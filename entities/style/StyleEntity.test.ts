// Copyright (c) 2023. Heusala Group Oy <info@hg.fi>. All rights reserved.

import { describe, it, expect } from '@jest/globals';
import { BackgroundDTO } from "../background/BackgroundDTO";
import { ColorDTO } from "../color/ColorDTO";
import { ColorEntity } from "../color/ColorEntity";
import { StyleDTO } from "./StyleDTO";
import { StyleEntity } from "./StyleEntity";
import { UnitType } from "../types/UnitType";

describe('StyleEntity', () => {

    describe('#create', () => {
        it('can create style entities', () => {
            let obj = StyleEntity.create();
            expect(obj.getDTO()).toStrictEqual({});
        });
    });

    describe('#isDTO', () => {

        it('can test a DTO', () => {
            const backgroundColor : ColorDTO = {
                value: "#222222"
            };
            const background : BackgroundDTO = {
                color: backgroundColor
            };
            const textColor: ColorDTO = {
                value: "#ffffff"
            };
            const dto : StyleDTO = {
                background,
                textColor
            };
            expect( StyleEntity.isDTO(dto) ).toStrictEqual(true);
        });

        it('can test invalid DTOs', () => {
            expect( StyleEntity.isDTO(false) ).toStrictEqual(false);
            expect( StyleEntity.isDTO(true) ).toStrictEqual(false);
            expect( StyleEntity.isDTO([]) ).toStrictEqual(false);
            expect( StyleEntity.isDTO(null) ).toStrictEqual(false);
            expect( StyleEntity.isDTO(123) ).toStrictEqual(false);
            expect( StyleEntity.isDTO(-100) ).toStrictEqual(false);
            expect( StyleEntity.isDTO(0) ).toStrictEqual(false);
            expect( StyleEntity.isDTO("hello world") ).toStrictEqual(false);
            expect( StyleEntity.isDTO("") ).toStrictEqual(false);
            expect( StyleEntity.isDTO({
                foobar: true,
            }) ).toStrictEqual(false);
            expect( StyleEntity.isDTO({
                color: ColorEntity.create(),
            }) ).toStrictEqual(false);
        });

    });

    describe('.getDTO', () => {
        it('can get DTO', () => {
            let obj = StyleEntity.create().setWidth(100);
            expect(obj.getDTO()).toEqual({
                width: {
                    value: 100,
                    unit: UnitType.PX
                }
            });
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
