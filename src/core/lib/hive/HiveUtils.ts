import { Authority, CreateClaimedAccountOperation, PrivateKey } from "@hiveio/dhive";
import dayjs from "dayjs";

export interface IHiveKeys {
  owner: string;
  active: string;
  posting: string;
  memo: string;
  ownerPubkey: string;
  activePubkey: string;
  postingPubkey: string;
  memoPubkey: string;
}

export const hiveKeyRoles: (keyof IHiveKeys)[] = ["owner", "active", "posting", "memo"];

export class HiveUtils {
  static genPassword() {
    const array = new Uint32Array(10);
    window.crypto.getRandomValues(array);
    return "P" + PrivateKey.fromSeed(array.toString()).toString();
  }

  static getKeys(username: string, password: string): IHiveKeys {
    const owner = PrivateKey.fromLogin(username, password, "owner").toString();
    const active = PrivateKey.fromLogin(username, password, "active").toString();
    const posting = PrivateKey.fromLogin(username, password, "posting").toString();
    const memo = PrivateKey.fromLogin(username, password, "memo").toString();
    return {
      owner,
      active,
      posting,
      memo,
      ownerPubkey: PrivateKey.from(owner).createPublic().toString(),
      activePubkey: PrivateKey.from(active).createPublic().toString(),
      postingPubkey: PrivateKey.from(posting).createPublic().toString(),
      memoPubkey: PrivateKey.from(memo).createPublic().toString(),
    };
  }

  static createClaimedAccountOperation(new_account_name: string, password: string): CreateClaimedAccountOperation {
    const keys = HiveUtils.getKeys(new_account_name, password);
    return [
      "create_claimed_account",
      {
        active: Authority.from(keys.activePubkey),
        creator: process.env.HIVE_ACCOUNT,
        extensions: [],
        json_metadata: JSON.stringify({ app: "memehub:beta" }),
        memo_key: keys.memoPubkey,
        new_account_name,
        owner: Authority.from(keys.ownerPubkey),
        posting: Authority.from(keys.postingPubkey),
      },
    ];
  }

  static isActive(createdAt: Date) {
    return dayjs(createdAt) > dayjs().subtract(7, "d");
  }
}
