import { MaventaAction } from "./MaventaAction";
import { MaventaRecipient } from "./MaventaRecipient";
import { MaventaSender } from "./MaventaSender";


interface MaventaInvoice {
  id: string;
  status: string;
  reference: string | null;
  number: string;
  sender: MaventaSender;
  recipient: MaventaRecipient;
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
  files: Array<File>;
  actions: Array<MaventaAction>;
  revision: Record<string, unknown>;
}

export { MaventaInvoice };