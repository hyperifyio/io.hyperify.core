// Copyright (c) 2023. Sendanor <info@sendanor.fi>. All rights reserved.

import { beforeEach } from "@jest/globals";
import { DTO } from "../../dto/types/DTO";
import { Entity } from "./Entity";
import { EntityFactoryImpl } from "./EntityFactoryImpl";
import { VariableType } from "./EntityProperty";
import { EntityPropertyImpl } from "./EntityPropertyImpl";
import { EntityType } from "./EntityType";

describe('EntityPropertyImpl', () => {

    describe('#create', () => {

        it('can create a property', () => {
            const item = EntityPropertyImpl.create("test");
            expect( item ).toBeDefined();
            expect( item ).toBeInstanceOf(EntityPropertyImpl);
        });

        it('can create a property which may be optional', () => {
            const item = EntityPropertyImpl.create("test");
            expect( item.isOptional() ).toBe(true);
        });

        it('can create a property which is not an array', () => {
            const item = EntityPropertyImpl.create("test");
            expect( item.isArray() ).toBe(false);
        });

        it('can create property with a name', () => {
            const item = EntityPropertyImpl.create("test");
            expect( item.getPropertyName() ).toBe("test");
        });

        it('can create property with string type', () => {
            const item = EntityPropertyImpl.create("test").setTypes(VariableType.STRING);
            expect( item.getTypes() ).toStrictEqual(["string"]);
        });

        it('can create property with number type', () => {
            const item = EntityPropertyImpl.create("test").setTypes(VariableType.NUMBER);
            expect( item.getTypes() ).toStrictEqual(["number"]);
        });

        it('can create property with boolean type', () => {
            const item = EntityPropertyImpl.create("test").setTypes(VariableType.BOOLEAN);
            expect( item.getTypes() ).toStrictEqual(["boolean"]);
        });

        it('can create property with null type', () => {
            const item = EntityPropertyImpl.create("test").setTypes(VariableType.NULL);
            expect( item.getTypes() ).toStrictEqual(["null"]);
        });

        it('can create property with undefined type', () => {
            const item = EntityPropertyImpl.create("test").setTypes(VariableType.UNDEFINED);
            expect( item.getTypes() ).toStrictEqual(["undefined"]);
        });

        it('can create property with number and undefined types', () => {
            const item = EntityPropertyImpl.create("test").setTypes(VariableType.NUMBER, VariableType.UNDEFINED);
            expect( item.getTypes() ).toStrictEqual(["number", "undefined"]);
        });

        it('can create property with Entity type', () => {
            const carFactory = (
                EntityFactoryImpl.create()
                .add( EntityPropertyImpl.create("model").setTypes(VariableType.STRING).setDefaultValue("Ford") )
            );
            const CarType = carFactory.createEntityType();
            const item = EntityPropertyImpl.create(
                "test").setTypes(CarType);
            expect( item.getTypes() ).toStrictEqual([CarType]);
        });

    });

    describe('#createArray', () => {

        let item : EntityPropertyImpl;

        beforeEach(() => {
            item = EntityPropertyImpl.createArray("test");
        });

        it('can create a property', () => {
            expect( item ).toBeDefined();
            expect( item ).toBeInstanceOf(EntityPropertyImpl);
        });

        it('can create a array property which is an array', () => {
            expect( item.isArray() ).toBe(true);
        });

        it('can create a array property which is not optional', () => {
            expect( item.isOptional() ).toBe(false);
        });

        it('can create a array property with default value as []', () => {
            expect( item.getDefaultValue() ).toStrictEqual([]);
        });

        it('still has a default value after type has been set', () => {
            item.setTypes(VariableType.STRING);
            expect( item.getDefaultValue() ).toStrictEqual([]);
        });


    });

    describe('#createOptionalArray', () => {

        let item : EntityPropertyImpl;

        beforeEach(() => {
            item = EntityPropertyImpl.createOptionalArray("test");
        });

        it('can create a array property', () => {
            expect( item ).toBeDefined();
            expect( item ).toBeInstanceOf(EntityPropertyImpl);
        });

        it('can create a array property which is an array', () => {
            expect( item.isArray() ).toBe(true);
        });

        it('can create a array property which is optional', () => {
            expect( item.isOptional() ).toBe(true);
        });

        it('can create a array property with default value as undefined', () => {
            expect( item.getDefaultValue() ).toStrictEqual(undefined);
        });

        it('still has undefined default value after type has been set', () => {
            item.setTypes(VariableType.STRING);
            expect( item.getDefaultValue() ).toStrictEqual(undefined);
        });

    });

    describe('#getDefaultValue', () => {

        it('can get a default value', () => {
            const item = EntityPropertyImpl.create(
                "test").setTypes(VariableType.STRING).setDefaultValue('Hello');
            expect( item.getDefaultValue() ).toBe('Hello');
        });

        it('can get a default value for an entity', () => {
            const carFactory = (
                EntityFactoryImpl.create()
                .add( EntityPropertyImpl.create("model").setTypes(VariableType.STRING).setDefaultValue("Ford") )
            );
            const CarType = carFactory.createEntityType();
            const item = EntityPropertyImpl.create(
                "test").setTypes(CarType);
            expect( (item.getDefaultValue() as any)?.getDTO() ).toStrictEqual({model: "Ford"});
        });

    });

    describe('#setDefaultValue', () => {

        it('can set a default value', () => {
            const item = EntityPropertyImpl.create("test").setTypes(VariableType.STRING).setDefaultValue('Hello');
            expect( item.getDefaultValue() ).toBe('Hello');
        });

    });

    describe('#defaultValue', () => {

        it('can set a default value', () => {
            const item = EntityPropertyImpl.create(
                "test").setTypes(VariableType.STRING).defaultValue('Hello');
            expect( item.getDefaultValue() ).toBe('Hello');
        });

    });

    describe('#getEntityPropertyTypeFromVariable', () => {

        it('can detect string values', () => {
            expect( EntityPropertyImpl.getEntityPropertyTypeFromVariable('hello') ).toBe(VariableType.STRING);
            expect( EntityPropertyImpl.getEntityPropertyTypeFromVariable('') ).toBe(VariableType.STRING);
        });

        it('can detect integer number values', () => {
            expect( EntityPropertyImpl.getEntityPropertyTypeFromVariable(123) ).toBe(VariableType.INTEGER);
        });

        it('can detect number values', () => {
            expect( EntityPropertyImpl.getEntityPropertyTypeFromVariable(123.123) ).toBe(VariableType.NUMBER);
        });

        it('can detect boolean (false) value', () => {
            expect( EntityPropertyImpl.getEntityPropertyTypeFromVariable(false) ).toBe(VariableType.BOOLEAN);
        });

        it('can detect boolean (true) value', () => {
            expect( EntityPropertyImpl.getEntityPropertyTypeFromVariable(true) ).toBe(VariableType.BOOLEAN);
        });

        it('can detect null value', () => {
            expect( EntityPropertyImpl.getEntityPropertyTypeFromVariable(null) ).toBe(VariableType.NULL);
        });

        it('can detect undefined value', () => {
            expect( EntityPropertyImpl.getEntityPropertyTypeFromVariable(undefined) ).toBe(VariableType.UNDEFINED);
        });

        describe('with entities', () => {

            interface CarDTO extends DTO {
                readonly model: string;
            }

            interface Car extends Entity<CarDTO> {
                getModel() : string;
            }

            let carFactory : EntityFactoryImpl<CarDTO, Car>;
            let CarEntity : EntityType<CarDTO, Car>;

            beforeEach(() => {
                carFactory = (
                    EntityFactoryImpl.create<CarDTO, Car>()
                    .add( EntityPropertyImpl.create("model").setDefaultValue("Ford") )
                );
                CarEntity = carFactory.createEntityType();
            });

            it('can detect entity types', () => {
                const car : Car = CarEntity.create();
                expect( EntityPropertyImpl.getEntityPropertyTypeFromVariable(car) ).toBe(CarEntity);
            });

        });

    });

});
