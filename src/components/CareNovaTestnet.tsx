import { useEffect, useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { getBalance, pingChain } from "@/xion";

const ADDRESS = "xion1jr9cy3dy9fhyjlg35gq3hjuqjzs6j7pd90e0c0uvjj3j8y6stlusxegg20";

const CareNovaTestnet = () => {
  const [balance, setBalance] = useState<string>("");
  const [network, setNetwork] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(false);

  const refresh = async () => {
    setLoading(true);
    try {
      const [id, bal] = await Promise.all([pingChain(), getBalance(ADDRESS)]);
      setNetwork(id);
      setBalance(bal);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    refresh();
  }, []);

  return (
    <Card className="card-shadow">
      <CardHeader>
        <CardTitle>CareNova – XION Testnet (Read-only)</CardTitle>
      </CardHeader>
      <CardContent className="space-y-3 text-sm">
        <div>Network: {network || "Checking..."}</div>
        <div>Wallet Address: {ADDRESS}</div>
        <div>Balance: {balance || "Loading..."}</div>
        <Button onClick={refresh} disabled={loading} variant="secondary">
          {loading ? "Refreshing..." : "Refresh"}
        </Button>
      </CardContent>
    </Card>
  );
};

export default CareNovaTestnet;
