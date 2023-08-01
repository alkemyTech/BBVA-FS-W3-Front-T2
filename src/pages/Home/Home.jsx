import { Alert, Box, Grid, Paper, Skeleton, Typography } from "@mui/material";
import { useState, useEffect } from "react";
import { getBalance } from "../../services/accountService";
import SimpleSlider from "../../components/SimpleSlider/SimpleSlider";
import AccountDetail from "../../components/AccountDetail/AccountDetail";
import CustomDataGrid from "../../components/CustomDataGrid/CustomDataGrid";
import FixedTermDataGrid from "../../components/FixedTermDataGrid/FixedTermDataGrid";
import CustomPieChart from "../../components/CustomPieChart/CustomPieChart";
import Loader from "../../components/Loader/Loader";

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
  const fixedTermsTitle = (
    <Typography variant="h6" component="h3" marginTop="1rem">
      <b>Tus inversiones</b>
    </Typography>
  );
  const categoryNamesES = {
    income: "Ingresos",
    deposit: "Depósitos",
    payment: "Pagos",
  };

  useEffect(() => {
    const fetchBalance = async () => {
      try {
        const response = await getBalance();
        setBalance(response.data);
        setFixedTerms(response.data.fixedTerms);
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

  const calculateCategoryTotal = (transactions) => {
    const categoryTotals = {
      income: 0,
      deposit: 0,
      payment: 0,
    };

    transactions.forEach((transaction) => {
      switch (transaction.name) {
        case "INCOME":
          categoryTotals.income += parseFloat(transaction.amount);
          break;
        case "DEPOSIT":
          categoryTotals.deposit += parseFloat(transaction.amount);
          break;
        case "PAYMENT":
          categoryTotals.payment += parseFloat(transaction.amount);
          break;
        default:
          break;
      }
    });

    const categoryTotalsArray = Object.keys(categoryTotals).map((category) => ({
      name: categoryNamesES[category],
      value: categoryTotals[category],
    }));

    return categoryTotalsArray;
  };

  if (error) {
    return <Alert severity="error">Error al cargar el balance</Alert>;
  }

  if (!balance) {
    return <Loader />;
  }

  const { accountArs, accountUsd } = balance;
  const hasAccountArs = accountArs !== null;
  const hasAccountUsd = accountUsd !== null;
  const arsCategoryTotals = calculateCategoryTotal(arsTransactions);
  const usdCategoryTotals = calculateCategoryTotal(usdTransactions);

  return (
    <>
      <SimpleSlider>
        {accountArs && (
          <>
            <Paper>
              <Grid container display="flex" alignItems="center">
                <Grid item xs={12} md={6}>
                  <AccountDetail
                    account={accountArs}
                    text="Tu dinero en pesos"
                  />
                </Grid>
                <Grid item xs={12} md={6}>
                  <CustomPieChart categoryTotals={arsCategoryTotals} />
                </Grid>
              </Grid>
            </Paper>
            <>
              {movementsTitle}
              <CustomDataGrid transactions={arsTransactions} />
            </>
            {fixedTermsTitle}
            <FixedTermDataGrid fixedTerms={fixedTerms} />
          </>
        )}
        {accountUsd && (
          <>
            <Paper>
              <Grid container display="flex" alignItems="center">
                <Grid item xs={12} sm={6}>
                  <AccountDetail
                    account={accountUsd}
                    text="Tu dinero en dólares"
                  />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <CustomPieChart categoryTotals={usdCategoryTotals} />
                </Grid>
              </Grid>
            </Paper>
            <>
              {movementsTitle}
              <CustomDataGrid transactions={usdTransactions} />
            </>
          </>
        )}
      </SimpleSlider>
      {!hasAccountArs && !hasAccountUsd && (
        <Alert severity="info">No tenés cuentas activas</Alert>
      )}
    </>
  );
}
