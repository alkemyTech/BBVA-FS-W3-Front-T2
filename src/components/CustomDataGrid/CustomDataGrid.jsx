import { DataGrid, esES } from "@mui/x-data-grid";
import Moment from "moment";
import "./styles.css";

const CustomDataGrid = ({ transactions }) => {
  const conceptNames = {
    income: "Ingreso",
    deposit: "Depósito",
    payment: "Pago",
  };

  const getConceptColorClass = (concept) => {
    switch (concept) {
      case "income":
      case "deposit":
        return "green-text";
      case "payment":
        return "red-text";
      default:
        return "black-text";
    }
  };

  const formattedTransactions = transactions.map((transaction) => {
    const name = transaction.name || "";
    const concept = name.trim().toLowerCase();
    const conceptColorClass = getConceptColorClass(concept);

    return {
      ...transaction,
      date: Moment(transaction.creationDate.toString()).format("DD-MM-YYYY"),
      amount: transaction.amount.toLocaleString("es-AR", {
        style: "currency",
        currency: "ARS",
      }),
      name: conceptNames[concept] || name,
      conceptColorClass: conceptColorClass,
    };
  });

  const hasData = formattedTransactions.length > 0;

  const columns = [
    {
      field: "date",
      headerName: "Fecha",
      width: 150,
      renderHeader: (params) => <strong>{params.colDef.headerName}</strong>,
    },
    {
      field: "description",
      headerName: "Descripción",
      width: 400,
      renderHeader: (params) => <strong>{params.colDef.headerName}</strong>,
    },
    {
      field: "amount",
      headerName: "Monto",
      width: 150,
      renderHeader: (params) => <strong>{params.colDef.headerName}</strong>,
      renderCell: (params) => {
        const conceptColorClass = params.row.conceptColorClass || "black-text";
        const value = params.value || "";
        return (
          <span className={conceptColorClass}>
            {value.toLocaleString("es-AR", {
              style: "currency",
              currency: "ARS",
            })}
          </span>
        );
      },
    },
    {
      field: "name",
      headerName: "Concepto",
      width: 100,
      renderHeader: (params) => <strong>{params.colDef.headerName}</strong>,
    },
  ];

  return (
    <div style={{ height: 400, width: "100%" }}>
      <DataGrid
        sx={{ backgroundColor: "#fff", "& .MuiDataGrid-row:hover": {
          backgroundColor: "inherit" 
        } }}
        rows={formattedTransactions}
        columns={columns}
        localeText={{
          ...esES.components.MuiDataGrid.defaultProps.localeText,
          noRowsLabel: "No hay transacciones disponibles.",
        }}
        pageSizeOptions={hasData ? [5, 10, 100] : []} // Mostrar solo si hay datos
        pagination={hasData} // Ocultar la paginación si no hay datos
        showScrollbar={hasData ? 'auto' : 'none'} // Ocultar el texto "0-0 of 0" si no hay datos
        disableColumnMenu
        disableColumnFilter
        disableColumnSelector
        disableRowSelectionOnClick
      />
    </div>
  );
};

export default CustomDataGrid;
