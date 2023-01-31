import { Account, Client } from "@hiveio/dhive";
import { HiveConstants } from "./HiveConstants";

export class DHive {
  static dhive = new Client(HiveConstants.nodes);
  static database = DHive.dhive.database;

  static getHiveConnection() {
    return new Client(HiveConstants.nodes);
  }

  static lookupAccountNames(names: string[]): Promise<(Account | null)[]> {
    return DHive.database.call("lookup_account_names", [names]);
  }

  static async acctNameExists(username: string) {
    const accounts = await DHive.lookupAccountNames([username]);
    return !!accounts.length && accounts.every((acc) => acc != null);
  }
}
