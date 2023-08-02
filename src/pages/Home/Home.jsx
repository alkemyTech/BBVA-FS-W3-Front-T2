import {
  Alert,
  Box,
  Button,
  Divider,
  Grid,
  List,
  ListItem,
  ListItemText,
  Paper,
  Skeleton,
  Typography,
} from "@mui/material";
import { styled } from "@mui/material/styles";
import SavingsIcon from "@mui/icons-material/Savings";

import { useState, useEffect } from "react";
import { getBalance } from "../../services/accountService";
import SimpleSlider from "../../components/SimpleSlider/SimpleSlider";
import AccountDetail from "../../components/AccountDetail/AccountDetail";
import CustomDataGrid from "../../components/CustomDataGrid/CustomDataGrid";
import CustomPieChart from "../../components/CustomPieChart/CustomPieChart";
import Loader from "../../components/Loader/Loader";
import FixedTermCard from "../../components/FixedTermCard/FixedTermCard";
import { useNavigate } from "react-router-dom";
import { Savings } from "@mui/icons-material";

export default function Home() {
  const [balance, setBalance] = useState(null);
  const [arsTransactions, setArsTransactions] = useState([]);
  const [usdTransactions, setUsdTransactions] = useState([]);
  const [fixedTerms, setFixedTerms] = useState([]);
  const [error, setError] = useState(null);
  const navigate = useNavigate();
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

  const handleClick = () => {
    navigate("/plazo-fijo");
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
          </>
        )}
        {accountUsd && (
          <>
            <Paper>
              <Grid container display="flex" alignItems="center">
                <Grid item xs={12} md={6}>
                  <AccountDetail
                    account={accountUsd}
                    text="Tu dinero en dólares"
                  />
                </Grid>
                <Grid item xs={12} md={6}>
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
      {fixedTermsTitle}
      <Box sx={{ flexGrow: 1 }}>
        <Grid container spacing={2}>
          {fixedTerms.length > 0 ? (
            fixedTerms.map((fixedTerm, index) => (
              <FixedTermCard fixedTerm={fixedTerm} key={index} />
            ))
          ) : (
            <Grid item xs={12}>
              <Paper
                sx={{
                  padding: "1rem",
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                }}
              >
                <Savings
                  color="primary"
                  fontSize="large"
                  style={{ marginBottom: "1rem" }}
                />{" "}
                <Typography
                  variant="subtitle1"
                  textAlign="center"
                  color="primary.light"
                >
                  <b>No disponés de plazos fijos</b>
                </Typography>
                <Button
                  onClick={handleClick}
                  variant="outlined"
                  color="primary"
                  style={{ marginTop: "1rem", fontWeight: "bold" }}
                >
                  Simular plazo fijo
                </Button>
              </Paper>
            </Grid>
          )}
        </Grid>
      </Box>
      {!hasAccountArs && !hasAccountUsd && (
        <Alert severity="info">No tenés cuentas activas</Alert>
      )}
    </>
  );
}
