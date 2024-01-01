// Copyright (c) 2023. Heusala Group Oy <info@hg.fi>. All rights reserved.

import {
    describe,
    expect,
    it,
} from '@jest/globals';
import { BackgroundDTO } from "../background/BackgroundDTO";
import { ColorDTO } from "../color/ColorDTO";
import { ColorEntity } from "../color/ColorEntity";
import { TextDecorationEntity } from "../textDecoration/TextDecorationEntity";
import { BoxSizing } from "../types/BoxSizing";
import { TextAlign } from "../types/TextAlign";
import { TextDecorationStyle } from "../types/TextDecorationStyle";
import { UnitType } from "../types/UnitType";
import { StyleDTO } from "./StyleDTO";
import { StyleEntity } from "./StyleEntity";

describe('StyleEntity', () => {

    let whiteColor : ColorDTO;
    let blackColor : ColorDTO;

    beforeEach(() => {
        whiteColor = ColorEntity.create('#fff').getDTO();
        blackColor = ColorEntity.create('#000').getDTO();
    });

    describe('Static methods', () => {

        describe('#create', () => {
            it('can create style entities', () => {
                let obj = StyleEntity.create();
                expect(obj.getDTO()).toStrictEqual({});
            });
        });

        describe('#isDTO', () => {

            it('can test a DTO', () => {
                const backgroundColor : ColorDTO = {
                    value: "#222222"
                };
                const background : BackgroundDTO = {
                    color: backgroundColor
                };
                const textColor: ColorDTO = {
                    value: "#ffffff"
                };
                const dto : StyleDTO = {
                    background,
                    textColor
                };
                expect( StyleEntity.isDTO(dto) ).toStrictEqual(true);
            });

            it('can test invalid DTOs', () => {
                expect( StyleEntity.isDTO(false) ).toStrictEqual(false);
                expect( StyleEntity.isDTO(true) ).toStrictEqual(false);
                expect( StyleEntity.isDTO([]) ).toStrictEqual(false);
                expect( StyleEntity.isDTO(null) ).toStrictEqual(false);
                expect( StyleEntity.isDTO(123) ).toStrictEqual(false);
                expect( StyleEntity.isDTO(-100) ).toStrictEqual(false);
                expect( StyleEntity.isDTO(0) ).toStrictEqual(false);
                expect( StyleEntity.isDTO("hello world") ).toStrictEqual(false);
                expect( StyleEntity.isDTO("") ).toStrictEqual(false);
                expect( StyleEntity.isDTO({
                    foobar: true,
                }) ).toStrictEqual(false);
                expect( StyleEntity.isDTO({
                    color: ColorEntity.create(),
                }) ).toStrictEqual(false);
            });

        });

        describe('#merge', () => {
            it('can merge multiple styles', () => {

                const styles = StyleEntity.merge(
                    StyleEntity.create().setWidth(100),
                    StyleEntity.create().setHeight(200),
                );

                expect(styles.getWidthDTO()?.value).toBe(100);
                expect(styles.getWidthDTO()?.unit).toBe(UnitType.PX);
                expect(styles.getHeightDTO()?.value).toBe(200);
                expect(styles.getHeightDTO()?.unit).toBe(UnitType.PX);

            });
        });

    });

    describe('Standard methods', () => {

        describe('.getDTO', () => {
            it('can get DTO', () => {
                let obj = StyleEntity.create().setWidth(100);
                expect(obj.getDTO()).toEqual({
                    width: {
                        value: 100,
                        unit: UnitType.PX
                    }
                });
            });
        });

        describe('.valueOf', () => {
            it('can get value', () => {
                let obj = StyleEntity.create().setWidth(100);
                expect(obj.valueOf()).toEqual({
                    width: {
                        value: 100,
                        unit: UnitType.PX
                    }
                });
            });
        });

        describe('.toJSON', () => {
            it('can get value', () => {
                let obj = StyleEntity.create().setWidth(100);
                expect(obj.toJSON()).toEqual({
                    width: {
                        value: 100,
                        unit: UnitType.PX
                    }
                });
            });
        });

    });

    describe('Text color methods', () => {

        let entity : StyleEntity;

        beforeEach(() => {
            entity = StyleEntity.create({
                textColor: whiteColor
            });
        });

        describe('.getTextColor', () => {
            it('can get text color', () => {
                expect(entity.getTextColor()?.getDTO()).toStrictEqual(whiteColor);
            });
        });

        describe('.getTextColorDTO', () => {
            it('can get text color', () => {
                expect(entity.getTextColorDTO()).toStrictEqual(whiteColor);
            });
        });

        describe('.setTextColor', () => {
            it('can set text color', () => {
                entity.setTextColor(blackColor);
                expect(entity.getDTO()).toEqual(
                    expect.objectContaining({
                        textColor: blackColor
                    })
                );
            });
        });

    });

    describe('Text align methods', () => {

        let entity : StyleEntity;

        beforeEach(() => {
            entity = StyleEntity.create({
                textAlign: TextAlign.CENTER
            });
        });

        describe('.getTextAlign', () => {
            it('can get text align', () => {
                expect(entity.getTextAlign()).toStrictEqual(TextAlign.CENTER);
            });
        });

        describe('.setTextAlign', () => {
            it('can set text align', () => {
                entity.setTextAlign(TextAlign.RIGHT);
                expect(entity.getDTO()).toEqual(
                    expect.objectContaining({
                        textAlign: TextAlign.RIGHT
                    })
                );
            });
        });

    });

    describe('Box sizing methods', () => {

        let entity : StyleEntity;

        beforeEach(() => {
            entity = StyleEntity.create({
                boxSizing: BoxSizing.BORDER_BOX
            });
        });

        describe('.getBoxSizing', () => {
            it('can get box sizing', () => {
                expect(entity.getBoxSizing()).toStrictEqual(BoxSizing.BORDER_BOX);
            });
        });

        describe('.setBoxSizing', () => {
            it('can set box sizing', () => {
                entity.setBoxSizing(BoxSizing.CONTENT_BOX);
                expect(entity.getDTO()).toEqual(
                    expect.objectContaining({
                        boxSizing: BoxSizing.CONTENT_BOX
                    })
                );
            });
        });

    });

    describe('Background color methods', () => {

        let entity : StyleEntity;

        beforeEach(() => {
            entity = StyleEntity.create({
                background: {
                    color: whiteColor
                }
            });
        });

        describe('.getBackgroundColor', () => {
            it('can get background color', () => {
                expect(entity.getBackgroundColor()?.getDTO()).toStrictEqual(whiteColor);
            });
        });

        describe('.getBackgroundColorDTO', () => {
            it('can get background color', () => {
                expect(entity.getBackgroundColorDTO()).toStrictEqual(whiteColor);
            });
        });

        describe('.setBackgroundColor', () => {
            it('can set background color', () => {
                entity.setBackgroundColor(blackColor);
                expect(entity.getDTO()).toEqual(
                    expect.objectContaining({
                        background: expect.objectContaining({
                            color: blackColor
                        })
                    })
                );
            });
        });

    });

    describe('CSS methods', () => {

        let entity : StyleEntity;

        beforeEach(() => {
            entity = StyleEntity.create({
                background: {
                    color: whiteColor
                }
            });
        });

        describe('.getCssStyles', () => {
            it('can get css values', () => {
                expect(entity.getCssStyles()).toEqual({
                    backgroundColor: '#fff'
                });
            });
        });

    });

    describe('Margin methods', () => {

        let entity : StyleEntity;

        beforeEach(() => {
            entity = StyleEntity.create({
                margin: {
                    value: 10,
                    unit: UnitType.PX,
                }
            });
        });

        describe('.getMargin', () => {

            it('can set margin by number', () => {
                expect(entity.getMargin()?.getDTO()).toEqual(
                    expect.objectContaining({
                        value: 10,
                        unit: UnitType.PX,
                    })
                )
            });

        });

        describe('.getTopMargin', () => {
            it('can get top margin by number', () => {
                expect(entity.getTopMargin()?.getDTO()).toEqual(
                    expect.objectContaining({
                        value: 10,
                        unit: UnitType.PX,
                    })
                )
            });
        });

        describe('.getBottomMargin', () => {
            it('can get bottom margin by number', () => {
                expect(entity.getBottomMargin()?.getDTO()).toEqual(
                    expect.objectContaining({
                        value: 10,
                        unit: UnitType.PX,
                    })
                )
            });
        });

        describe('.getRightMargin', () => {
            it('can get right margin by number', () => {
                expect(entity.getRightMargin()?.getDTO()).toEqual(
                    expect.objectContaining({
                        value: 10,
                        unit: UnitType.PX,
                    })
                )
            });
        });

        describe('.getLeftMargin', () => {
            it('can get left margin by number', () => {
                expect(entity.getLeftMargin()?.getDTO()).toEqual(
                    expect.objectContaining({
                        value: 10,
                        unit: UnitType.PX,
                    })
                )
            });
        });

        describe('.setMargin', () => {
            it('can set margin by number', () => {
                entity.setMargin(100);
                expect(entity.getDTO()).toEqual(
                    expect.objectContaining({
                        margin: {
                            value: 100,
                            unit: UnitType.PX,
                        }
                    })
                );
            });
        });

        describe('.setTopMargin', () => {
            it('can set top margin by number', () => {
                entity.setTopMargin(100);
                expect(entity.getDTO()).toEqual(
                    expect.objectContaining({
                        margin: expect.objectContaining({
                            top: expect.objectContaining({
                                value: 100,
                                unit: UnitType.PX,
                            }),
                            right: expect.objectContaining({
                                value: 10,
                                unit: UnitType.PX,
                            }),
                            bottom: expect.objectContaining({
                                value: 10,
                                unit: UnitType.PX,
                            }),
                            left: expect.objectContaining({
                                value: 10,
                                unit: UnitType.PX,
                            }),
                        })
                    })
                );
            });
        });

        describe('.setRightMargin', () => {
            it('can set top margin by number', () => {
                entity.setRightMargin(100);
                expect(entity.getDTO()).toEqual(
                    expect.objectContaining({
                        margin: expect.objectContaining({
                            top: expect.objectContaining({
                                value: 10,
                                unit: UnitType.PX,
                            }),
                            right: expect.objectContaining({
                                value: 100,
                                unit: UnitType.PX,
                            }),
                            bottom: expect.objectContaining({
                                value: 10,
                                unit: UnitType.PX,
                            }),
                            left: expect.objectContaining({
                                value: 10,
                                unit: UnitType.PX,
                            }),
                        })
                    })
                );
            });
        });

        describe('.setBottomMargin', () => {
            it('can set top margin by number', () => {
                entity.setBottomMargin(100);
                expect(entity.getDTO()).toEqual(
                    expect.objectContaining({
                        margin: expect.objectContaining({
                            top: expect.objectContaining({
                                value: 10,
                                unit: UnitType.PX,
                            }),
                            right: expect.objectContaining({
                                value: 10,
                                unit: UnitType.PX,
                            }),
                            bottom: expect.objectContaining({
                                value: 100,
                                unit: UnitType.PX,
                            }),
                            left: expect.objectContaining({
                                value: 10,
                                unit: UnitType.PX,
                            }),
                        })
                    })
                );
            });
        });

        describe('.setLeftMargin', () => {
            it('can set top margin by number', () => {
                entity.setLeftMargin(100);
                expect(entity.getDTO()).toEqual(
                    expect.objectContaining({
                        margin: expect.objectContaining({
                            top: expect.objectContaining({
                                value: 10,
                                unit: UnitType.PX,
                            }),
                            right: expect.objectContaining({
                                value: 10,
                                unit: UnitType.PX,
                            }),
                            bottom: expect.objectContaining({
                                value: 10,
                                unit: UnitType.PX,
                            }),
                            left: expect.objectContaining({
                                value: 100,
                                unit: UnitType.PX,
                            }),
                        })
                    })
                );
            });
        });


    });

    describe('Padding methods', () => {

        let entity : StyleEntity;

        beforeEach(() => {
            entity = StyleEntity.create({
                padding: {
                    value: 10,
                    unit: UnitType.PX,
                }
            });
        });

        describe('.getPadding', () => {

            it('can set padding by number', () => {
                expect(entity.getPadding()?.getDTO()).toEqual(
                    expect.objectContaining({
                        value: 10,
                        unit: UnitType.PX,
                    })
                )
            });

        });

        describe('.getTopPadding', () => {
            it('can get top padding by number', () => {
                expect(entity.getTopPadding()?.getDTO()).toEqual(
                    expect.objectContaining({
                        value: 10,
                        unit: UnitType.PX,
                    })
                )
            });
        });

        describe('.getBottomPadding', () => {
            it('can get bottom padding by number', () => {
                expect(entity.getBottomPadding()?.getDTO()).toEqual(
                    expect.objectContaining({
                        value: 10,
                        unit: UnitType.PX,
                    })
                )
            });
        });

        describe('.getRightPadding', () => {
            it('can get right padding by number', () => {
                expect(entity.getRightPadding()?.getDTO()).toEqual(
                    expect.objectContaining({
                        value: 10,
                        unit: UnitType.PX,
                    })
                )
            });
        });

        describe('.getLeftPadding', () => {
            it('can get left padding by number', () => {
                expect(entity.getLeftPadding()?.getDTO()).toEqual(
                    expect.objectContaining({
                        value: 10,
                        unit: UnitType.PX,
                    })
                )
            });
        });

        describe('.setPadding', () => {
            it('can set padding by number', () => {
                entity.setPadding(100);
                expect(entity.getDTO()).toEqual(
                    expect.objectContaining({
                        padding: {
                            value: 100,
                            unit: UnitType.PX,
                        }
                    })
                );
            });
        });

        describe('.setTopPadding', () => {
            it('can set top padding by number', () => {
                entity.setTopPadding(100);
                expect(entity.getDTO()).toEqual(
                    expect.objectContaining({
                        padding: expect.objectContaining({
                            top: expect.objectContaining({
                                value: 100,
                                unit: UnitType.PX,
                            }),
                            right: expect.objectContaining({
                                value: 10,
                                unit: UnitType.PX,
                            }),
                            bottom: expect.objectContaining({
                                value: 10,
                                unit: UnitType.PX,
                            }),
                            left: expect.objectContaining({
                                value: 10,
                                unit: UnitType.PX,
                            }),
                        })
                    })
                );
            });
        });

        describe('.setRightPadding', () => {
            it('can set top padding by number', () => {
                entity.setRightPadding(100);
                expect(entity.getDTO()).toEqual(
                    expect.objectContaining({
                        padding: expect.objectContaining({
                            top: expect.objectContaining({
                                value: 10,
                                unit: UnitType.PX,
                            }),
                            right: expect.objectContaining({
                                value: 100,
                                unit: UnitType.PX,
                            }),
                            bottom: expect.objectContaining({
                                value: 10,
                                unit: UnitType.PX,
                            }),
                            left: expect.objectContaining({
                                value: 10,
                                unit: UnitType.PX,
                            }),
                        })
                    })
                );
            });
        });

        describe('.setBottomPadding', () => {
            it('can set top padding by number', () => {
                entity.setBottomPadding(100);
                expect(entity.getDTO()).toEqual(
                    expect.objectContaining({
                        padding: expect.objectContaining({
                            top: expect.objectContaining({
                                value: 10,
                                unit: UnitType.PX,
                            }),
                            right: expect.objectContaining({
                                value: 10,
                                unit: UnitType.PX,
                            }),
                            bottom: expect.objectContaining({
                                value: 100,
                                unit: UnitType.PX,
                            }),
                            left: expect.objectContaining({
                                value: 10,
                                unit: UnitType.PX,
                            }),
                        })
                    })
                );
            });
        });

        describe('.setLeftPadding', () => {
            it('can set top padding by number', () => {
                entity.setLeftPadding(100);
                expect(entity.getDTO()).toEqual(
                    expect.objectContaining({
                        padding: expect.objectContaining({
                            top: expect.objectContaining({
                                value: 10,
                                unit: UnitType.PX,
                            }),
                            right: expect.objectContaining({
                                value: 10,
                                unit: UnitType.PX,
                            }),
                            bottom: expect.objectContaining({
                                value: 10,
                                unit: UnitType.PX,
                            }),
                            left: expect.objectContaining({
                                value: 100,
                                unit: UnitType.PX,
                            }),
                        })
                    })
                );
            });
        });


    });

    describe('Border methods', () => {

        let entity : StyleEntity;

        beforeEach(() => {
            entity = StyleEntity.create({
                border: {
                    width: {
                        value: 10,
                        unit: UnitType.PX,
                    }
                }
            });
        });

        describe('.getBorder', () => {
            it('can get border width', () => {
                expect(entity.getBorder()?.getDTO()).toEqual(
                    expect.objectContaining( {
                        width: expect.objectContaining({
                            value: 10,
                            unit: UnitType.PX,
                        })
                    })
                );
            });
        });

        describe('.getBorderDTO', () => {
            it('can get border width', () => {
                expect(entity.getBorderDTO()).toEqual(
                    expect.objectContaining( {
                        width: expect.objectContaining({
                            value: 10,
                            unit: UnitType.PX,
                        })
                    })
                );
            });
        });

        describe('.getTopBorder', () => {
            it('can get top border width', () => {
                expect(entity.getTopBorder()?.getWidth()?.getDTO()).toEqual(
                    expect.objectContaining({
                        value: 10,
                        unit: UnitType.PX,
                    })
                )
            });
        });

        describe('.getBottomBorder', () => {
            it('can get bottom border width', () => {
                expect(entity.getBottomBorder()?.getWidth()?.getDTO()).toEqual(
                    expect.objectContaining({
                        value: 10,
                        unit: UnitType.PX,
                    })
                )
            });
        });

        describe('.getRightBorder', () => {
            it('can get right border width', () => {
                expect(entity.getRightBorder()?.getWidth()?.getDTO()).toEqual(
                    expect.objectContaining({
                        value: 10,
                        unit: UnitType.PX,
                    })
                )
            });
        });

        describe('.getLeftBorder', () => {
            it('can get left border width', () => {
                expect(entity.getLeftBorder()?.getWidth()?.getDTO()).toEqual(
                    expect.objectContaining({
                        value: 10,
                        unit: UnitType.PX,
                    })
                )
            });
        });

        describe('.setBorder', () => {
            it('can set border width', () => {
                entity.setBorder(100);
                expect(entity.getDTO()).toEqual(
                    expect.objectContaining({
                        border: expect.objectContaining({
                            width: expect.objectContaining({
                                value: 100,
                                unit: UnitType.PX,
                            })
                        })
                    })
                );
            });
        });

        describe('.setTopBorder', () => {
            it('can set top border width', () => {
                entity.setTopBorder(100);
                expect(entity.getDTO()).toEqual(
                    expect.objectContaining({
                        border: expect.objectContaining({
                            top: expect.objectContaining({
                                width: expect.objectContaining({
                                    value: 100,
                                    unit: UnitType.PX,
                                })
                            }),
                            right: expect.objectContaining({
                                width: expect.objectContaining({
                                    value: 10,
                                    unit: UnitType.PX,
                                })
                            }),
                            bottom: expect.objectContaining({
                                width: expect.objectContaining({
                                    value: 10,
                                    unit: UnitType.PX,
                                })
                            }),
                            left: expect.objectContaining({
                                width: expect.objectContaining({
                                    value: 10,
                                    unit: UnitType.PX,
                                })
                            }),
                        })
                    })
                );
            });
        });

        describe('.setRightBorder', () => {
            it('can set top border width', () => {
                entity.setRightBorder(100);
                expect(entity.getDTO()).toEqual(
                    expect.objectContaining({
                        border: expect.objectContaining({
                            top: expect.objectContaining({
                                width: expect.objectContaining({
                                    value: 10,
                                    unit: UnitType.PX,
                                })
                            }),
                            right: expect.objectContaining({
                                width: expect.objectContaining({
                                    value: 100,
                                    unit: UnitType.PX,
                                })
                            }),
                            bottom: expect.objectContaining({
                                width: expect.objectContaining({
                                    value: 10,
                                    unit: UnitType.PX,
                                })
                            }),
                            left: expect.objectContaining({
                                width: expect.objectContaining({
                                    value: 10,
                                    unit: UnitType.PX,
                                })
                            }),
                        })
                    })
                );
            });
        });

        describe('.setBottomBorder', () => {
            it('can set top border width', () => {
                entity.setBottomBorder(100);
                expect(entity.getDTO()).toEqual(
                    expect.objectContaining({
                        border: expect.objectContaining({
                            top: expect.objectContaining({
                                width: expect.objectContaining({
                                    value: 10,
                                    unit: UnitType.PX,
                                })
                            }),
                            right: expect.objectContaining({
                                width: expect.objectContaining({
                                    value: 10,
                                    unit: UnitType.PX,
                                })
                            }),
                            bottom: expect.objectContaining({
                                width: expect.objectContaining({
                                    value: 100,
                                    unit: UnitType.PX,
                                })
                            }),
                            left: expect.objectContaining({
                                width: expect.objectContaining({
                                    value: 10,
                                    unit: UnitType.PX,
                                })
                            }),
                        })
                    })
                );
            });
        });

        describe('.setLeftBorder', () => {
            it('can set top border width', () => {
                entity.setLeftBorder(100);
                expect(entity.getDTO()).toEqual(
                    expect.objectContaining({
                        border: expect.objectContaining({
                            top: expect.objectContaining({
                                width: expect.objectContaining({
                                    value: 10,
                                    unit: UnitType.PX,
                                })
                            }),
                            right: expect.objectContaining({
                                width: expect.objectContaining({
                                    value: 10,
                                    unit: UnitType.PX,
                                })
                            }),
                            bottom: expect.objectContaining({
                                width: expect.objectContaining({
                                    value: 10,
                                    unit: UnitType.PX,
                                })
                            }),
                            left: expect.objectContaining({
                                width: expect.objectContaining({
                                    value: 100,
                                    unit: UnitType.PX,
                                })
                            }),
                        })
                    })
                );
            });
        });

    });

    describe('Font methods', () => {

        let entity : StyleEntity;

        beforeEach(() => {
            entity = StyleEntity.create({
                font: {
                    size: {
                        value: 10,
                        unit: UnitType.PX,
                    }
                }
            });
        });

        describe('.getFont', () => {
            it('can get font size by number', () => {
                expect(entity.getFont()?.getDTO()).toEqual(
                    expect.objectContaining({
                        size: expect.objectContaining({
                            value: 10,
                            unit: UnitType.PX,
                        })
                    })
                )
            });
        });

        describe('.setFont', () => {
            it('can set font size by number', () => {
                entity.setFont(100);
                expect(entity.getDTO()).toEqual(
                    expect.objectContaining({
                        font:  expect.objectContaining({
                            size: expect.objectContaining({
                                value: 100,
                                unit: UnitType.PX,
                            })
                        })
                    })
                );
            });
        });

    });

    describe('TextDecoration methods', () => {

        let entity : StyleEntity;

        beforeEach(() => {
            entity = StyleEntity.create({
                textDecoration: {
                    style: TextDecorationStyle.DASHED
                }
            });
        });

        describe('.getTextDecoration', () => {
            it('can get text decoration style', () => {
                expect(entity.getTextDecoration()?.getDTO()).toEqual(
                    expect.objectContaining({
                        style: TextDecorationStyle.DASHED
                    })
                )
            });
        });

        describe('.getTextDecorationDTO', () => {
            it('can get text decoration style', () => {
                expect(entity.getTextDecorationDTO()).toEqual(
                    expect.objectContaining({
                        style: TextDecorationStyle.DASHED
                    })
                )
            });
        });

        describe('.setTextDecoration', () => {
            it('can set text decoration style', () => {
                entity.setTextDecoration({
                    style: TextDecorationStyle.DOUBLE
                });
                expect(entity.getDTO()).toEqual(
                    expect.objectContaining({
                        textDecoration: expect.objectContaining({
                            style: TextDecorationStyle.DOUBLE
                        })
                    })
                );
            });
        });

    });

    describe('Width methods', () => {

        let entity : StyleEntity;

        beforeEach(() => {
            entity = StyleEntity.create({
                width: {
                    value: 10,
                    unit: UnitType.PX,
                }
            });
        });

        describe('.getWidth', () => {

            it('can get width entity', () => {
                expect(entity.getWidth()?.getDTO()).toEqual(
                    expect.objectContaining({
                        value: 10,
                        unit: UnitType.PX,
                    })
                )
            });

        });

        describe('.getWidthDTO', () => {

            it('can get width DTO', () => {
                expect(entity.getWidthDTO()).toEqual(
                    expect.objectContaining({
                        value: 10,
                        unit: UnitType.PX,
                    })
                )
            });

        });

        describe('.setWidth', () => {

            it('can set width by number', () => {

                entity.setWidth(100);

                expect(entity.getDTO()).toEqual(
                    expect.objectContaining({
                        width: {
                            value: 100,
                            unit: UnitType.PX,
                        }
                    })
                );
            });

        });

    });

    describe('Height methods', () => {

        let entity : StyleEntity;

        beforeEach(() => {
            entity = StyleEntity.create({
                height: {
                    value: 10,
                    unit: UnitType.PX,
                }
            });
        });

        describe('.getHeight', () => {

            it('can get height entity', () => {
                expect(entity.getHeight()?.getDTO()).toEqual(
                    expect.objectContaining({
                        value: 10,
                        unit: UnitType.PX,
                    })
                )
            });

        });

        describe('.getHeightDTO', () => {

            it('can get height dto', () => {
                expect(entity.getHeightDTO()).toEqual(
                    expect.objectContaining({
                        value: 10,
                        unit: UnitType.PX,
                    })
                )
            });

        });

        describe('.setHeight', () => {
            it('can set height by number', () => {
                entity.setHeight(100);
                expect(entity.getDTO()).toEqual(
                    expect.objectContaining({
                        height: {
                            value: 100,
                            unit: UnitType.PX,
                        }
                    })
                );
            });
        });

    });

    describe('Min width methods', () => {

        let entity : StyleEntity;

        beforeEach(() => {
            entity = StyleEntity.create({
                minWidth: {
                    value: 10,
                    unit: UnitType.PX,
                }
            });
        });

        describe('.getMinWidth', () => {

            it('can get minWidth entity', () => {
                expect(entity.getMinWidth()?.getDTO()).toEqual(
                    expect.objectContaining({
                        value: 10,
                        unit: UnitType.PX,
                    })
                )
            });

        });

        describe('.getMinWidthDTO', () => {

            it('can get minWidth DTO', () => {
                expect(entity.getMinWidthDTO()).toEqual(
                    expect.objectContaining({
                        value: 10,
                        unit: UnitType.PX,
                    })
                )
            });

        });

        describe('.setMinWidth', () => {

            it('can set minWidth by number', () => {

                entity.setMinWidth(100);

                expect(entity.getDTO()).toEqual(
                    expect.objectContaining({
                        minWidth: {
                            value: 100,
                            unit: UnitType.PX,
                        }
                    })
                );
            });

        });

    });

    describe('Min height methods', () => {

        let entity : StyleEntity;

        beforeEach(() => {
            entity = StyleEntity.create({
                minHeight: {
                    value: 10,
                    unit: UnitType.PX,
                }
            });
        });

        describe('.getMinHeight', () => {

            it('can get minHeight entity', () => {
                expect(entity.getMinHeight()?.getDTO()).toEqual(
                    expect.objectContaining({
                        value: 10,
                        unit: UnitType.PX,
                    })
                )
            });

        });

        describe('.getMinHeightDTO', () => {

            it('can get minHeight DTO', () => {
                expect(entity.getMinHeightDTO()).toEqual(
                    expect.objectContaining({
                        value: 10,
                        unit: UnitType.PX,
                    })
                )
            });

        });

        describe('.setMinHeight', () => {

            it('can set minHeight by number', () => {

                entity.setMinHeight(100);

                expect(entity.getDTO()).toEqual(
                    expect.objectContaining({
                        minHeight: {
                            value: 100,
                            unit: UnitType.PX,
                        }
                    })
                );
            });

        });

    });

    describe('Max width methods', () => {

        let entity : StyleEntity;

        beforeEach(() => {
            entity = StyleEntity.create({
                maxWidth: {
                    value: 10,
                    unit: UnitType.PX,
                }
            });
        });

        describe('.getMaxWidth', () => {

            it('can get maxWidth entity', () => {
                expect(entity.getMaxWidth()?.getDTO()).toEqual(
                    expect.objectContaining({
                        value: 10,
                        unit: UnitType.PX,
                    })
                )
            });

        });

        describe('.getMaxWidthDTO', () => {

            it('can get maxWidth DTO', () => {
                expect(entity.getMaxWidthDTO()).toEqual(
                    expect.objectContaining({
                        value: 10,
                        unit: UnitType.PX,
                    })
                )
            });

        });

        describe('.setMaxWidth', () => {

            it('can set maxWidth by number', () => {

                entity.setMaxWidth(100);

                expect(entity.getDTO()).toEqual(
                    expect.objectContaining({
                        maxWidth: {
                            value: 100,
                            unit: UnitType.PX,
                        }
                    })
                );
            });

        });

    });

    describe('Max height methods', () => {

        let entity : StyleEntity;

        beforeEach(() => {
            entity = StyleEntity.create({
                maxHeight: {
                    value: 10,
                    unit: UnitType.PX,
                }
            });
        });

        describe('.getMaxHeight', () => {

            it('can get maxHeight entity', () => {
                expect(entity.getMaxHeight()?.getDTO()).toEqual(
                    expect.objectContaining({
                        value: 10,
                        unit: UnitType.PX,
                    })
                )
            });

        });

        describe('.getMaxHeightDTO', () => {

            it('can get maxHeight DTO', () => {
                expect(entity.getMaxHeightDTO()).toEqual(
                    expect.objectContaining({
                        value: 10,
                        unit: UnitType.PX,
                    })
                )
            });

        });

        describe('.setMaxHeight', () => {

            it('can set maxHeight by number', () => {

                entity.setMaxHeight(100);

                expect(entity.getDTO()).toEqual(
                    expect.objectContaining({
                        maxHeight: {
                            value: 100,
                            unit: UnitType.PX,
                        }
                    })
                );
            });

        });

    });

    describe('Background methods', () => {

        let entity : StyleEntity;

        beforeEach(() => {
            entity = StyleEntity.create({
                background: {
                    color: blackColor,
                }
            });
        });

        describe('.getBackground', () => {
            it('can get background entity', () => {
                expect(entity.getBackground()?.getDTO()).toEqual(
                    expect.objectContaining({
                        color: blackColor,
                    })
                )
            });
        });

        describe('.getBackgroundDTO', () => {

            it('can get background dto', () => {
                expect(entity.getBackgroundDTO()).toEqual(
                    expect.objectContaining({
                        color: blackColor,
                    })
                )
            });

        });

        describe('.setBackground', () => {
            it('can set background by DTO', () => {
                const backgroundDTO : BackgroundDTO = {
                    color: whiteColor,
                };
                entity.setBackground(backgroundDTO);
                expect(entity.getDTO()).toEqual(
                    expect.objectContaining({
                        background: expect.objectContaining({
                            color: whiteColor,
                        })
                    })
                );
            });
        });

    });

});
