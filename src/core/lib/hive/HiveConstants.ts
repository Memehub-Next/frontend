import { Environment } from "../../utils/environment";

export class HiveConstants {
  static community = Environment.isProd ? "hive-189111" : "hive-119015";
  static nodes = [
    "https://api.deathwing.me",
    "https://api.hive.blog",
    "https://anyx.io",
    "https://api.openhive.network",
    "https://api.hivekings.com",
  ];
  static communityUrl = `https://peakd.com/c/${HiveConstants.community}/created`;
  static installHiveKeychainUrl = "https://chrome.google.com/webstore/detail/hive-keychain/jcacnejopjdphbnjgfaaobbfafkihpep?hl=en";
  static installKeychainTutorialUrl = "https://youtu.be/9bGtWWVvRZk?t=118";
  static faqUrl = "https://peakd.com/about/faq";
  static hivePriceUrl = "https://min-api.cryptocompare.com/data/price?fsym=HIVE&tsyms=USD";
  static hbdPriceUrl = "https://min-api.cryptocompare.com/data/price?fsym=HBD&tsyms=USD";
  static hiveExchangeUrl = "https://bittrex.com/Market/Index?MarketName=USD-HIVE";
  static hbdExchangeUrl = "https://bittrex.com/Market/Index?MarketName=BTC-HBD";
  static json_metadata = JSON.stringify({
    tags: ["memehub", HiveConstants.community],
    app: "memehub:beta",
    format: "markdown+html",
    community: "memehub",
  });

  static makePeakdUrl(username: string, hash: string) {
    return `https://peakd.com/${HiveConstants.community}/@${username}/${hash}`;
  }
}
