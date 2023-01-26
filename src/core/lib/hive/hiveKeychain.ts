import { CommentOperation, VoteOperation } from "@hiveio/dhive";
import { Environment } from "../../utils/environment";

export type KeychainFunctionName =
  | "requestHandshake"
  | "requestTransfer"
  | "requestVerifyKey"
  | "requestPost"
  | "requestVote"
  | "requestCustomJson"
  | "requestSignBuffer"
  | "requestAddAccountAuthority"
  | "requestRemoveAccountAuthority"
  | "requestBroadcast"
  | "requestSignedCall"
  | "requestSendToken"
  | "requestDelegation"
  | "requestWitnessVote"
  | "requestPowerUp"
  | "requestPowerDown";

export interface IKeychainResponseJSON {
  success: boolean;
  msg: string;
  canceled?: boolean;
  [key: string]: any;
}

export class HiveKeychain {
  static isInstalled() {
    return Environment.isBrowser() && window.hasOwnProperty("hive_keychain");
  }

  static async call(funcName: KeychainFunctionName, ...args: any): Promise<IKeychainResponseJSON> {
    try {
      return new Promise((resolve) =>
        window.hive_keychain[funcName](...args, (response: any) => {
          if (response.error === "user_cancel") resolve({ success: false, msg: response.error, canceled: true, ...response });
          if (response.success) resolve({ success: true, msg: response.result, ...response });
          resolve({ success: false, msg: response.message, ...response });
        })
      );
    } catch (error: any) {
      return { success: false, msg: error.message };
    }
  }
  static async requestBroadcast(...args: any) {
    return HiveKeychain.call("requestBroadcast", ...args);
  }

  static async vote(username: string, ops: VoteOperation[]) {
    return HiveKeychain.requestBroadcast(username, ops, "Posting");
  }
  static async comment(username: string, ops: CommentOperation[]) {
    return HiveKeychain.requestBroadcast(username, ops, "Posting");
  }

  static async requestSignBuffer(username: string, message: string) {
    return HiveKeychain.call("requestSignBuffer", username, message, "Posting");
  }
}
