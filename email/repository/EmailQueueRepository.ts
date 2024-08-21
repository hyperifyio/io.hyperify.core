// Copyright (c) 2023. Heusala Group Oy <info@heusalagroup.fi>. All rights reserved.

import { Sort } from "../../data/Sort";
import { Repository } from "../../data/types/Repository";
import { EmailQueueEntity } from "./EmailQueueEntity";

export interface EmailQueueRepository extends Repository<EmailQueueEntity, string> {
    findAllByClientId (clientId: string, sort?: Sort) : Promise<EmailQueueEntity[]>;
    findAllByInvoiceId (invoiceId: string, sort?: Sort) : Promise<EmailQueueEntity[]>;
    findAllByInventoryItemId (inventoryItemId: string, sort?: Sort) : Promise<EmailQueueEntity[]>;
    findAllBySenderAddress (from: string, sort?: Sort) : Promise<EmailQueueEntity[]>;
    findAllByTargetAddress (to: string, sort?: Sort) : Promise<EmailQueueEntity[]>;
    findAllBySent (sent: boolean, sort?: Sort) : Promise<EmailQueueEntity[]>;
    findAllByFailed (failed: boolean, sort?: Sort) : Promise<EmailQueueEntity[]>;
    findAllByIsTerminated (isTerminated: boolean, sort?: Sort) : Promise<EmailQueueEntity[]>;
}
