// Copyright (c) 2022. Heusala Group Oy <info@heusalagroup.fi>. All rights reserved.

import {
    explainEnum,
    isEnum,
    parseEnum,
    stringifyEnum,
} from "../../../types/Enum";
import { explainNot, explainOk, explainOr } from "../../../types/explain";
import { isUndefined } from "../../../types/undefined";

export enum InventoryState {

    /**
     * Special type which may be used to mean the inventory item has not been
     * saved yet
     */
    UNINITIALIZED = "UNINITIALIZED",

    /**
     * Inventory item is under construction
     */
    DRAFT = "DRAFT",

    /**
     * Inventory item is queued to be approved to the background services
     */
    WAITING_APPROVAL  = "WAITING_APPROVAL",

    /**
     * Inventory item is was approved and is queued to be modified to the background services
     */
    CHANGING  = "CHANGING",

    /**
     * Inventory item has been successfully updated to the background services
     */
    READY     = "READY",

    /**
     * Inventory item was not successfully updated to the background services
     */
    ERROR     = "ERROR",

    /**
     * Inventory item was locked
     */
    LOCKED     = "LOCKED",

    /**
     * Inventory item was cancelled
     */
    CANCELLED     = "CANCELLED",

    /**
     * Inventory item was removed
     */
    DELETED     = "DELETED"

}

export function isInventoryState (value: unknown) : value is InventoryState {
    return isEnum(InventoryState, value);
}

export function explainInventoryState (value : unknown) : string {
    return explainEnum("InventoryState", InventoryState, isInventoryState, value);
}

export function stringifyInventoryState (value : InventoryState) : string {
    return stringifyEnum(InventoryState, value);
}

export function parseInventoryState (value: any) : InventoryState | undefined {
    return parseEnum(InventoryState, value) as InventoryState | undefined;
}

export function isInventoryStateOrUndefined (value: unknown): value is InventoryState | undefined {
    return isUndefined(value) || isInventoryState(value);
}

export function explainInventoryStateOrUndefined (value: unknown): string {
    return isInventoryStateOrUndefined(value) ? explainOk() : explainNot(explainOr(['InventoryState', 'undefined']));
}
