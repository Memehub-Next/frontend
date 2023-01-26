export class Environment {
  static isProd = process.env.NEXT_PUBLIC_ENV === "production";
  static isStaging = process.env.NEXT_PUBLIC_ENV === "staging";
  static isDev = process.env.NEXT_PUBLIC_ENV === "development";
  static isLocal = process.env.NEXT_PUBLIC_ENV === "local";
  static port = parseInt(process.env.NEXT_PUBLIC_PORT);

  static isServer() {
    return typeof window === "undefined";
  }

  static isBrowser() {
    return !Environment.isServer();
  }
}
