// Copyright (c) 2022-2024. Heusala Group Oy <info@heusalagroup.fi>. All rights reserved.

import { explainEnum, isEnum, parseEnum, stringifyEnum } from "../../../../types/Enum";
import {
    explainNot,
    explainOk,
    explainOr,
} from "../../../../types/explain";
import { isUndefined } from "../../../../types/undefined";

export enum ProductFeatureId {

    WP        = "WP",

    VPS_TYPE        = "VPS_TYPE",
    VPS_OS          = "VPS_OS",

    SUPPORT_1H_M        = "SUPPORT_1H_M",
    BACKUP_RESTORE_1H_M = "BACKUP_RESTORE_1H_M",
    DB_MYSQL_M          = "DB_MYSQL_M",
    DB_PSQL_M           = "DB_PSQL_M",
    UPGRADE_1VPS_M      = "UPGRADE_1VPS_M",
    USER_M              = "USER_M",

    DISK_TYPE       = "DISK_TYPE",
    DISK_SIZE       = "DISK_SIZE",
    DISK_RAID       = "DISK_RAID",
    DISK_BACKUP     = "DISK_BACKUP",
    DISK_USAGE     = "DISK_USAGE",

    DISK_2_TYPE       = "DISK_2_TYPE",
    DISK_2_SIZE       = "DISK_2_SIZE",
    DISK_2_RAID       = "DISK_2_RAID",
    DISK_2_BACKUP     = "DISK_2_BACKUP",
    DISK_2_USAGE     = "DISK_2_USAGE",

    DISK_3_TYPE       = "DISK_3_TYPE",
    DISK_3_SIZE       = "DISK_3_SIZE",
    DISK_3_RAID       = "DISK_3_RAID",
    DISK_3_BACKUP     = "DISK_3_BACKUP",
    DISK_3_USAGE     = "DISK_3_USAGE",

    MEMORY_SIZE     = "MEMORY_SIZE",
    NETWORK_TYPE    = "NETWORK_TYPE",
    NETWORK_IP4     = "NETWORK_IP4",
    NETWORK_IP6     = "NETWORK_IP6",
    NETWORK_NET6     = "NETWORK_NET6",
    NETWORK_TRAFFIC = "NETWORK_TRAFFIC",
    NETWORK_ZONE    = "NETWORK_ZONE",
    CPU_SHARE       = "CPU_SHARE",
    CPU_AMOUNT      = "CPU_AMOUNT",

    EMAIL_DOMAIN_COUNT       = "EMAIL_DOMAIN_COUNT",
    EMAIL_DOMAIN_ALIAS_COUNT = "EMAIL_DOMAIN_ALIAS_COUNT",

    DOMAIN_COUNT       = "DOMAIN_COUNT",
    DOMAIN_ALIAS_COUNT = "DOMAIN_ALIAS_COUNT",
    SUB_DOMAIN_COUNT   = "SUB_DOMAIN_COUNT",

    WEBSERVER_SOFTWARE        = "WEBSERVER_SOFTWARE",
    PHP_SOFTWARE              = "PHP_SOFTWARE",
    PHP_MEMORY                = "PHP_MEMORY",
    SSL_CERTIFICATES          = "SSL_CERTIFICATES",
    SFTP_ACCOUNT_COUNT        = "SFTP_ACCOUNT_COUNT",
    SSH_ACCOUNT_COUNT         = "SSH_ACCOUNT_COUNT",
    HTTP_2_SUPPORT            = "HTTP_2_SUPPORT",
    HTACCESS_SUPPORT          = "HTACCESS_SUPPORT",
    PASSWORD_PROTECTED_WEB_FOLDER_SUPPORT  = "PASSWORD_PROTECTED_WEB_FOLDER_SUPPORT",
    CUSTOM_ERROR_PAGE_SUPPORT = "CUSTOM_ERROR_PAGE_SUPPORT",
    NODE_JS_SOFTWARE          = "NODE_JS_SOFTWARE",
    CGI                       = "CGI",
    PERL_SOFTWARE             = "PERL_SOFTWARE",
    PYTHON_SOFTWARE           = "PYTHON_SOFTWARE",
    CRON                      = "CRON",

    DATABASE_COUNT = "DATABASE_COUNT",
    MYSQL_SUPPORT = "MYSQL_SUPPORT",
    MARIADB_SUPPORT = "MARIADB_SUPPORT",
    POSTGRESQL_SUPPORT = "POSTGRESQL_SUPPORT",
    REDIS_SUPPORT = "REDIS_SUPPORT",
    MONGODB_SUPPORT = "MONGODB_SUPPORT",
    ELASTICSEARCH_SUPPORT = "ELASTICSEARCH_SUPPORT",
    PHPMYADMIN_SUPPORT = "PHPMYADMIN_SUPPORT",

    MAILBOX_COUNT = "MAILBOX_COUNT",
    DOMAIN_QUOTA = "DOMAIN_QUOTA",
    MAILBOX_QUOTA = "MAILBOX_QUOTA",
    DOMAIN_MESSAGE_SENDING_LIMIT = "DOMAIN_MESSAGE_SENDING_LIMIT",
    MAILBOX_MESSAGE_SENDING_LIMIT = "MAILBOX_MESSAGE_SENDING_LIMIT",
    AUTOREPLY_SUPPORT = "AUTOREPLY_SUPPORT",
    MAILBOX_ALIAS_COUNT = "MAILBOX_ALIAS_COUNT",
    ROUNDCUBE_SOFTWARE = "ROUNDCUBE_SOFTWARE",
    IMAP_SUPPORT = "IMAP_SUPPORT",
    POP_SUPPORT = "POP_SUPPORT",
    SMTP_AUTH_SUPPORT = "SMTP_AUTH_SUPPORT",
    SPAM_FILTERING = "SPAM_FILTERING",
    CLAMAV_SUPPORT = "CLAMAV_SUPPORT",
    DKIM_SUPPORT = "DKIM_SUPPORT",
    SPF_SUPPORT = "SPF_SUPPORT",
    SIEVE_FILTERING_SUPPORT = "SIEVE_FILTERING_SUPPORT",

    USER_THROTTLE_RATE = "USER_THROTTLE_RATE",
    DDOS_THROTTLE_RATE = "DDOS_THROTTLE_RATE",
    DDOS_LESSER_THROTTLE_RATE = "DDOS_LESSER_THROTTLE_RATE",
    LOGIN_THROTTLE_RATE = "LOGIN_THROTTLE_RATE",
    PASSWORD_RECOVERY_THROTTLE_RATE = "PASSWORD_RECOVERY_THROTTLE_RATE",
    PASSWORD_RECOVERY_TOTP_THROTTLE_RATE = "PASSWORD_RECOVERY_TOTP_THROTTLE_RATE",
    PASSWORD_RECOVERY_APPLY_THROTTLE_RATE = "PASSWORD_RECOVERY_APPLY_THROTTLE_RATE",

    API_SUPPORT = "API_SUPPORT",
    ADMIN_USER_COUNT = "ADMIN_USER_COUNT",
    TOTP_2FA_SUPPORT = "TOTP_2FA_SUPPORT",
    OAUTH2_SUPPORT = "OAUTH2_SUPPORT",
    QUOTA_SUPPORT = "QUOTA_SUPPORT",
    STATISTICS_SUPPORT = "STATISTICS_SUPPORT",
    MONITORING_SUPPORT = "MONITORING_SUPPORT",

}

export function isProductFeatureId (value: unknown) : value is ProductFeatureId {
    return isEnum(ProductFeatureId, value);
}

export function explainProductFeatureId (value : unknown) : string {
    return explainEnum("ProductFeatureId", ProductFeatureId, isProductFeatureId, value);
}

export function stringifyProductFeatureId (value : ProductFeatureId) : string {
    return stringifyEnum(ProductFeatureId, value);
}

export function parseProductFeatureId (value: any) : ProductFeatureId | undefined {
    return parseEnum(ProductFeatureId, value) as ProductFeatureId | undefined;
}

export function isProductFeatureIdOrUndefined (value: unknown): value is ProductFeatureId | undefined {
    return isUndefined(value) || isProductFeatureId(value);
}

export function explainProductFeatureIdOrUndefined (value: unknown): string {
    return isProductFeatureIdOrUndefined(value) ? explainOk() : explainNot(explainOr(['ProductFeatureId', 'undefined']));
}

