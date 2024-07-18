// Copyright (c) 2022. Heusala Group Oy <info@heusalagroup.fi>. All rights reserved.
// Copyright (c) 2022-2024. Sendanor <info@sendanor.fi>. All rights reserved.

import { ProductTableItemDataModel } from "../types/product/ProductTableItemDataModel";
import { filter } from "../../functions/filter";
import { find } from "../../functions/find";
import { has } from "../../functions/has";
import { map } from "../../functions/map";
import { reduce } from "../../functions/reduce";
import { uniq } from "../../functions/uniq";
import { ProductFeatureCategory } from "../types/product/features/ProductFeatureCategory";
import { ProductFeatureId } from "../types/product/features/ProductFeatureId";
import { Product } from "../types/product/Product";
import { ProductTableItemModel } from "../types/product/ProductTableItemModel";
import { ProductPriceType } from "../types/product/ProductPriceType";
import { ProductPrice } from "../types/product/ProductPrice";
import { ProductFeatureCategoryMappingType } from "../types/product/features/ProductFeatureCategoryMappingType";
import { getProductFeatureCategoryTitleTranslationToken, getProductFeatureTitleTranslationToken } from "../constants/storeTranslation";
import { LogService } from "../../LogService";
import { LogLevel } from "../../types/LogLevel";
import { CompositeProductOption } from "../types/product/CompositeProductOption";
import { isNumber } from "../../types/Number";

const LOG = LogService.createLogger('ProductUtils');

export class ProductUtils {

    public static setLogLevel (level: LogLevel) {
        LOG.setLogLevel(level);
    }

    public static createProductTableItemsList (
        title: string,
        description : string,
        selectedPriceType : ProductPriceType,
        productList: readonly Product[]
    ) : ProductTableItemModel[] {
        return [
            {
                id: 0,
                title: title,
                description: description,
                gb: 0,
                buttonTo: undefined,
                price: 0,
                priceType: selectedPriceType,
                priceVatPercent: 0.24,
                priceTypeOptions: [selectedPriceType],
                isButton: false,
                priceModel: undefined,
                productModel: undefined
            },
            ...map(
                filter(productList, (p) : boolean => {
                    return map(p?.prices ?? [], pp => pp?.type).includes(selectedPriceType);
                }),
                (item: Product, index: number): ProductTableItemModel => {
                    const price : ProductPrice | undefined = find(item?.prices, pp => pp?.type === selectedPriceType);
                    if (!price) throw new TypeError(`Price was not found for ${selectedPriceType}. This should not happen.`);
                    return {
                        id: index + 1,
                        title: item.title,
                        description: item.summary,
                        buttonTo: price.buyUrl,
                        gb: 0,
                        price: price.sum,
                        priceType: price.type,
                        priceVatPercent: price.vatPercent,
                        priceTypeOptions: map(item.prices, pp => pp.type),
                        isButton: true,
                        priceModel: price,
                        productModel: item
                    }
                }
            )
        ];
    }

    public static createProductTableItemDataModelList (
        categoryList : ProductFeatureCategory[],
        featureIdMap : ProductFeatureCategoryMappingType,
        productList  : readonly Product[]
    ) : ProductTableItemDataModel[] {
        return map(
            categoryList,
            (categoryId: ProductFeatureCategory, index: number) : ProductTableItemDataModel => {
                const featureIdList : ProductFeatureId[] = has(featureIdMap, categoryId) ? featureIdMap[categoryId] : [];
                return {
                    id: index,
                    mainTitle: getProductFeatureCategoryTitleTranslationToken(categoryId),
                    title: map(featureIdList, (id: ProductFeatureId) => getProductFeatureTitleTranslationToken(id)),
                    product: map(
                        productList,
                        (item: Product) : readonly any[] => {
                            return map(featureIdList, (featureId: ProductFeatureId) => {
                                return find(item.features, (f: any) => f?.id === featureId) ?? '';
                            });
                        }
                    )
                };
            }
        );
    }

    public static createUniquePriceTypeList (
        list: readonly ProductTableItemModel[]
    ) : ProductPriceType[] {
        return reduce(
            list,
            (a: ProductPriceType[], item: ProductTableItemModel) => uniq([ ...a, ...item.priceTypeOptions ]),
            []
        );
    }

    public static getBestMatchingNumericCompositeProductOption (
        preferredValue: number,
        list: readonly CompositeProductOption[]
    ) : CompositeProductOption | undefined {
        let suitableOptions : CompositeProductOption[] = filter(
            list,
            (option: CompositeProductOption) => isNumber(option.value) && preferredValue <= option.value
        );
        if (suitableOptions.length === 0) return undefined;
        suitableOptions.sort(ProductUtils.sortCompositeProductOptionsByNumericValue);
        return suitableOptions[0];
    }

    public static sortCompositeProductOptionsByNumericValue (a: CompositeProductOption, b: CompositeProductOption) : number {
        const aNum = isNumber(a.value) ? a.value : -1;
        const bNum = isNumber(b.value) ? b.value : -1;
        if (aNum === bNum) return 0;
        return aNum < bNum ? -1 : 1;
    }

}
