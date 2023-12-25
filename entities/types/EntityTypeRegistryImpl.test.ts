// Copyright (c) 2023. Heusala Group Oy <info@hg.fi>. All rights reserved.

import { DTO } from "./DTO";
import { Entity } from "./Entity";
import { EntityFactoryImpl } from "./EntityFactoryImpl";
import { EntityType } from "./EntityType";
import { EntityTypeRegistryImpl } from "./EntityTypeRegistryImpl";

describe('EntityTypeRegistryImpl', () => {

    interface CarDTO extends DTO {
        readonly model: string;
    }

    interface Car extends Entity<CarDTO> {
        getModel() : string;
        setModel(model: string) : this;
    }

    let registry : EntityTypeRegistryImpl;
    let carFactory : EntityFactoryImpl<CarDTO, Car>;
    let CarEntity : EntityType<CarDTO, Car>;

    beforeEach(() => {

        registry = EntityTypeRegistryImpl.create()

        carFactory = (
            EntityFactoryImpl.create<CarDTO, Car>('Car')
                             .add( EntityFactoryImpl.createProperty("model").setDefaultValue("Ford") )
        );

        CarEntity = carFactory.createEntityType('CarEntity');

    });

    afterEach(() => {
        EntityFactoryImpl.destroy();
    });

    describe('#create', () => {
        it('can create registry', () => {
            expect(registry).toBeDefined();
        });
    });

    describe('.destroy', () => {
        it('can destroy registry', () => {
            expect( () => registry.destroy() ).not.toThrow();
        });
    });

    describe('.registerType', () => {
        it('can register type', () => {
            expect( registry.registerType('type', CarEntity) ).toBe(registry);
        });
    });

    describe('.hasType', () => {

        it('can check if type is registered', () => {
            registry.registerType('type', CarEntity);
            expect( registry.hasType('type')).toBe(true);
        });

        it('can check if type is not registered', () => {
            expect( registry.hasType('type')).toBe(false);
        });

    });

    describe('.findType', () => {

        it('can find registered type', () => {
            registry.registerType('type', CarEntity);
            expect( registry.findType('type')).toBe(CarEntity);
        });

        it('cannot find unregistered type', () => {
            expect( registry.findType('type')).toBe(undefined);
        });

    });


    describe('.deleteType', () => {

        it('can unregister type which is registered', () => {
            registry.registerType('type', CarEntity);
            expect( () => registry.deleteType('type')).not.toThrow();
            expect( registry.hasType('type')).toBe(false);
        });

        it('can unregister type which is not registered', () => {
            expect( () => registry.deleteType('type')).not.toThrow();
            expect( registry.hasType('type')).toBe(false);
        });

    });

});
