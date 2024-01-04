// Copyright (c) 2023. Heusala Group Oy <info@hg.fi>. All rights reserved.

import { describe, it, expect } from '@jest/globals';
import { ColorDTO } from "./ColorDTO";
import { ColorEntity } from "./ColorEntity";

describe('ColorEntity', () => {

    describe('#create', () => {
        it('can create color entities', () => {
            let obj = ColorEntity.create();
            expect(obj.getDTO()).toStrictEqual({
                value: ''
            });
        });
    });

    describe('#isDTO', () => {
        it('can test a DTO', () => {
            const dto: ColorDTO = {
                value: "#ffffff"
            };
            expect( ColorEntity.isDTO(dto) ).toStrictEqual(true);
        });
    });

    describe('.getDTO', () => {
        it('can get DTO', () => {
            let obj = ColorEntity.create().setValue('#333');
            expect(obj.getDTO()).toEqual({
                value: '#333'
            });
        });
    });

    describe('.setValue', () => {
        it('can set value by string', () => {
            let obj = ColorEntity.create().setValue('#333');
            expect(obj.getValue()).toEqual('#333');
        });
    });

});
