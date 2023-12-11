// Copyright (c) 2023. Sendanor <info@sendanor.fi>. All rights reserved.

import {
    beforeEach,
    describe,
} from "@jest/globals";
import "../../../testing/jest/matchers/index";
import { DTO } from "../../dto/types/DTO";
import { BaseEntity } from "./BaseEntity";
import { Entity } from "./Entity";
import { EntityFactoryImpl } from "./EntityFactoryImpl";
import {
    EntityProperty,
    VariableType,
} from "./EntityProperty";
import { EntityPropertyImpl } from "./EntityPropertyImpl";
import { EntityType } from "./EntityType";

describe('EntityFactoryImpl', () => {

    describe('#create', () => {

        it('can create an entity factory instance', () => {
            const item = EntityFactoryImpl.create();
            expect( item ).toBeDefined();
            expect( item ).toBeInstanceOf(EntityFactoryImpl);
        });

        it('can create an entity factory instance with a property', () => {
            const item = (
                EntityFactoryImpl
                    .create()
                    .add( "name", VariableType.STRING)
            );
            const properties = item.getProperties();
            expect( properties?.length ).toBe(1);
            expect( properties[0].getPropertyName() ).toBe("name");
            expect( properties[0].getTypes() ).toStrictEqual(["string"]);
        });

        it('can create an entity factory instance with an optional property', () => {
            const item = (
                EntityFactoryImpl
                    .create()
                    .add( "name", VariableType.STRING, VariableType.UNDEFINED)
            );
            const properties = item.getProperties();
            expect( properties?.length ).toBe(1);
            expect( properties[0].getPropertyName() ).toBe("name");
            expect( properties[0].getTypes() ).toStrictEqual(["string", "undefined"]);
        });

    });

    describe('#createTypeCheckFn', () => {

        it('can create a test function for null values', () => {
            const fn = EntityFactoryImpl.createTypeCheckFn(VariableType.NULL);
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
            const fn = EntityFactoryImpl.createTypeCheckFn(VariableType.UNDEFINED);
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
            const fn = EntityFactoryImpl.createTypeCheckFn(VariableType.BOOLEAN);
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
            const fn = EntityFactoryImpl.createTypeCheckFn(VariableType.NUMBER);
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
            const fn = EntityFactoryImpl.createTypeCheckFn(VariableType.INTEGER);
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
            const fn = EntityFactoryImpl.createTypeCheckFn(VariableType.INTEGER, VariableType.STRING);
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
            expect( fn("hello world") ).toBe(true);
        });

        it('can create a test function for integer or undefined values', () => {
            const fn = EntityFactoryImpl.createTypeCheckFn(VariableType.INTEGER, VariableType.UNDEFINED);
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

    });

    describe('.createDefaultDTO', () => {

        it('can create a default DTO object with undefined value', () => {
            const item = (
                EntityFactoryImpl.create()
                .add( "name", VariableType.STRING, VariableType.UNDEFINED)
            );
            expect( item.createDefaultDTO() ).toStrictEqual({});
        });

        it('can create a default DTO object with null value', () => {
            const item = (
                EntityFactoryImpl.create()
                .add( "name", VariableType.STRING, VariableType.NULL)
            );
            expect( item.createDefaultDTO() ).toStrictEqual({ name: null });
        });

        it('can create a default DTO object with null and undefined values', () => {
            const item = (
                EntityFactoryImpl.create()
                .add( "name", VariableType.STRING, VariableType.NULL, VariableType.UNDEFINED)
            );
            expect( item.createDefaultDTO() ).toStrictEqual({ });
        });

        it('can create a default DTO object with string value', () => {
            const item = (
                EntityFactoryImpl.create()
                .add( "name", VariableType.STRING)
            );
            expect( item.createDefaultDTO() ).toStrictEqual({ name : '' });
        });

        it('can create a default DTO object with number value', () => {
            const item = (
                EntityFactoryImpl.create()
                .add( "name", VariableType.NUMBER)
            );
            expect( item.createDefaultDTO() ).toStrictEqual({ name : 0 });
        });

        it('can create a default DTO object with boolean value', () => {
            const item = (
                EntityFactoryImpl.create()
                .add( "name", VariableType.BOOLEAN)
            );
            expect( item.createDefaultDTO() ).toStrictEqual({ name : false });
        });

        it('can create a default DTO object with integer value', () => {
            const item = (
                EntityFactoryImpl.create()
                .add( "name", VariableType.INTEGER)
            );
            expect( item.createDefaultDTO() ).toStrictEqual({ name : 0 });
        });

        it('can create a default DTO object with multiple properties', () => {
            const item = (
                EntityFactoryImpl.create()
                .add( "age", VariableType.INTEGER)
                .add( "name", VariableType.STRING)
            );
            expect( item.createDefaultDTO() ).toStrictEqual({ name : '', age: 0 });
        });

        it('can create a default DTO object with custom default values', () => {
            const item = (
                EntityFactoryImpl.create()
                .add( EntityPropertyImpl.create("age").setTypes(VariableType.INTEGER).setDefaultValue(30) )
                .add( EntityPropertyImpl.create("name").setTypes(VariableType.STRING).setDefaultValue('Smith') )
            );
            expect( item.createDefaultDTO() ).toStrictEqual({ name : 'Smith', age: 30 });
        });

        it('can create a default DTO object with non-optional array values', () => {
            const item = (
                EntityFactoryImpl.create()
                .add( EntityPropertyImpl.create("age").setTypes(VariableType.INTEGER).setDefaultValue(30) )
                .add( EntityPropertyImpl.createArray("firstNames").setTypes(VariableType.STRING).setDefaultValue(['John', 'Edward']) )
            );
            expect( item.createDefaultDTO() ).toStrictEqual({
                firstNames : [
                    'John',
                    'Edward'
                ],
                age: 30
            });
        });

        it('can create a default DTO object with non-optional empty array values', () => {
            const item = (
                EntityFactoryImpl.create()
                .add( EntityPropertyImpl.create("age").setTypes(VariableType.INTEGER).setDefaultValue(30) )
                .add( EntityPropertyImpl.createArray("firstNames").setTypes(VariableType.STRING) )
            );
            expect( item.createDefaultDTO() ).toStrictEqual({
                age: 30,
                firstNames: []
            });
        });

        it('can create a default DTO object with non-defined optional array values', () => {
            const item = (
                EntityFactoryImpl.create()
                .add( EntityPropertyImpl.create("age").setTypes(VariableType.INTEGER).setDefaultValue(30) )
                .add( EntityPropertyImpl.createOptionalArray("firstNames").setTypes(VariableType.STRING) )
            );
            expect( item.createDefaultDTO() ).toStrictEqual({
                age: 30
            });
        });

        it('can create a default DTO object with defined optional array values', () => {
            const item = (
                EntityFactoryImpl.create()
                .add( EntityPropertyImpl.create("age").setTypes(VariableType.INTEGER).setDefaultValue(30) )
                .add( EntityPropertyImpl.createOptionalArray("firstNames").setTypes(VariableType.STRING).setDefaultValue(['John', 'Edward']) )
            );
            expect( item.createDefaultDTO() ).toStrictEqual({
                firstNames : [
                    'John',
                    'Edward'
                ],
                age: 30
            });
        });

    });

    describe('.createIsDTO', () => {

        it('can create a test function for DTOs', () => {

            const item = (
                EntityFactoryImpl.create()
                .add( EntityPropertyImpl.create("age").setTypes(VariableType.INTEGER).setDefaultValue(30) )
                .add( EntityPropertyImpl.create("name").setTypes(VariableType.STRING).setDefaultValue('Smith') )
            );

            const fn = item.createIsDTO();

            expect( fn({name : 'John', age: 20}) ).toBe(true);

            expect( fn({name : 'John', age: null}) ).toBe(false);
            expect( fn({name : 123, age: 30}) ).toBe(false);
            expect( fn({age: 30}) ).toBe(false);
            expect( fn({name : 123}) ).toBe(false);
            expect( fn(123) ).toBe(false);
            expect( fn(null) ).toBe(false);
            expect( fn(undefined) ).toBe(false);
            expect( fn({}) ).toBe(false);
            expect( fn([]) ).toBe(false);
            expect( fn(true) ).toBe(false);
            expect( fn(false) ).toBe(false);
            expect( fn("hello world") ).toBe(false);

        });

    });

    describe('.createEntityType', () => {

        interface MyDTO extends DTO {
            readonly age : number;
            readonly name : string;
        }

        interface MyEntity extends Entity<MyDTO> {
            getAge () : number;
            getName () : string;
            setAge (age: number) : this;
            setName (name: string) : this;
            age (age: number) : this;
            name (name: string) : this;
        }

        interface MyReadonlyEntity extends Entity<MyDTO> {
            getAge () : number;
            getName () : string;
        }

        let factory : EntityFactoryImpl<MyDTO, MyEntity>;

        beforeEach ( () => {
            factory = (
                EntityFactoryImpl.create<MyDTO, MyEntity>()
                    .add( EntityPropertyImpl.create("age").setTypes(VariableType.INTEGER).setDefaultValue(30) )
                    .add( EntityPropertyImpl.create("name").setTypes(VariableType.STRING).setDefaultValue('Smith') )
            );
        });

        describe('.getName and .getAge', () => {

            it('can create an entity constructor with .getName and .getAge', () => {
                const MyType = factory.createEntityType();
                const entity = MyType.create();
                expect( entity.getName() ).toBe('Smith');
                expect( entity.getAge() ).toBe(30);
            });

            it('can create an entity constructor with readonly entities', () => {
                const ReadonlyEntityType = factory.createEntityType({
                    immutable: true
                });
                const entity = ReadonlyEntityType.create();
                expect( entity.getName() ).toBe('Smith');
                expect( entity.getAge() ).toBe(30);
                expect( entity.setName ).toBe(undefined);
                expect( entity.setAge ).toBe(undefined);
            });

        });

        describe('.setName and .setAge', () => {

            it('can create an entity constructor with writable entities with .setName and .setAge', () => {
                const EntityType = factory.createEntityType();
                const entity = EntityType.create();
                expect( entity.getName() ).toBe('Smith');
                expect( entity.getAge() ).toBe(30);
                entity.setName('Alice').setAge(18);
                expect( entity.getName() ).toBe('Alice');
                expect( entity.getAge() ).toBe(18);
            });

        });

        describe('.name and .age', () => {

            it('can create an entity constructor with writable entities with .name and .age', () => {
                const EntityType = factory.createEntityType();
                const entity = EntityType.create();
                expect( entity.getName() ).toBe('Smith');
                expect( entity.getAge() ).toBe(30);
                entity.name('Alice').age(18);
                expect( entity.getName() ).toBe('Alice');
                expect( entity.getAge() ).toBe(18);
            });

        });

        describe('.getDTO', () => {

            it('can create an entity constructor with .getDTO', () => {
                const EntityType = factory.createEntityType();
                const entity = EntityType.create();
                expect( entity.getDTO() ).toStrictEqual({name: 'Smith', age: 30});
            });

        });

        describe('.toJSON', () => {

            it('can create an entity constructor with .toJSON', () => {
                const EntityType = factory.createEntityType();
                const entity = EntityType.create();
                expect( entity.toJSON() ).toStrictEqual({name: 'Smith', age: 30});
            });

        });

        describe('.valueOf', () => {

            it('can create an entity constructor with .valueOf', () => {
                const EntityType = factory.createEntityType();
                const entity = EntityType.create();
                expect( entity.valueOf() ).toStrictEqual({name: 'Smith', age: 30});
            });

        });

        describe('#isDTO', () => {

            it('can create a test function for readonly DTOs', () => {

                const ReadonlyEntityType = factory.createEntityType({
                    immutable: true
                });

                expect( ReadonlyEntityType.isDTO({name : 'John', age: 30}) ).toBe(true);
                expect( ReadonlyEntityType.isDTO({name : 'John', age: null}) ).toBe(false);
                expect( ReadonlyEntityType.isDTO({name : 123, age: 30}) ).toBe(false);
                expect( ReadonlyEntityType.isDTO({age: 30}) ).toBe(false);
                expect( ReadonlyEntityType.isDTO({name : 123}) ).toBe(false);
                expect( ReadonlyEntityType.isDTO(123) ).toBe(false);
                expect( ReadonlyEntityType.isDTO(null) ).toBe(false);
                expect( ReadonlyEntityType.isDTO(undefined) ).toBe(false);
                expect( ReadonlyEntityType.isDTO({}) ).toBe(false);
                expect( ReadonlyEntityType.isDTO([]) ).toBe(false);
                expect( ReadonlyEntityType.isDTO(true) ).toBe(false);
                expect( ReadonlyEntityType.isDTO(false) ).toBe(false);
                expect( ReadonlyEntityType.isDTO("hello world") ).toBe(false);

            });

            it('can create a test function for DTOs', () => {

                const EntityType = factory.createEntityType();

                expect( EntityType.isDTO({name : 'John', age: 30}) ).toBe(true);
                expect( EntityType.isDTO({name : 'John', age: null}) ).toBe(false);
                expect( EntityType.isDTO({name : 123, age: 30}) ).toBe(false);
                expect( EntityType.isDTO({age: 30}) ).toBe(false);
                expect( EntityType.isDTO({name : 123}) ).toBe(false);
                expect( EntityType.isDTO(123) ).toBe(false);
                expect( EntityType.isDTO(null) ).toBe(false);
                expect( EntityType.isDTO(undefined) ).toBe(false);
                expect( EntityType.isDTO({}) ).toBe(false);
                expect( EntityType.isDTO([]) ).toBe(false);
                expect( EntityType.isDTO(true) ).toBe(false);
                expect( EntityType.isDTO(false) ).toBe(false);
                expect( EntityType.isDTO("hello world") ).toBe(false);

            });

        });

        describe('#is', () => {


            it('can create a test function for readonly entities', () => {

                const ReadonlyEntityType = factory.createEntityType({
                    immutable: true
                });
                const entity = ReadonlyEntityType.create();

                expect( ReadonlyEntityType.isEntity(entity) ).toBe(true);
                expect( ReadonlyEntityType.isEntity({name : 'John', age: 30}) ).toBe(false);
                expect( ReadonlyEntityType.isEntity({name : 'John', age: null}) ).toBe(false);
                expect( ReadonlyEntityType.isEntity({name : 123, age: 30}) ).toBe(false);
                expect( ReadonlyEntityType.isEntity({age: 30}) ).toBe(false);
                expect( ReadonlyEntityType.isEntity({name : 123}) ).toBe(false);
                expect( ReadonlyEntityType.isEntity(123) ).toBe(false);
                expect( ReadonlyEntityType.isEntity(null) ).toBe(false);
                expect( ReadonlyEntityType.isEntity(undefined) ).toBe(false);
                expect( ReadonlyEntityType.isEntity({}) ).toBe(false);
                expect( ReadonlyEntityType.isEntity([]) ).toBe(false);
                expect( ReadonlyEntityType.isEntity(true) ).toBe(false);
                expect( ReadonlyEntityType.isEntity(false) ).toBe(false);
                expect( ReadonlyEntityType.isEntity("hello world") ).toBe(false);

            });

            it('can create a test function for entities', () => {

                const EntityType = factory.createEntityType();
                const entity = EntityType.create();

                expect( EntityType.isEntity(entity) ).toBe(true);
                expect( EntityType.isEntity({name : 'John', age: 30}) ).toBe(false);
                expect( EntityType.isEntity({name : 'John', age: null}) ).toBe(false);
                expect( EntityType.isEntity({name : 123, age: 30}) ).toBe(false);
                expect( EntityType.isEntity({age: 30}) ).toBe(false);
                expect( EntityType.isEntity({name : 123}) ).toBe(false);
                expect( EntityType.isEntity(123) ).toBe(false);
                expect( EntityType.isEntity(null) ).toBe(false);
                expect( EntityType.isEntity(undefined) ).toBe(false);
                expect( EntityType.isEntity({}) ).toBe(false);
                expect( EntityType.isEntity([]) ).toBe(false);
                expect( EntityType.isEntity(true) ).toBe(false);
                expect( EntityType.isEntity(false) ).toBe(false);
                expect( EntityType.isEntity("hello world") ).toBe(false);

            });

        });

        describe('#createFromDTO', () => {

            it('can create an entity from DTO', () => {
                const EntityType = factory.createEntityType();
                const entity = EntityType.createFromDTO({name:'Jack', age:38});
                expect( entity.getName() ).toBe('Jack');
                expect( entity.getAge() ).toBe(38);
            });

        });

        describe('#getProperties', () => {

            it('can get entity properties', () => {
                const EntityType = factory.createEntityType();
                const entity = EntityType.getProperties();
                expect( entity.length ).toBe(2);
                expect( entity[0].getPropertyName()).toBe('age');
                expect( entity[1].getPropertyName()).toBe('name');
            });

        });


    });

    describe('with inner entities', () => {

        interface CarDTO extends DTO {
            readonly model: string;
        }

        interface Car extends Entity<CarDTO> {
            getModel() : string;
            setModel(model: string) : this;
        }

        interface DriverDTO extends DTO {
            readonly name : string;
            readonly age : number;
            readonly car : CarDTO;
        }

        interface Driver extends Entity<DriverDTO> {
            getCar() : Car;
            getCarDTO() : CarDTO;
            setCar(value: Car) : this;
            setCarDTO(value: CarDTO) : this;
        }

        let carFactory : EntityFactoryImpl<CarDTO, Car>;
        let CarType : EntityType<CarDTO, Car>;
        let driverFactory : EntityFactoryImpl<DriverDTO, Driver>;
        let DriverType : EntityType<DriverDTO, Driver>;

        beforeEach(() => {

            carFactory = (
                EntityFactoryImpl.create<CarDTO, Car>()
                .add( EntityPropertyImpl.create("model").setDefaultValue("Ford") )
            );
            CarType = carFactory.createEntityType();

            driverFactory = (
                EntityFactoryImpl.create<DriverDTO, Driver>()
                .add( EntityPropertyImpl.create("age").setDefaultValue(30) )
                .add( EntityPropertyImpl.create("name").setDefaultValue('Smith') )
                .add( EntityPropertyImpl.create("car").setTypes(CarType) )
            );
            DriverType = driverFactory.createEntityType();

        });

        describe('.createDefaultDTO', () => {

            it('can create a default DTO object with an inner entity value', () => {
                expect( driverFactory.createDefaultDTO() ).toStrictEqual({
                    name : 'Smith',
                    age: 30,
                    car: {model: "Ford"}
                });
            });

        });

        describe('.create', () => {

            it('can create a entity with DTO getters for an inner entity property .getCar()', () => {
                const driver : Driver = DriverType.create();
                expect( driver.getCar().getDTO() ).toStrictEqual({model: "Ford"});
            });

            it('can create a entity with DTO getters for an inner entity property .getCarDTO()', () => {
                const driver : Driver = DriverType.create();
                expect( driver.getCarDTO() ).toStrictEqual({model: "Ford"});
            });

            it('can create a entity with DTO getters for an inner entity property .setCar()', () => {
                const driver : Driver = DriverType.create();
                expect( driver.setCar( CarType.create().setModel('Tesla') ) ).toBe(driver);
                expect( driver.getCar().getDTO() ).toStrictEqual({model: "Tesla"});
            });

            it('can create a entity with DTO getters for an inner entity property .setCarDTO()', () => {
                const driver : Driver = DriverType.create();
                expect( driver.setCar( CarType.create().setModel('Tesla') ) ).toBe(driver);
                expect( driver.getCarDTO() ).toStrictEqual({model: "Tesla"});
            });

            it('can create an type which can be used as a base class', () => {

                class MyDriver extends DriverType {

                    public static create () : MyDriver {
                        return new MyDriver();
                    }

                    getFoo () : string {
                        return 'hello world'
                    }

                }

                const driver : MyDriver = MyDriver.create();

                expect( driver.getFoo() ).toBe('hello world');
                expect( driver.setCar( CarType.create().setModel('Tesla') ) ).toBe(driver);
                expect( driver.getCarDTO() ).toStrictEqual({model: "Tesla"});
            });

        });

    });

    describe('with inner array entities', () => {

        interface CarDTO extends DTO {
            readonly model: string;
        }

        interface Car extends Entity<CarDTO> {
            getModel() : string;
            setModel(model: string) : this;
        }

        interface DriverDTO extends DTO {
            readonly name : string;
            readonly age : number;
            readonly cars : readonly CarDTO[];
            readonly lendCars ?: readonly CarDTO[];
        }

        interface Driver extends Entity<DriverDTO> {

            getCars() : readonly Car[];
            getCarsDTO() : readonly CarDTO[];
            setCars(value: readonly (Car | CarDTO)[]) : this;
            setCarsDTO(value: readonly CarDTO[]) : this;

            getLendCars() : readonly Car[] | undefined;
            getLendCarsDTO() : readonly CarDTO[] | undefined;
            setLendCars(value: readonly (Car | CarDTO)[] | undefined) : this;
            setLendCarsDTO(value: readonly CarDTO[] | undefined) : this;

        }

        let carFactory : EntityFactoryImpl<CarDTO, Car>;
        let CarType : EntityType<CarDTO, Car>;
        let driverFactory : EntityFactoryImpl<DriverDTO, Driver>;
        let DriverType : EntityType<DriverDTO, Driver>;

        beforeEach(() => {

            carFactory = (
                EntityFactoryImpl.create<CarDTO, Car>()
                .add( EntityPropertyImpl.create("model").setDefaultValue("Ford") )
            );
            CarType = carFactory.createEntityType();

            driverFactory = (
                EntityFactoryImpl.create<DriverDTO, Driver>()
                .add( EntityPropertyImpl.create("age").setDefaultValue(30) )
                .add( EntityPropertyImpl.create("name").setDefaultValue('Smith') )
                .add( EntityPropertyImpl.createArray("cars").setTypes(CarType) )
                .add( EntityPropertyImpl.createOptionalArray("lendCars").setTypes(CarType) )
            );
            DriverType = driverFactory.createEntityType();

        });

        describe('.createDefaultDTO', () => {

            it('can create a default DTO object with an inner entity value', () => {
                expect( driverFactory.createDefaultDTO() ).toStrictEqual({
                    name : 'Smith',
                    age: 30,
                    cars: []
                });
            });

        });

        describe('.create', () => {

            let tesla : Car;
            let teslaDTO : CarDTO;

            beforeEach(() => {
                tesla = CarType.create().setModel('Tesla');
                teslaDTO = tesla.getDTO();
            });

            it('can create a empty entity and has .getCars() as [] by default', () => {
                const driver : Driver = DriverType.create();
                expect( driver.getCars()?.length ).toStrictEqual(0);
                expect( driver.getCars() ).toStrictEqual([]);
            });

            it('can create a empty entity and has .getCarDTO() as [] by default', () => {
                const driver : Driver = DriverType.create();
                expect( driver.getCarsDTO()?.length ).toStrictEqual(0);
                expect( driver.getCarsDTO() ).toStrictEqual([]);
            });

            it('can create a empty entity and has .getLendCars() as undefined by default', () => {
                const driver : Driver = DriverType.create();
                expect( driver.getLendCars() ).toStrictEqual(undefined);
            });

            it('can create a empty entity and has .getLendCarsDTO() as undefined by default', () => {
                const driver : Driver = DriverType.create();
                expect( driver.getLendCarsDTO() ).toStrictEqual(undefined);
            });

            it('can create an entity with .setCars( [Entity] ) and has .getCars()', () => {
                const driver : Driver = DriverType.create();
                expect( driver.setCars( [tesla] ) ).toBe(driver);

                expect( driver.getCars()?.length ).toStrictEqual(1);
                expect( driver.getCars()[0].getDTO() ).toStrictEqual({model: "Tesla"});
            });

            it('can create an entity with .setCars( [Entity] ) and has .getCarsDTO()', () => {
                const driver : Driver = DriverType.create();
                expect( driver.setCars( [tesla] ) ).toBe(driver);

                expect( driver.getCarsDTO()?.length ).toStrictEqual(1);
                expect( driver.getCarsDTO()[0] ).toStrictEqual({model: "Tesla"});
            });

            it('can create an entity with .setCars( [DTO] ) and has .getCars()', () => {
                const driver : Driver = DriverType.create();
                expect( driver.setCars( [teslaDTO] ) ).toBe(driver);

                expect( driver.getCars()?.length ).toStrictEqual(1);
                expect( driver.getCars()[0].getDTO() ).toStrictEqual({model: "Tesla"});
            });

        });

    });

    describe('Getters and setters', () => {

        interface CarDTO extends DTO {
            readonly model: string;
        }

        interface Car extends Entity<CarDTO> {
            getModel() : string;
            setModel(model: string) : this;
        }

        let carFactory : EntityFactoryImpl<CarDTO, Car>;
        let CarEntity : EntityType<CarDTO, Car>;

        interface TestDTO {
            readonly name : string;
            readonly age : number;
            readonly alive : boolean;
            readonly notDefined ?: undefined;
            readonly undefinedValue : undefined;
            readonly nullValue : null;
            readonly car : CarDTO;
            readonly secondCar ?: CarDTO;
            readonly thirdCar ?: CarDTO;
            readonly fourthCar ?: CarDTO | null;
            readonly cars : CarDTO[];
        }

        class TestEntity extends BaseEntity<TestDTO, TestEntity> {

            public static create () : TestEntity {
                return new TestEntity({
                    name: 'test',
                    age: 30,
                    alive: true,
                    nullValue: null,
                    undefinedValue: undefined,
                    car: CarEntity.create().getDTO(),
                    secondCar: CarEntity.create().setModel('Audi').getDTO(),
                    fourthCar: null,
                    cars: [],
                });
            }

            public static createFromDTO (dto: TestDTO) : TestEntity {
                return new TestEntity(dto);
            }

            public static getProperties () : readonly EntityProperty[] {
                return [];
            }

            public static isEntity (value: unknown) : value is Entity<TestDTO> {
                return value instanceof TestEntity;
            }

            public static isDTO (value: unknown) : value is TestDTO {
                return false;
            }

            public getEntityType () : EntityType<TestDTO, TestEntity> {
                return TestEntity as unknown as EntityType<TestDTO, TestEntity>;
            }

        }

        beforeEach(() => {
            carFactory = (
                EntityFactoryImpl.create<CarDTO, Car>()
                .add( EntityPropertyImpl.create("model").setDefaultValue("Ford") )
            );
            CarEntity = carFactory.createEntityType();
        });

        describe('#createPropertyGetter', () => {

            it('can create string getter', () => {
                const fn = EntityFactoryImpl.createPropertyGetter<TestDTO, TestEntity>(
                    'name',
                    [VariableType.STRING]
                );
                const entity = TestEntity.create();
                expect( fn.call(entity) ).toBe('test');
            });

            it('can create number getter', () => {
                const fn = EntityFactoryImpl.createPropertyGetter<TestDTO, TestEntity>(
                    'age',
                    [VariableType.NUMBER]
                );
                const entity = TestEntity.create();
                expect( fn.call(entity) ).toBe(30);
            });

            it('can create integer getter', () => {
                const fn = EntityFactoryImpl.createPropertyGetter<TestDTO, TestEntity>(
                    'age',
                    [VariableType.INTEGER]
                );
                const entity = TestEntity.create();
                expect( fn.call(entity) ).toBe(30);
            });

            it('can create boolean getter', () => {
                const fn = EntityFactoryImpl.createPropertyGetter<TestDTO, TestEntity>(
                    'alive',
                    [VariableType.BOOLEAN]
                );
                const entity = TestEntity.create();
                expect( fn.call(entity) ).toBe(true);
            });

            it('can create undefined getter with non-defined property', () => {
                const fn = EntityFactoryImpl.createPropertyGetter<TestDTO, TestEntity>(
                    'notDefined',
                    [VariableType.UNDEFINED]
                );
                const entity = TestEntity.create();
                expect( fn.call(entity) ).toBe(undefined);
            });

            it('can create undefined getter with undefined value', () => {
                const fn = EntityFactoryImpl.createPropertyGetter<TestDTO, TestEntity>(
                    'undefinedValue',
                    [VariableType.UNDEFINED]
                );
                const entity = TestEntity.create();
                expect( fn.call(entity) ).toBe(undefined);
            });

            it('can create null getter', () => {
                const fn = EntityFactoryImpl.createPropertyGetter<TestDTO, TestEntity>(
                    'nullValue',
                    [VariableType.NULL]
                );
                const entity = TestEntity.create();
                expect( fn.call(entity) ).toBe(null);
            });

            it('can create a car getter', () => {
                const fn = EntityFactoryImpl.createPropertyGetter<TestDTO, TestEntity>(
                    'car',
                    [CarEntity]
                );
                const entity = TestEntity.create();
                expect( fn.call(entity).getDTO() ).toStrictEqual({
                    model: 'Ford'
                });
            });

            it('can create a car or undefined getter with a value', () => {
                const fn = EntityFactoryImpl.createPropertyGetter<TestDTO, TestEntity>(
                    'secondCar',
                    [
                        CarEntity,
                        VariableType.UNDEFINED,
                    ]
                );
                const entity = TestEntity.create();
                expect( fn.call(entity).getDTO() ).toStrictEqual({
                    model: 'Audi'
                });
            });

            it('can create a car or undefined getter with an non-defined value', () => {
                const fn = EntityFactoryImpl.createPropertyGetter<TestDTO, TestEntity>(
                    'thirdCar',
                    [
                        CarEntity,
                        VariableType.UNDEFINED,
                    ]
                );
                const entity = TestEntity.create();
                expect( fn.call(entity) ).toStrictEqual(undefined);
            });

            it('can create a car or undefined getter with an null value', () => {
                const fn = EntityFactoryImpl.createPropertyGetter<TestDTO, TestEntity>(
                    'fourthCar',
                    [
                        CarEntity,
                        VariableType.UNDEFINED,
                    ]
                );
                const entity = TestEntity.create();
                expect( fn.call(entity) ).toStrictEqual(null);
            });

            it('can create property getter for arrays', () => {
                const fn = EntityFactoryImpl.createArrayPropertyGetter<TestDTO, TestEntity>(
                    'cars',
                    [
                        CarEntity,
                        VariableType.UNDEFINED,
                    ],
                );
                const entity = TestEntity.create();
                expect( fn.call(entity) ).toStrictEqual([]);
            });

        });

        describe('#createPropertySetter', () => {

            it('can create string setter', () => {
                const fn = EntityFactoryImpl.createPropertySetter<TestDTO, TestEntity>(
                    'name',
                    [VariableType.STRING]
                );
                const entity = TestEntity.create();
                expect( fn.call(entity, 'New value') ).toBe(entity);
                expect( entity.getDTO().name ).toBe('New value');
            });

            it('can create number setter', () => {
                const fn = EntityFactoryImpl.createPropertySetter<TestDTO, TestEntity>(
                    'age',
                    [VariableType.NUMBER]
                );
                const entity = TestEntity.create();
                expect( fn.call(entity, 12.5) ).toBe(entity);
                expect( entity.getDTO().age ).toBe(12.5);
            });

            it('can create integer setter', () => {
                const fn = EntityFactoryImpl.createPropertySetter<TestDTO, TestEntity>(
                    'age',
                    [VariableType.INTEGER]
                );
                const entity = TestEntity.create();
                expect( fn.call(entity, 12) ).toBe(entity);
                expect( entity.getDTO().age ).toBe(12);
            });

            it('can create boolean setter', () => {
                const fn = EntityFactoryImpl.createPropertySetter<TestDTO, TestEntity>(
                    'alive',
                    [VariableType.BOOLEAN]
                );
                const entity = TestEntity.create();
                expect( fn.call(entity, true) ).toBe(entity);
                expect( entity.getDTO().alive ).toBe(true);
                expect( fn.call(entity, false) ).toBe(entity);
                expect( entity.getDTO().alive ).toBe(false);
            });

            it('can create undefined setter with non-defined property', () => {
                const fn = EntityFactoryImpl.createPropertySetter<TestDTO, TestEntity>(
                    'notDefined',
                    [VariableType.UNDEFINED]
                );
                const entity = TestEntity.create();
                expect( fn.call(entity, undefined) ).toBe(entity);
                expect( entity.getDTO().notDefined ).toBe(undefined);
            });

            it('can create undefined setter with undefined value', () => {
                const fn = EntityFactoryImpl.createPropertySetter<TestDTO, TestEntity>(
                    'undefinedValue',
                    [VariableType.UNDEFINED]
                );
                const entity = TestEntity.create();
                expect( fn.call(entity, undefined) ).toBe(entity);
                expect( entity.getDTO().undefinedValue ).toBe(undefined);
            });

            it('can create null setter', () => {
                const fn = EntityFactoryImpl.createPropertySetter<TestDTO, TestEntity>(
                    'nullValue',
                    [VariableType.NULL]
                );
                const entity = TestEntity.create();
                expect( fn.call(entity, null) ).toBe(entity);
                expect( entity.getDTO().nullValue ).toBe(null);
            });

            it('can create a car setter', () => {
                const fn = EntityFactoryImpl.createPropertySetter<TestDTO, TestEntity>(
                    'car',
                    [CarEntity]
                );
                const entity = TestEntity.create();
                const tesla = CarEntity.create().setModel('Tesla');
                expect( fn.call(entity, tesla) ).toBe(entity);
                expect( entity.getDTO().car ).toStrictEqual({
                    model: 'Tesla'
                });
            });

            it('can create a car or undefined setter with a value', () => {
                const fn = EntityFactoryImpl.createPropertySetter<TestDTO, TestEntity>(
                    'secondCar',
                    [
                        CarEntity,
                        VariableType.UNDEFINED,
                    ]
                );
                const entity = TestEntity.create();

                expect( fn.call(entity, undefined) ).toBe(entity);
                expect( entity.getDTO().secondCar ).toStrictEqual(undefined);

                expect( fn.call(entity, CarEntity.create().setModel('Tesla')) ).toBe(entity);
                expect( entity.getDTO().secondCar ).toStrictEqual({'model': 'Tesla'});

            });

            it('can create a car or undefined setter with an non-defined value', () => {
                const fn = EntityFactoryImpl.createPropertySetter<TestDTO, TestEntity>(
                    'thirdCar',
                    [
                        CarEntity,
                        VariableType.UNDEFINED,
                    ]
                );
                const entity = TestEntity.create();
                expect( fn.call(entity, undefined) ).toBe(entity);
                expect( entity.getDTO().thirdCar ).toBe(undefined);
                expect( fn.call(entity, CarEntity.create().setModel('Tesla')) ).toBe(entity);
                expect( entity.getDTO().thirdCar ).toStrictEqual({'model': 'Tesla'});
            });

            it('can create a car or undefined setter with an null value', () => {
                const fn = EntityFactoryImpl.createPropertySetter<TestDTO, TestEntity>(
                    'fourthCar',
                    [
                        CarEntity,
                        VariableType.UNDEFINED,
                    ]
                );
                const entity = TestEntity.create();
                expect( fn.call(entity, undefined) ).toStrictEqual(entity);
                expect( entity.getDTO().fourthCar ).toBe(undefined);
                expect( fn.call(entity, CarEntity.create().setModel('Tesla')) ).toBe(entity);
                expect( entity.getDTO().fourthCar ).toStrictEqual({'model': 'Tesla'});
            });

        });

    });

});
