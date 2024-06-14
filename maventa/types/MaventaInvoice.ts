import { MaventaAction } from "./MaventaAction";
import { MaventaRecipient } from "./MaventaRecipient";
import { MaventaSender } from "./MaventaSender";
import { MaventaFile } from "./MaventaFile";

export interface MaventaRevisionObject {
    readonly [key: string]: unknown;
}

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
}

export function isMaventaInvoice(data: unknown): data is MaventaInvoice {
    const record = data as MaventaInvoice;
    return record != null &&
        typeof record === 'object' &&
        typeof record.id === 'string' &&
        typeof record.status === 'string' &&
        (typeof record.reference === 'string' || record.reference === null) &&
        typeof record.number === 'string' &&
        typeof record.sender === 'object' && record.sender !== null &&
        typeof record.recipient === 'object' && record.recipient !== null &&
        (typeof record.received_at === 'string' || record.received_at === undefined) &&
        typeof record.created_at === 'string' &&
        typeof record.date === 'string' &&
        typeof record.date_due === 'string' &&
        typeof record.source_format === 'string' &&
        typeof record.sum === 'number' &&
        typeof record.sum_tax === 'number' &&
        typeof record.currency === 'string' &&
        (typeof record.destination === 'string' || record.destination === null) &&
        (typeof record.comment === 'string' || record.comment === null) &&
        Array.isArray(record.files) &&
        record.files.every(file => typeof file === 'object' && file !== null) &&
        Array.isArray(record.actions) &&
        record.actions.every(action => typeof action === 'object' && action !== null) &&
        typeof record.revision === 'object' && record.revision !== null;
}
