import { Column } from "../../data/Column";
import { CreationTimestamp } from "../../data/CreationTimestamp";
import { Entity } from "../../data/Entity";
import { Id } from "../../data/Id";
import { Table } from "../../data/Table";
import { Temporal } from "../../data/Temporal";
import { TemporalType } from "../../data/types/TemporalType";
import { UpdateTimestamp } from "../../data/UpdateTimestamp";
import { EntityUtils } from "../../data/utils/EntityUtils";
import { LogService } from "../../LogService";
import type { NewEmailQueueDTO } from "../dto/NewEmailQueueDTO";
import { createEmailQueueDTO, explainEmailQueueDTO, isEmailQueueDTO, EmailQueueDTO } from "../dto/EmailQueueDTO";

const LOG = LogService.createLogger('EmailQueueEntity');

@Table("email_queue")
export class EmailQueueEntity extends Entity {

    public constructor ();
    public constructor (dto : NewEmailQueueDTO);

    public constructor (dto ?: NewEmailQueueDTO) {
        super();
        this.invoiceId      = dto?.invoiceId;
        this.clientId       = dto?.clientId;
        this.inventoryItemId = dto?.inventoryItemId;
        this.senderAddress  = dto?.senderAddress;
        this.targetAddress  = dto?.targetAddress;
        this.subject        = dto?.subject;
        this.message        = dto?.message;
        this.htmlMessage    = dto?.htmlMessage;
        this.sent           = !!dto?.sent;
        this.failed         = !!dto?.failed;
        this.isTerminated   = !!dto?.isTerminated;
    }

    @Id()
    @Column("email_queue_id", 'BIGINT', { updatable : false, insertable: false })
    public emailQueueId?: string;

    @Column("client_id", 'BIGINT')
    public clientId?: string;

    @Column("invoice_id")
    public invoiceId?: string;

    @Column("inventory_item_id", 'BIGINT')
    public inventoryItemId?: string;

    @UpdateTimestamp()
    @Temporal(TemporalType.TIMESTAMP)
    @Column("updated", 'DATETIME')
    public updated?: string;

    @CreationTimestamp()
    @Temporal(TemporalType.TIMESTAMP)
    @Column("creation", 'DATETIME')
    public created?: string;

    @Column("sender_address")
    public senderAddress ?: string;

    @Column("target_address")
    public targetAddress ?: string;

    @Column("subject")
    public subject ?: string;

    @Column("message")
    public message ?: string;

    @Column("html_message")
    public htmlMessage ?: string;

    @Column("sent", 'BOOL')
    public sent ?: boolean;

    @Column("failed", 'BOOL')
    public failed ?: boolean;

    @Column("is_terminated", 'BOOL')
    public isTerminated ?: boolean;

    public static toDTO (entity: EmailQueueEntity) : EmailQueueDTO {
        if (entity.emailQueueId === undefined) throw new TypeError('entity.emailQueueId missing');
        if (entity.updated === undefined) throw new TypeError('entity.updated missing');
        if (entity.created === undefined) throw new TypeError('entity.created missing');
        if (entity.clientId === undefined) throw new TypeError('entity.clientId missing');
        if (entity.inventoryItemId === undefined) throw new TypeError('entity.inventoryItemId missing');
        if (entity.senderAddress === undefined) throw new TypeError('entity.senderAddress missing');
        if (entity.targetAddress === undefined) throw new TypeError('entity.targetAddress missing');
        if (entity.subject === undefined) throw new TypeError('entity.subject missing');
        if (entity.message === undefined) throw new TypeError('entity.message missing');
        if (entity.sent === undefined) throw new TypeError('entity.sent missing');
        if (entity.failed === undefined) throw new TypeError('entity.failed missing');
        if (entity.isTerminated === undefined) throw new TypeError('entity.isTerminated missing');
        const dto : EmailQueueDTO = createEmailQueueDTO(
            entity.emailQueueId,
            entity.updated,
            entity.created,
            entity.clientId,
            entity.inventoryItemId,
            entity.senderAddress,
            entity.targetAddress,
            entity.subject,
            entity.message,
            EntityUtils.parseBoolean(entity.sent),
            EntityUtils.parseBoolean(entity.failed),
            EntityUtils.parseBoolean(entity.isTerminated),
            entity.invoiceId ?? '',
            entity.htmlMessage ?? '',
        );
        // Redundant fail safe
        if (!isEmailQueueDTO(dto)) {
            LOG.debug(`toDTO: dto / entity = `, dto, entity);
            throw new TypeError(`Failed to create valid EmailQueueDTO: ${explainEmailQueueDTO(dto)}`);
        }
        return dto;
    }
}
