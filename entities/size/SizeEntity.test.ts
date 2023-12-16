// Copyright (c) 2023. Heusala Group Oy <info@hg.fi>. All rights reserved.

import { SizeEntity } from "./SizeEntity";
import { UnitType } from "../types/UnitType";

describe('SizeEntity', () => {

    describe('#create', () => {

        it('can create an entity', () => {
            expect( SizeEntity.create() ).toBeDefined();
        });

        it('can create an entity with auto size by default', () => {
            expect( SizeEntity.create().isAuto() ).toBe(true);
        });

        it('can create an entity with 10 px', () => {
            const entity = SizeEntity.create(10);
            expect( entity.getValue() ).toBe(10);
            expect( entity.getUnitType() ).toBe(UnitType.PX);
        });

        it('can create an entity with 10 %', () => {
            const entity = SizeEntity.create(10, UnitType.PERCENT);
            expect( entity.getValue() ).toBe(10);
            expect( entity.getUnitType() ).toBe(UnitType.PERCENT);
        });

    });

});
