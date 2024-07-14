// Copyright (c) 2024. Sendanor <info@sendanor.fi>. All rights reserved.

import { MaventaInvoice } from "./types/MaventaInvoice";

export interface MaventaService {

    /**
     * List invoices
     */
    listInvoices(): Promise<MaventaInvoice[]>;

}
