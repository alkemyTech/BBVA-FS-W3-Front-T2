import { Alert, Button, Divider, Skeleton, Typography } from "@mui/material";
import { useState, useEffect } from "react";
import { getBalance } from "../../services/accountService";
import SimpleSlider from "../../components/SimpleSlider/SimpleSlider";
import AccountDetail from "../../components/AccountDetail/AccountDetail";

export default function Home() {
  const [balance, setBalance] = useState(null);
  const [error, setError] = useState(null);
  let content = null;

  useEffect(() => {
    const fetchBalance = async () => {
      try {
        const response = await getBalance();
        setBalance(response.data);
      } catch (error) {
        setError(error);
      }
    };
    fetchBalance();
  }, []);

  if (error) { 
    content = <Alert severity="error">Error al cargar el balance</Alert>
  } else if (balance) {
    const { accountArs, accountUsd } = balance;
    if (accountArs || accountUsd) {
      const arsPaper = accountArs && <AccountDetail account={accountArs} text="Tu dinero en pesos"/>;
      const usdPaper = accountUsd && <AccountDetail account={accountUsd} text="Tu dinero en dólares"/>;
      content = (
        <SimpleSlider>
          {arsPaper}
          {usdPaper}
        </SimpleSlider>
      );
    } else {
      content = (
        <Alert severity="info" >No tenés cuentas activas</Alert>

      );
    }
  } else {
    content = <Skeleton variant="rectangular" height={200} />;
  }

  return <>{content}</>;
}
