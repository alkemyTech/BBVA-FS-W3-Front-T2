import {
  Alert,
  Box,
  Button,
  ButtonGroup,
  Skeleton,
  Typography,
} from "@mui/material";
import { useState, useEffect } from "react";
import { getBalance } from "../../services/accountService";
import SimpleSlider from "../../components/SimpleSlider/SimpleSlider";
import AccountDetail from "../../components/AccountDetail/AccountDetail";
import CustomDataGrid from "../../components/CustomDataGrid/CustomDataGrid";
import MoneyCurrencySelector from "../../components/MoneyCurrencySelector/MoneyCurrencySelector";

export default function Home() {
  const [balance, setBalance] = useState(null);
  const [arsTransactions, setArsTransactions] = useState([]);
  const [usdTransactions, setUsdTransactions] = useState([]);
  const [showMoneySelector, setShowMoneySelector] = useState(false);
  const [fixedTerms, setFixedTerms] = useState([]);
  const [selectedCurrency, setSelectedCurrency] = useState("ARS");
  const [error, setError] = useState(null);
  let content = null;

  const handleCurrencyChange = (newCurrency) => {
    setSelectedCurrency(newCurrency);
  };

  useEffect(() => {
    const fetchBalance = async () => {
      try {
        const response = await getBalance();
        setBalance(response.data);
        if (response.data.history.length > 1) {
          setArsTransactions(response.data.history[0].transactions);
          setUsdTransactions(response.data.history[1].transactions);
          setShowMoneySelector(true);
        } else if (response.data.history.length > 0) {
          if (response.data.history[0].currency === "ARS") {
            setArsTransactions(response.data.history[0].transactions);
          } else {
            setUsdTransactions(response.data.history[0].transactions);
          }
        }
        setFixedTerms(response.data.fixedTerms);
      } catch (error) {
        setError(error);
      }
    };
    fetchBalance();
  }, []);

  if (error) {
    content = <Alert severity="error">Error al cargar el balance</Alert>;
  } else if (balance) {
    const { accountArs, accountUsd } = balance;
    if (accountArs || accountUsd) {
      const arsPaper = accountArs && (
        <AccountDetail account={accountArs} text="Tu dinero en pesos" />
      );
      const usdPaper = accountUsd && (
        <AccountDetail account={accountUsd} text="Tu dinero en dólares" />
      );
      content = (
        <>
          <SimpleSlider>
            {arsPaper}
            {usdPaper}
          </SimpleSlider>
          <Typography variant="h6" component="h3" marginTop="1rem">
            <b>Tus movimientos</b>
          </Typography>
          {showMoneySelector && (
            <Box
              padding={2}
              display="flex"
              flexDirection="column"
              alignItems="center"
              sx={{ backgroundColor: "#FFF" }}
            >
              <MoneyCurrencySelector
                selectedCurrency={selectedCurrency}
                onChange={handleCurrencyChange}
              />
            </Box>
          )}
          {selectedCurrency === "ARS" && (
            <CustomDataGrid transactions={arsTransactions} />
          )}
          {selectedCurrency === "USD" && (
            <CustomDataGrid transactions={usdTransactions} />
          )}
        </>
      );
    } else {
      content = <Alert severity="info">No tenés cuentas activas</Alert>;
    }
  } else {
    content = <Skeleton variant="rectangular" height={200} />;
  }
  return <>{content}</>;
}
