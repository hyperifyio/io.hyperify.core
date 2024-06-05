interface Invoice {
    id: string;
    status: string;
    reference: string | null;
    number: string;
    sender: {
      eia: string | null;
      bid: string | null;
      name: string;
      country: string;
    };
    recipient: {
      eia: string | null;
      bid: string | null;
      name: string;
      country: string;
      operator: string | null;
    };
    received_at?: string;
    created_at: string;
    date: string;
    date_due: string;
    source_format: string;
    sum: number;
    sum_tax: number;
    currency: string;
    destination: string | null;
    comment: string | null;
    files: Array<{
      id: string;
      filename: string;
      type: string;
      mimetype: string;
      href: string;
    }>;
    actions: Array<{
      type: string;
      channel: string;
      message: string | null;
      key: string | null;
      happened_at: string;
    }>;
    revision: Record<string, unknown>;
  }

  export default Invoice;