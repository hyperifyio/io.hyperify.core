// Copyright (c) 2024. Sendanor <info@sendanor.fi>. All rights reserved.

import { AuthorizationUtils } from "../AuthorizationUtils";
import { HttpService } from '../HttpService';
import { LogService } from "../LogService";
import { explainArrayOf } from "../types/Array";
import { isString } from "../types/String";
import {
    DEFAULT_MAVENTA_BASE_URL,
    DEFAULT_MAVENTA_SCOPE,
} from './maventa-constants';
import { MaventaService } from "./MaventaService";
import { MaventaDirection } from "./types/MaventaDirection";
import {
    explainMaventaInvoice,
    isMaventaInvoice,
    MaventaInvoice,
} from './types/MaventaInvoice';
import { MaventaTokenResponse } from './types/MaventaTokenResponse';

const LOG = LogService.createLogger( 'MaventaServiceImpl' );

/**
 * Maventa REST API Client.
 *
 * @see https://documentation.maventa.com/rest-api/
 */
export class MaventaServiceImpl implements MaventaService {

    private readonly _baseUrl : string;
    private readonly _clientId : string;
    private readonly _clientSecret : string;
    private readonly _scope : string;
    private readonly _vendorApiKey : string;
    // private readonly _companyEDI : string;

    private _token: string | undefined;

    /**
     * Create instance of Maventa Service implementation.
     *
     * @param clientSecret The User API key (from Maventa account portal under Settings -> Company details)
     * @param clientId     The company UUID (from Maventa account portal under Settings -> Company details)
     * @param vendorApiKey The vendor UUID (from Maventa account portal under Settings -> Software API keys)
     * @param scope        Defaults to eui
     * @param baseUrl      Defaults to https://ax.maventa.com, use https://ax-stage.maventa.com for testing.
     */
    public static create (
        clientId : string,
        clientSecret: string,
        vendorApiKey : string,
        scope : string = DEFAULT_MAVENTA_SCOPE,
        baseUrl : string = DEFAULT_MAVENTA_BASE_URL,
    ) : MaventaServiceImpl {
        return new MaventaServiceImpl(
            clientId,
            clientSecret,
            vendorApiKey,
            scope,
            baseUrl,
        );
    }

    public async listSentInvoices(): Promise<MaventaInvoice[]> {
        return this._listInvoices(
            MaventaDirection.SENT,
            undefined,
            undefined,
        );
    }

    /**
     * @inheritDoc
     */
    public async listInboundInvoices(
        received_at_start : Date,
        received_at_end : Date,
    ): Promise<MaventaInvoice[]> {
        return this._listInvoices(
            MaventaDirection.RECEIVED,
            received_at_start.toISOString(),
            received_at_end.toISOString(),
        );
    }

    /**
     * @inheritDoc
     */
    public async getInvoice(
        id: string,
    ): Promise<MaventaInvoice | undefined> {
        return this._getInvoice(id);
    }

    /**
     *
     * @param direction
     * @param received_at_start
     * @param received_at_end
     * @private
     */
    private async _listInvoices(
        direction: MaventaDirection,
        received_at_start ?: string,
        received_at_end ?: string,
    ): Promise<MaventaInvoice[]> {

        const token = await this._getAccessToken();

        const headers = {
            'Authorization': AuthorizationUtils.createBearerHeader(token),
            'Accept': 'application/json',
            'User-Api-Key': this._clientSecret,
            'Company-UUID': this._clientId,
        };

        const params = [
            ...(direction         ? [`direction=${q(direction)}`]                 : []),
            ...(received_at_start ? [`received_at_start=${q(received_at_start)}`] : []),
            ...(received_at_end   ? [`received_at_end=${q(received_at_end)}`]     : []),
        ];

        const url = `${this._baseUrl}/v1/invoices?${params.join('&')}`;
        const response = await HttpService.getJson(url, headers);
        if (!response || !Array.isArray(response)) {
            throw new Error("Failed to list invoices or wrong format");
        }

        const invoices = response.filter(isMaventaInvoice);
        if (invoices.length !== response.length) {
            const invalidInvoices = response.filter((item: MaventaInvoice) => !isMaventaInvoice(item));
            LOG.debug(`invalidInvoices = `, invalidInvoices);
            throw new Error(`Some items in the response did not match the expected invoice format: ${explainArrayOf<MaventaInvoice>("MaventaInvoice", explainMaventaInvoice, invalidInvoices, isMaventaInvoice)}`);
        }

        return invoices;
    }

    /**
     *
     * @param id
     * @private
     */
    private async _getInvoice(
        id: string,
    ): Promise<MaventaInvoice | undefined> {
        const token = await this._getAccessToken();
        const headers = {
            'Authorization': AuthorizationUtils.createBearerHeader(token),
            'Accept': 'application/json',
            'User-Api-Key': this._clientSecret,
            'Company-UUID': this._clientId,
        };
        const url = `${this._baseUrl}/v1/invoice/${q(id)}`;
        const response = await HttpService.getJson(url, headers);
        if (!response) {
            throw new Error("Failed to list invoices or wrong format");
        }
        if (!isMaventaInvoice(response)) {
            throw new Error(`The response did not match the expected invoice format: ${explainMaventaInvoice(response)}`);
        }
        return response;
    }

    /**
     *
     * @param clientId
     * @param clientSecret
     * @param vendorApiKey
     * @param scope
     * @param baseUrl
     * @private
     */
    private constructor (
        clientId : string,
        clientSecret: string,
        vendorApiKey : string,
        scope : string = DEFAULT_MAVENTA_SCOPE,
        baseUrl : string = DEFAULT_MAVENTA_BASE_URL,
    ) {
        this._token        = undefined;
        this._clientId     = clientId;
        this._clientSecret = clientSecret;
        this._vendorApiKey = vendorApiKey;
        this._scope        = scope        ?? DEFAULT_MAVENTA_SCOPE;
        this._baseUrl      = baseUrl      ?? DEFAULT_MAVENTA_BASE_URL;
        // this._companyEDI   = config?.companyEDI   ?? '';
    }

    /**
     *
     * @private
     */
    private async _getAccessToken(): Promise<string> {

        if (this._token) {
            return this._token;
        }

        const postData = new URLSearchParams({
            grant_type: 'client_credentials',
            client_id: this._clientId,
            client_secret: this._clientSecret,
            scope: this._scope,
            vendor_api_key: this._vendorApiKey,
        }).toString();

        const headers = {
            'Content-Type': 'application/x-www-form-urlencoded',
            'Content-Length': Buffer.byteLength(postData).toString(),
        };

        const url = `${this._baseUrl}/oauth2/token`;
        const result = await HttpService.postText(url, postData, headers);
        if (!result) {
            this._token = undefined;
            throw new Error("Failed to retrieve access token: Invalid response data");
        }
        const response: MaventaTokenResponse = JSON.parse(result);
        const accessToken : unknown = response?.access_token;
        if (!isString(accessToken)) {
            this._token = undefined;
            throw new Error("Failed to retrieve access token: Invalid response JSON");
        }
        this._token = accessToken;
        return this._token;
    }

}

function q (value: string) : string {
    return encodeURIComponent(value);
}
