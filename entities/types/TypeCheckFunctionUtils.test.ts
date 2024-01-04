// Copyright (c) 2023. Heusala Group Oy <info@hg.fi>. All rights reserved.

import { isNumber } from "../../types/Number";
import { isString } from "../../types/String";
import { ChainOperation } from "./ChainOperation";
import { TypeCheckFunctionUtils } from "./TypeCheckFunctionUtils";

describe('TypeCheckFunctionUtils', () => {

    describe('#createChainedFunction', () => {

        it('can create single operation function using OR', () => {

            const fn = TypeCheckFunctionUtils.createChainedFunction(ChainOperation.OR, [isString] );

            expect( fn("hello world") ).toBe(true);

            expect( fn(123) ).toBe(false);
            expect( fn({name : 'John', age: 20}) ).toBe(false);
            expect( fn({name : 'John', age: null}) ).toBe(false);
            expect( fn({name : 123, age: 30}) ).toBe(false);
            expect( fn({age: 30}) ).toBe(false);
            expect( fn({name : 123}) ).toBe(false);
            expect( fn(123.456) ).toBe(false);
            expect( fn(0) ).toBe(false);
            expect( fn(null) ).toBe(false);
            expect( fn(undefined) ).toBe(false);
            expect( fn({}) ).toBe(false);
            expect( fn([]) ).toBe(false);
            expect( fn(true) ).toBe(false);
            expect( fn(false) ).toBe(false);

        });

        it('can create single operation function using AND', () => {

            const fn = TypeCheckFunctionUtils.createChainedFunction(ChainOperation.AND, [isString] );

            expect( fn("hello world") ).toBe(true);

            expect( fn(123) ).toBe(false);
            expect( fn({name : 'John', age: 20}) ).toBe(false);
            expect( fn({name : 'John', age: null}) ).toBe(false);
            expect( fn({name : 123, age: 30}) ).toBe(false);
            expect( fn({age: 30}) ).toBe(false);
            expect( fn({name : 123}) ).toBe(false);
            expect( fn(123.456) ).toBe(false);
            expect( fn(0) ).toBe(false);
            expect( fn(null) ).toBe(false);
            expect( fn(undefined) ).toBe(false);
            expect( fn({}) ).toBe(false);
            expect( fn([]) ).toBe(false);
            expect( fn(true) ).toBe(false);
            expect( fn(false) ).toBe(false);

        });

        it('can create multi operation function using OR', () => {

            const fn = TypeCheckFunctionUtils.createChainedFunction(ChainOperation.OR, [isString, isNumber] );

            expect( fn(123) ).toBe(true);
            expect( fn(123.456) ).toBe(true);
            expect( fn(0) ).toBe(true);
            expect( fn("hello world") ).toBe(true);

            expect( fn({name : 'John', age: 20}) ).toBe(false);
            expect( fn({name : 'John', age: null}) ).toBe(false);
            expect( fn({name : 123, age: 30}) ).toBe(false);
            expect( fn({age: 30}) ).toBe(false);
            expect( fn({name : 123}) ).toBe(false);
            expect( fn(null) ).toBe(false);
            expect( fn(undefined) ).toBe(false);
            expect( fn({}) ).toBe(false);
            expect( fn([]) ).toBe(false);
            expect( fn(true) ).toBe(false);
            expect( fn(false) ).toBe(false);

        });

        it('can create multi operation function using AND', () => {

            const isLower = (value: any) : boolean => value <= 200;
            const isHigher = (value: any) : boolean => value >= 10;

            const fn = TypeCheckFunctionUtils.createChainedFunction(ChainOperation.AND, [isNumber, isLower, isHigher] );

            expect( fn(123) ).toBe(true);
            expect( fn(123.456) ).toBe(true);

            expect( fn(0) ).toBe(false);
            expect( fn(1000) ).toBe(false);
            expect( fn("hello world") ).toBe(false);
            expect( fn({name : 'John', age: 20}) ).toBe(false);
            expect( fn({name : 'John', age: null}) ).toBe(false);
            expect( fn({name : 123, age: 30}) ).toBe(false);
            expect( fn({age: 30}) ).toBe(false);
            expect( fn({name : 123}) ).toBe(false);
            expect( fn(null) ).toBe(false);
            expect( fn(undefined) ).toBe(false);
            expect( fn({}) ).toBe(false);
            expect( fn([]) ).toBe(false);
            expect( fn(true) ).toBe(false);
            expect( fn(false) ).toBe(false);

        });

    });

});
