// Copyright (c) 2023-2024. Sendanor <info@sendanor.fi>. All rights reserved.

import { ComponentDTO } from "../component/ComponentDTO";
import {
    ComponentEntity,
} from "../component/ComponentEntity";
import { RouteDTO } from "../route/RouteDTO";
import { RouteEntity } from "../route/RouteEntity";
import { ViewDTO } from "../view/ViewDTO";
import { ViewEntity } from "../view/ViewEntity";
import { App } from "./App";
import { AppEntity } from "./AppEntity";

describe('AppEntity', () => {

    describe('static methods', () => {

        describe('#create', () => {

            it('can create entity', () => {
                const entity = AppEntity.create();
                expect(entity).toBeDefined();
            });

            it('can create entity with name', () => {
                const entity = AppEntity.create('Foo');
                expect(entity).toBeDefined();
            });

        });

    });

    describe('standard instance methods', () => {

        describe('.getDTO', () => {

            let entity : App;

            beforeEach(() => {
                entity = AppEntity.create('Foo');
            });

            it('can get the DTO with name property', () => {
                expect( entity.getDTO() ).toEqual(
                    expect.objectContaining({
                        name: "Foo"
                    })
                )
            });

            it('can get the DTO with components property', () => {
                const component = ComponentEntity.create('foo').getDTO();
                entity.setComponents([
                    component
                ]);
                expect( entity.getDTO() ).toEqual(
                    expect.objectContaining({
                        components: expect.arrayContaining(
                            [
                                component
                            ]
                        )
                    })
                );
            });

            it('can get the DTO with views property', () => {
                const view = ViewEntity.create('foo').getDTO();
                entity.setViews([
                    view
                ]);
                expect( entity.getDTO() ).toEqual(
                    expect.objectContaining({
                        views: expect.arrayContaining(
                            [
                                view
                            ]
                        )
                    })
                );
            });

            it('can get the DTO with routes property', () => {
                const route = RouteEntity.create('foo').getDTO();
                entity.setRoutes([
                    route
                ]);
                expect( entity.getDTO() ).toEqual(
                    expect.objectContaining({
                        routes: expect.arrayContaining(
                            [
                                route
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

            it('can get the DTO with publicUrl property', () => {
                entity.publicUrl('http://my.host');
                expect( entity.getDTO() ).toEqual(
                    expect.objectContaining({
                        publicUrl: "http://my.host",
                    })
                )
            });

            it('can get the DTO with language property', () => {
                entity.language('es');
                expect( entity.getDTO() ).toEqual(
                    expect.objectContaining({
                        language: "es",
                    })
                )
            });

        });

        describe('.valueOf', () => {

            let entity : App;

            beforeEach(() => {
                entity = AppEntity.create('Foo');
            });

            it('can get the DTO with name property', () => {
                expect( entity.valueOf() ).toEqual(
                    expect.objectContaining({
                        name: "Foo"
                    })
                )
            });

            it('can get the DTO with components property', () => {
                const component = ComponentEntity.create('foo').getDTO();
                entity.setComponents([
                    component
                ]);
                expect( entity.valueOf() ).toEqual(
                    expect.objectContaining({
                        components: expect.arrayContaining(
                            [
                                component
                            ]
                        )
                    })
                );
            });

            it('can get the DTO with views property', () => {
                const view = ViewEntity.create('foo').getDTO();
                entity.setViews([
                    view
                ]);
                expect( entity.valueOf() ).toEqual(
                    expect.objectContaining({
                        views: expect.arrayContaining(
                            [
                                view
                            ]
                        )
                    })
                );
            });

            it('can get the DTO with routes property', () => {
                const route = RouteEntity.create('foo').getDTO();
                entity.setRoutes([
                    route
                ]);
                expect( entity.valueOf() ).toEqual(
                    expect.objectContaining({
                        routes: expect.arrayContaining(
                            [
                                route
                            ]
                        )
                    })
                );
            });

            it('can get the DTO with extend property', () => {
                entity.extend('Something');
                expect( entity.valueOf() ).toEqual(
                    expect.objectContaining({
                        extend: "Something",
                    })
                )
            });

            it('can get the DTO with publicUrl property', () => {
                entity.publicUrl('http://my.host');
                expect( entity.valueOf() ).toEqual(
                    expect.objectContaining({
                        publicUrl: "http://my.host",
                    })
                )
            });

            it('can get the DTO with language property', () => {
                entity.language('es');
                expect( entity.valueOf() ).toEqual(
                    expect.objectContaining({
                        language: "es",
                    })
                )
            });

        });

        describe('.toJSON', () => {

            let entity : App;

            beforeEach(() => {
                entity = AppEntity.create('Foo');
            });

            it('can get the DTO with name property', () => {
                expect( entity.toJSON() ).toEqual(
                    expect.objectContaining({
                        name: "Foo"
                    })
                )
            });

            it('can get the DTO with components property', () => {
                const component = ComponentEntity.create('foo').getDTO();
                entity.setComponents([
                    component
                ]);
                expect( entity.toJSON() ).toEqual(
                    expect.objectContaining({
                        components: expect.arrayContaining(
                            [
                                component
                            ]
                        )
                    })
                );
            });

            it('can get the DTO with views property', () => {
                const view = ViewEntity.create('foo').getDTO();
                entity.setViews([
                    view
                ]);
                expect( entity.toJSON() ).toEqual(
                    expect.objectContaining({
                        views: expect.arrayContaining(
                            [
                                view
                            ]
                        )
                    })
                );
            });

            it('can get the DTO with routes property', () => {
                const route = RouteEntity.create('foo').getDTO();
                entity.setRoutes([
                    route
                ]);
                expect( entity.toJSON() ).toEqual(
                    expect.objectContaining({
                        routes: expect.arrayContaining(
                            [
                                route
                            ]
                        )
                    })
                );
            });

            it('can get the DTO with extend property', () => {
                entity.extend('Something');
                expect( entity.toJSON() ).toEqual(
                    expect.objectContaining({
                        extend: "Something",
                    })
                )
            });

            it('can get the DTO with publicUrl property', () => {
                entity.publicUrl('http://my.host');
                expect( entity.toJSON() ).toEqual(
                    expect.objectContaining({
                        publicUrl: "http://my.host",
                    })
                )
            });

            it('can get the DTO with language property', () => {
                entity.language('es');
                expect( entity.toJSON() ).toEqual(
                    expect.objectContaining({
                        language: "es",
                    })
                )
            });

        });

    });

    describe('name methods', () => {

        describe('.getName', () => {

            let entity : App;

            beforeEach(() => {
                entity = AppEntity.create('Foo');
            });

            it('can get the name', () => {
                expect( entity.getName() ).toEqual('Foo')
            });

        });

        describe('.setName', () => {

            let entity : App;

            beforeEach(() => {
                entity = AppEntity.create('Foo');
            });

            it('can set the name', () => {
                entity.setName('Bar');
                expect( entity.getName() ).toEqual('Bar');
            });

        });

        describe('.name', () => {

            let entity : App;

            beforeEach(() => {
                entity = AppEntity.create('Foo');
            });

            it('can set the name', () => {
                entity.name('Bar');
                expect( entity.getName() ).toEqual('Bar');
            });

        });

    });

    describe('component methods', () => {

        let component : ComponentDTO;
        let component2 : ComponentDTO;
        let entity : App;

        beforeEach(() => {
            component = ComponentEntity.create('Test').getDTO();
            component2 = ComponentEntity.create('SecondTest').getDTO();
            entity = AppEntity.create('Foo');

            expect(component).toBeDefined();
            expect(component2).toBeDefined();
            expect(entity).toBeDefined();
        });

        describe('.getComponents', () => {

            beforeEach(() => {
                expect(component).toBeDefined();
                entity = entity.setComponents([component]);
            });

            it('can get the component entity', () => {
                const result = entity.getComponents();
                expect( result ).toHaveLength(1);
                expect( result[0].getDTO() ).toEqual(
                    expect.objectContaining( component )
                );
            });

        });

        describe('.getComponentsDTO', () => {

            beforeEach(() => {
                entity = entity.setComponents([component]);
            });

            it('can get the content with string', () => {
                expect( entity.getComponentsDTO() ).toEqual(
                    expect.arrayContaining([
                        component
                    ])
                );
            });

        });

        describe('.setComponents', () => {

            it('can set the content using a string', () => {

                entity.setComponents([component]);

                expect( entity.getComponentsDTO() ).toEqual(
                    expect.arrayContaining([
                        component
                    ])
                );
            });

        });

        describe('.components', () => {

            it('can set the content using a string', () => {

                entity.components([component]);

                expect( entity.getComponentsDTO() ).toEqual(
                    expect.arrayContaining([
                        component
                    ])
                );
            });

        });

        describe('.addComponents', () => {

            beforeEach(() => {
                entity.setComponents([component]);
            });

            it('can add more content using a string', () => {
                entity.addComponents(component2);
                expect( entity.getComponentsDTO() ).toEqual(
                    expect.arrayContaining([
                        component,
                        component2,
                    ])
                );
            });

        });

        describe('.addComponent', () => {

            beforeEach(() => {
                entity.setComponents([component]);
            });

            it('can add more content using a string', () => {
                entity.addComponent(component2);
                expect( entity.getComponentsDTO() ).toEqual(
                    expect.arrayContaining([
                        component,
                        component2,
                    ])
                );
            });

        });

    });

    describe('views methods', () => {

        let view : ViewDTO;
        let view2 : ViewDTO;
        let entity : App;

        beforeEach(() => {
            view = ViewEntity.create('Test').getDTO();
            view2 = ViewEntity.create('SecondTest').getDTO();
            entity = AppEntity.create('Foo');

            expect(view).toBeDefined();
            expect(view2).toBeDefined();
            expect(entity).toBeDefined();
        });

        describe('.getViews', () => {

            beforeEach(() => {
                expect(view).toBeDefined();
                entity = entity.setViews([view]);
            });

            it('can get the view entity', () => {
                const result = entity.getViews();
                expect( result ).toHaveLength(1);
                expect( result[0].getDTO() ).toEqual(
                    expect.objectContaining( view )
                );
            });

        });

        describe('.getViewsDTO', () => {

            beforeEach(() => {
                entity = entity.setViews([view]);
            });

            it('can get the content with string', () => {
                expect( entity.getViewsDTO() ).toEqual(
                    expect.arrayContaining([
                        view
                    ])
                );
            });

        });

        describe('.setViews', () => {

            it('can set the content using a string', () => {

                entity.setViews([view]);

                expect( entity.getViewsDTO() ).toEqual(
                    expect.arrayContaining([
                        view
                    ])
                );
            });

        });

        describe('.views', () => {

            it('can set the content using a string', () => {

                entity.views([view]);

                expect( entity.getViewsDTO() ).toEqual(
                    expect.arrayContaining([
                        view
                    ])
                );
            });

        });

        describe('.addViews', () => {

            beforeEach(() => {
                entity.setViews([view]);
            });

            it('can add more content using a string', () => {
                entity.addViews(view2);
                expect( entity.getViewsDTO() ).toEqual(
                    expect.arrayContaining([
                        view,
                        view2,
                    ])
                );
            });

        });

        describe('.addView', () => {

            beforeEach(() => {
                entity.setViews([view]);
            });

            it('can add more content using a string', () => {
                entity.addView(view2);
                expect( entity.getViewsDTO() ).toEqual(
                    expect.arrayContaining([
                        view,
                        view2,
                    ])
                );
            });

        });


    });

    describe('routes methods', () => {

        let route : RouteDTO;
        let route2 : RouteDTO;
        let entity : App;

        beforeEach(() => {
            route = RouteEntity.create('Test').getDTO();
            route2 = RouteEntity.create('SecondTest').getDTO();
            entity = AppEntity.create('Foo');

            expect(route).toBeDefined();
            expect(route2).toBeDefined();
            expect(entity).toBeDefined();
        });

        describe('.getRoutes', () => {

            beforeEach(() => {
                expect(route).toBeDefined();
                entity = entity.setRoutes([route]);
            });

            it('can get the route entity', () => {
                const result = entity.getRoutes();
                expect( result ).toHaveLength(1);
                expect( result[0].getDTO() ).toEqual(
                    expect.objectContaining( route )
                );
            });

        });

        describe('.getRoutesDTO', () => {

            beforeEach(() => {
                entity = entity.setRoutes([route]);
            });

            it('can get the content with string', () => {
                expect( entity.getRoutesDTO() ).toEqual(
                    expect.arrayContaining([
                        route
                    ])
                );
            });

        });

        describe('.setRoutes', () => {

            it('can set the content using a string', () => {

                entity.setRoutes([route]);

                expect( entity.getRoutesDTO() ).toEqual(
                    expect.arrayContaining([
                        route
                    ])
                );
            });

        });

        describe('.routes', () => {

            it('can set the content using a string', () => {

                entity.routes([route]);

                expect( entity.getRoutesDTO() ).toEqual(
                    expect.arrayContaining([
                        route
                    ])
                );
            });

        });

        describe('.addRoutes', () => {

            beforeEach(() => {
                entity.setRoutes([route]);
            });

            it('can add more content using a string', () => {
                entity.addRoutes(route2);
                expect( entity.getRoutesDTO() ).toEqual(
                    expect.arrayContaining([
                        route,
                        route2,
                    ])
                );
            });

        });

        describe('.addRoute', () => {

            beforeEach(() => {
                entity.setRoutes([route]);
            });

            it('can add more content using a string', () => {
                entity.addRoute(route2);
                expect( entity.getRoutesDTO() ).toEqual(
                    expect.arrayContaining([
                        route,
                        route2,
                    ])
                );
            });

        });


    });

    describe('extend methods', () => {

        let entity : App;

        beforeEach(() => {
            entity = AppEntity.create('Foo');
        });

        describe('.getExtend', () => {

            it('can get the extend when it is empty', () => {
                expect( entity.getExtend() ).toEqual(undefined);
            });

            it('can get the extend when it is defined', () => {
                entity.setExtend('Bar');
                expect( entity.getExtend() ).toEqual('Bar');
            });

        });

        describe('.setExtend', () => {

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

            it('can set the extend', () => {
                entity.extend('Bar');
                expect( entity.getExtend() ).toEqual('Bar');
            });

        });

    });

    describe('publicUrl methods', () => {

        let entity : App;

        beforeEach(() => {
            entity = AppEntity.create('Foo');
        });

        describe('.getPublicUrl', () => {

            it('can get the publicUrl when it is empty', () => {
                expect( entity.getPublicUrl() ).toEqual(undefined);
            });

            it('can get the publicUrl when it is defined', () => {
                entity.setPublicUrl('Bar');
                expect( entity.getPublicUrl() ).toEqual('Bar');
            });

        });

        describe('.setPublicUrl', () => {

            it('can set the publicUrl', () => {
                entity.setPublicUrl('Bar');
                expect( entity.getPublicUrl() ).toEqual('Bar');
            });

            it('can unset the publicUrl', () => {
                entity.setPublicUrl('Bar');
                expect( entity.getPublicUrl() ).toEqual('Bar');
                entity.setPublicUrl(undefined);
                expect( entity.getPublicUrl() ).toEqual(undefined);
            });

        });

        describe('.publicUrl', () => {

            it('can set the publicUrl', () => {
                entity.publicUrl('Bar');
                expect( entity.getPublicUrl() ).toEqual('Bar');
            });

        });

    });

    describe('language methods', () => {

        let entity : App;

        beforeEach(() => {
            entity = AppEntity.create('Foo');
        });

        describe('.getLanguage', () => {

            it('can get the language when it is empty', () => {
                expect( entity.getLanguage() ).toEqual(undefined);
            });

            it('can get the language when it is defined', () => {
                entity.setLanguage('Bar');
                expect( entity.getLanguage() ).toEqual('Bar');
            });

        });

        describe('.setLanguage', () => {

            it('can set the language', () => {
                entity.setLanguage('Bar');
                expect( entity.getLanguage() ).toEqual('Bar');
            });

            it('can unset the language', () => {
                entity.setLanguage('Bar');
                expect( entity.getLanguage() ).toEqual('Bar');
                entity.setLanguage(undefined);
                expect( entity.getLanguage() ).toEqual(undefined);
            });

        });

        describe('.language', () => {

            it('can set the language', () => {
                entity.language('Bar');
                expect( entity.getLanguage() ).toEqual('Bar');
            });

        });


    });

});
