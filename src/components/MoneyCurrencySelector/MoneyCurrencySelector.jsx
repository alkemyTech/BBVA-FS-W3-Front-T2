import { Button, ButtonGroup, Typography } from "@mui/material";
import React from "react";

export default function MoneyCurrencySelector(props) {
  return (
    <>
      <Typography variant="caption" display="block">
        Seleccioná la moneda:
      </Typography>
      <ButtonGroup
        size="large"
        name="currency"
        variant="outlined"
      >
        <Button
          key="ARS"
          variant={props.selectedCurrency === "ARS" ? "contained" : "outlined"}
          onClick={() => props.onChange("ARS")}
        >
          ARS
        </Button>
        <Button
          key="USD"
          variant={props.selectedCurrency === "USD" ? "contained" : "outlined"}
          onClick={() => props.onChange("USD")}
        >
          USD
        </Button>
      </ButtonGroup>
    </>
  );
}
