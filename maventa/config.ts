import dotenv from 'dotenv';

dotenv.config();

const isTesting = process.env.IS_TESTING === 'true';

const config = {
  baseUrl: isTesting ? 'ax-stage.maventa.com' : 'ax.maventa.com',
  clientId: process.env.CLIENT_ID!,
  clientSecret: process.env.CLIENT_SECRET!,
  scope: process.env.SCOPE!,
  vendorApiKey: process.env.VENDOR_API_KEY!,
  companyEDI: process.env.COMPANY_EDI!,
};

export default config;
