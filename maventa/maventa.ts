import https from 'https';
import { getAccessToken } from './auth';
import config from './config';
import Invoice from './types/invoice';

// Send company invoice dependencies

// import fs from 'fs';
// import FormData from 'form-data';

export async function listInvoices(): Promise<Invoice[]> {
  return new Promise((resolve, reject) => {
    try {
      getAccessToken().then(async (token) => {
        const options = {
          hostname: config.baseUrl,
          path: `/v1/invoices?`,
          method: 'GET',
          headers: {
            'Authorization': `Bearer ${token}`,
            'Accept': 'application/json',
            'User-Api-Key': config.clientSecret,
            'Company-UUID': config.clientId,
          },
        };

        const responseData: string[] = [];
        const req = https.request(options, (res) => {
          res.on('data', (chunk) => {
            responseData.push(chunk);
          });
          res.on('end', () => {
            const invoices = JSON.parse(responseData.join(''));
            resolve(invoices);
          });
        });

        req.on('error', (e) => {
          reject(e);
        });

        req.end();
      });
    } catch (error) {
      console.error('Error listing invoices:', error);
      reject(error);
    }
  });
}

// Sends invoice to configs CompanyEDI

// export async function sendInvoiceToMyCompany(): Promise<Invoice> {
//   const token = await getAccessToken();
//   const form = new FormData();
//   form.append('file', fs.createReadStream('invoice path here'), { filename: 'invoice.xml' });
//   form.append('format', 'VISMAXML60');
//   form.append('recipient_eia', config.companyEDI);

//   const options = {
//     hostname: config.baseUrl,
//     path: '/v1/invoices',
//     method: 'POST',
//     headers: {
//       ...form.getHeaders(),
//       'Authorization': `Bearer ${token}`,
//       'User-Api-Key': config.clientSecret,
//       'Company-UUID': config.clientId,
//     },
//   };

//   return new Promise((resolve, reject) => {
//     const req = https.request(options, (res) => {
//       let data = '';
//       res.on('data', (chunk) => {
//         data += chunk;
//       });
//       res.on('end', () => {
//         resolve(JSON.parse(data));
//       });
//     });

//     req.on('error', (e) => {
//       reject(e);
//     });

//     form.pipe(req);
//     form.on('error', (err) => {
//       reject(err);
//     });
//     form.on('end', () => {
//       req.end();
//     });
//   });
// }