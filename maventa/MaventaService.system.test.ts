import { MaventaService } from './MaventaService';
import { MaventaConfig } from './MaventaConfig';
import { HgNode } from '../../node/HgNode';

describe('MaventaService System Tests', () => {

  beforeAll(() => {
    HgNode.initialize();
    console.log('Running system tests against:', MaventaConfig.baseUrl);
  });

  it('should fetch real invoices from the Maventa API', async () => {
    const invoices = await MaventaService.listInvoices();
    console.log('Fetched invoices:', invoices);

    expect(invoices).toBeInstanceOf(Array);
    if (invoices.length > 0) {
      console.log(`Displaying details of the first invoice:`);
      console.log(`Invoice ID: ${invoices[0].id}`);
      console.log(`Invoice Status: ${invoices[0].status}`);
      console.log(`Invoice Amount: ${invoices[0].sum}`);

      expect(invoices[0]).toHaveProperty('id');
      expect(invoices[0]).toHaveProperty('status');
      expect(invoices[0].id).toBeDefined();
      expect(invoices[0].status).toBeDefined();
    } else {
      console.log('No invoices found.');
    }
  });

});
