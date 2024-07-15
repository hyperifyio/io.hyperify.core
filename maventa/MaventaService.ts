// Copyright (c) 2024. Sendanor <info@sendanor.fi>. All rights reserved.

import { MaventaInvoice } from "./types/MaventaInvoice";
import { MaventaReturnFormat } from "./types/MaventaReturnFormat";

export interface MaventaService {

    /**
     * List outbound (sent) invoices
     */
    listSentInvoices(): Promise<MaventaInvoice[]>;

    /**
     * List inbound invoices
     *
     * @param received_at_start
     * @param received_at_end
     */
    listInboundInvoices(
        received_at_start : Date,
        received_at_end : Date,
    ): Promise<MaventaInvoice[]>

    /**
     * Get invoice
     *
     * @param id
     * @param returnFormat
     */
    getInvoice(
        id : string,
        returnFormat ?: MaventaReturnFormat | undefined,
    ): Promise<MaventaInvoice|undefined>

}
