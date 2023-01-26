declare global {
  interface Window {
    hive_keychain: any;
    dataLayer: any[];
  }
  namespace NodeJS {
    interface ProcessEnv {
      // server itself
      NEXT_PUBLIC_ENV: "local" | "development" | "staging" | "production"; // is prod only when deployed to prod
      NODE_ENV: "development" | "production"; // is prod anytime app is built

      NEXT_PUBLIC_PORT: string;
      NEXT_PUBLIC_GQL_URL: string;
      NEXT_PUBLIC_SUBSCRIPTION_URL: string;
      NEXT_PUBLIC_API_URL: string;
      HIVE_ACCOUNT: string;

      NEXT_PUBLIC_SHOPIFY_DOMAIN: string;
      NEXT_PUBLIC_SHOPIFY_STOREFRONT_API_KEY: string;
      NEXT_PUBLIC_GOOGLE_TAG_ID: string;
    }
  }
}

export {};
