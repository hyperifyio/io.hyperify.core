// Copyright (c) 2023. Heusala Group Oy <info@hg.fi>. All rights reserved.

import { MySqlDateTime } from "./MySqlDateTime";

describe('MySqlDateTime', () => {

    describe('#create', () => {

        it('can create object', () => {
            expect( MySqlDateTime.create("2023-04-23T10:51:32.000Z") ).toBeDefined();
        });

        it('cannot create invalid object', () => {
            expect( () => MySqlDateTime.create("Sun Apr 23 2023 10:51:32 GMT+0000 (Coordinated Universal Time)") ).toThrow('Time was not valid ISO date string: \'Sun Apr 23 2023 10:51:32 GMT+0000 (Coordinated Universal Time)\'');
        });

    });

    describe('#parse', () => {

        it('can parse as object correctly', () => {
            expect( MySqlDateTime.parse("2023-04-23T10:51:32.000Z") ).toBeDefined();
            expect( MySqlDateTime.parse("Sun Apr 23 2023 10:51:32 GMT+0000 (Coordinated Universal Time)") ).toBeDefined();
        });

        it('can parse invalid values as undefined', () => {
            expect( MySqlDateTime.parse("0000-00-00 00:00:00") ).toBe(undefined);
            expect( MySqlDateTime.parse(null) ).toBe(undefined);
            expect( MySqlDateTime.parse(undefined) ).toBe(undefined);
        });

    });

    describe('members', () => {

        let time : MySqlDateTime;

        beforeEach(
            () => {
                time = new MySqlDateTime("2023-04-23T10:51:32.000Z");
            }
        );

        describe('#getISOString', () => {
            it('can get ISO date string', () => {
                expect( time.getISOString() ).toBe('2023-04-23T10:51:32.000Z');
            });
        });

        describe('#toJSON', () => {
            it('can get ISO date string', () => {
                expect( time.toJSON() ).toBe('2023-04-23T10:51:32.000Z');
            });

        });

        describe('#valueOf', () => {

            it('can get ISO date string', () => {
                expect( time.valueOf() ).toBe('2023-04-23T10:51:32.000Z');
            });

        });

        describe('#toString', () => {

            it('can get ISO date string', () => {
                expect( time.toString() ).toBe('2023-04-23 10:51:32');
            });

        });

    });

});
