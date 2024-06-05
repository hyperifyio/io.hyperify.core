// import { sendInvoiceToMyCompany } from './maventa';
import { listInvoices } from './maventa';

describe('Maventa Integration Tests', () => {

  // test('Send Invoice to My Company', async () => {
  //   try {
  //     const sentInvoice = await sendInvoiceToMyCompany();
  //     expect(sentInvoice).toBeDefined(); 
  //     console.log('Sent Invoice to My Company:', sentInvoice);
  //   } catch (error) {
  //     console.error('Error sending invoice to my company:', error);
  //     throw error;
  //   }
  // });

  test('List Invoices', async () => {
    try {
      const invoices = await listInvoices();
      expect(Array.isArray(invoices)).toBe(true);
      console.log('Listing invoices:', invoices);
    } catch (error) {
      console.error('Error listing invoices:', error);
      throw error;
    }
  });
});
