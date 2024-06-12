import { ProcessUtils } from '../ProcessUtils';

ProcessUtils.initEnvFromDefaultFiles();

const isTesting = process.env.IS_TESTING === 'true';

const MaventaConfig = {
  baseUrl: isTesting ? 'https://ax-stage.maventa.com' : 'https://ax.maventa.com',
  clientId: process.env.CLIENT_ID!,
  clientSecret: process.env.CLIENT_SECRET!,
  scope: process.env.SCOPE!,
  vendorApiKey: process.env.VENDOR_API_KEY!,
  companyEDI: process.env.COMPANY_EDI!,
};

export { MaventaConfig };
