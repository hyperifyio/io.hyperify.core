// Copyright (c) 2024. Heusala Group Oy <info@hg.fi>. All rights reserved.

import { UnitType } from "../types/UnitType";
import { FontEntity } from "./FontEntity";
import { FontStyle } from "./types/FontStyle";
import { FontVariant } from "./types/FontVariant";
import { FontWeight } from "./types/FontWeight";

describe('FontEntity', () => {

    describe('Static methods', () => {

        describe('#create', () => {

            it('can create empty entity', () => {
                const entity = FontEntity.create();
                expect(entity).toBeDefined();
            });

        });

    });

    describe('Font style methods', () => {

        let entity : FontEntity;

        beforeEach(() => {
            entity = FontEntity.create({
                style: FontStyle.ITALIC
            });
        });

        describe('.getStyle', () => {
            it('can get font style', () => {
                expect( entity.getStyle() ).toBe(FontStyle.ITALIC);
            });
        });

        describe('.setStyle', () => {
            it('can set font style', () => {
                entity.setStyle(FontStyle.NORMAL);
                expect( entity.getDTO() ).toEqual(
                    expect.objectContaining({
                        style: FontStyle.NORMAL
                    })
                );
            });
        });

        describe('.getFontStyle', () => {
            it('can get font style', () => {
                expect( entity.getFontStyle() ).toBe(FontStyle.ITALIC);
            });
        });

        describe('.setFontStyle', () => {
            it('can set font style', () => {
                entity.setFontStyle(FontStyle.NORMAL);
                expect( entity.getDTO() ).toEqual(
                    expect.objectContaining({
                        style: FontStyle.NORMAL
                    })
                );
            });
        });

    });

    describe('Font variant methods', () => {

        let entity : FontEntity;

        beforeEach(() => {
            entity = FontEntity.create({
                variant: FontVariant.SMALL_CAPS
            });
        });

        describe('.getVariant', () => {
            it('can get font variant', () => {
                expect( entity.getVariant() ).toBe(FontVariant.SMALL_CAPS);
            });
        });

        describe('.setVariant', () => {
            it('can set font variant', () => {
                entity.setVariant(FontVariant.NORMAL);
                expect( entity.getDTO() ).toEqual(
                    expect.objectContaining({
                        variant: FontVariant.NORMAL
                    })
                );
            });
        });

        describe('.getFontVariant', () => {
            it('can get font variant', () => {
                expect( entity.getFontVariant() ).toBe(FontVariant.SMALL_CAPS);
            });
        });

        describe('.setFontVariant', () => {
            it('can set font variant', () => {
                entity.setFontVariant(FontVariant.NORMAL);
                expect( entity.getDTO() ).toEqual(
                    expect.objectContaining({
                        variant: FontVariant.NORMAL
                    })
                );
            });
        });

    });

    describe('Font weight methods', () => {

        let entity : FontEntity;

        beforeEach(() => {
            entity = FontEntity.create({
                weight: FontWeight.NORMAL
            });
        });

        describe('.getWeight', () => {
            it('can get font weight', () => {
                expect( entity.getWeight() ).toBe(FontWeight.NORMAL);
            });
        });

        describe('.setWeight', () => {
            it('can set font weight', () => {
                entity.setWeight(FontWeight.BOLD);
                expect( entity.getDTO() ).toEqual(
                    expect.objectContaining({
                        weight: FontWeight.BOLD
                    })
                );
            });
        });

        describe('.getFontWeight', () => {
            it('can get font weight', () => {
                expect( entity.getFontWeight() ).toBe(FontWeight.NORMAL);
            });
        });

        describe('.setFontWeight', () => {
            it('can set font weight', () => {
                entity.setFontWeight(FontWeight.BOLD);
                expect( entity.getDTO() ).toEqual(
                    expect.objectContaining({
                        weight: FontWeight.BOLD
                    })
                );
            });
        });

    });

    describe('Font size methods', () => {

        let entity : FontEntity;

        beforeEach(() => {
            entity = FontEntity.create({
                size: {
                    value: 10,
                    unit: UnitType.PX,
                }
            });
        });

        describe('.getSize', () => {
            it('can get font size', () => {
                expect( entity.getSize()?.getDTO() ).toEqual(
                    expect.objectContaining({
                        value: 10,
                        unit: UnitType.PX,
                    })
                );
            });
        });

        describe('.setSize', () => {
            it('can set font size', () => {
                entity.setSize({
                    value: 20,
                    unit: UnitType.PX,
                });
                expect( entity.getDTO() ).toEqual(
                    expect.objectContaining({
                        size: expect.objectContaining({
                            value: 20,
                            unit: UnitType.PX,
                        })
                    })
                );
            });
        });

        describe('.getFontSize', () => {
            it('can get font size', () => {
                expect( entity.getFontSize()?.getDTO() ).toEqual(
                    expect.objectContaining({
                        value: 10,
                        unit: UnitType.PX,
                    })
                );
            });
        });

        describe('.setFontSize', () => {
            it('can set font size', () => {
                entity.setFontSize({
                    value: 20,
                    unit: UnitType.PX,
                });
                expect( entity.getDTO() ).toEqual(
                    expect.objectContaining({
                        size: expect.objectContaining({
                            value: 20,
                            unit: UnitType.PX,
                        })
                    })
                );
            });
        });

    });

    describe('Line height methods', () => {

        let entity : FontEntity;

        beforeEach(() => {
            entity = FontEntity.create({
                lineHeight: {
                    value: 10,
                    unit: UnitType.PX,
                }
            });
        });

        describe('.getLineHeight', () => {
            it('can get line height', () => {
                expect( entity.getLineHeight()?.getDTO() ).toEqual(
                    expect.objectContaining({
                        value: 10,
                        unit: UnitType.PX,
                    })
                );
            });
        });

        describe('.getLineHeightDTO', () => {
            it('can get line height', () => {
                expect( entity.getLineHeightDTO() ).toEqual(
                    expect.objectContaining({
                        value: 10,
                        unit: UnitType.PX,
                    })
                );
            });
        });

        describe('.setLineHeight', () => {
            it('can set line height', () => {
                entity.setLineHeight({
                    value: 20,
                    unit: UnitType.PX,
                });
                expect( entity.getDTO() ).toEqual(
                    expect.objectContaining({
                        lineHeight: expect.objectContaining({
                            value: 20,
                            unit: UnitType.PX,
                        })
                    })
                );
            });
        });

    });

    describe('Font family methods', () => {

        let entity : FontEntity;

        beforeEach(() => {
            entity = FontEntity.create({
                family: 'Times'
            });
        });

        describe('.getFamily', () => {
            it('can get font family', () => {
                expect( entity.getFamily() ).toBe('Times');
            });
        });

        describe('.setFamily', () => {
            it('can set font family', () => {
                entity.setFamily('Courier');
                expect( entity.getDTO() ).toEqual(
                    expect.objectContaining({
                        family: 'Courier'
                    })
                );
            });
        });

        describe('.getFontFamily', () => {
            it('can get font family', () => {
                expect( entity.getFontFamily() ).toBe('Times');
            });
        });

        describe('.setFontFamily', () => {
            it('can set font family', () => {
                entity.setFontFamily('Courier');
                expect( entity.getDTO() ).toEqual(
                    expect.objectContaining({
                        family: 'Courier'
                    })
                );
            });
        });

    });

});
