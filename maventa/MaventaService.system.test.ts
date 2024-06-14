// MaventaService.system.test.ts

import { ProcessUtils } from "../ProcessUtils";
ProcessUtils.initEnvFromDefaultFiles();

import { MaventaService } from './MaventaService';
import { LogLevel } from "../types/LogLevel";
import { RequestClientImpl } from "../RequestClientImpl";
import { HttpService } from "../HttpService";
import { HgNode } from '../../node/HgNode';
import { MaventaConfig } from './types/MaventaConfig';
import { DEFAULT_MAVENTA_BASE_URL_TEST, DEFAULT_MAVENTA_SCOPE } from "./maventa-constants";

const MAVENTA_BASE_URL = DEFAULT_MAVENTA_BASE_URL_TEST;
const CLIENT_ID = process.env.CLIENT_ID ?? '';
const CLIENT_SECRET = process.env.CLIENT_SECRET ?? '';
const SCOPE = DEFAULT_MAVENTA_SCOPE;
const VENDOR_API_KEY = process.env.VENDOR_API_KEY ?? '';
const COMPANY_EDI = process.env.COMPANY_EDI ?? '';

RequestClientImpl.setLogLevel(LogLevel.NONE);
HttpService.setLogLevel(LogLevel.NONE);

console.log('MaventaService system tests loaded');

(CLIENT_ID && CLIENT_SECRET && VENDOR_API_KEY && COMPANY_EDI ? describe : describe.skip)('system', () => {

    describe('MaventaService', () => {
        let service: MaventaService;
        let config: MaventaConfig;

        beforeAll(() => {
            HgNode.initialize();
        });

        beforeEach(() => {
            config = {
                baseUrl: MAVENTA_BASE_URL,
                clientId: CLIENT_ID,
                clientSecret: CLIENT_SECRET,
                scope: SCOPE,
                vendorApiKey: VENDOR_API_KEY,
                companyEDI: COMPANY_EDI
            };
            service = new MaventaService(config);
        });

        describe('#listInvoices', () => {
            it('should fetch real invoices from the Maventa API', async () => {
                const invoices = await service.listInvoices();
                expect(Array.isArray(invoices)).toBe(true);
                expect(invoices.length).toBeGreaterThan(0);
                expect(invoices[0]).toHaveProperty('id');
                expect(invoices[0]).toHaveProperty('status');
            });
        });
    });

});