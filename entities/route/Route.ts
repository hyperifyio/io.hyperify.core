// Copyright (c) 2023. Sendanor <info@sendanor.fi>. All rights reserved.

import { ReadonlyJsonObject } from "../../Json";
import { EntityType } from "../types/EntityType";
import { RouteDTO } from "./RouteDTO";
import { Entity } from "../types/Entity";

/**
 * Presents an interface for route
 */
export interface Route extends Entity<RouteDTO> {

    /**
     * @inheritDoc
     */
    valueOf () : ReadonlyJsonObject;

    /**
     * @inheritDoc
     */
    getDTO () : RouteDTO;

    /**
     * @inheritDoc
     */
    toJSON () : ReadonlyJsonObject;

    /**
     * @inheritDoc
     */
    getEntityType () : EntityType<RouteDTO, Entity<RouteDTO>>;

    getName(): string;
    setName(value: string): this;
    name(value: string): this;

    getPath(): string;
    setPath(value: string): this;
    path(value: string): this;

    getExtend(): string | undefined;
    setExtend(value: string | undefined): this;
    extend(value: string | undefined): this;

    getPublicUrl(): string | undefined;
    setPublicUrl(value: string | undefined): this;
    publicUrl(value: string | undefined): this;

    getLanguage(): string | undefined;
    setLanguage(value: string | undefined): this;
    language(value: string | undefined): this;

    getView(): string | undefined;
    setView(value: string | undefined): this;
    view(value: string | undefined): this;

    getRedirect(): string | undefined;
    setRedirect(value: string | undefined): this;
    redirect(value: string | undefined): this;

}
