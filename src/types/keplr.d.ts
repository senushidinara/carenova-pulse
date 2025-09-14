import type { Keplr } from "@keplr-wallet/types";

declare global {
  interface Window {
    keplr?: Keplr;
    getOfflineSigner?: (chainId: string) => unknown;
    getOfflineSignerAuto?: (chainId: string) => Promise<unknown>;
  }
}

export {};
