// Copyright (c) 2023. Heusala Group Oy <info@heusalagroup.fi>. All rights reserved.

import { RouteEntity } from "./RouteEntity";

describe('RouteEntity', () => {

    describe('#create', () => {

        it('can create an entity', () => {
            expect( RouteEntity.create() ).toBeDefined();
        });

        it('can create an entity with name and path', () => {
            const entity = RouteEntity.create(
                'example',
                '/example'
            );
            expect( entity.getName() ).toBe('example');
            expect( entity.getPath() ).toBe('/example')
        });

        it('can create an entity with allready written name', () => {
            const entity = RouteEntity.create().setName('example');
            expect( entity.getName() ).toBe('example');
        });

    });

});