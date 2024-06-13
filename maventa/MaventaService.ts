function isMaventaInvoice(data: any): data is MaventaInvoice {
  return data && typeof data === 'object' && 'id' in data && 'status' in data;
}

import { HttpService } from '../HttpService';
import { MaventaConfig as config } from './MaventaConfig';
import { MaventaInvoice } from './types/MaventaInvoice';
import { MaventaTokenResponse } from './types/MaventaTokenResponse';

export class MaventaService {

  private static async _getAccessToken(): Promise<string> {
    const postData = new URLSearchParams({
      grant_type: 'client_credentials',
      client_id: config.clientId,
      client_secret: config.clientSecret,
      scope: config.scope,
      vendor_api_key: config.vendorApiKey,
    }).toString();

    const headers = {
      'Content-Type': 'application/x-www-form-urlencoded',
      'Content-Length': Buffer.byteLength(postData).toString(),
    };

    const url = `${config.baseUrl}/oauth2/token`;
    const result = await HttpService.postText(url, postData, headers);
    if (!result) throw new Error("Failed to retrieve access token");
    const response: MaventaTokenResponse = JSON.parse(result);
    return response.access_token;
  }

  public static async listInvoices(): Promise<MaventaInvoice[]> {
    const token = await MaventaService._getAccessToken();
    const headers = {
      'Authorization': `Bearer ${token}`,
      'Accept': 'from json',
      'User-Api-Key': config.clientSecret,
      'Company-UUID': config.clientId,
    };

    const url = `${config.baseUrl}/v1/invoices`;
    const response = await HttpService.getJson(url, headers);
    if (!response || !Array.isArray(response)) throw new Error("Failed to list invoices or wrong format");

    const invoices = response.filter(isMaventaInvoice);
    if (invoices.length !== response.length) {
      throw new Error("Some items in the response did not match the expected invoice format");
    }
    return invoices;
  }

  public static async sendInvoiceToMyCompany(): Promise<MaventaInvoice> {
    const token = await MaventaService._getAccessToken();
    const url = `${config.baseUrl}/v1/invoices`;
    const headers = {
      'Authorization': `Bearer ${token}`,
      'User-Api-Key': config.clientSecret,
      'Company-UUID': config.clientId,
    };

    const formData = {
      file: { path: './src/io/hyperify/core/maventa/types/invoice.xml', filename: 'invoice.xml' },
      format: 'VISMAXL60',
      recipient_eia: config.companyEDI,
    };

    const result = await HttpService.postJson(url, formData, headers);
    if (!result || !isMaventaInvoice(result)) throw new Error("Failed to send invoice or response format is incorrect");

    return result;
  }
}
