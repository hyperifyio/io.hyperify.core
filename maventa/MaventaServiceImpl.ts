// Copyright (c) 2024. Sendanor <info@sendanor.fi>. All rights reserved.

import { AuthorizationUtils } from "../AuthorizationUtils";
import { HttpService } from '../HttpService';
import { MaventaService } from "./MaventaService";
import { MaventaInvoice, isMaventaInvoice } from './types/MaventaInvoice';
import { MaventaTokenResponse } from './types/MaventaTokenResponse';
import {
  DEFAULT_MAVENTA_BASE_URL,
  DEFAULT_MAVENTA_SCOPE,
} from './maventa-constants';

/**
 *
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
   * @param clientId
   * @param clientSecret
   * @param vendorApiKey
   * @param scope
   * @param baseUrl
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

  /**
   * @inheritDoc
   */
  public async listInvoices(): Promise<MaventaInvoice[]> {

    const token = await this._getAccessToken();

    const headers = {
      'Authorization': AuthorizationUtils.createBearerHeader(token),
      'Accept': 'application/json',
      'User-Api-Key': this._clientSecret,
      'Company-UUID': this._clientId,
    };

    const url = `${this._baseUrl}/v1/invoices`;
    const response = await HttpService.getJson(url, headers);
    if (!response || !Array.isArray(response)) {
      throw new Error("Failed to list invoices or wrong format");
    }

    const invoices = response.filter(isMaventaInvoice);
    if (invoices.length !== response.length) {
      throw new Error("Some items in the response did not match the expected invoice format");
    }
    return invoices;
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
    if (this._token) return this._token;

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
    if (!result) throw new Error("Failed to retrieve access token");
    const response: MaventaTokenResponse = JSON.parse(result);
    this._token = response.access_token;
    return this._token;
  }

}
