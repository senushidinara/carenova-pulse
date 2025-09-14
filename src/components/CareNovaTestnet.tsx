import { useEffect, useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { pingChain } from "@/xion";
import { Shield } from "lucide-react";

const CareNovaTestnet = () => {
  const [loading, setLoading] = useState<boolean>(false);

  const check = async () => {
    setLoading(true);
    try {
      await pingChain();
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    // no-op on mount
  }, []);

  return (
    <Card className="card-shadow">
      <CardHeader>
        <CardTitle>CareNova – Health Record (XION Testnet)</CardTitle>
      </CardHeader>
      <CardContent className="flex">
        <Button onClick={check} disabled={loading} variant="hero" size="xl" className="mx-auto">
          <Shield className="h-5 w-5" /> XION Testnet
        </Button>
      </CardContent>
    </Card>
  );
};

export default CareNovaTestnet;
