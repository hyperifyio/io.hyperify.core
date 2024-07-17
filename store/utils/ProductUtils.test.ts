import { ProductUtils } from "./ProductUtils";
import { LogLevel } from "../../types/LogLevel";
import { CompositeProductOption, createCompositeProductOption } from "../types/product/CompositeProductOption";

ProductUtils.setLogLevel(LogLevel.NONE);

describe('ProductUtils', () => {

    describe('#sortCompositeProductOptionsByNumericValue', () => {

        it('returns negative for already sorted input', () => {
            expect(
                ProductUtils.sortCompositeProductOptionsByNumericValue(
                    createCompositeProductOption(10, []),
                    createCompositeProductOption(20, [])
                )
            ).toStrictEqual(-1);
        });

        it('returns positive for not sorted input', () => {
            expect(
                ProductUtils.sortCompositeProductOptionsByNumericValue(
                    createCompositeProductOption(20, []),
                    createCompositeProductOption(10, [])
                )
            ).toStrictEqual(1);
        });

        it('returns equal for equal input', () => {
            expect(
                ProductUtils.sortCompositeProductOptionsByNumericValue(
                    createCompositeProductOption(10, []),
                    createCompositeProductOption(10, [])
                )
            ).toStrictEqual(0);
        });

        it('can sort an array', () => {
            let list = [
                createCompositeProductOption(20, []),
                createCompositeProductOption(10, []),
                createCompositeProductOption(10, []),
                createCompositeProductOption(5, []),
                createCompositeProductOption(30, [])
            ];
            list.sort(ProductUtils.sortCompositeProductOptionsByNumericValue);
            expect( list[0].value ).toStrictEqual(5);
            expect( list[1].value ).toStrictEqual(10);
            expect( list[2].value ).toStrictEqual(10);
            expect( list[3].value ).toStrictEqual(20);
            expect( list[4].value ).toStrictEqual(30);
        });

    });

    describe('#sortCompositeProductOptionsByNumericValue', () => {

        it('can find exact matching product option', () => {

            let list = [
                createCompositeProductOption(20, ['a']),
                createCompositeProductOption(10, ['b']),
                createCompositeProductOption(10, ['c']),
                createCompositeProductOption(5, ['d']),
                createCompositeProductOption(30, ['e'])
            ];

            const option : CompositeProductOption | undefined = ProductUtils.getBestMatchingNumericCompositeProductOption(
                5,
                list
            );

            expect( option ).not.toBeUndefined();
            expect( option?.value ).toStrictEqual(5);
            expect( option?.products ).toStrictEqual(['d']);

        });

        it('can find best matching product option', () => {

            let list = [
                createCompositeProductOption(20, ['a']),
                createCompositeProductOption(10, ['b']),
                createCompositeProductOption(10, ['c']),
                createCompositeProductOption(5, ['d']),
                createCompositeProductOption(30, ['e'])
            ];

            const option : CompositeProductOption | undefined = ProductUtils.getBestMatchingNumericCompositeProductOption(
                15,
                list
            );

            expect( option ).not.toBeUndefined();
            expect( option?.value ).toStrictEqual(20);
            expect( option?.products ).toStrictEqual(['a']);

        });

        it('can find best matching product option from multiple options (first)', () => {

            let list = [
                createCompositeProductOption(20, ['a']),
                createCompositeProductOption(10, ['b']),
                createCompositeProductOption(10, ['c']),
                createCompositeProductOption(5, ['d']),
                createCompositeProductOption(30, ['e'])
            ];

            const option : CompositeProductOption | undefined = ProductUtils.getBestMatchingNumericCompositeProductOption(
                10,
                list
            );

            expect( option ).not.toBeUndefined();
            expect( option?.value ).toStrictEqual(10);
            expect( option?.products ).toStrictEqual(['b']);

        });

        it('can returns undefined if no match can be found', () => {

            let list = [
                createCompositeProductOption(20, ['a']),
                createCompositeProductOption(10, ['b']),
                createCompositeProductOption(10, ['c']),
                createCompositeProductOption(5, ['d']),
                createCompositeProductOption(30, ['e'])
            ];

            const option : CompositeProductOption | undefined = ProductUtils.getBestMatchingNumericCompositeProductOption(
                100,
                list
            );

            expect( option ).toBeUndefined();

        });

    });

});
