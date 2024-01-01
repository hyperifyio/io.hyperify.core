// Copyright (c) 2023-2024. Sendanor <info@sendanor.fi>. All rights reserved.

import { isString } from "../../types/String";
import { ColorEntity } from "../color/ColorEntity";
import { StyleEntity } from "../style/StyleEntity";
import { BoxSizing } from "../types/BoxSizing";
import { TextAlign } from "../types/TextAlign";
import { Component } from "./Component";
import { ComponentEntity } from "./ComponentEntity";

describe('ComponentEntity', () => {

    describe('#create', () => {

        it('can create entity', () => {
            const entity = ComponentEntity.create();
            expect(entity).toBeDefined();
        });

        it('can create entity with name', () => {
            const entity = ComponentEntity.create('Foo');
            expect(entity).toBeDefined();
        });

    });

    describe('#isDTO', () => {

        it('can test a DTO with name', () => {
            expect( ComponentEntity.isDTO({name : 'Test'}) ).toBe(true);
        });

    });

    describe('.getDTO', () => {

        let entity : Component;

        beforeEach(() => {
            entity = ComponentEntity.create('Foo');
        });

        it('can get the DTO with name property', () => {
            expect( entity.getDTO() ).toEqual(
                expect.objectContaining({
                    name: "Foo"
                })
            )
        });

        it('can get the DTO with content property', () => {
            entity.addContent('hello');
            expect( entity.getDTO() ).toEqual(
                expect.objectContaining({
                    content: expect.arrayContaining(
                        [
                            'hello'
                        ]
                    )
                })
            );
        });

        it('can get the DTO with extend property', () => {
            entity.extend('Something');
            expect( entity.getDTO() ).toEqual(
                expect.objectContaining({
                    extend: "Something",
                })
            )
        });

        it('can get the DTO with meta property', () => {
            entity.setMeta({
                foo: 'Bar'
            });
            expect( entity.getDTO() ).toEqual(
                expect.objectContaining({
                    meta: expect.objectContaining({
                        foo: 'Bar'
                    }),
                })
            )
        });

        it('can get the DTO with style property', () => {
            entity.setStyle({
                textAlign: TextAlign.CENTER
            });
            expect( entity.getDTO() ).toEqual(
                expect.objectContaining({
                    style: expect.objectContaining({
                        textAlign: 'center'
                    }),
                })
            )
        });

    });

    describe('.valueOf', () => {

        let entity : Component;

        beforeEach(() => {
            entity = ComponentEntity.create('Foo');
        });

        it('can get the DTO with name property', () => {
            expect( entity.valueOf() ).toEqual(
                expect.objectContaining({
                    name: "Foo"
                })
            )
        });

        it('can get the DTO with content property', () => {
            entity.addContent('hello');
            expect( entity.valueOf() ).toEqual(
                expect.objectContaining({
                    content: expect.arrayContaining(
                        [
                            'hello'
                        ]
                    )
                })
            )
        });

        it('can get the DTO with extend property', () => {
            entity.extend('Something');
            expect( entity.valueOf() ).toEqual(
                expect.objectContaining({
                    extend: "Something",
                })
            )
        });

        it('can get the DTO with meta property', () => {
            entity.setMeta({
                foo: 'Bar'
            });
            expect( entity.valueOf() ).toEqual(
                expect.objectContaining({
                    meta: expect.objectContaining({
                        foo: 'Bar'
                    }),
                })
            )
        });

        it('can get the DTO with style property', () => {
            entity.setStyle({
                textAlign: TextAlign.CENTER
            });
            expect( entity.valueOf() ).toEqual(
                expect.objectContaining({
                    style: expect.objectContaining({
                        textAlign: 'center'
                    }),
                })
            )
        });

    });

    describe('.toJSON', () => {

        let entity : Component;

        beforeEach(() => {
            entity = ComponentEntity.create('Foo');
        });

        it('can get the DTO with name property', () => {
            expect( entity.toJSON() ).toEqual(
                expect.objectContaining({
                    name: "Foo"
                })
            )
        });

        it('can get the DTO with content property', () => {
            entity.addContent('hello');
            expect( entity.toJSON() ).toEqual(
                expect.objectContaining({
                    content: expect.arrayContaining(
                        [
                            'hello'
                        ]
                    )
                })
            )
        });

        it('can get the DTO with extend property', () => {
            entity.extend('Something');
            expect( entity.toJSON() ).toEqual(
                expect.objectContaining({
                    extend: "Something",
                })
            )
        });

        it('can get the DTO with meta property', () => {
            entity.setMeta({
                foo: 'Bar'
            });
            expect( entity.toJSON() ).toEqual(
                expect.objectContaining({
                    meta: expect.objectContaining({
                        foo: 'Bar'
                    }),
                })
            )
        });

        it('can get the DTO with style property', () => {
            entity.setStyle({
                textAlign: TextAlign.CENTER
            });
            expect( entity.toJSON() ).toEqual(
                expect.objectContaining({
                    style: expect.objectContaining({
                        textAlign: 'center'
                    }),
                })
            )
        });

    });


    describe('.getName', () => {

        let entity : Component;

        beforeEach(() => {
            entity = ComponentEntity.create('Foo');
        });

        it('can get the name', () => {
            expect( entity.getName() ).toEqual('Foo')
        });

    });

    describe('.setName', () => {

        let entity : Component;

        beforeEach(() => {
            entity = ComponentEntity.create('Foo');
        });

        it('can set the name', () => {
            entity.setName('Bar');
            expect( entity.getName() ).toEqual('Bar');
        });

    });

    describe('.name', () => {

        let entity : Component;

        beforeEach(() => {
            entity = ComponentEntity.create('Foo');
        });

        it('can set the name', () => {
            entity.name('Bar');
            expect( entity.getName() ).toEqual('Bar');
        });

    });


    describe('.getContent', () => {

        let entity : Component;

        beforeEach(() => {
            entity = ComponentEntity.create('Foo').addContent('hello');
        });

        it('can get the content with string', () => {
            expect( entity.getContent() ).toEqual(
                expect.arrayContaining([
                    'hello'
                ])
            );
        });

    });

    describe('.getContentDTO', () => {

        let entity : Component;

        beforeEach(() => {
            entity = ComponentEntity.create('Foo').addContent('hello');
        });

        it('can get the content with string', () => {
            expect( entity.getContentDTO() ).toEqual(
                expect.arrayContaining([
                    'hello'
                ])
            );
        });

    });

    describe('.setContent', () => {

        let entity : Component;

        beforeEach(() => {
            entity = ComponentEntity.create('Foo');
        });

        it('can set the content using a string', () => {

            entity.setContent(['hello']);

            expect( entity.getContent() ).toEqual(
                expect.arrayContaining([
                    'hello'
                ])
            );
        });

    });

    describe('.content', () => {

        let entity : Component;

        beforeEach(() => {
            entity = ComponentEntity.create('Foo');
        });

        it('can set the content using a string', () => {

            entity.content(['hello']);

            expect( entity.getContent() ).toEqual(
                expect.arrayContaining([
                    'hello'
                ])
            );
        });

    });

    describe('.add', () => {

        let entity : Component;

        beforeEach(() => {
            entity = ComponentEntity.create('Foo').setContent(['hello']);
        });

        it('can add more content using a string', () => {
            entity.addContent('world');
            expect( entity.getContent() ).toEqual(
                expect.arrayContaining([
                    'hello',
                    'world',
                ])
            );
        });

    });

    describe('.addContent', () => {

        let entity : Component;

        beforeEach(() => {
            entity = ComponentEntity.create('Foo').setContent(['hello']);
        });

        it('can add more content using a string', () => {
            entity.addContent('world');
            expect( entity.getContent() ).toEqual(
                expect.arrayContaining([
                    'hello',
                    'world',
                ])
            );
        });

    });

    describe('.addText', () => {

        let entity : Component;

        beforeEach(() => {
            entity = ComponentEntity.create('Foo').setContent(['hello']);
        });

        it('can add more content using a string', () => {
            entity.addText('world');
            expect( entity.getContent() ).toEqual(
                expect.arrayContaining([
                    'hello',
                    'world',
                ])
            );
        });

    });


    describe('.getExtend', () => {

        let entity : Component;

        beforeEach(() => {
            entity = ComponentEntity.create('Foo');
        });

        it('can get the extend when it is empty', () => {
            expect( entity.getExtend() ).toEqual(undefined);
        });

        it('can get the extend when it is defined', () => {
            entity.setExtend('Bar');
            expect( entity.getExtend() ).toEqual('Bar');
        });

    });

    describe('.setExtend', () => {

        let entity : Component;

        beforeEach(() => {
            entity = ComponentEntity.create('Foo');
        });

        it('can set the extend', () => {
            entity.setExtend('Bar');
            expect( entity.getExtend() ).toEqual('Bar');
        });

        it('can unset the extend', () => {
            entity.setExtend('Bar');
            expect( entity.getExtend() ).toEqual('Bar');
            entity.setExtend(undefined);
            expect( entity.getExtend() ).toEqual(undefined);
        });

    });

    describe('.extend', () => {

        let entity : Component;

        beforeEach(() => {
            entity = ComponentEntity.create('Foo');
        });

        it('can set the extend', () => {
            entity.extend('Bar');
            expect( entity.getExtend() ).toEqual('Bar');
        });

    });


    describe('.getMeta', () => {

        let entity : Component;

        beforeEach(() => {
            entity = ComponentEntity.create('Foo');
        });

        it('can get the meta when it is empty', () => {
            expect( entity.getMeta() ).toEqual(undefined);
        });

        it('can get the meta when it is defined', () => {
            entity.setMeta({
                hello : 'World'
            });
            expect( entity.getMeta() ).toEqual(
                expect.objectContaining({
                    hello: 'World'
                }),
            );
        });

    });

    describe('.setMeta', () => {

        let entity : Component;

        beforeEach(() => {
            entity = ComponentEntity.create('Foo');
        });

        it('can set the meta', () => {
            entity.setMeta({
                hello : 'World'
            });
            expect( entity.getMeta() ).toEqual(
                expect.objectContaining({
                    hello: 'World'
                }),
            );
        });

        it('can unset the meta', () => {

            entity.setMeta({
                hello : 'World'
            });
            expect( entity.getMeta() ).toEqual(
                expect.objectContaining({
                    hello: 'World'
                }),
            );

            entity.setMeta(undefined);
            expect( entity.getMeta() ).toEqual(undefined);
        });

    });

    describe('.meta', () => {

        let entity : Component;

        beforeEach(() => {
            entity = ComponentEntity.create('Foo');
        });

        it('can set the meta', () => {
            entity.meta({
                hello : 'World'
            });
            expect( entity.getMeta() ).toEqual(
                expect.objectContaining({
                    hello: 'World'
                }),
            );
        });

    });

    describe('.hasMetaProperty', () => {

        let entity : Component;

        beforeEach(() => {
            entity = ComponentEntity.create('Foo');
            entity.setMeta({
                hello : 'World'
            });
        });

        it('can check if meta property does not exist', () => {
            expect( entity.hasMetaProperty('foo') ).toEqual(false);
        });

        it('can check if meta property is defined', () => {
            expect( entity.hasMetaProperty('hello') ).toEqual(true);
        });

    });


    describe('.getMetaProperty', () => {

        let entity : Component;

        beforeEach(() => {
            entity = ComponentEntity.create('Foo');
            entity.setMeta({
                hello : 'World'
            });
        });

        it('can get if meta property does not exist', () => {
            expect( entity.getMetaProperty('foo') ).toStrictEqual(undefined);
        });

        it('can get if meta property is defined', () => {
            expect( entity.getMetaProperty('hello') ).toStrictEqual('World');
        });

    });


    describe('.getMetaString', () => {

        let entity : Component;

        beforeEach(() => {
            entity = ComponentEntity.create('Foo');
            entity.setMeta({
                hello : 'World',
                value : 100,
            });
        });

        it('can get undefined if meta property does not exist', () => {
            expect( entity.getMetaString('foo') ).toStrictEqual(undefined);
        });

        it('can get a string if meta property is defined', () => {
            expect( entity.getMetaString('hello') ).toStrictEqual('World');
        });

        it('can get a string if meta property is a number', () => {
            expect( entity.getMetaString('value') ).toStrictEqual('100');
        });

    });


    describe('.setMetaString', () => {

        let entity : Component;

        beforeEach(() => {
            entity = ComponentEntity.create('Foo');
            entity.setMeta({
                hello : 'World',
                value : 100,
            });
        });

        it('can set a string if meta property is a string', () => {
            entity.setMetaString('hello', 'foobar');
            expect( entity.getMeta() ).toEqual(
                expect.objectContaining({
                    hello: 'foobar',
                    value: 100,
                })
            );
        });

        it('can set a string if meta property is not defined', () => {
            entity.setMetaString('bar', 'foo');
            expect( entity.getMeta() ).toEqual(
                expect.objectContaining({
                    hello: 'World',
                    value: 100,
                    bar: 'foo',
                })
            );
        });

        it('can set a string if meta property is a number', () => {
            entity.setMetaString('value', '1000');
            expect( entity.getMeta() ).toEqual(
                expect.objectContaining({
                    hello: 'World',
                    value: '1000',
                })
            );
        });

    });


    describe('.getMetaNumber', () => {

        let entity : Component;

        beforeEach(() => {
            entity = ComponentEntity.create('Foo');
            entity.setMeta({
                hello : 'World',
                value : 100,
            });
        });

        it('can get undefined if meta property does not exist', () => {
            expect( entity.getMetaNumber('foo') ).toStrictEqual(undefined);
        });

        it('can get a null if meta property is a string', () => {
            expect( entity.getMetaNumber('hello') ).toStrictEqual(null);
        });

        it('can get a number if meta property is a number', () => {
            expect( entity.getMetaNumber('value') ).toStrictEqual(100);
        });

    });

    describe('.setMetaNumber', () => {

        let entity : Component;

        beforeEach(() => {
            entity = ComponentEntity.create('Foo');
            entity.setMeta({
                hello : 'World',
                value : 100,
            });
        });

        it('cannot set a string value', () => {
            expect( () => entity.setMetaNumber('hello', 'foobar' as unknown as number) ).toThrowError(
                TypeError,
                expect.stringContaining('Component.setMetaNumber(): The new property value was not a number: foobar')
            );
            expect( entity.getMeta() ).toEqual(
                expect.objectContaining({
                    hello: 'World',
                    value: 100,
                })
            );
        });

        it('cannot set an undefined value', () => {
            expect( () => entity.setMetaNumber('hello', undefined as unknown as number) ).toThrowError(
                TypeError,
                expect.stringContaining('Component.setMetaNumber(): The new property value was not a number: undefined')
            );
            expect( entity.getMeta() ).toEqual(
                expect.objectContaining({
                    hello: 'World',
                    value: 100,
                })
            );
        });

        it('can set a number if meta property is a string', () => {
            entity.setMetaNumber('hello', 123);
            expect( entity.getMeta() ).toEqual(
                expect.objectContaining({
                    hello: 123,
                    value: 100,
                })
            );
        });

        it('can set a number if meta property is not defined', () => {
            entity.setMetaNumber('bar', 123);
            expect( entity.getMeta() ).toEqual(
                expect.objectContaining({
                    hello: 'World',
                    value: 100,
                    bar: 123
                })
            );
        });

        it('can set a number if meta property is a number', () => {
            entity.setMetaNumber('value', 1000);
            expect( entity.getMeta() ).toEqual(
                expect.objectContaining({
                    hello: 'World',
                    value: 1000,
                })
            );
        });

    });


    describe('.getMetaBoolean', () => {

        let entity : Component;

        beforeEach(() => {
            entity = ComponentEntity.create('Foo');
            entity.setMeta({
                hello : 'World',
                value : 100,
                enabled : true,
                hidden : false,
            });
        });

        it('can get undefined if meta property does not exist', () => {
            expect( entity.getMetaBoolean('foo') ).toStrictEqual(undefined);
        });

        it('can get a null if meta property is a string', () => {
            expect( entity.getMetaBoolean('hello') ).toStrictEqual(null);
        });

        it('can get a boolean if meta property is true', () => {
            expect( entity.getMetaBoolean('enabled') ).toStrictEqual(true);
        });

        it('can get a boolean if meta property is false', () => {
            expect( entity.getMetaBoolean('hidden') ).toStrictEqual(false);
        });

    });

    describe('.setMetaBoolean', () => {

        let entity : Component;

        beforeEach(() => {
            entity = ComponentEntity.create('Foo');
            entity.setMeta({
                hello : 'World',
                value : 100,
                enabled : true,
            });
        });

        it('cannot set a string value', () => {
            expect( () => entity.setMetaBoolean('hello', 'foobar' as unknown as boolean) ).toThrowError(
                TypeError,
                expect.stringContaining('Component.setMetaBoolean(): The new property value was not a boolean: foobar')
            );
            expect( entity.getMeta() ).toEqual(
                expect.objectContaining({
                    hello: 'World',
                    value: 100,
                })
            );
        });

        it('cannot set an undefined value', () => {
            expect( () => entity.setMetaBoolean('hello', undefined as unknown as boolean) ).toThrowError(
                TypeError,
                expect.stringContaining('Component.setMetaBoolean(): The new property value was not a boolean: undefined')
            );
            expect( entity.getMeta() ).toEqual(
                expect.objectContaining({
                    hello: 'World',
                    value: 100,
                })
            );
        });

        it('can set a boolean if meta property is a string', () => {
            entity.setMetaBoolean('hello', true);
            expect( entity.getMeta() ).toEqual(
                expect.objectContaining({
                    hello: true,
                    value: 100,
                })
            );
        });

        it('can set a boolean if meta property is not defined', () => {
            entity.setMetaBoolean('bar', true);
            expect( entity.getMeta() ).toEqual(
                expect.objectContaining({
                    hello: 'World',
                    value: 100,
                    bar: true
                })
            );
        });

        it('can set a boolean if meta property is a boolean', () => {
            entity.setMetaBoolean('enabled', false);
            expect( entity.getMeta() ).toEqual(
                expect.objectContaining({
                    hello: 'World',
                    value: 100,
                    enabled: false,
                })
            );
        });

    });


    describe('.getMetaArray', () => {

        let entity : Component;

        beforeEach(() => {
            entity = ComponentEntity.create('Foo');
            entity.setMeta({
                hello : 'World',
                value : 100,
                enabled : true,
                hidden : false,
                payload : ['foo', 'bar']
            });
        });

        it('can get undefined if meta property does not exist', () => {
            expect( entity.getMetaArray('foo') ).toStrictEqual(undefined);
        });

        it('can get a null if meta property is a string', () => {
            expect( entity.getMetaArray('hello') ).toStrictEqual(null);
        });

        it('can get an array if meta property is array', () => {
            expect( entity.getMetaArray('payload') ).toStrictEqual(['foo', 'bar']);
        });

    });

    describe('.getMetaArrayOf', () => {

        let entity : Component;

        beforeEach(() => {
            entity = ComponentEntity.create('Foo');
            entity.setMeta({
                hello : 'World',
                value : 100,
                enabled : true,
                hidden : false,
                payload : ['foo', 'bar'],
                ids : [123, 456],
            });
        });

        it('cannot get an array if value is number array', () => {
            expect( entity.getMetaArrayOf<string>('ids', isString) ).toStrictEqual(null);
        });

        it('can get undefined if meta property does not exist', () => {
            expect( entity.getMetaArrayOf<string>('foo', isString) ).toStrictEqual(undefined);
        });

        it('can get a null if meta property is a string', () => {
            expect( entity.getMetaArrayOf<string>('hello', isString) ).toStrictEqual(null);
        });

        it('can get an array if meta property is array', () => {
            expect( entity.getMetaArrayOf<string>('payload', isString) ).toStrictEqual(['foo', 'bar']);
        });

    });

    describe('.setMetaArray', () => {

        let entity : Component;

        beforeEach(() => {
            entity = ComponentEntity.create('Foo');
            entity.setMeta({
                hello : 'World',
                value : 100,
                enabled : true,
                payload : [],
            });
        });

        it('cannot set a string value', () => {
            expect( () => entity.setMetaArray('payload', 'foobar' as unknown as string[]) ).toThrowError(
                TypeError,
                expect.stringContaining('Component.setMetaArray(): The new property value was not an array: foobar')
            );
            expect( entity.getMeta() ).toEqual(
                expect.objectContaining({
                    hello: 'World',
                    value: 100,
                    enabled : true,
                    payload : [],
                })
            );
        });

        it('cannot set an undefined value', () => {
            expect( () => entity.setMetaArray('hello', undefined as unknown as string[]) ).toThrowError(
                TypeError,
                expect.stringContaining('Component.setMetaArray(): The new property value was not an array: undefined')
            );
            expect( entity.getMeta() ).toEqual(
                expect.objectContaining({
                    hello: 'World',
                    value: 100,
                    enabled : true,
                    payload : [],
                })
            );
        });

        it('can set an array if meta property is a string', () => {
            entity.setMetaArray('hello', ['hello', 'world']);
            expect( entity.getMeta() ).toEqual(
                expect.objectContaining({
                    hello: ['hello', 'world'],
                    value: 100,
                    enabled : true,
                    payload : [],
                })
            );
        });

        it('can set an array if meta property is an array', () => {
            entity.setMetaArray('payload', ['hello', 'world']);
            expect( entity.getMeta() ).toEqual(
                expect.objectContaining({
                    hello: 'World',
                    value: 100,
                    enabled : true,
                    payload : ['hello', 'world'],
                })
            );
        });

        it('can set an array if meta property is not defined', () => {
            entity.setMetaArray('bar', ['hello', 'world']);
            expect( entity.getMeta() ).toEqual(
                expect.objectContaining({
                    hello: 'World',
                    value: 100,
                    bar: ['hello', 'world'],
                    enabled : true,
                    payload : [],
                })
            );
        });

        it('can set an array if meta property is a boolean', () => {
            entity.setMetaArray('enabled', ['hello', 'world']);
            expect( entity.getMeta() ).toEqual(
                expect.objectContaining({
                    hello: 'World',
                    value: 100,
                    enabled: ['hello', 'world'],
                    payload : [],
                })
            );
        });

    });


    describe('.getMetaObject', () => {

        let entity : Component;

        beforeEach(() => {
            entity = ComponentEntity.create('Foo');
            entity.setMeta({
                hello : 'World',
                value : 100,
                enabled : true,
                hidden : false,
                payload : ['foo', 'bar']
            });
        });

        it('can get undefined if meta property does not exist', () => {
            expect( entity.getMetaObject('foo') ).toStrictEqual(undefined);
        });

        it('can get a null if meta property is a string', () => {
            expect( entity.getMetaObject('hello') ).toStrictEqual(null);
        });

        it('can get an array if meta property is array', () => {
            expect( entity.getMetaObject('payload') ).toStrictEqual(['foo', 'bar']);
        });

    });

    describe('.setMetaObject', () => {

        let entity : Component;

        beforeEach(() => {
            entity = ComponentEntity.create('Foo');
            entity.setMeta({
                hello : 'World',
                value : 100,
                enabled : true,
                payload : [],
            });
        });

        it('cannot set a string value', () => {
            expect( () => entity.setMetaObject('payload', 'foobar' as unknown as {}) ).toThrowError(
                TypeError,
                expect.stringContaining('Component.setMetaObject(): The new property value was not an array: foobar')
            );
            expect( entity.getMeta() ).toEqual(
                expect.objectContaining({
                    hello: 'World',
                    value: 100,
                    enabled : true,
                    payload : [],
                })
            );
        });

        it('cannot set an undefined value', () => {
            expect( () => entity.setMetaObject('hello', undefined as unknown as {}) ).toThrowError(
                TypeError,
                expect.stringContaining('Component.setMetaObject(): The new property value was not an array: undefined')
            );
            expect( entity.getMeta() ).toEqual(
                expect.objectContaining({
                    hello: 'World',
                    value: 100,
                    enabled : true,
                    payload : [],
                })
            );
        });

        it('can set an array if meta property is a string', () => {
            entity.setMetaObject('hello', {hello : 'world'});
            expect( entity.getMeta() ).toEqual(
                expect.objectContaining({
                    hello: {hello : 'world'},
                    value: 100,
                    enabled : true,
                    payload : [],
                })
            );
        });

        it('can set an object if meta property is an object', () => {
            entity.setMetaObject('payload', {hello : 'world'});
            expect( entity.getMeta() ).toEqual(
                expect.objectContaining({
                    hello: 'World',
                    value: 100,
                    enabled : true,
                    payload : {hello : 'world'},
                })
            );
        });

        it('can set an object if meta property is not defined', () => {
            entity.setMetaObject('bar', {hello : 'world'});
            expect( entity.getMeta() ).toEqual(
                expect.objectContaining({
                    hello: 'World',
                    value: 100,
                    bar: {hello : 'world'},
                    enabled : true,
                    payload : [],
                })
            );
        });

        it('can set an object if meta property is a boolean', () => {
            entity.setMetaObject('enabled', {hello : 'world'});
            expect( entity.getMeta() ).toEqual(
                expect.objectContaining({
                    hello: 'World',
                    value: 100,
                    enabled: {hello : 'world'},
                    payload : [],
                })
            );
        });

    });


    describe('.getStyle', () => {

        let entity : Component;

        beforeEach(() => {
            entity = ComponentEntity.create('Foo');
        });

        it('cannot get a style when it is empty', () => {
            expect( entity.getStyle() ).toEqual(undefined);
        });

        it('can get a style when text align is defined', () => {
            entity.setStyle({
                textAlign : TextAlign.CENTER
            });
            expect( entity.getStyle().getDTO() ).toEqual(
                expect.objectContaining({
                    textAlign: TextAlign.CENTER
                }),
            );
        });

        it('can get a style when box sizing is defined', () => {
            entity.setStyle({
                boxSizing : BoxSizing.BORDER_BOX
            });
            expect( entity.getStyle().getDTO() ).toEqual(
                expect.objectContaining({
                    boxSizing: BoxSizing.BORDER_BOX
                }),
            );
        });

    });

    describe('.getStyleDTO', () => {

        let entity : Component;

        beforeEach(() => {
            entity = ComponentEntity.create('Foo');
        });

        it('cannot get a style when it is empty', () => {
            expect( entity.getStyleDTO() ).toEqual(undefined);
        });

        it('can get a style when it is defined', () => {
            entity.setStyle({
                textAlign : TextAlign.CENTER
            });
            expect( entity.getStyleDTO() ).toEqual(
                expect.objectContaining({
                    textAlign: TextAlign.CENTER
                }),
            );
        });

    });

    describe('.setStyle', () => {

        let entity : Component;

        beforeEach(() => {
            entity = ComponentEntity.create('Foo');
        });

        it('can set a text align style using DTO', () => {
            entity.setStyle({
                textAlign : TextAlign.CENTER
            });
            expect( entity.getStyleDTO() ).toEqual(
                expect.objectContaining({
                    textAlign : TextAlign.CENTER
                }),
            );
        });

        it('can set a box sizing style using DTO', () => {
            entity.setStyle({
                boxSizing : BoxSizing.BORDER_BOX
            });
            expect( entity.getStyleDTO() ).toEqual(
                expect.objectContaining({
                    boxSizing : BoxSizing.BORDER_BOX
                }),
            );
        });

        it('can set a box sizing style using entity', () => {
            entity.setStyle(
                StyleEntity.create().setBoxSizing(BoxSizing.BORDER_BOX)
            );
            expect( entity.getStyleDTO() ).toEqual(
                expect.objectContaining({
                    boxSizing : BoxSizing.BORDER_BOX
                }),
            );
        });

        it('can unset a style', () => {
            entity.setStyle({
                textAlign : TextAlign.CENTER
            });
            expect( entity.getStyleDTO() ).toEqual(
                expect.objectContaining({
                    textAlign : TextAlign.CENTER
                }),
            );

            entity.setStyle(undefined);
            expect( entity.getStyleDTO() ).toEqual(undefined);
        });

    });

    describe('.style', () => {

        let entity : Component;

        beforeEach(() => {
            entity = ComponentEntity.create('Foo');
        });

        it('can set a style', () => {
            entity.style({
                textAlign : TextAlign.CENTER
            });
            expect( entity.getStyleDTO() ).toEqual(
                expect.objectContaining({
                    textAlign : TextAlign.CENTER
                }),
            );
        });

    });

    describe('.addStyle', () => {

        let entity : Component;

        beforeEach(() => {
            entity = ComponentEntity.create('Foo');
            entity.setStyle({
                textAlign : TextAlign.CENTER
            });
        });

        it('can override a style', () => {
            entity.addStyle({
                textAlign : TextAlign.LEFT
            });
            expect( entity.getStyleDTO() ).toEqual(
                expect.objectContaining({
                    textAlign : TextAlign.LEFT
                }),
            );
        });

        it('can add a style', () => {
            const color = ColorEntity.create('#fff').getDTO();
            entity.addStyle({
                textColor : color
            });
            expect( entity.getStyleDTO() ).toEqual(
                expect.objectContaining({
                    textAlign : TextAlign.CENTER,
                    textColor: color,
                }),
            );
        });

    });

    describe('.addStyles', () => {

        let entity : Component;

        beforeEach(() => {
            entity = ComponentEntity.create('Foo');
            entity.setStyle({
                textAlign : TextAlign.CENTER
            });
        });

        it('can override a style from DTO', () => {
            entity.addStyles({
                textAlign : TextAlign.LEFT
            });
            expect( entity.getStyleDTO() ).toEqual(
                expect.objectContaining({
                    textAlign : TextAlign.LEFT
                }),
            );
        });

        it('can append a text color style from DTO', () => {
            const color = ColorEntity.create('#fff').getDTO();
            entity.addStyles({
                textColor : color
            });
            expect( entity.getStyleDTO() ).toEqual(
                expect.objectContaining({
                    textAlign : TextAlign.CENTER,
                    textColor: color,
                }),
            );
        });

        it('can append a style from entity', () => {
            const color = ColorEntity.create('#fff').getDTO();
            entity.addStyles(
                StyleEntity.create().setTextColor(color)
            );
            expect( entity.getStyleDTO() ).toEqual(
                expect.objectContaining({
                    textAlign : TextAlign.CENTER,
                    textColor: color,
                }),
            );
        });

    });


});
