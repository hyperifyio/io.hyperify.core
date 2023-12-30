// Copyright (c) 2023. Heusala Group Oy <info@hg.fi>. All rights reserved.

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


});
