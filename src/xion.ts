import * as ethers from "ethers";

const XION_RPC: string = (import.meta as any).env?.VITE_XION_RPC || "https://rpc.xion-testnet-2.burnt.com:443";
const CONTRACT_ADDRESS: string | undefined = (import.meta as any).env?.VITE_XION_CONTRACT_ADDRESS;

const ABI = [
  "function setRecord(string _record) public",
  "function getRecord() public view returns (string)"
];

let provider: ethers.BrowserProvider | null = null;
let signer: ethers.Signer | null = null;
let contract: ethers.Contract | null = null;

function requireAddress(): string {
  if (!CONTRACT_ADDRESS || CONTRACT_ADDRESS.trim().length === 0) {
    throw new Error("VITE_XION_CONTRACT_ADDRESS is not set. Please configure it in your environment.");
  }
  return CONTRACT_ADDRESS;
}

export async function connectWallet(): Promise<string> {
  const eth = (window as any).ethereum;
  if (!eth) {
    throw new Error("Please install MetaMask to continue.");
  }
  provider = new ethers.BrowserProvider(eth);
  await provider.send("eth_requestAccounts", []);
  signer = await provider.getSigner();
  const address = await signer.getAddress();
  contract = new ethers.Contract(requireAddress(), ABI, signer);
  return address;
}

export async function readRecord(): Promise<string> {
  if (!contract) {
    const roProvider = new ethers.JsonRpcProvider(XION_RPC);
    const roContract = new ethers.Contract(requireAddress(), ABI, roProvider);
    return await roContract.getRecord();
  }
  return await contract.getRecord();
}

export async function writeRecord(newRecord: string): Promise<string> {
  if (!contract) {
    throw new Error("Connect wallet first");
  }
  const tx = await contract.setRecord(newRecord);
  await tx.wait();
  return "Record updated";
}
