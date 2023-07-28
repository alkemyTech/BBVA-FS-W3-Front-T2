import { Alert, Box, Skeleton, Typography } from "@mui/material";
import { useState, useEffect } from "react";
import { getBalance } from "../../services/accountService";
import SimpleSlider from "../../components/SimpleSlider/SimpleSlider";
import AccountDetail from "../../components/AccountDetail/AccountDetail";
import CustomDataGrid from "../../components/CustomDataGrid/CustomDataGrid";

export default function Home() {
  const [balance, setBalance] = useState(null);
  const [arsTransactions, setArsTransactions] = useState([]);
  const [usdTransactions, setUsdTransactions] = useState([]);
  const [fixedTerms, setFixedTerms] = useState([]);
  const [error, setError] = useState(null);
  const movementsTitle = (
    <Typography variant="h6" component="h3" marginTop="1rem">
      <b>Tus movimientos</b>
    </Typography>
  );

  useEffect(() => {
    const fetchBalance = async () => {
      try {
        const response = await getBalance();
        setBalance(response.data);
        setFixedTerms(response.data.fixedTerms)
        if (response.data.history.length > 0) {
          const arsHistory = response.data.history.find(
            (history) => history.currency === "ARS"
          );
          const usdHistory = response.data.history.find(
            (history) => history.currency === "USD"
          );

          arsHistory
            ? setArsTransactions(arsHistory.transactions)
            : setArsTransactions([]);

          usdHistory
            ? setUsdTransactions(usdHistory.transactions)
            : setUsdTransactions([]);
        }
      } catch (error) {
        setError(error);
      }
    };
    fetchBalance();
  }, []);

  if (error) {
    return <Alert severity="error">Error al cargar el balance</Alert>;
  }

  if (!balance) {
    return <Skeleton variant="rectangular" height={200} />;
  }

  const { accountArs, accountUsd } = balance;
  const hasARSTransactions = arsTransactions.length > 0;
  const hasUSDTransactions = usdTransactions.length > 0;

  return (
    <>
      <SimpleSlider>
        {accountArs && (
          <Box>
            <AccountDetail account={accountArs} text="Tu dinero en pesos" />
            {hasARSTransactions && (
              <>
                {movementsTitle}
                <CustomDataGrid transactions={arsTransactions} />
              </>
            )}
          </Box>
        )}
        {accountUsd && (
          <Box>
            <AccountDetail account={accountUsd} text="Tu dinero en dólares" />
            {hasUSDTransactions && (
              <>
                {movementsTitle}
                <CustomDataGrid transactions={usdTransactions} />
              </>
            )}
          </Box>
        )}
      </SimpleSlider>
      {!hasARSTransactions && !hasUSDTransactions && (
        <Alert severity="info">No tenés cuentas activas</Alert>
      )}
    </>
  );
}
