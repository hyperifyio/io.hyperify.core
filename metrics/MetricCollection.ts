// Copyright (c) 2024. Sendanor <info@sendanor.fi>. All rights reserved.

import { Entity } from "../entities/types/Entity";
import { ReadonlyJsonObject } from "../Json";
import { MetricDTO } from "./MetricDTO";
import { MetricEntity } from "./MetricEntity";
import { MetricCollectionDTO } from "./MetricCollectionDTO";

/**
 * Presents an interface for SeoEntity.
 */
export interface MetricCollection extends Entity<MetricCollectionDTO> {

    /**
     * @inheritDoc
     */
    valueOf () : ReadonlyJsonObject;

    /**
     * @inheritDoc
     */
    getDTO () : MetricCollectionDTO;

    /**
     * @inheritDoc
     */
    toJSON () : ReadonlyJsonObject;

    /**
     * Returns CSS styles.
     */
    getCssStyles () : ReadonlyJsonObject;


    /**
     * Get a payload.
     */
    getPayload () : readonly MetricEntity[];

    /**
     * Get a payload as DTO.
     */
    getPayloadDTO () : readonly MetricDTO[];

    /**
     * Set a payload.
     *
     * @param payload
     */
    setPayload (payload : readonly ( MetricDTO | MetricEntity )[]) : this;

    /**
     * Set a payload.
     *
     * An alias for `.setPayload(payload)`.
     *
     * @param payload
     */
    payload (payload : readonly (MetricDTO | MetricEntity)[]) : this;

}
