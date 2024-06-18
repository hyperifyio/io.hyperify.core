import { MaventaAction } from "./MaventaAction";
import { MaventaRecipient } from "./MaventaRecipient";
import { MaventaSender } from "./MaventaSender";
import { MaventaFile } from "./MaventaFile";
import { isObject } from "../../types/Object";
import { isString } from "../../types/String";
import { isNumber } from "../../types/Number";
import { isArray } from "../../types/Array";
import { isNull } from "../../types/Null";
import { isUndefined } from "../../types/undefined";


export interface MaventaRevisionObject {
  readonly [key: string]: unknown;
};

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
  readonly revision: MaventaRevisionObject;
};

export function isMaventaInvoice(data: unknown): data is MaventaInvoice {
  const record = data as MaventaInvoice;
  return record != null &&
      isObject(record) &&
      isString(record.id) &&
      isString(record.status) &&
      (isString(record.reference) || isNull(record.reference)) &&
      isString(record.number) &&
      isObject(record.sender) &&
      isObject(record.recipient) &&
      (isString(record.received_at) || isUndefined(record.received_at)) &&
      isString(record.created_at) &&
      isString(record.date) &&
      isString(record.date_due) &&
      isString(record.source_format) &&
      isNumber(record.sum) &&
      isNumber(record.sum_tax) &&
      isString(record.currency) &&
      (isString(record.destination) || isNull(record.destination)) &&
      (isString(record.comment) || isNull(record.comment)) &&
      isArray(record.files) &&
      record.files.every(file => isObject(file)) &&
      isArray(record.actions) &&
      record.actions.every(action => isObject(action)) &&
      isObject(record.revision);
};