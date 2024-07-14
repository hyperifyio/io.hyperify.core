// Copyright (c) 2024. Sendanor <info@sendanor.fi>. All rights reserved.

import {
    explainArrayOf,
    isArrayOf,
} from "../../types/Array";
import {
    explain,
    explainNot,
    explainOk,
    explainOr,
    explainProperty,
} from "../../types/explain";
import {
    explainNumber,
    isNumber,
} from "../../types/Number";
import {
    explainNoOtherKeysInDevelopment,
    hasNoOtherKeysInDevelopment,
} from "../../types/OtherKeys";
import {
    explainRegularObject,
    isRegularObject,
} from "../../types/RegularObject";
import {
    explainString,
    explainStringOrNull,
    explainStringOrUndefined,
    isString,
    isStringOrNull,
    isStringOrUndefined,
} from "../../types/String";
import { isUndefined } from "../../types/undefined";
import {
    explainMaventaAction,
    isMaventaAction,
    MaventaAction,
} from "./MaventaAction";
import {
    explainMaventaFile,
    isMaventaFile,
    MaventaFile,
} from "./MaventaFile";
import {
    explainMaventaRecipient,
    isMaventaRecipient,
    MaventaRecipient,
} from "./MaventaRecipient";
import {
    explainMaventaRevisionObjectOrUndefined,
    isMaventaRevisionObjectOrUndefined,
    MaventaRevisionObject,
} from "./MaventaRevisionObject";
import {
    explainMaventaSender,
    isMaventaSender,
    MaventaSender,
} from "./MaventaSender";

export interface MaventaInvoice {
  readonly id: string;
  readonly status: string;
  readonly reference: string | null;
  readonly number: string;
  readonly sender: MaventaSender;
  readonly recipient: MaventaRecipient;
  readonly received_at?: string;
  readonly created_at: string;
  readonly date: string;
  readonly date_due: string;
  readonly source_format: string;
  readonly sum: number;
  readonly sum_tax: number;
  readonly currency: string;
  readonly destination: string | null;
  readonly comment: string | null;
  readonly files: readonly MaventaFile[];
  readonly actions: readonly MaventaAction[];
  readonly revision ?: MaventaRevisionObject;
}

export function isMaventaInvoice (value: unknown) : value is MaventaInvoice {
    return (
        isRegularObject(value)
        && hasNoOtherKeysInDevelopment(value, [
            'id',
            'status',
            'reference',
            'number',
            'sender',
            'recipient',
            'received_at',
            'created_at',
            'date',
            'date_due',
            'source_format',
            'sum',
            'sum_tax',
            'currency',
            'destination',
            'comment',
            'files',
            'actions',
            'revision',
        ])
        && isString(value?.id)
        && isString(value?.status)
        && isStringOrNull(value?.reference)
        && isString(value?.number)
        && isMaventaSender(value?.sender)
        && isMaventaRecipient(value?.recipient)
        && isStringOrUndefined(value?.received_at)
        && isString(value?.created_at)
        && isString(value?.date)
        && isString(value?.date_due)
        && isString(value?.source_format)
        && isNumber(value?.sum)
        && isNumber(value?.sum_tax)
        && isString(value?.currency)
        && isStringOrNull(value?.destination)
        && isStringOrNull(value?.comment)
        && isArrayOf<MaventaFile>(value?.files, isMaventaFile)
        && isArrayOf<MaventaAction>(value?.actions, isMaventaAction)
        && isMaventaRevisionObjectOrUndefined(value?.revision)
    );
}

export function explainMaventaInvoice (value: any) : string {
    return explain(
        [
            explainRegularObject(value),
            explainNoOtherKeysInDevelopment(value, [
                'id',
                'status',
                'reference',
                'number',
                'sender',
                'recipient',
                'received_at',
                'created_at',
                'date',
                'date_due',
                'source_format',
                'sum',
                'sum_tax',
                'currency',
                'destination',
                'comment',
                'files',
                'actions',
                'revision',
            ])
            , explainProperty("id", explainString(value?.id))
            , explainProperty("status", explainString(value?.status))
            , explainProperty("reference", explainStringOrNull(value?.reference))
            , explainProperty("number", explainString(value?.number))
            , explainProperty("sender", explainMaventaSender(value?.sender))
            , explainProperty("recipient", explainMaventaRecipient(value?.recipient))
            , explainProperty("received_at", explainStringOrUndefined(value?.received_at))
            , explainProperty("created_at", explainString(value?.created_at))
            , explainProperty("date", explainString(value?.date))
            , explainProperty("date_due", explainString(value?.date_due))
            , explainProperty("source_format", explainString(value?.source_format))
            , explainProperty("sum", explainNumber(value?.sum))
            , explainProperty("sum_tax", explainNumber(value?.sum_tax))
            , explainProperty("currency", explainString(value?.currency))
            , explainProperty("destination", explainStringOrNull(value?.destination))
            , explainProperty("comment", explainStringOrNull(value?.comment))
            , explainProperty("files", explainArrayOf<MaventaFile>("MaventaFile", explainMaventaFile, value?.files, isMaventaFile))
            , explainProperty("actions", explainArrayOf<MaventaAction>("MaventaAction", explainMaventaAction, value?.actions, isMaventaAction))
            , explainProperty("revision", explainMaventaRevisionObjectOrUndefined(value?.revision))
        ]
    );
}

export function parseMaventaInvoice (value: unknown) : MaventaInvoice | undefined {
    if (isMaventaInvoice(value)) return value;
    return undefined;
}

export function isMaventaInvoiceOrUndefined (value: unknown): value is MaventaInvoice | undefined {
    return isUndefined(value) || isMaventaInvoice(value);
}

export function explainMaventaInvoiceOrUndefined (value: unknown): string {
    return isMaventaInvoiceOrUndefined(value) ? explainOk() : explainNot(explainOr(['MaventaInvoice', 'undefined']));
}
