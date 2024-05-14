// Copyright (c) 2024. Heusala Group Oy <info@heusalagroup.fi>. All rights reserved.

import {
    isReadonlyJsonArrayOrUndefined,
    isReadonlyJsonObjectOrUndefined,
    ReadonlyJsonArray,
    ReadonlyJsonObject,
} from "../../Json";
import { isBooleanOrUndefined } from "../../types/Boolean";
import {
    explain,
    explainNot,
    explainOk,
    explainOr,
    explainProperty,
} from "../../types/explain";
import {
    explainNoOtherKeysInDevelopment,
    hasNoOtherKeysInDevelopment,
} from "../../types/OtherKeys";
import {
    explainRegularObject,
    isRegularObject,
} from "../../types/RegularObject";
import {
    explainStringOrUndefined,
    isStringOrUndefined,
} from "../../types/String";
import { isStringArrayOrUndefined } from "../../types/StringArray";
import { isUndefined } from "../../types/undefined";
import {
    FacebookBidStrategy,
    isFacebookBidStrategyOrUndefined,
} from "./FacebookBidStrategy";

export interface FacebookAdCampaignDTO {
    readonly id                                  ?: string;
    readonly account_id                          ?: string;
    readonly adlabels                            ?: ReadonlyJsonArray;
    readonly bid_strategy                        ?: FacebookBidStrategy;
    readonly brand_lift_studies                  ?: ReadonlyJsonArray;
    readonly budget_rebalance_flag               ?: boolean;
    readonly budget_remaining                    ?: string;
    readonly buying_type                         ?: string; // TODO: Switch to enum
    readonly campaign_group_active_time          ?: string;
    readonly can_create_brand_lift_study         ?: boolean;
    readonly can_use_spend_cap                   ?: boolean;
    readonly configured_status                   ?: string; // TODO: Switch to enum
    readonly created_time                        ?: string;
    readonly daily_budget                        ?: string;
    readonly effective_status                    ?: string; // TODO: Switch to enum
    readonly has_secondary_skadnetwork_reporting ?: boolean;
    readonly is_budget_schedule_enabled          ?: boolean;
    readonly is_skadnetwork_attribution          ?: boolean;
    readonly issues_info                         ?: ReadonlyJsonArray;
    readonly last_budget_toggling_time           ?: string;
    readonly lifetime_budget                     ?: string;
    readonly name                                ?: string;
    readonly objective                           ?: string;
    readonly pacing_type                         ?: readonly string[];
    readonly primary_attribution                 ?: string; // TODO: Switch to enum
    readonly promoted_object                     ?: ReadonlyJsonObject;
    readonly smart_promotion_type                ?: string; // TODO: Switch to enum
    readonly source_campaign                     ?: FacebookAdCampaignDTO;
    readonly source_campaign_id                  ?: string;
    readonly special_ad_categories               ?: readonly string[]; // TODO: Switch to enum
    readonly special_ad_category                 ?: string; // TODO: Switch to enum
    readonly special_ad_category_country         ?: readonly string[]; // TODO: Switch to enum
    readonly spend_cap                           ?: string;
    readonly start_time                          ?: string;
    readonly status                              ?: string; // TODO: Switch to enum
    readonly stop_time                           ?: string;
    readonly updated_time                        ?: string;
}

export function isFacebookAdCampaignDTO (value: unknown) : value is FacebookAdCampaignDTO {
    return (
        isRegularObject(value)
        && hasNoOtherKeysInDevelopment(value, [
            'id',
            'account_id',
            'adlabels',
            'bid_strategy',
            'brand_lift_studies',
            'budget_rebalance_flag',
            'budget_remaining',
            'buying_type',
            'campaign_group_active_time',
            'can_create_brand_lift_study',
            'can_use_spend_cap',
            'configured_status',
            'created_time',
            'daily_budget',
            'effective_status',
            'has_secondary_skadnetwork_reporting',
            'is_budget_schedule_enabled',
            'is_skadnetwork_attribution',
            'issues_info',
            'last_budget_toggling_time',
            'lifetime_budget',
            'name',
            'objective',
            'pacing_type',
            'primary_attribution',
            'promoted_object',
            'smart_promotion_type',
            'source_campaign',
            'source_campaign_id',
            'special_ad_categories',
            'special_ad_category',
            'special_ad_category_country',
            'spend_cap',
            'start_time',
            'status',
            'stop_time',
            'updated_time',
        ])
        && isStringOrUndefined(value?.id)
        && isStringOrUndefined(value?.account_id)
        && isReadonlyJsonArrayOrUndefined(value?.adlabels)
        && isFacebookBidStrategyOrUndefined(value?.bid_strategy)
        && isReadonlyJsonArrayOrUndefined(value?.brand_lift_studies)
        && isBooleanOrUndefined(value?.budget_rebalance_flag)
        && isStringOrUndefined(value?.budget_remaining)
        && isStringOrUndefined(value?.buying_type)
        && isStringOrUndefined(value?.campaign_group_active_time)
        && isBooleanOrUndefined(value?.can_create_brand_lift_study)
        && isBooleanOrUndefined(value?.can_use_spend_cap)
        && isStringOrUndefined(value?.configured_status)
        && isStringOrUndefined(value?.created_time)
        && isStringOrUndefined(value?.daily_budget)
        && isStringOrUndefined(value?.effective_status)
        && isBooleanOrUndefined(value?.has_secondary_skadnetwork_reporting)
        && isBooleanOrUndefined(value?.is_budget_schedule_enabled)
        && isBooleanOrUndefined(value?.is_skadnetwork_attribution)
        && isReadonlyJsonArrayOrUndefined(value?.issues_info)
        && isStringOrUndefined(value?.last_budget_toggling_time)
        && isStringOrUndefined(value?.lifetime_budget)
        && isStringOrUndefined(value?.name)
        && isStringOrUndefined(value?.objective)
        && isStringArrayOrUndefined(value?.pacing_type)
        && isStringOrUndefined(value?.primary_attribution)
        && isReadonlyJsonObjectOrUndefined(value?.promoted_object)
        && isStringOrUndefined(value?.smart_promotion_type)
        && isFacebookAdCampaignDTOOrUndefined(value?.source_campaign)
        && isStringOrUndefined(value?.source_campaign_id)
        && isStringArrayOrUndefined(value?.special_ad_categories)
        && isStringOrUndefined(value?.special_ad_category)
        && isStringArrayOrUndefined(value?.special_ad_category_country)
        && isStringOrUndefined(value?.spend_cap)
        && isStringOrUndefined(value?.start_time)
        && isStringOrUndefined(value?.status)
        && isStringOrUndefined(value?.stop_time)
        && isStringOrUndefined(value?.updated_time)
    );
}

export function explainFacebookAdCampaignDTO (value: any) : string {
    return explain(
        [
            explainRegularObject(value),
            explainNoOtherKeysInDevelopment(value, [
                'id',
                'account_id',
                'adlabels',
                'bid_strategy',
                'brand_lift_studies',
                'budget_rebalance_flag',
                'budget_remaining',
                'buying_type',
                'campaign_group_active_time',
                'can_create_brand_lift_study',
                'can_use_spend_cap',
                'configured_status',
                'created_time',
                'daily_budget',
                'effective_status',
                'has_secondary_skadnetwork_reporting',
                'is_budget_schedule_enabled',
                'is_skadnetwork_attribution',
                'issues_info',
                'last_budget_toggling_time',
                'lifetime_budget',
                'name',
                'objective',
                'pacing_type',
                'primary_attribution',
                'promoted_object',
                'smart_promotion_type',
                'source_campaign',
                'source_campaign_id',
                'special_ad_categories',
                'special_ad_category',
                'special_ad_category_country',
                'spend_cap',
                'start_time',
                'status',
                'stop_time',
                'updated_time',
            ])
            , explainProperty("id", explainStringOrUndefined(value?.id))
            , explainProperty("account_id", explainStringOrUndefined(value?.account_id))
            , explainProperty("adlabels", explainStringOrUndefined(value?.adlabels))
            , explainProperty("bid_strategy", explainStringOrUndefined(value?.bid_strategy))
            , explainProperty("brand_lift_studies", explainStringOrUndefined(value?.brand_lift_studies))
            , explainProperty("budget_rebalance_flag", explainStringOrUndefined(value?.budget_rebalance_flag))
            , explainProperty("budget_remaining", explainStringOrUndefined(value?.budget_remaining))
            , explainProperty("buying_type", explainStringOrUndefined(value?.buying_type))
            , explainProperty("campaign_group_active_time", explainStringOrUndefined(value?.campaign_group_active_time))
            , explainProperty("can_create_brand_lift_study", explainStringOrUndefined(value?.can_create_brand_lift_study))
            , explainProperty("can_use_spend_cap", explainStringOrUndefined(value?.can_use_spend_cap))
            , explainProperty("configured_status", explainStringOrUndefined(value?.configured_status))
            , explainProperty("created_time", explainStringOrUndefined(value?.created_time))
            , explainProperty("daily_budget", explainStringOrUndefined(value?.daily_budget))
            , explainProperty("effective_status", explainStringOrUndefined(value?.effective_status))
            , explainProperty("has_secondary_skadnetwork_reporting", explainStringOrUndefined(value?.has_secondary_skadnetwork_reporting))
            , explainProperty("is_budget_schedule_enabled", explainStringOrUndefined(value?.is_budget_schedule_enabled))
            , explainProperty("is_skadnetwork_attribution", explainStringOrUndefined(value?.is_skadnetwork_attribution))
            , explainProperty("issues_info", explainStringOrUndefined(value?.issues_info))
            , explainProperty("last_budget_toggling_time", explainStringOrUndefined(value?.last_budget_toggling_time))
            , explainProperty("lifetime_budget", explainStringOrUndefined(value?.lifetime_budget))
            , explainProperty("name", explainStringOrUndefined(value?.name))
            , explainProperty("objective", explainStringOrUndefined(value?.objective))
            , explainProperty("pacing_type", explainStringOrUndefined(value?.pacing_type))
            , explainProperty("primary_attribution", explainStringOrUndefined(value?.primary_attribution))
            , explainProperty("promoted_object", explainStringOrUndefined(value?.promoted_object))
            , explainProperty("smart_promotion_type", explainStringOrUndefined(value?.smart_promotion_type))
            , explainProperty("source_campaign", explainStringOrUndefined(value?.source_campaign))
            , explainProperty("source_campaign_id", explainStringOrUndefined(value?.source_campaign_id))
            , explainProperty("special_ad_categories", explainStringOrUndefined(value?.special_ad_categories))
            , explainProperty("special_ad_category", explainStringOrUndefined(value?.special_ad_category))
            , explainProperty("special_ad_category_country", explainStringOrUndefined(value?.special_ad_category_country))
            , explainProperty("spend_cap", explainStringOrUndefined(value?.spend_cap))
            , explainProperty("start_time", explainStringOrUndefined(value?.start_time))
            , explainProperty("status", explainStringOrUndefined(value?.status))
            , explainProperty("stop_time", explainStringOrUndefined(value?.stop_time))
            , explainProperty("updated_time", explainStringOrUndefined(value?.updated_time))
        ]
    );
}

export function stringifyFacebookAdCampaignDTO (value : FacebookAdCampaignDTO) : string {
    return `FacebookAdCampaignDTO(${value})`;
}

export function parseFacebookAdCampaignDTO (value: unknown) : FacebookAdCampaignDTO | undefined {
    if (isFacebookAdCampaignDTO(value)) return value;
    return undefined;
}

export function isFacebookAdCampaignDTOOrUndefined (value: unknown): value is FacebookAdCampaignDTO | undefined {
    return isUndefined(value) || isFacebookAdCampaignDTO(value);
}

export function explainFacebookAdCampaignDTOOrUndefined (value: unknown): string {
    return isFacebookAdCampaignDTOOrUndefined(value) ? explainOk() : explainNot(explainOr(['FacebookAdCampaignDTO', 'undefined']));
}
