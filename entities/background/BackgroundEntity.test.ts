// Copyright (c) 2023. Heusala Group Oy <info@hg.fi>. All rights reserved.

import { describe, it, expect } from '@jest/globals';
import { ColorDTO } from "../color/ColorDTO";
import { BackgroundDTO } from "./BackgroundDTO";
import { BackgroundEntity } from "./BackgroundEntity";

describe('BackgroundEntity', () => {

    describe('#create', () => {
        it('can create an entity', () => {
            let obj = BackgroundEntity.create();
            expect(obj.getDTO()).toStrictEqual({});
        });
    });

    describe('#isDTO', () => {

        it('can test a DTO with color', () => {
            const color : ColorDTO = {
                value: "#222222"
            };
            const dto : BackgroundDTO = {
                color
            };
            expect( BackgroundEntity.isDTO(dto) ).toStrictEqual(true);
        });

    });

    describe('.getDTO', () => {
        it('can get DTO', () => {
            let obj = BackgroundEntity.create().setColor({value: '#333'});
            expect(obj.getDTO()).toStrictEqual({
                color: {
                    value: '#333',
                }
            });
        });
    });

    describe('.setColor', () => {
        it('can set width by number', () => {
            let obj = BackgroundEntity.create().setColor({value: '#444'});
            expect(obj.getDTO()).toStrictEqual({
                color: {
                    value: '#444',
                }
            });
        });
    });

});
