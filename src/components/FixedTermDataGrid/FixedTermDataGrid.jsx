import { DataGrid, esES } from "@mui/x-data-grid";
import Moment from "moment";

const FixedCustomDataGrid = ({ fixedTerms }) => {
  const formattedFixedTerms = fixedTerms.map((fixedTerm) => {
    return {
      ...fixedTerm,
      closingDate: Moment(fixedTerm.closingDate.toString()).format(
        "DD-MM-YYYY"
      ),
      amount: fixedTerm.amount.toLocaleString("es-AR", {
        style: "currency",
        currency: "ARS",
      }),
      interest: fixedTerm.interest.toLocaleString("es-AR", {
        style: "currency",
        currency: "ARS",
      }),
      amountWon: (fixedTerm.amount + fixedTerm.interest).toLocaleString(
        "es-AR",
        {
          style: "currency",
          currency: "ARS",
        }
      ),
    };
  });

  const columns = [
    {
      field: "closingDate",
      headerName: "Fecha de cierre",
      width: 150,
      renderHeader: (params) => <strong>{params.colDef.headerName}</strong>,
    },
    {
      field: "amount",
      headerName: "Capital",
      width: 400,
      renderHeader: (params) => <strong>{params.colDef.headerName}</strong>,
    },
    {
      field: "interest",
      headerName: "Intereses ganados",
      width: 150,
      renderHeader: (params) => <strong>{params.colDef.headerName}</strong>,
    },
    {
      field: "amountWon",
      headerName: "Monto total",
      width: 150,
      renderHeader: (params) => <strong>{params.colDef.headerName}</strong>,
    },
  ];

  return (
    <div style={{ height: 200, width: "100%" }}>
      <DataGrid
        sx={{ backgroundColor: "#fff" }}
        rows={formattedFixedTerms}
        columns={columns}
        localeText={{
          ...esES.components.MuiDataGrid.defaultProps.localeText,
          noRowsLabel: "No hay plazos fijos disponibles.",
        }}
        autoPageSize
        disableColumnMenu
        disableColumnFilter
        disableColumnSelector
        disableRowSelector
      />
    </div>
  );
};

export default FixedCustomDataGrid;
