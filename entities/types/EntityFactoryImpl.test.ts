// Copyright (c) 2023-2024. Sendanor <info@sendanor.fi>. All rights reserved.

import {
    afterEach,
    beforeEach,
    describe,
    expect,
    it,
} from "@jest/globals";
import "../../../testing/jest/matchers/index";
import { BaseEntity } from "./BaseEntity";
import { DTO } from "./DTO";
import { Entity } from "./Entity";
import { EntityFactoryImpl } from "./EntityFactoryImpl";
import { EntityMethodImpl } from "./EntityMethodImpl";
import { EntityProperty } from "./EntityProperty";
import { EntityType } from "./EntityType";
import { VariableType } from "./VariableType";

describe('EntityFactoryImpl', () => {

    afterEach( () => {
        EntityFactoryImpl.destroy();
    });

    describe('#create', () => {

        it('can create an entity factory instance', () => {
            const item = EntityFactoryImpl.create('Item');
            expect( item ).toBeDefined();
            expect( item ).toBeInstanceOf(EntityFactoryImpl);
        });

        it('can create an entity factory instance with a property', () => {
            const item = (
                EntityFactoryImpl
                    .create('Item')
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
                    .create('Item')
                    .add( "name", VariableType.STRING, VariableType.UNDEFINED)
            );
            const properties = item.getProperties();
            expect( properties?.length ).toBe(1);
            expect( properties[0].getPropertyName() ).toBe("name");
            expect( properties[0].getTypes() ).toStrictEqual(["string", "undefined"]);
        });

        it('can create an entity factory instance with an enum property', () => {

            enum CarType {
                AUTOMATIC = "AUTOMATIC",
                MANUAL = "MANUAL"
            }

            const item = (
                EntityFactoryImpl
                    .create('Car')
                    .add( "name", VariableType.STRING)
                    .add( "type", CarType )
            );
            const properties = item.getProperties();
            expect( properties?.length ).toBe(2);
            expect( properties[0].getPropertyName() ).toBe("name");
            expect( properties[0].getTypes() ).toStrictEqual(["string"]);
            expect( properties[1].getPropertyName() ).toBe("type");
            expect( properties[1].getTypes() ).toStrictEqual([
                {
                    "AUTOMATIC" : "AUTOMATIC",
                    "MANUAL": "MANUAL",
                }
            ]);
        });


        it('can create an entity factory instance with an array of enums', () => {

            enum CarType {
                AUTOMATIC = "AUTOMATIC",
                MANUAL = "MANUAL"
            }

            const item = (
                EntityFactoryImpl
                    .create('Car')
                    .add( "name", VariableType.STRING)
                    .add(  EntityFactoryImpl.createArrayProperty("types").setTypes(CarType) )
            );
            const properties = item.getProperties();
            expect( properties?.length ).toBe(2);
            expect( properties[0].getPropertyName() ).toBe("name");
            expect( properties[0].getTypes() ).toStrictEqual(["string"]);
            expect( properties[1].isArray() ).toBe(true);
            expect( properties[1].getPropertyName() ).toBe("types");
            expect( properties[1].getTypes() ).toStrictEqual([
                {
                    "AUTOMATIC" : "AUTOMATIC",
                    "MANUAL": "MANUAL",
                }
            ]);
        });

        it('can create an entity factory instance with an optional enum property', () => {

            enum CarType {
                AUTOMATIC = "AUTOMATIC",
                MANUAL = "MANUAL"
            }

            const item = (
                EntityFactoryImpl
                    .create('Car')
                    .add( "name", VariableType.STRING, VariableType.UNDEFINED)
                    .add( "type", CarType, VariableType.UNDEFINED)
            );
            const properties = item.getProperties();
            expect( properties?.length ).toBe(2);
            expect( properties[0].getPropertyName() ).toBe("name");
            expect( properties[0].getTypes() ).toStrictEqual(["string", "undefined"]);
            expect( properties[1].getPropertyName() ).toBe("type");
            expect( properties[1].getTypes() ).toStrictEqual([
                {
                    "AUTOMATIC" : "AUTOMATIC",
                    "MANUAL": "MANUAL",
                },
                "undefined"
            ]);
        });

    });

    describe('.createDefaultDTO', () => {

        it('can create a default DTO object with undefined value', () => {
            const item = (
                EntityFactoryImpl.create('Entity')
                .add( "name", VariableType.STRING, VariableType.UNDEFINED)
            );
            expect( item.createDefaultDTO() ).toStrictEqual({});
        });

        it('can create a default DTO object with null value', () => {
            const item = (
                EntityFactoryImpl.create('Entity')
                .add( "name", VariableType.STRING, VariableType.NULL)
            );
            expect( item.createDefaultDTO() ).toStrictEqual({ name: null });
        });

        it('can create a default DTO object with null and undefined values', () => {
            const item = (
                EntityFactoryImpl.create('Entity')
                .add( "name", VariableType.STRING, VariableType.NULL, VariableType.UNDEFINED)
            );
            expect( item.createDefaultDTO() ).toStrictEqual({ });
        });

        it('can create a default DTO object with string value', () => {
            const item = (
                EntityFactoryImpl.create('Entity')
                .add( "name", VariableType.STRING)
            );
            expect( item.createDefaultDTO() ).toStrictEqual({ name : '' });
        });

        it('can create a default DTO object with number value', () => {
            const item = (
                EntityFactoryImpl.create('Entity')
                .add( "name", VariableType.NUMBER)
            );
            expect( item.createDefaultDTO() ).toStrictEqual({ name : 0 });
        });

        it('can create a default DTO object with boolean value', () => {
            const item = (
                EntityFactoryImpl.create('Item')
                .add( "name", VariableType.BOOLEAN)
            );
            expect( item.createDefaultDTO() ).toStrictEqual({ name : false });
        });

        it('can create a default DTO object with integer value', () => {
            const item = (
                EntityFactoryImpl.create('Entity')
                .add( "name", VariableType.INTEGER)
            );
            expect( item.createDefaultDTO() ).toStrictEqual({ name : 0 });
        });

        it('can create a default DTO object with multiple properties', () => {
            const item = (
                EntityFactoryImpl.create('Entity')
                .add( "age", VariableType.INTEGER)
                .add( "name", VariableType.STRING)
            );
            expect( item.createDefaultDTO() ).toStrictEqual({ name : '', age: 0 });
        });

        it('can create a default DTO object with custom default values', () => {
            const item = (
                EntityFactoryImpl.create('Entity')
                .add( EntityFactoryImpl.createProperty("age").setTypes(VariableType.INTEGER).setDefaultValue(30) )
                .add( EntityFactoryImpl.createProperty("name").setTypes(VariableType.STRING).setDefaultValue('Smith') )
            );
            expect( item.createDefaultDTO() ).toStrictEqual({ name : 'Smith', age: 30 });
        });

        it('can create a default DTO object with non-optional array values', () => {
            const item = (
                EntityFactoryImpl.create('Entity')
                .add( EntityFactoryImpl.createProperty("age").setTypes(VariableType.INTEGER).setDefaultValue(30) )
                .add( EntityFactoryImpl.createArrayProperty("firstNames").setTypes(VariableType.STRING).setDefaultValue(['John', 'Edward']) )
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
                EntityFactoryImpl.create('Entity')
                .add( EntityFactoryImpl.createProperty("age").setTypes(VariableType.INTEGER).setDefaultValue(30) )
                .add( EntityFactoryImpl.createArrayProperty("firstNames").setTypes(VariableType.STRING) )
            );
            expect( item.createDefaultDTO() ).toStrictEqual({
                age: 30,
                firstNames: []
            });
        });

        it('can create a default DTO object with non-defined optional array values', () => {
            const item = (
                EntityFactoryImpl.create('Entity')
                .add( EntityFactoryImpl.createProperty("age").setTypes(VariableType.INTEGER).setDefaultValue(30) )
                .add( EntityFactoryImpl.createOptionalArrayProperty("firstNames").setTypes(VariableType.STRING) )
            );
            expect( item.createDefaultDTO() ).toStrictEqual({
                age: 30
            });
        });

        it('can create a default DTO object with defined optional array values', () => {
            const item = (
                EntityFactoryImpl.create('Entity')
                .add( EntityFactoryImpl.createProperty("age").setTypes(VariableType.INTEGER).setDefaultValue(30) )
                .add( EntityFactoryImpl.createOptionalArrayProperty("firstNames").setTypes(VariableType.STRING).setDefaultValue(['John', 'Edward']) )
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

    describe('.createTestFunctionOfDTO', () => {

        it('can create a test function for DTOs', () => {

            const item = (
                EntityFactoryImpl.create('Entity')
                .add( EntityFactoryImpl.createProperty("age").setTypes(VariableType.INTEGER).setDefaultValue(30) )
                .add( EntityFactoryImpl.createProperty("name").setTypes(VariableType.STRING).setDefaultValue('Smith') )
            );

            const fn = item.createTestFunctionOfDTO();

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

    describe('.createExplainFunctionOfDTO', () => {

        it('can create an explain function for DTOs', () => {

            const item = (
                EntityFactoryImpl.create('Person')
                .add( EntityFactoryImpl.createProperty("age").setTypes(VariableType.INTEGER).setDefaultValue(30) )
                .add( EntityFactoryImpl.createProperty("name").setTypes(VariableType.STRING).setDefaultValue('Smith') )
            );

            const fn = item.createExplainFunctionOfDTO();

            expect( fn({name : 'John', age: 20}) ).toBe('OK');

            expect( fn({name : 'John', age: null}) ).toBe(`not Person DTO: \n  property "age" not integer`);
            expect( fn({name : 123, age: 30}) ).toBe(`not Person DTO: \n  property "name" not string`);
            expect( fn({age: 30}) ).toBe(`not Person DTO: \n  property "name" not string`);
            expect( fn({name : 123}) ).toBe(`not Person DTO: \n  property "age" not integer, \n  property "name" not string`);
            expect( fn(123) ).toBe(`not Person DTO: not regular object`);
            expect( fn(null) ).toBe(`not Person DTO: not regular object`);
            expect( fn(undefined) ).toBe(`not Person DTO: not regular object`);
            expect( fn({}) ).toBe(`not Person DTO: \n  property "age" not integer, \n  property "name" not string`);
            expect( fn([]) ).toBe(`not Person DTO: not regular object`);
            expect( fn(true) ).toBe(`not Person DTO: not regular object`);
            expect( fn(false) ).toBe(`not Person DTO: not regular object`);
            expect( fn("hello world") ).toBe(`not Person DTO: not regular object`);

        });

    });

    describe('.createTestFunctionOfDTOorOneOf', () => {

        it('can create a test function for DTOs and undefined', () => {

            const item = (
                EntityFactoryImpl.create('Entity')
                .add( EntityFactoryImpl.createProperty("age").setTypes(VariableType.INTEGER).setDefaultValue(30) )
                .add( EntityFactoryImpl.createProperty("name").setTypes(VariableType.STRING).setDefaultValue('Smith') )
            );

            const fn = item.createTestFunctionOfDTOorOneOf(VariableType.UNDEFINED);

            expect( fn({name : 'John', age: 20}) ).toBe(true);
            expect( fn(undefined) ).toBe(true);

            expect( fn({name : 'John', age: null}) ).toBe(false);
            expect( fn({name : 123, age: 30}) ).toBe(false);
            expect( fn({age: 30}) ).toBe(false);
            expect( fn({name : 123}) ).toBe(false);
            expect( fn(123) ).toBe(false);
            expect( fn(null) ).toBe(false);
            expect( fn({}) ).toBe(false);
            expect( fn([]) ).toBe(false);
            expect( fn(true) ).toBe(false);
            expect( fn(false) ).toBe(false);
            expect( fn("hello world") ).toBe(false);

        });

        it('can create a test function for DTOs, undefined, and null', () => {

            const item = (
                EntityFactoryImpl.create('Entity')
                .add( EntityFactoryImpl.createProperty("age").setTypes(VariableType.INTEGER).setDefaultValue(30) )
                .add( EntityFactoryImpl.createProperty("name").setTypes(VariableType.STRING).setDefaultValue('Smith') )
            );

            const fn = item.createTestFunctionOfDTOorOneOf(VariableType.UNDEFINED, VariableType.NULL);

            expect( fn({name : 'John', age: 20}) ).toBe(true);
            expect( fn(undefined) ).toBe(true);
            expect( fn(null) ).toBe(true);

            expect( fn({name : 'John', age: null}) ).toBe(false);
            expect( fn({name : 123, age: 30}) ).toBe(false);
            expect( fn({age: 30}) ).toBe(false);
            expect( fn({name : 123}) ).toBe(false);
            expect( fn(123) ).toBe(false);
            expect( fn({}) ).toBe(false);
            expect( fn([]) ).toBe(false);
            expect( fn(true) ).toBe(false);
            expect( fn(false) ).toBe(false);
            expect( fn("hello world") ).toBe(false);

        });

        it('can create a test function for DTOs, number, undefined, and null', () => {

            const item = (
                EntityFactoryImpl.create('Entity')
                .add( EntityFactoryImpl.createProperty("age").setTypes(VariableType.INTEGER).setDefaultValue(30) )
                .add( EntityFactoryImpl.createProperty("name").setTypes(VariableType.STRING).setDefaultValue('Smith') )
            );

            const fn = item.createTestFunctionOfDTOorOneOf(VariableType.NUMBER, VariableType.UNDEFINED, VariableType.NULL);

            expect( fn({name : 'John', age: 20}) ).toBe(true);
            expect( fn(undefined) ).toBe(true);
            expect( fn(null) ).toBe(true);
            expect( fn(123) ).toBe(true);

            expect( fn({name : 'John', age: null}) ).toBe(false);
            expect( fn({name : 123, age: 30}) ).toBe(false);
            expect( fn({age: 30}) ).toBe(false);
            expect( fn({name : 123}) ).toBe(false);
            expect( fn({}) ).toBe(false);
            expect( fn([]) ).toBe(false);
            expect( fn(true) ).toBe(false);
            expect( fn(false) ).toBe(false);
            expect( fn("hello world") ).toBe(false);

        });

        it('can create a test function for DTOs, string, number, undefined, and null', () => {

            const item = (
                EntityFactoryImpl.create('Entity')
                .add( EntityFactoryImpl.createProperty("age").setTypes(VariableType.INTEGER).setDefaultValue(30) )
                .add( EntityFactoryImpl.createProperty("name").setTypes(VariableType.STRING).setDefaultValue('Smith') )
            );

            const fn = item.createTestFunctionOfDTOorOneOf(
                VariableType.STRING,
                VariableType.NUMBER,
                VariableType.UNDEFINED,
                VariableType.NULL,
            );

            expect( fn({name : 'John', age: 20}) ).toBe(true);
            expect( fn(undefined) ).toBe(true);
            expect( fn(null) ).toBe(true);
            expect( fn(123) ).toBe(true);
            expect( fn("hello world") ).toBe(true);

            expect( fn({name : 'John', age: null}) ).toBe(false);
            expect( fn({name : 123, age: 30}) ).toBe(false);
            expect( fn({age: 30}) ).toBe(false);
            expect( fn({name : 123}) ).toBe(false);
            expect( fn({}) ).toBe(false);
            expect( fn([]) ).toBe(false);
            expect( fn(true) ).toBe(false);
            expect( fn(false) ).toBe(false);

        });

    });

    describe('.createExplainFunctionOfDTOorOneOf', () => {

        it('can create an explain function for DTOs or undefined', () => {

            const item = (
                EntityFactoryImpl.create('MyEntity')
                .add( EntityFactoryImpl.createProperty("age").setTypes(VariableType.INTEGER).setDefaultValue(30) )
                .add( EntityFactoryImpl.createProperty("name").setTypes(VariableType.STRING).setDefaultValue('Smith') )
            );

            const fn = item.createExplainFunctionOfDTOorOneOf(VariableType.UNDEFINED);

            expect( fn({name : 'John', age: 20}) ).toBe('OK');
            expect( fn(undefined) ).toBe('OK');

            expect( fn({name : 'John', age: null}) ).toBe(`not one of:\n - DTO of MyEntity\n - undefined`);
            expect( fn({name : 123, age: 30}) ).toBe(`not one of:\n - DTO of MyEntity\n - undefined`);
            expect( fn({age: 30}) ).toBe(`not one of:\n - DTO of MyEntity\n - undefined`);
            expect( fn({name : 123}) ).toBe(`not one of:\n - DTO of MyEntity\n - undefined`);
            expect( fn(123) ).toBe(`not one of:\n - DTO of MyEntity\n - undefined`);
            expect( fn(null) ).toBe(`not one of:\n - DTO of MyEntity\n - undefined`);
            expect( fn({}) ).toBe(`not one of:\n - DTO of MyEntity\n - undefined`);
            expect( fn([]) ).toBe(`not one of:\n - DTO of MyEntity\n - undefined`);
            expect( fn(true) ).toBe(`not one of:\n - DTO of MyEntity\n - undefined`);
            expect( fn(false) ).toBe(`not one of:\n - DTO of MyEntity\n - undefined`);
            expect( fn("hello world") ).toBe(`not one of:\n - DTO of MyEntity\n - undefined`);

        });

        it('can create an explain function for DTOs, undefined, and null', () => {

            const item = (
                EntityFactoryImpl.create('MyEntity')
                .add( EntityFactoryImpl.createProperty("age").setTypes(VariableType.INTEGER).setDefaultValue(30) )
                .add( EntityFactoryImpl.createProperty("name").setTypes(VariableType.STRING).setDefaultValue('Smith') )
            );

            const fn = item.createExplainFunctionOfDTOorOneOf(VariableType.UNDEFINED, VariableType.NULL);

            expect( fn({name : 'John', age: 20}) ).toBe('OK');
            expect( fn(undefined) ).toBe('OK');
            expect( fn(null) ).toBe('OK');

            expect( fn({name : 'John', age: null}) ).toBe(`not one of:\n - DTO of MyEntity\n - undefined\n - null`);
            expect( fn({name : 123, age: 30}) ).toBe(`not one of:\n - DTO of MyEntity\n - undefined\n - null`);
            expect( fn({age: 30}) ).toBe(`not one of:\n - DTO of MyEntity\n - undefined\n - null`);
            expect( fn({name : 123}) ).toBe(`not one of:\n - DTO of MyEntity\n - undefined\n - null`);
            expect( fn(123) ).toBe(`not one of:\n - DTO of MyEntity\n - undefined\n - null`);
            expect( fn({}) ).toBe(`not one of:\n - DTO of MyEntity\n - undefined\n - null`);
            expect( fn([]) ).toBe(`not one of:\n - DTO of MyEntity\n - undefined\n - null`);
            expect( fn(true) ).toBe(`not one of:\n - DTO of MyEntity\n - undefined\n - null`);
            expect( fn(false) ).toBe(`not one of:\n - DTO of MyEntity\n - undefined\n - null`);
            expect( fn("hello world") ).toBe(`not one of:\n - DTO of MyEntity\n - undefined\n - null`);

        });

        it('can create an explain function for DTOs, number, undefined, and null', () => {

            const item = (
                EntityFactoryImpl.create('MyEntity')
                .add( EntityFactoryImpl.createProperty("age").setTypes(VariableType.INTEGER).setDefaultValue(30) )
                .add( EntityFactoryImpl.createProperty("name").setTypes(VariableType.STRING).setDefaultValue('Smith') )
            );

            const fn = item.createExplainFunctionOfDTOorOneOf(VariableType.NUMBER, VariableType.UNDEFINED, VariableType.NULL);

            expect( fn({name : 'John', age: 20}) ).toBe('OK');
            expect( fn(undefined) ).toBe('OK');
            expect( fn(null) ).toBe('OK');
            expect( fn(123) ).toBe('OK');

            expect( fn({name : 'John', age: null}) ).toBe(`not one of:\n - DTO of MyEntity\n - number\n - undefined\n - null`);
            expect( fn({name : 123, age: 30}) ).toBe(`not one of:\n - DTO of MyEntity\n - number\n - undefined\n - null`);
            expect( fn({age: 30}) ).toBe(`not one of:\n - DTO of MyEntity\n - number\n - undefined\n - null`);
            expect( fn({name : 123}) ).toBe(`not one of:\n - DTO of MyEntity\n - number\n - undefined\n - null`);
            expect( fn({}) ).toBe(`not one of:\n - DTO of MyEntity\n - number\n - undefined\n - null`);
            expect( fn([]) ).toBe(`not one of:\n - DTO of MyEntity\n - number\n - undefined\n - null`);
            expect( fn(true) ).toBe(`not one of:\n - DTO of MyEntity\n - number\n - undefined\n - null`);
            expect( fn(false) ).toBe(`not one of:\n - DTO of MyEntity\n - number\n - undefined\n - null`);
            expect( fn("hello world") ).toBe(`not one of:\n - DTO of MyEntity\n - number\n - undefined\n - null`);

        });

        it('can create an explain function for DTOs, string, number, undefined, and null', () => {

            const item : EntityFactoryImpl<DTO, Entity<DTO>> = (
                EntityFactoryImpl.create('MyEntity')
                .add( EntityFactoryImpl.createProperty("age").setTypes(VariableType.INTEGER).setDefaultValue(30) )
                .add( EntityFactoryImpl.createProperty("name").setTypes(VariableType.STRING).setDefaultValue('Smith') )
            );

            const fn = item.createExplainFunctionOfDTOorOneOf(
                VariableType.STRING,
                VariableType.NUMBER,
                VariableType.UNDEFINED,
                VariableType.NULL,
            );

            expect( fn({name : 'John', age: 20}) ).toBe('OK');
            expect( fn(undefined) ).toBe('OK');
            expect( fn(null) ).toBe('OK');
            expect( fn(123) ).toBe('OK');
            expect( fn("hello world") ).toBe('OK');

            expect( fn({name : 'John', age: null}) ).toBe(`not one of:\n - DTO of MyEntity\n - string\n - number\n - undefined\n - null`);
            expect( fn({name : 123, age: 30}) ).toBe(`not one of:\n - DTO of MyEntity\n - string\n - number\n - undefined\n - null`);
            expect( fn({age: 30}) ).toBe(`not one of:\n - DTO of MyEntity\n - string\n - number\n - undefined\n - null`);
            expect( fn({name : 123}) ).toBe(`not one of:\n - DTO of MyEntity\n - string\n - number\n - undefined\n - null`);
            expect( fn({}) ).toBe(`not one of:\n - DTO of MyEntity\n - string\n - number\n - undefined\n - null`);
            expect( fn([]) ).toBe(`not one of:\n - DTO of MyEntity\n - string\n - number\n - undefined\n - null`);
            expect( fn(true) ).toBe(`not one of:\n - DTO of MyEntity\n - string\n - number\n - undefined\n - null`);
            expect( fn(false) ).toBe(`not one of:\n - DTO of MyEntity\n - string\n - number\n - undefined\n - null`);

        });

    });

    describe('.createTestFunctionOfInterface', () => {

        let item : EntityFactoryImpl<any, any>;
        let fn : any;

        beforeEach(() => {

            item = (
                EntityFactoryImpl.create('Entity')
                                 .add( EntityFactoryImpl.createProperty("age").setTypes(VariableType.INTEGER).setDefaultValue(30) )
                                 .add( EntityFactoryImpl.createProperty("name").setTypes(VariableType.STRING).setDefaultValue('Smith') )
            );

            fn = item.createTestFunctionOfInterface();

        });

        it('can create a test function for valid interfaces', () => {
            expect( fn({
                getEntityType () { return {}; },
                getDTO () { return {}; },
                valueOf () { return {}; },
                toJSON () { return {}; },

                getAge () { return 30; },
                setAge (age: string) { return this; },
                age (age: string) { return this; },

                getName () { return 'John'; },
                setName (name: string) { return this; },
                name (name: string) { return this; },

            }) ).toBe(true);
        });

        it('can create a test function for interfaces which detects missing property methods', () => {
            expect( fn({
                getEntityType () { return {}; },
                getDTO () { return {}; },
                valueOf () { return {}; },
                toJSON () { return {}; },

                getAge () { return 30; },
                setAge (age: string) { return this; },
                age (age: string) { return this; },

                getName () { return 'John'; },
                // Missing setName
                name (name: string) { return this; },

            }) ).toBe(false);
        });

        it('can create a test function for interfaces which detects missing base methods', () => {
            expect( fn({

                // Missing getEntityType, getDTO, valueOf and toJSON

                getAge () { return 30; },
                setAge (age: string) { return this; },
                age (age: string) { return this; },

                getName () { return 'John'; },
                setName (name: string) { return this; },
                name (name: string) { return this; },

            }) ).toBe(false);
        });

        it('can create a test function for invalid interfaces', () => {
            expect( fn({

                getEntityType : null,
                getDTO () { return {}; },
                valueOf () { return {}; },
                toJSON () { return {}; },

                getAge () { return 30; },
                setAge (age: string) { return this; },
                age (age: string) { return this; },

                getName () { return 'John'; },
                setName (name: string) { return this; },
                name (name: string) { return this; },

            }) ).toBe(false);
        });

        it('can create a test function for interfaces which detects invalid values', () => {
            expect( fn({name : 'John', age: 20}) ).toBe(false);
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
                EntityFactoryImpl.create<MyDTO, MyEntity>('MyEntity')
                    .add( EntityFactoryImpl.createProperty("age").setTypes(VariableType.INTEGER).setDefaultValue(30) )
                    .add( EntityFactoryImpl.createProperty("name").setTypes(VariableType.STRING).setDefaultValue('Smith') )
            );
        });

        describe('.getName and .getAge', () => {

            it('can create an entity constructor with .getName and .getAge', () => {
                const MyType = factory.createEntityType('MyType');
                const entity = MyType.create();
                expect( entity.getName() ).toBe('Smith');
                expect( entity.getAge() ).toBe(30);
            });

            it('can create an entity constructor with readonly entities', () => {
                const ReadonlyEntityType = factory.createEntityType(
                    'ReadonlyEntityType',
                    {
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
                const EntityType = factory.createEntityType('EntityType');
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
                const EntityType = factory.createEntityType('EntityType');
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
                const EntityType = factory.createEntityType('EntityType');
                const entity = EntityType.create();
                expect( entity.getDTO() ).toStrictEqual({name: 'Smith', age: 30});
            });

        });

        describe('.toJSON', () => {

            it('can create an entity constructor with .toJSON', () => {
                const EntityType = factory.createEntityType('EntityType');
                const entity = EntityType.create();
                expect( entity.toJSON() ).toStrictEqual({name: 'Smith', age: 30});
            });

        });

        describe('.valueOf', () => {

            it('can create an entity constructor with .valueOf', () => {
                const EntityType = factory.createEntityType('EntityType');
                const entity = EntityType.create();
                expect( entity.valueOf() ).toStrictEqual({name: 'Smith', age: 30});
            });

        });

        describe('#isDTO', () => {

            it('can create a test function for readonly DTOs', () => {

                const ReadonlyEntityType = factory.createEntityType(
                    'ReadonlyEntityType',
                    {
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

                const EntityType = factory.createEntityType('EntityType');

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

                const ReadonlyEntityType = factory.createEntityType(
                    'ReadonlyEntityType',
                    {
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

                const EntityType = factory.createEntityType('EntityType');
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
                const EntityType = factory.createEntityType('EntityType');
                const entity = EntityType.createFromDTO({name:'Jack', age:38});
                expect( entity.getName() ).toBe('Jack');
                expect( entity.getAge() ).toBe(38);
            });

        });

        describe('#getProperties', () => {

            it('can get entity properties', () => {
                const EntityType = factory.createEntityType('EntityType');
                const entity = EntityType.getProperties();
                expect( entity.length ).toBe(2);
                expect( entity[0].getPropertyName()).toBe('age');
                expect( entity[1].getPropertyName()).toBe('name');
            });

        });


    });

    describe('with inner entities', () => {

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
                EntityFactoryImpl.create<CarDTO, Car>('Car')
                .add( EntityFactoryImpl.createProperty("model").setDefaultValue("Ford") )
                .add( EntityFactoryImpl.createProperty("gear").setTypes(GearType).setDefaultValue(GearType.MANUAL) )
            );
            CarType = carFactory.createEntityType('CarType');

            driverFactory = (
                EntityFactoryImpl.create<DriverDTO, Driver>('Driver')
                .add( EntityFactoryImpl.createProperty("age").setDefaultValue(30) )
                .add( EntityFactoryImpl.createProperty("name").setDefaultValue('Smith') )
                .add( EntityFactoryImpl.createProperty("car").setTypes(CarType) )
            );
            DriverType = driverFactory.createEntityType('DriverType');

        });

        describe('.createDefaultDTO', () => {

            it('can create a default DTO object with an inner entity value', () => {
                expect( driverFactory.createDefaultDTO() ).toStrictEqual({
                    name : 'Smith',
                    age: 30,
                    car: {model: "Ford", gear: "MANUAL"}
                });
            });

        });

        describe('.create', () => {

            it('can create a entity with DTO getters for an inner entity property .getCar()', () => {
                const driver : Driver = DriverType.create();
                expect( driver.getCar().getDTO() ).toStrictEqual({model: "Ford", gear: "MANUAL"});
            });

            it('can create a entity with DTO getters for an inner entity property .getCarDTO()', () => {
                const driver : Driver = DriverType.create();
                expect( driver.getCarDTO() ).toStrictEqual({model: "Ford", gear: "MANUAL"});
            });

            it('can create a entity with DTO getters for an inner entity property .setCar()', () => {
                const driver : Driver = DriverType.create();
                expect( driver.setCar( CarType.create().setModel('Tesla') ) ).toBe(driver);
                expect( driver.getCar().getDTO() ).toStrictEqual({model: "Tesla", gear: "MANUAL"});
            });

            it('can create a entity with DTO getters for an inner entity property .setCarDTO()', () => {
                const driver : Driver = DriverType.create();
                expect( driver.setCar( CarType.create().setModel('Tesla') ) ).toBe(driver);
                expect( driver.getCarDTO() ).toStrictEqual({
                    model: "Tesla",
                    gear: "MANUAL",
                });
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
                expect( driver.getCarDTO() ).toStrictEqual({
                    model: "Tesla",
                    gear: "MANUAL",
                });
            });

        });

        describe('.getDTO', () => {

            it('can create inner DTO with .getDTO', () => {
                const entity = DriverType.create();
                expect( entity.getDTO() ).toStrictEqual({
                    age: 30,
                    name: 'Smith',
                    car: {
                        gear: 'MANUAL',
                        model: 'Ford'
                    }
                });
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
                EntityFactoryImpl.create<CarDTO, Car>('Car')
                .add( EntityFactoryImpl.createProperty("model").setDefaultValue("Ford") )
            );
            CarType = carFactory.createEntityType('CarType');

            driverFactory = (
                EntityFactoryImpl.create<DriverDTO, Driver>('Driver')
                .add( EntityFactoryImpl.createProperty("age").setDefaultValue(30) )
                .add( EntityFactoryImpl.createProperty("name").setDefaultValue('Smith') )
                .add( EntityFactoryImpl.createArrayProperty("cars").setTypes(CarType) )
                .add( EntityFactoryImpl.createOptionalArrayProperty("lendCars").setTypes(CarType) )
            );
            DriverType = driverFactory.createEntityType('DriverType');

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

    describe.only('Getters and setters', () => {

        interface CarDTO extends DTO {
            readonly model: string;
        }

        interface Car extends Entity<CarDTO> {
            getModel() : string;
            setModel(model: string) : this;
        }

        let carFactory : EntityFactoryImpl<CarDTO, Car>;
        let CarEntity : EntityType<CarDTO, Car>;


        interface PlaneDTO extends DTO {
            readonly tailNumber ?: string;
        }
        interface Plane extends Entity<PlaneDTO> {
            getTailNumber() : string | undefined;
            setTailNumber(tailNumber: string | undefined) : this;
        }

        let planeFactory : EntityFactoryImpl<PlaneDTO, Plane>;
        let PlaneEntity : EntityType<PlaneDTO, Plane>;


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
            readonly vehicle ?: CarDTO | PlaneDTO;
        }

        class TestEntity extends BaseEntity<TestDTO, TestEntity> {

            public static create (dto ?: Partial<TestDTO>) : TestEntity {
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
                    ...dto,
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
                EntityFactoryImpl.create<CarDTO, Car>('Car')
                .add( EntityFactoryImpl.createProperty("model").setDefaultValue("Ford") )
            );
            CarEntity = carFactory.createEntityType('CarEntity');

            planeFactory = (
                EntityFactoryImpl.create<PlaneDTO, Plane>('Plane')
                .add( EntityFactoryImpl.createProperty("tailNumber").setTypes(VariableType.STRING, VariableType.UNDEFINED).setDefaultValue(undefined) )
            );
            PlaneEntity = planeFactory.createEntityType('PlaneEntity');

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

            it('can create a car or plane or undefined getter with an non-defined value', () => {
                const fn = EntityFactoryImpl.createPropertyGetter<TestDTO, TestEntity>(
                    'vehicle',
                    [
                        CarEntity,
                        PlaneEntity,
                        VariableType.UNDEFINED,
                    ]
                );
                const entity = TestEntity.create();
                expect( fn.call(entity) ).toStrictEqual(undefined);
            });

            it('can create a car or plane or undefined getter with a car value', () => {
                const fn = EntityFactoryImpl.createPropertyGetter<TestDTO, TestEntity>(
                    'vehicle',
                    [
                        CarEntity,
                        PlaneEntity,
                        VariableType.UNDEFINED,
                    ]
                );
                const entity = TestEntity.create({
                    vehicle: {
                        model: 'Ford'
                    }
                });
                expect( fn.call(entity).getDTO() ).toStrictEqual({
                    model: 'Ford'
                });
            });

            it('can create a car or plane or undefined getter with a car value in different order', () => {
                const fn = EntityFactoryImpl.createPropertyGetter<TestDTO, TestEntity>(
                    'vehicle',
                    [
                        PlaneEntity,
                        CarEntity,
                        VariableType.UNDEFINED,
                    ]
                );
                const entity = TestEntity.create({
                    vehicle: {
                        model: 'Ford'
                    }
                });
                expect( fn.call(entity).getDTO() ).toStrictEqual({
                    model: 'Ford'
                });
            });

            it('can create a car or plane or undefined getter with a plain value', () => {
                const fn = EntityFactoryImpl.createPropertyGetter<TestDTO, TestEntity>(
                    'vehicle',
                    [
                        CarEntity,
                        PlaneEntity,
                        VariableType.UNDEFINED,
                    ]
                );
                const entity = TestEntity.create({
                    vehicle: {
                        tailNumber: 'FI1234'
                    }
                });
                expect( fn.call(entity).getDTO() ).toStrictEqual({
                    tailNumber: 'FI1234'
                });
            });

            it('can create a car or plane or undefined getter with a plain value in different order', () => {
                const fn = EntityFactoryImpl.createPropertyGetter<TestDTO, TestEntity>(
                    'vehicle',
                    [
                        PlaneEntity,
                        CarEntity,
                        VariableType.UNDEFINED,
                    ]
                );
                const entity = TestEntity.create({
                    vehicle: {
                        tailNumber: 'FI1234'
                    }
                });
                expect( fn.call(entity).getDTO() ).toStrictEqual({
                    tailNumber: 'FI1234'
                });
            });

            it('can create a car or plane or undefined getter with an empty plain object', () => {
                const fn = EntityFactoryImpl.createPropertyGetter<TestDTO, TestEntity>(
                    'vehicle',
                    [
                        CarEntity,
                        PlaneEntity,
                        VariableType.UNDEFINED,
                    ]
                );
                const entity = TestEntity.create({
                    vehicle: {
                    }
                });
                expect( fn.call(entity).getDTO() ).toStrictEqual({
                });
            });

            it('can create a car or plane or undefined getter with an empty plain object in different order', () => {
                const fn = EntityFactoryImpl.createPropertyGetter<TestDTO, TestEntity>(
                    'vehicle',
                    [
                        PlaneEntity,
                        CarEntity,
                        VariableType.UNDEFINED,
                    ]
                );
                const entity = TestEntity.create({
                    vehicle: {
                    }
                });
                expect( fn.call(entity).getDTO() ).toStrictEqual({});
                expect( PlaneEntity.isEntity( fn.call(entity)) ).toBe(true);
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

            it('can create a car or plain or undefined setter with an non-defined value', () => {
                const fn = EntityFactoryImpl.createPropertySetter<TestDTO, TestEntity>(
                    'vehicle',
                    [
                        CarEntity,
                        PlaneEntity,
                        VariableType.UNDEFINED,
                    ]
                );
                const entity = TestEntity.create();
                expect( fn.call(entity, undefined) ).toBe(entity);
                expect( entity.getDTO().vehicle ).toBe(undefined);
                expect( fn.call(entity, CarEntity.create().setModel('Tesla')) ).toBe(entity);
                expect( entity.getDTO().vehicle ).toStrictEqual({'model': 'Tesla'});
            });

            it('can create a car or plain or undefined setter with a car DTO value', () => {
                const fn = EntityFactoryImpl.createPropertySetter<TestDTO, TestEntity>(
                    'vehicle',
                    [
                        CarEntity,
                        PlaneEntity,
                        VariableType.UNDEFINED,
                    ]
                );
                const entity = TestEntity.create();
                expect( fn.call(entity, {
                    model: 'Ford'
                }) ).toBe(entity);
                expect( entity.getDTO().vehicle ).toStrictEqual({ model: 'Ford' });
                expect( fn.call(entity, CarEntity.create().setModel('Tesla')) ).toBe(entity);
                expect( entity.getDTO().vehicle ).toStrictEqual({ model: 'Tesla'});
            });

            it('can create a car or plain or undefined setter with a car entity value', () => {
                const fn = EntityFactoryImpl.createPropertySetter<TestDTO, TestEntity>(
                    'vehicle',
                    [
                        CarEntity,
                        PlaneEntity,
                        VariableType.UNDEFINED,
                    ]
                );
                const entity = TestEntity.create();
                expect( fn.call(entity, CarEntity.create().setModel('Ford')) ).toBe(entity);
                expect( entity.getDTO().vehicle ).toStrictEqual({ model: 'Ford' });
                expect( fn.call(entity, CarEntity.create().setModel('Tesla')) ).toBe(entity);
                expect( entity.getDTO().vehicle ).toStrictEqual({ model: 'Tesla'});
            });

            it('can create a car or plain or undefined setter with a plane entity value', () => {
                const fn = EntityFactoryImpl.createPropertySetter<TestDTO, TestEntity>(
                    'vehicle',
                    [
                        CarEntity,
                        PlaneEntity,
                        VariableType.UNDEFINED,
                    ]
                );
                const entity = TestEntity.create();
                expect( fn.call(entity, PlaneEntity.create().setTailNumber('FI1234')) ).toBe(entity);
                expect( entity.getDTO().vehicle ).toStrictEqual({ tailNumber: 'FI1234' });
                expect( fn.call(entity, PlaneEntity.create().setTailNumber('US9999')) ).toBe(entity);
                expect( entity.getDTO().vehicle ).toStrictEqual({ tailNumber: 'US9999'});
            });

        });

    });

    describe('Static method definitions', () => {

        let entity : EntityFactoryImpl<any, any>;
        let method : EntityMethodImpl;

        beforeEach(() => {
            entity = EntityFactoryImpl.create('Entity');
            method = EntityMethodImpl.create('create').addArgument(VariableType.STRING, VariableType.NUMBER).returnType(VariableType.STRING);
        });

        describe('.addStaticMethod', () => {

            it('can add static method', () => {
                expect( () => entity.addStaticMethod(method) ).not.toThrow();
            });

        });

        describe('.getStaticMethods', () => {

            beforeEach(() => {
                entity.addStaticMethod(method);
            });

            it('can read static method added', () => {
                expect( entity.getStaticMethods() ).toEqual(
                    expect.arrayContaining([
                        method
                    ])
                );
            });

        });

    });

});
