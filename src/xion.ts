import { SigningStargateClient, StargateClient, assertIsDeliverTxSuccess } from "@cosmjs/stargate";
import type { OfflineSigner } from "@cosmjs/proto-signing";
import type { ChainInfo, Keplr } from "@keplr-wallet/types";

const CHAIN_ID = "xion-testnet-2";
const RPC_URL: string = (import.meta as any).env?.VITE_XION_RPC || "https://rpc.xion-testnet-2.burnt.com:443";
const REST_URL: string = (import.meta as any).env?.VITE_XION_REST || "https://api.xion-testnet-2.burnt.com";
const BECH32_PREFIX = "xion";
const MIN_DENOM = "uxion";
const DISPLAY_DENOM = "XION";
const DECIMALS = 6;

let signingClient: SigningStargateClient | null = null;
let currentAddress: string | null = null;

function formatAmount(minAmount: string): string {
  const n = Number(minAmount) / 10 ** DECIMALS;
  return `${n.toLocaleString(undefined, { maximumFractionDigits: DECIMALS })} ${DISPLAY_DENOM}`;
}

async function suggestChain(keplr: Keplr): Promise<void> {
  const chainInfo: ChainInfo = {
    chainId: CHAIN_ID,
    chainName: "XION Testnet-2",
    rpc: RPC_URL,
    rest: REST_URL,
    bip44: { coinType: 118 },
    bech32Config: {
      bech32PrefixAccAddr: BECH32_PREFIX,
      bech32PrefixAccPub: `${BECH32_PREFIX}pub`,
      bech32PrefixValAddr: `${BECH32_PREFIX}valoper`,
      bech32PrefixValPub: `${BECH32_PREFIX}valoperpub`,
      bech32PrefixConsAddr: `${BECH32_PREFIX}valcons`,
      bech32PrefixConsPub: `${BECH32_PREFIX}valconspub`,
    },
    currencies: [
      {
        coinDenom: DISPLAY_DENOM,
        coinMinimalDenom: MIN_DENOM,
        coinDecimals: DECIMALS,
      },
    ],
    feeCurrencies: [
      {
        coinDenom: DISPLAY_DENOM,
        coinMinimalDenom: MIN_DENOM,
        coinDecimals: DECIMALS,
        gasPriceStep: { low: 0.01, average: 0.025, high: 0.04 },
      },
    ],
    stakeCurrency: {
      coinDenom: DISPLAY_DENOM,
      coinMinimalDenom: MIN_DENOM,
      coinDecimals: DECIMALS,
    },
    features: ["stargate"],
  };

  // Only available on desktop extension
  // @ts-expect-error experimentalSuggestChain exists on Keplr extension
  if (keplr.experimentalSuggestChain) {
    // @ts-ignore
    await keplr.experimentalSuggestChain(chainInfo);
  }
}

export async function connectWallet(): Promise<string> {
  const w = window as any;
  const keplr: Keplr | undefined = w.keplr;
  if (!keplr) {
    throw new Error("Please install Keplr extension to continue.");
  }

  await suggestChain(keplr);
  await keplr.enable(CHAIN_ID);

  const offlineSigner: OfflineSigner = (w.getOfflineSignerAuto
    ? await w.getOfflineSignerAuto(CHAIN_ID)
    : w.getOfflineSigner(CHAIN_ID)) as OfflineSigner;

  const accounts = await offlineSigner.getAccounts();
  currentAddress = accounts[0].address;
  signingClient = await SigningStargateClient.connectWithSigner(RPC_URL, offlineSigner);
  return currentAddress;
}

export async function getBalance(address: string): Promise<string> {
  const client = await StargateClient.connect(RPC_URL);
  const balances = await client.getAllBalances(address);
  const uxion = balances.find((b) => b.denom === MIN_DENOM);
  return formatAmount(uxion?.amount ?? "0");
}
