// Copyright (c) 2021-2024. Sendanor <info@sendanor.fi>. All rights reserved.

import { DTO } from "../../entities/types/DTO";
import { BannerLanguage } from "./BannerLanguage";
import { BannerLocation } from "./BannerLocation";
import { BannerState } from "./BannerState";
import { BannerType } from "./BannerType";

export interface BannerDTO extends DTO {

    readonly id           : string;

    /**
     * The state of the banner
     */
    readonly state        : BannerState;

    readonly type         : BannerType;

    /**
     * If true, the banner will include the title as a text element.
     *
     * Set this as false, if the image already has the text.
     */
    readonly addTitleText : boolean;

    /**
     * If true, the banner will include the imageAlt as a text element.
     *
     * Set this as false, if the image already has the text.
     */
    readonly addAltText   : boolean;

    /**
     * Title text for the banner.
     */
    readonly title        : string;

    /**
     * The link target where to link from the banner
     */
    readonly url          : string;

    readonly imageUrl     : string;
    readonly imageAlt     : string;

    readonly languages   ?: readonly BannerLanguage[];
    readonly locations   ?: readonly BannerLocation[];

    readonly draftTime   ?: string;
    readonly startTime   ?: string;
    readonly publishTime ?: string;
    readonly endTime     ?: string;

    /**
     * If true, the banner is started (but not yet published) and should not be editable anymore.
     *
     * See also `state` and `startTime` properties
     */
    readonly started ?: boolean;

    /**
     * If true, the banner is published (eg. it was accepted by moderator and is going to be published) and should not be editable anymore.
     *
     * See also `state` and `publishTime` properties
     */
    readonly published ?: boolean;

    /**
     * If true, the banner is ended and should not be editable anymore.
     *
     * See also `state` and `endTime` properties
     */
    readonly ended ?: boolean;

    /**
     * The owner of this banner who will have access to modify it when it is a draft.
     */
    readonly owner       ?: string;

}
