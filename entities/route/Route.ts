// Copyright (c) 2023. Sendanor <info@sendanor.fi>. All rights reserved.

import { ReadonlyJsonObject } from "../../Json";
import { isFunction } from "../../types/Function";
import { isObject } from "../../types/Object";
import { RouteDTO } from "./RouteDTO";
import { Entity } from "../types/Entity";
/**
 * Presents an interface for color value
 */
export interface Route extends Entity<RouteDTO> {

    /**
     * @inheritDoc
     */
    valueOf() : ReadonlyJsonObject;

    getDTO () : RouteDTO;

    /**
     * @inheritDoc
     */
    toJSON () : ReadonlyJsonObject;


    getName(): string;
    setName(value: string): this;
    name(value: string): this;

    getPath(): string;
    setPath(value: string): this;
    path(value: string): this;

    getExtend(): string | undefined;
    setExtend(value: string | undefined): this;
    extend(value: string): this;

    getPublicUrl(): string | undefined;
    setPublicUrl(value: string | undefined): this;
    publicUrl(value: string): this;

    getLanguage(): string | undefined;
    setLanguage(value: string | undefined): this;
    language(value: string): this;

    getView(): string | undefined;
    setView(value: string | undefined): this;
    view(value: string): this;

    getRedirect(): string | undefined;
    setRedirect(value: string | undefined): this;
    redirect(value: string): this;

    value(value: string): this;
}

export function isRoute (value : unknown) : value is Route {
    return (
        isObject(value)
        && isFunction(value?.valueOf)
        && isFunction(value?.getDTO)
        && isFunction(value?.toJSON)

        && isFunction(value?.getName)
        && isFunction(value?.setName)
        && isFunction(value?.name)

        && isFunction(value?.getPath)
        && isFunction(value?.setPath)
        && isFunction(value?.path)

        && isFunction(value?.getExtend)
        && isFunction(value?.setExtend)
        && isFunction(value?.extend)

        && isFunction(value?.getPublicUrl)
        && isFunction(value?.setPublicUrl)
        && isFunction(value?.lublicUrl)

        && isFunction(value?.getLanguage)
        && isFunction(value?.setLanguage)
        && isFunction(value?.language)

        && isFunction(value?.getView)
        && isFunction(value?.setView)
        && isFunction(value?.view)

        && isFunction(value?.getRedirect)
        && isFunction(value?.setRedirect)
        && isFunction(value?.redirect)
    );
}
