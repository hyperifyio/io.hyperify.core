// Copyright (c) 2023-2024. Heusala Group Oy <info@hg.fi>. All rights reserved.

import "../../../testing/jest/matchers/index";
import { EntityUtils } from "./EntityUtils";
import { EntityFieldType } from "../types/EntityFieldType";

describe('EntityUtils', () => {

    // @Table('foos')
    // class FooEntity extends Entity {
    //     constructor (dto ?: {fooName: string}) {
    //         super()
    //         this.fooId = undefined;
    //         this.fooName = dto?.fooName;
    //     }
    //
    //     @Id()
    //     @Column('foo_id')
    //     public fooId ?: string;
    //
    //     @Column('foo_name')
    //     public fooName ?: string;
    //
    // }

    // @Table('bars')
    // class BarEntity extends Entity {
    //     constructor (dto ?: {barName: string}) {
    //         super()
    //         this.barId = undefined;
    //         this.barName = undefined;
    //     }
    //
    //     @Id()
    //     @Column('bar_id')
    //     public barId ?: string;
    //
    //     @Column('bar_name')
    //     public barName ?: string;
    //
    // }

    describe('#getColumnName', () => {
        it('can get column name', () => {
            expect( EntityUtils.getColumnName('fooBar', [{fieldType: EntityFieldType.UNKNOWN, propertyName: 'fooBar', columnName: 'foo_bar', nullable: false, updatable: true, insertable: true}])).toBe('foo_bar');
        })
    });

    describe('#parseDateAsString', () => {
        it('can parse undefined value as undefined', () => {
            expect( EntityUtils.parseDateAsString(undefined) ).toBe(undefined);
        })
        it('can parse empty string as undefined', () => {
            expect( EntityUtils.parseDateAsString("") ).toBe(undefined);
        })
        it('can parse a string', () => {
            expect( EntityUtils.parseDateAsString('2023-04-23T10:51:32.000Z') ).toBe('2023-04-23T10:51:32Z');
        })
        it('can parse a Date object', () => {
            expect( EntityUtils.parseDateAsString(new Date('2023-04-23T10:51:32.000Z')) ).toBe('2023-04-23T10:51:32Z');
        })
        it('can parse milliseconds', () => {
            expect( EntityUtils.parseDateAsString(1682247092123) ).toBe('2023-04-23T10:51:32Z');
        })
    });

});
