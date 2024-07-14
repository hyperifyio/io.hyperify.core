// MaventaService.system.test.ts

import { ProcessUtils } from "../ProcessUtils";
ProcessUtils.initEnvFromDefaultFiles();

import { MaventaServiceImpl } from './MaventaServiceImpl';
import { LogLevel } from "../types/LogLevel";
import { RequestClientImpl } from "../RequestClientImpl";
import { HttpService } from "../HttpService";
import { HgNode } from '../../node/HgNode';
import { DEFAULT_MAVENTA_BASE_URL_TEST, DEFAULT_MAVENTA_SCOPE } from "./maventa-constants";
import { isArray } from "../types/Array";

const MAVENTA_BASE_URL = DEFAULT_MAVENTA_BASE_URL_TEST;
const CLIENT_ID = process.env.CLIENT_ID ?? '';
const CLIENT_SECRET = process.env.CLIENT_SECRET ?? '';
const SCOPE = DEFAULT_MAVENTA_SCOPE;
const VENDOR_API_KEY = process.env.VENDOR_API_KEY ?? '';

RequestClientImpl.setLogLevel(LogLevel.NONE);
HttpService.setLogLevel(LogLevel.NONE);

console.log('MaventaService system tests loaded');

(CLIENT_ID && CLIENT_SECRET && VENDOR_API_KEY ? describe : describe.skip)('system', () => {

    describe('MaventaServiceImpl', () => {
        let service: MaventaServiceImpl;

        beforeAll(() => {
            HgNode.initialize();
        });

        beforeEach(() => {
            service = MaventaServiceImpl.create(
                CLIENT_ID,
                CLIENT_SECRET,
                VENDOR_API_KEY,
                SCOPE,
                MAVENTA_BASE_URL,
            );
        });

        describe('#listInvoices', () => {
            it('should fetch real invoices from the Maventa API', async () => {
                const invoices = await service.listInvoices();
                expect(isArray(invoices)).toBe(true);
                expect(invoices.length).toBeGreaterThan(0);
                expect(invoices[0]).toHaveProperty('id');
                expect(invoices[0]).toHaveProperty('status');
            });
        });

    });

});
