import { Language } from "../../core/types/Language";

export interface CustomerMessageClient {

    sendInventoryItemEmail(
        lang: Language,
        email: string,
        clientId: string,
        inventoryItemId: string
    ): Promise<void>;

}
