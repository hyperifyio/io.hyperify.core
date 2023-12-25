// Copyright (c) 2023. Heusala Group Oy <info@hg.fi>. All rights reserved.

import { describe } from "@jest/globals";
import { ChainOperation } from "./ChainOperation";
import { DTO } from "./DTO";
import { Entity } from "./Entity";
import { EntityFactoryImpl } from "./EntityFactoryImpl";
import { EntityTypeCheckFactoryImpl } from "./EntityTypeCheckFactoryImpl";
import { EntityTypeRegistry } from "./EntityTypeRegistry";
import { EntityTypeRegistryImpl } from "./EntityTypeRegistryImpl";
import { VariableType } from "./VariableType";

describe('EntityTypeCheckFactoryImpl', () => {

    let registry : EntityTypeRegistry;
    let factory : EntityTypeCheckFactoryImpl;

    beforeEach( () => {
        registry = EntityTypeRegistryImpl.create();
        factory = EntityTypeCheckFactoryImpl.create(registry);
    });

    afterEach(() => {
        EntityFactoryImpl.destroy();
    });

    describe('.createTypeCheckFn', () => {

        it('can create a test function for null values', () => {
            const fn = factory.createTypeCheckFunction(VariableType.NULL);
            expect( fn({name : 'John', age: 20}) ).toBe(false);
            expect( fn({name : 'John', age: null}) ).toBe(false);
            expect( fn({name : 123, age: 30}) ).toBe(false);
            expect( fn({age: 30}) ).toBe(false);
            expect( fn({name : 123}) ).toBe(false);
            expect( fn(123) ).toBe(false);
            expect( fn(null) ).toBe(true);
            expect( fn(undefined) ).toBe(false);
            expect( fn({}) ).toBe(false);
            expect( fn([]) ).toBe(false);
            expect( fn(true) ).toBe(false);
            expect( fn(false) ).toBe(false);
            expect( fn("hello world") ).toBe(false);
        });

        it('can create a test function for undefined values', () => {
            const fn = factory.createTypeCheckFunction(VariableType.UNDEFINED);
            expect( fn({name : 'John', age: 20}) ).toBe(false);
            expect( fn({name : 'John', age: null}) ).toBe(false);
            expect( fn({name : 123, age: 30}) ).toBe(false);
            expect( fn({age: 30}) ).toBe(false);
            expect( fn({name : 123}) ).toBe(false);
            expect( fn(123) ).toBe(false);
            expect( fn(123.456) ).toBe(false);
            expect( fn(null) ).toBe(false);
            expect( fn(undefined) ).toBe(true);
            expect( fn({}) ).toBe(false);
            expect( fn([]) ).toBe(false);
            expect( fn(true) ).toBe(false);
            expect( fn(false) ).toBe(false);
            expect( fn("hello world") ).toBe(false);
        });

        it('can create a test function for boolean values', () => {
            const fn = factory.createTypeCheckFunction(VariableType.BOOLEAN);
            expect( fn({name : 'John', age: 20}) ).toBe(false);
            expect( fn({name : 'John', age: null}) ).toBe(false);
            expect( fn({name : 123, age: 30}) ).toBe(false);
            expect( fn({age: 30}) ).toBe(false);
            expect( fn({name : 123}) ).toBe(false);
            expect( fn(123) ).toBe(false);
            expect( fn(123.456) ).toBe(false);
            expect( fn(null) ).toBe(false);
            expect( fn(undefined) ).toBe(false);
            expect( fn({}) ).toBe(false);
            expect( fn([]) ).toBe(false);
            expect( fn(true) ).toBe(true);
            expect( fn(false) ).toBe(true);
            expect( fn("hello world") ).toBe(false);
        });

        it('can create a test function for number values', () => {
            const fn = factory.createTypeCheckFunction(VariableType.NUMBER);
            expect( fn({name : 'John', age: 20}) ).toBe(false);
            expect( fn({name : 'John', age: null}) ).toBe(false);
            expect( fn({name : 123, age: 30}) ).toBe(false);
            expect( fn({age: 30}) ).toBe(false);
            expect( fn({name : 123}) ).toBe(false);
            expect( fn(123) ).toBe(true);
            expect( fn(123.456) ).toBe(true);
            expect( fn(null) ).toBe(false);
            expect( fn(undefined) ).toBe(false);
            expect( fn({}) ).toBe(false);
            expect( fn([]) ).toBe(false);
            expect( fn(true) ).toBe(false);
            expect( fn(false) ).toBe(false);
            expect( fn("hello world") ).toBe(false);
        });

        it('can create a test function for integer values', () => {
            const fn = factory.createTypeCheckFunction(VariableType.INTEGER);
            expect( fn({name : 'John', age: 20}) ).toBe(false);
            expect( fn({name : 'John', age: null}) ).toBe(false);
            expect( fn({name : 123, age: 30}) ).toBe(false);
            expect( fn({age: 30}) ).toBe(false);
            expect( fn({name : 123}) ).toBe(false);
            expect( fn(123) ).toBe(true);
            expect( fn(123.456) ).toBe(false);
            expect( fn(null) ).toBe(false);
            expect( fn(undefined) ).toBe(false);
            expect( fn({}) ).toBe(false);
            expect( fn([]) ).toBe(false);
            expect( fn(true) ).toBe(false);
            expect( fn(false) ).toBe(false);
            expect( fn("hello world") ).toBe(false);
        });

        it('can create a test function for enum values', () => {

            enum FooOrBarType {
                FOO = "foo",
                BAR = "bar"
            }

            const fn = factory.createTypeCheckFunction( FooOrBarType );

            expect( fn({name : 'John', age: 20}) ).toBe(false);
            expect( fn({name : 'John', age: null}) ).toBe(false);
            expect( fn({name : 123, age: 30}) ).toBe(false);
            expect( fn({age: 30}) ).toBe(false);
            expect( fn({name : 123}) ).toBe(false);
            expect( fn(123) ).toBe(false);
            expect( fn(123.456) ).toBe(false);
            expect( fn(null) ).toBe(false);
            expect( fn(undefined) ).toBe(false);
            expect( fn({}) ).toBe(false);
            expect( fn([]) ).toBe(false);
            expect( fn(true) ).toBe(false);
            expect( fn(false) ).toBe(false);
            expect( fn("hello world") ).toBe(false);

            expect( fn("foo") ).toBe(true);
            expect( fn("bar") ).toBe(true);
        });

        it('can create a test function for entity values', () => {

            enum GearType {
                AUTOMATIC = "AUTOMATIC",
                MANUAL = "MANUAL"
            }

            interface CarDTO extends DTO {
                readonly model: string;
                readonly gear: GearType;
            }

            interface Car extends Entity<CarDTO> {
                getModel() : string;
                setModel(model: string) : this;
                getGear() : GearType;
                setGear(model: GearType) : this;
            }

            const carFactory = (
                EntityFactoryImpl.create<CarDTO, Car>('Car')
                                 .add( EntityFactoryImpl.createProperty("model").setDefaultValue("Ford") )
                                 .add( EntityFactoryImpl.createProperty("gear").setTypes(GearType).setDefaultValue(GearType.AUTOMATIC) )
            );

            const CarEntity = carFactory.createEntityType('CarEntity');

            const fn = factory.createTypeCheckFunction( CarEntity );

            expect( fn( CarEntity.create() ) ) .toBe(true);

            expect( fn({name : 'John', age: 20}) ).toBe(false);
            expect( fn({name : 'John', age: null}) ).toBe(false);
            expect( fn({name : 123, age: 30}) ).toBe(false);
            expect( fn({age: 30}) ).toBe(false);
            expect( fn({name : 123}) ).toBe(false);
            expect( fn(123) ).toBe(false);
            expect( fn(123.456) ).toBe(false);
            expect( fn(null) ).toBe(false);
            expect( fn(undefined) ).toBe(false);
            expect( fn({}) ).toBe(false);
            expect( fn([]) ).toBe(false);
            expect( fn(true) ).toBe(false);
            expect( fn(false) ).toBe(false);
            expect( fn("hello world") ).toBe(false);
            expect( fn("foo") ).toBe(false);
            expect( fn("bar") ).toBe(false);
        });

    });

    describe('.createChainedTypeCheckFunction', () => {

        it('can create a test function for null values', () => {
            const fn = factory.createChainedTypeCheckFunction(ChainOperation.OR, VariableType.NULL);
            expect( fn({name : 'John', age: 20}) ).toBe(false);
            expect( fn({name : 'John', age: null}) ).toBe(false);
            expect( fn({name : 123, age: 30}) ).toBe(false);
            expect( fn({age: 30}) ).toBe(false);
            expect( fn({name : 123}) ).toBe(false);
            expect( fn(123) ).toBe(false);
            expect( fn(null) ).toBe(true);
            expect( fn(undefined) ).toBe(false);
            expect( fn({}) ).toBe(false);
            expect( fn([]) ).toBe(false);
            expect( fn(true) ).toBe(false);
            expect( fn(false) ).toBe(false);
            expect( fn("hello world") ).toBe(false);
        });

        it('can create a test function for undefined values', () => {
            const fn = factory.createChainedTypeCheckFunction(ChainOperation.OR, VariableType.UNDEFINED);
            expect( fn({name : 'John', age: 20}) ).toBe(false);
            expect( fn({name : 'John', age: null}) ).toBe(false);
            expect( fn({name : 123, age: 30}) ).toBe(false);
            expect( fn({age: 30}) ).toBe(false);
            expect( fn({name : 123}) ).toBe(false);
            expect( fn(123) ).toBe(false);
            expect( fn(123.456) ).toBe(false);
            expect( fn(null) ).toBe(false);
            expect( fn(undefined) ).toBe(true);
            expect( fn({}) ).toBe(false);
            expect( fn([]) ).toBe(false);
            expect( fn(true) ).toBe(false);
            expect( fn(false) ).toBe(false);
            expect( fn("hello world") ).toBe(false);
        });

        it('can create a test function for boolean values', () => {
            const fn = factory.createChainedTypeCheckFunction(ChainOperation.OR, VariableType.BOOLEAN);
            expect( fn({name : 'John', age: 20}) ).toBe(false);
            expect( fn({name : 'John', age: null}) ).toBe(false);
            expect( fn({name : 123, age: 30}) ).toBe(false);
            expect( fn({age: 30}) ).toBe(false);
            expect( fn({name : 123}) ).toBe(false);
            expect( fn(123) ).toBe(false);
            expect( fn(123.456) ).toBe(false);
            expect( fn(null) ).toBe(false);
            expect( fn(undefined) ).toBe(false);
            expect( fn({}) ).toBe(false);
            expect( fn([]) ).toBe(false);
            expect( fn(true) ).toBe(true);
            expect( fn(false) ).toBe(true);
            expect( fn("hello world") ).toBe(false);
        });

        it('can create a test function for number values', () => {
            const fn = factory.createChainedTypeCheckFunction(ChainOperation.OR, VariableType.NUMBER);
            expect( fn({name : 'John', age: 20}) ).toBe(false);
            expect( fn({name : 'John', age: null}) ).toBe(false);
            expect( fn({name : 123, age: 30}) ).toBe(false);
            expect( fn({age: 30}) ).toBe(false);
            expect( fn({name : 123}) ).toBe(false);
            expect( fn(123) ).toBe(true);
            expect( fn(123.456) ).toBe(true);
            expect( fn(null) ).toBe(false);
            expect( fn(undefined) ).toBe(false);
            expect( fn({}) ).toBe(false);
            expect( fn([]) ).toBe(false);
            expect( fn(true) ).toBe(false);
            expect( fn(false) ).toBe(false);
            expect( fn("hello world") ).toBe(false);
        });

        it('can create a test function for integer values', () => {
            const fn = factory.createChainedTypeCheckFunction(ChainOperation.OR, VariableType.INTEGER);
            expect( fn({name : 'John', age: 20}) ).toBe(false);
            expect( fn({name : 'John', age: null}) ).toBe(false);
            expect( fn({name : 123, age: 30}) ).toBe(false);
            expect( fn({age: 30}) ).toBe(false);
            expect( fn({name : 123}) ).toBe(false);
            expect( fn(123) ).toBe(true);
            expect( fn(123.456) ).toBe(false);
            expect( fn(null) ).toBe(false);
            expect( fn(undefined) ).toBe(false);
            expect( fn({}) ).toBe(false);
            expect( fn([]) ).toBe(false);
            expect( fn(true) ).toBe(false);
            expect( fn(false) ).toBe(false);
            expect( fn("hello world") ).toBe(false);
        });

        it('can create a test function for integer or string values', () => {
            const fn = factory.createChainedTypeCheckFunction(ChainOperation.OR, VariableType.INTEGER, VariableType.STRING);

            expect( fn(123) ).toBe(true);
            expect( fn("hello world") ).toBe(true);

            expect( fn({name : 'John', age: 20}) ).toBe(false);
            expect( fn({name : 'John', age: null}) ).toBe(false);
            expect( fn({name : 123, age: 30}) ).toBe(false);
            expect( fn({age: 30}) ).toBe(false);
            expect( fn({name : 123}) ).toBe(false);
            expect( fn(123.456) ).toBe(false);
            expect( fn(null) ).toBe(false);
            expect( fn(undefined) ).toBe(false);
            expect( fn({}) ).toBe(false);
            expect( fn([]) ).toBe(false);
            expect( fn(true) ).toBe(false);
            expect( fn(false) ).toBe(false);
        });

        it('can create a test function for integer or undefined values', () => {
            const fn = factory.createChainedTypeCheckFunction(ChainOperation.OR, VariableType.INTEGER, VariableType.UNDEFINED);
            expect( fn({name : 'John', age: 20}) ).toBe(false);
            expect( fn({name : 'John', age: null}) ).toBe(false);
            expect( fn({name : 123, age: 30}) ).toBe(false);
            expect( fn({age: 30}) ).toBe(false);
            expect( fn({name : 123}) ).toBe(false);
            expect( fn(123) ).toBe(true);
            expect( fn(123.456) ).toBe(false);
            expect( fn(null) ).toBe(false);
            expect( fn(undefined) ).toBe(true);
            expect( fn({}) ).toBe(false);
            expect( fn([]) ).toBe(false);
            expect( fn(true) ).toBe(false);
            expect( fn(false) ).toBe(false);
            expect( fn("hello world") ).toBe(false);
        });

        it('can create a test function for enum values', () => {

            enum FooOrBarType {
                FOO = "foo",
                BAR = "bar"
            }

            const fn = factory.createChainedTypeCheckFunction(ChainOperation.OR, FooOrBarType );

            expect( fn({name : 'John', age: 20}) ).toBe(false);
            expect( fn({name : 'John', age: null}) ).toBe(false);
            expect( fn({name : 123, age: 30}) ).toBe(false);
            expect( fn({age: 30}) ).toBe(false);
            expect( fn({name : 123}) ).toBe(false);
            expect( fn(123) ).toBe(false);
            expect( fn(123.456) ).toBe(false);
            expect( fn(null) ).toBe(false);
            expect( fn(undefined) ).toBe(false);
            expect( fn({}) ).toBe(false);
            expect( fn([]) ).toBe(false);
            expect( fn(true) ).toBe(false);
            expect( fn(false) ).toBe(false);
            expect( fn("hello world") ).toBe(false);

            expect( fn("foo") ).toBe(true);
            expect( fn("bar") ).toBe(true);
        });

    });

    describe('#createChainedTypeExplainFunction', () => {

        it('can create an explain function for null values', () => {
            const fn = factory.createChainedTypeExplainFunction(ChainOperation.OR, VariableType.NULL);
            expect( fn({name : 'John', age: 20}) ).toBe('not null');
            expect( fn({name : 'John', age: null}) ).toBe('not null');
            expect( fn({name : 123, age: 30}) ).toBe('not null');
            expect( fn({age: 30}) ).toBe('not null');
            expect( fn({name : 123}) ).toBe('not null');
            expect( fn(123) ).toBe('not null');
            expect( fn(null) ).toBe('OK');
            expect( fn(undefined) ).toBe('not null');
            expect( fn({}) ).toBe('not null');
            expect( fn([]) ).toBe('not null');
            expect( fn(true) ).toBe('not null');
            expect( fn(false) ).toBe('not null');
            expect( fn("hello world") ).toBe('not null');
        });

        it('can create an explain function for undefined values', () => {
            const fn = factory.createChainedTypeExplainFunction(ChainOperation.OR, VariableType.UNDEFINED);
            expect( fn({name : 'John', age: 20}) ).toBe('not undefined');
            expect( fn({name : 'John', age: null}) ).toBe('not undefined');
            expect( fn({name : 123, age: 30}) ).toBe('not undefined');
            expect( fn({age: 30}) ).toBe('not undefined');
            expect( fn({name : 123}) ).toBe('not undefined');
            expect( fn(123) ).toBe('not undefined');
            expect( fn(123.456) ).toBe('not undefined');
            expect( fn(null) ).toBe('not undefined');
            expect( fn(undefined) ).toBe('OK');
            expect( fn({}) ).toBe('not undefined');
            expect( fn([]) ).toBe('not undefined');
            expect( fn(true) ).toBe('not undefined');
            expect( fn(false) ).toBe('not undefined');
            expect( fn("hello world") ).toBe('not undefined');
        });

        it('can create an explain function for boolean values', () => {
            const fn = factory.createChainedTypeExplainFunction(ChainOperation.OR, VariableType.BOOLEAN);
            expect( fn({name : 'John', age: 20}) ).toBe('not boolean');
            expect( fn({name : 'John', age: null}) ).toBe('not boolean');
            expect( fn({name : 123, age: 30}) ).toBe('not boolean');
            expect( fn({age: 30}) ).toBe('not boolean');
            expect( fn({name : 123}) ).toBe('not boolean');
            expect( fn(123) ).toBe('not boolean');
            expect( fn(123.456) ).toBe('not boolean');
            expect( fn(null) ).toBe('not boolean');
            expect( fn(undefined) ).toBe('not boolean');
            expect( fn({}) ).toBe('not boolean');
            expect( fn([]) ).toBe('not boolean');
            expect( fn(true) ).toBe('OK');
            expect( fn(false) ).toBe('OK');
            expect( fn("hello world") ).toBe('not boolean');
        });

        it('can create an explain function for number values', () => {
            const fn = factory.createChainedTypeExplainFunction(ChainOperation.OR, VariableType.NUMBER);
            expect( fn({name : 'John', age: 20}) ).toBe('not number');
            expect( fn({name : 'John', age: null}) ).toBe('not number');
            expect( fn({name : 123, age: 30}) ).toBe('not number');
            expect( fn({age: 30}) ).toBe('not number');
            expect( fn({name : 123}) ).toBe('not number');
            expect( fn(123) ).toBe('OK');
            expect( fn(123.456) ).toBe('OK');
            expect( fn(null) ).toBe('not number');
            expect( fn(undefined) ).toBe('not number');
            expect( fn({}) ).toBe('not number');
            expect( fn([]) ).toBe('not number');
            expect( fn(true) ).toBe('not number');
            expect( fn(false) ).toBe('not number');
            expect( fn("hello world") ).toBe('not number');
        });

        it('can create an explain function for integer values', () => {
            const fn = factory.createChainedTypeExplainFunction(ChainOperation.OR, VariableType.INTEGER);
            expect( fn({name : 'John', age: 20}) ).toBe('not integer');
            expect( fn({name : 'John', age: null}) ).toBe('not integer');
            expect( fn({name : 123, age: 30}) ).toBe('not integer');
            expect( fn({age: 30}) ).toBe('not integer');
            expect( fn({name : 123}) ).toBe('not integer');
            expect( fn(123) ).toBe('OK');
            expect( fn(123.456) ).toBe('not integer');
            expect( fn(null) ).toBe('not integer');
            expect( fn(undefined) ).toBe('not integer');
            expect( fn({}) ).toBe('not integer');
            expect( fn([]) ).toBe('not integer');
            expect( fn(true) ).toBe('not integer');
            expect( fn(false) ).toBe('not integer');
            expect( fn("hello world") ).toBe('not integer');
        });

        it('can create an explain function for integer or string values', () => {
            const fn = factory.createChainedTypeExplainFunction(ChainOperation.OR, VariableType.INTEGER, VariableType.STRING);
            expect( fn({name : 'John', age: 20}) ).toBe(`not one of:\n - integer\n - string`);
            expect( fn({name : 'John', age: null}) ).toBe(`not one of:\n - integer\n - string`);
            expect( fn({name : 123, age: 30}) ).toBe(`not one of:\n - integer\n - string`);
            expect( fn({age: 30}) ).toBe(`not one of:\n - integer\n - string`);
            expect( fn({name : 123}) ).toBe(`not one of:\n - integer\n - string`);
            expect( fn(123) ).toBe('OK');
            expect( fn(123.456) ).toBe(`not one of:\n - integer\n - string`);
            expect( fn(null) ).toBe(`not one of:\n - integer\n - string`);
            expect( fn(undefined) ).toBe(`not one of:\n - integer\n - string`);
            expect( fn({}) ).toBe(`not one of:\n - integer\n - string`);
            expect( fn([]) ).toBe(`not one of:\n - integer\n - string`);
            expect( fn(true) ).toBe(`not one of:\n - integer\n - string`);
            expect( fn(false) ).toBe(`not one of:\n - integer\n - string`);
            expect( fn("hello world") ).toBe('OK');
        });

        it('can create an explain function for integer or undefined values', () => {
            const fn = factory.createChainedTypeExplainFunction(ChainOperation.OR, VariableType.INTEGER, VariableType.UNDEFINED);
            expect( fn({name : 'John', age: 20}) ).toBe(`not one of:\n - integer\n - undefined`);
            expect( fn({name : 'John', age: null}) ).toBe(`not one of:\n - integer\n - undefined`);
            expect( fn({name : 123, age: 30}) ).toBe(`not one of:\n - integer\n - undefined`);
            expect( fn({age: 30}) ).toBe(`not one of:\n - integer\n - undefined`);
            expect( fn({name : 123}) ).toBe(`not one of:\n - integer\n - undefined`);
            expect( fn(123) ).toBe('OK');
            expect( fn(123.456) ).toBe(`not one of:\n - integer\n - undefined`);
            expect( fn(null) ).toBe(`not one of:\n - integer\n - undefined`);
            expect( fn(undefined) ).toBe('OK');
            expect( fn({}) ).toBe(`not one of:\n - integer\n - undefined`);
            expect( fn([]) ).toBe(`not one of:\n - integer\n - undefined`);
            expect( fn(true) ).toBe(`not one of:\n - integer\n - undefined`);
            expect( fn(false) ).toBe(`not one of:\n - integer\n - undefined`);
            expect( fn("hello world") ).toBe(`not one of:\n - integer\n - undefined`);
        });

        it('can create an explain function for enum values', () => {

            enum FooOrBarType {
                FOO = "foo",
                BAR = "bar"
            }

            const fn = factory.createChainedTypeExplainFunction(ChainOperation.OR,  FooOrBarType );

            expect( fn({name : 'John', age: 20}) ).toBe('not enum (foo | bar)');
            expect( fn({name : 'John', age: null}) ).toBe('not enum (foo | bar)');
            expect( fn({name : 123, age: 30}) ).toBe('not enum (foo | bar)');
            expect( fn({age: 30}) ).toBe('not enum (foo | bar)');
            expect( fn({name : 123}) ).toBe('not enum (foo | bar)');
            expect( fn(123) ).toBe('not enum (foo | bar)');
            expect( fn(123.456) ).toBe('not enum (foo | bar)');
            expect( fn(null) ).toBe('not enum (foo | bar)');
            expect( fn(undefined) ).toBe('not enum (foo | bar)');
            expect( fn({}) ).toBe('not enum (foo | bar)');
            expect( fn([]) ).toBe('not enum (foo | bar)');
            expect( fn(true) ).toBe('not enum (foo | bar)');
            expect( fn(false) ).toBe('not enum (foo | bar)');
            expect( fn("hello world") ).toBe('not enum (foo | bar)');

            expect( fn("foo") ).toBe('OK');
            expect( fn("bar") ).toBe('OK');
        });

        it('can create an explain function for entity values', () => {

            enum GearType {
                AUTOMATIC = "AUTOMATIC",
                MANUAL = "MANUAL"
            }

            interface CarDTO extends DTO {
                readonly model: string;
                readonly gear: GearType;
            }

            interface Car extends Entity<CarDTO> {
                getModel() : string;
                setModel(model: string) : this;
                getGear() : GearType;
                setGear(model: GearType) : this;
            }

            const carFactory = (
                EntityFactoryImpl.create<CarDTO, Car>('Car')
                                 .add( EntityFactoryImpl.createProperty("model").setDefaultValue("Ford") )
                                 .add( EntityFactoryImpl.createProperty("gear").setTypes(GearType).setDefaultValue(GearType.AUTOMATIC) )
            );

            const CarEntity = carFactory.createEntityType('CarEntity');

            const fn = factory.createChainedTypeExplainFunction(ChainOperation.OR,  CarEntity );

            const car = CarEntity.create();
            const dto = car.getDTO();

            expect( fn( car ) ) .toBe('OK');

            expect( fn( dto ) ) .toBe('not CarEntity');
            expect( fn({name : 'John', age: 20}) ).toBe('not CarEntity');
            expect( fn({name : 'John', age: null}) ).toBe('not CarEntity');
            expect( fn({name : 123, age: 30}) ).toBe('not CarEntity');
            expect( fn({age: 30}) ).toBe('not CarEntity');
            expect( fn({name : 123}) ).toBe('not CarEntity');
            expect( fn(123) ).toBe('not CarEntity');
            expect( fn(123.456) ).toBe('not CarEntity');
            expect( fn(null) ).toBe('not CarEntity');
            expect( fn(undefined) ).toBe('not CarEntity');
            expect( fn({}) ).toBe('not CarEntity');
            expect( fn([]) ).toBe('not CarEntity');
            expect( fn(true) ).toBe('not CarEntity');
            expect( fn(false) ).toBe('not CarEntity');
            expect( fn("hello world") ).toBe('not CarEntity');
            expect( fn("foo") ).toBe('not CarEntity');
            expect( fn("bar") ).toBe('not CarEntity');
        });


    });


});
