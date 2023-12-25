// Copyright (c) 2023. Heusala Group Oy <info@hg.fi>. All rights reserved.

import { SizeEntity } from "../size/SizeEntity";
import { BackgroundPositionValue } from "../types/BackgroundPositionValue";
import { BackgroundPositionEntity } from "./BackgroundPositionEntity";

describe('BackgroundPositionEntity', () => {

    describe('.getCssStyles', () => {

        let entity : BackgroundPositionEntity;

        beforeEach(() => {
            entity = BackgroundPositionEntity.create();
        });

        it('can get styles for default value', () => {
            expect( entity.getCssStyles() ).toStrictEqual({
            });
        });

        it('can get styles for center position', () => {
            entity.setPosition(BackgroundPositionValue.CENTER);
            expect( entity.getCssStyles() ).toStrictEqual({
                backgroundPosition: 'center'
            });
        });

        it('can get styles for left position', () => {
            entity.setPosition(BackgroundPositionValue.LEFT);
            expect( entity.getCssStyles() ).toStrictEqual({
                backgroundPosition: 'left'
            });
        });

        it('can get styles for right position', () => {
            entity.setPosition(BackgroundPositionValue.RIGHT);
            expect( entity.getCssStyles() ).toStrictEqual({
                backgroundPosition: 'right'
            });
        });

        it('can get styles for top position', () => {
            entity.setPosition(BackgroundPositionValue.TOP);
            expect( entity.getCssStyles() ).toStrictEqual({
                backgroundPosition: 'top'
            });
        });

        it('can get styles for bottom position', () => {
            entity.setPosition(BackgroundPositionValue.BOTTOM);
            expect( entity.getCssStyles() ).toStrictEqual({
                backgroundPosition: 'bottom'
            });
        });

        it('can get styles for top position with 10 px', () => {
            entity.setPosition(BackgroundPositionValue.BOTTOM);
            entity.setSize(SizeEntity.createPx(10));
            expect( entity.getCssStyles() ).toStrictEqual({
                backgroundPosition: 'bottom 10px'
            });
        });

        it('can get styles for 10 px', () => {
            entity.setSize(SizeEntity.createPx(10));
            expect( entity.getCssStyles() ).toStrictEqual({
                backgroundPosition: '10px'
            });
        });

        it('can get styles for 10 px, 20 px', () => {
            entity.setSize(SizeEntity.createPx(10));
            entity.setSecondSize(SizeEntity.createPx(20));
            expect( entity.getCssStyles() ).toStrictEqual({
                backgroundPosition: '10px 20px'
            });
        });

        it('can get styles for 10 px, 20 px', () => {
            entity.setSize(SizeEntity.createPercent(10));
            entity.setSecondSize(SizeEntity.createPercent(20));
            expect( entity.getCssStyles() ).toStrictEqual({
                backgroundPosition: '10% 20%'
            });
        });

        it('can get styles for top 10 px, left', () => {
            entity.setPosition(BackgroundPositionValue.TOP);
            entity.setSize(SizeEntity.createPx(10));
            entity.setSecondPosition(BackgroundPositionValue.LEFT);
            expect( entity.getCssStyles() ).toStrictEqual({
                backgroundPosition: 'top 10px left'
            });
        });

        it('can get styles for top 10 px, left 20px', () => {
            entity.setPosition(BackgroundPositionValue.TOP);
            entity.setSize(SizeEntity.createPx(10));
            entity.setSecondPosition(BackgroundPositionValue.LEFT);
            entity.setSecondSize(SizeEntity.createPx(20));
            expect( entity.getCssStyles() ).toStrictEqual({
                backgroundPosition: 'top 10px left 20px'
            });
        });

        it('can get styles for top left 20px', () => {
            entity.setPosition(BackgroundPositionValue.TOP);
            entity.setSecondPosition(BackgroundPositionValue.LEFT);
            entity.setSecondSize(SizeEntity.createPx(20));
            expect( entity.getCssStyles() ).toStrictEqual({
                backgroundPosition: 'top left 20px'
            });
        });

    });

});
