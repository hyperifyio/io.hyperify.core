// Type Guard for MaventaInvoice
function isMaventaInvoice(data: any): data is MaventaInvoice {
  return data && typeof data === 'object' && 'id' in data && 'status' in data;
}

// Adjusting MaventaService to use type guards
import { HttpService } from '../HttpService';
import { getAccessToken } from './MaventaAuth';
import { MaventaConfig as config } from './MaventaConfig';
import { MaventaInvoice } from './types/MaventaInvoice';

export class MaventaService {
  public static async listInvoices(): Promise<MaventaInvoice[]> {
    const token = await getAccessToken();
    const headers = {
      'Authorization': `Bearer ${token}`,
      'Accept': 'application/json',
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
    const token = await getAccessToken();
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
