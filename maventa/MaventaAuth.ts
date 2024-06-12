import { HttpService } from '../HttpService';
import { MaventaConfig as config } from './MaventaConfig';
import { MaventaTokenResponse } from './types/MaventaTokenResponse';

export async function getAccessToken(): Promise<string> {
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
