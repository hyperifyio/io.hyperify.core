import { HttpService } from '../HttpService';
import { MaventaConfig } from './types/MaventaConfig';
import { MaventaInvoice, isMaventaInvoice } from './types/MaventaInvoice';
import { MaventaTokenResponse } from './types/MaventaTokenResponse';
import { DEFAULT_MAVENTA_BASE_URL, DEFAULT_MAVENTA_BASE_URL_TEST, DEFAULT_MAVENTA_SCOPE } from './maventa-constants';

export class MaventaService {
  private readonly _config: MaventaConfig;
  private _token: string | undefined;

  constructor(config: Partial<MaventaConfig>) {
    const isTesting = process.env.IS_TESTING === 'true';
    this._config = {
      baseUrl: config.baseUrl || (isTesting ? DEFAULT_MAVENTA_BASE_URL_TEST : DEFAULT_MAVENTA_BASE_URL),
      clientId: config.clientId || process.env.CLIENT_ID!,
      clientSecret: config.clientSecret || process.env.CLIENT_SECRET!,
      scope: config.scope || DEFAULT_MAVENTA_SCOPE,
      vendorApiKey: config.vendorApiKey || process.env.VENDOR_API_KEY!,
      companyEDI: config.companyEDI || process.env.COMPANY_EDI!,
    };
  };

  private async _getAccessToken(): Promise<string> {
    if (this._token) return this._token;

    const postData = new URLSearchParams({
      grant_type: 'client_credentials',
      client_id: this._config.clientId,
      client_secret: this._config.clientSecret,
      scope: this._config.scope,
      vendor_api_key: this._config.vendorApiKey,
    }).toString();

    const headers = {
      'Content-Type': 'application/x-www-form-urlencoded',
      'Content-Length': Buffer.byteLength(postData).toString(),
    };

    const url = `${this._config.baseUrl}/oauth2/token`;
    const result = await HttpService.postText(url, postData, headers);
    if (!result) throw new Error("Failed to retrieve access token");
    const response: MaventaTokenResponse = JSON.parse(result);
    this._token = response.access_token;
    return this._token;
  };

  public async listInvoices(): Promise<MaventaInvoice[]> {
    const token = await this._getAccessToken();
    const headers = {
      'Authorization': `Bearer ${token}`,
      'Accept': 'application/json',
      'User-Api-Key': this._config.clientSecret,
      'Company-UUID': this._config.clientId,
    };

    const url = `${this._config.baseUrl}/v1/invoices`;
    const response = await HttpService.getJson(url, headers);
    if (!response || !Array.isArray(response)) throw new Error("Failed to list invoices or wrong format");

    const invoices = response.filter(isMaventaInvoice);
    if (invoices.length !== response.length) {
      throw new Error("Some items in the response did not match the expected invoice format");
    };
    return invoices;
  };
};