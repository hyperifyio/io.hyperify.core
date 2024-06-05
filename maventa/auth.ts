import https from 'https';
import querystring from 'querystring';
import config from './config';

interface TokenResponse {
  access_token: string;
  token_type: string;
  expires_in: number;
  scope: string;
}

export async function getAccessToken(): Promise<string> {
  const postData = querystring.stringify({
    grant_type: 'client_credentials',
    client_id: config.clientId,
    client_secret: config.clientSecret,
    scope: config.scope,
    vendor_api_key: config.vendorApiKey,
  });

  const options = {
    hostname: config.baseUrl,
    path: '/oauth2/token',
    method: 'POST',
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded',
      'Content-Length': postData.length,
    },
  };

  return new Promise<string>((resolve, reject) => {
    const req = https.request(options, (res) => {
      let data = '';

      res.on('data', (chunk) => {
        data += chunk;
      });

      res.on('end', () => {
        const result: TokenResponse = JSON.parse(data);
        resolve(result.access_token);
      });
    });

    req.on('error', (error) => {
      reject(error);
    });

    req.write(postData);
    req.end();
  });
}
