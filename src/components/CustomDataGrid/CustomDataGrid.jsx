import { DataGrid, GridOverlay } from "@mui/x-data-grid";
import Moment from "moment";

const CustomDataGrid = ({ transactions }) => {
  const localeText = {
    noRowsLabel: 'No hay transacciones disponibles.',
  };
  const formattedTransactions = transactions.map((transaction) => ({
    ...transaction,
    date: Moment(transaction.creationDate.toString()).format(
      "YYYY-MM-DD HH:mm:ss"
    ),
    amount: transaction.amount.toLocaleString("es-AR", {
      style: "currency",
      currency: "ARS",
    }),
    name: transaction.name.charAt(0).toUpperCase() + transaction.name.slice(1).toLowerCase(),
  }));

  const columns = [
    { field: "id", headerName: "ID", width: 100 },
    { field: "date", headerName: "Fecha", width: 200 },
    { field: "description", headerName: "Descripción", width: 300 },
    { field: "amount", headerName: "Monto", width: 150 },
    { field: "name", headerName: "Concepto", width: 100}
  ];

  return (
    <div style={{ height: 400, width: "100%" }}>
      <DataGrid
        sx={{ backgroundColor: "#fff" }}
        rows={formattedTransactions}
        columns={columns}
        autoPageSize
        localeText={localeText}
      />
    </div>
  );
};

export default CustomDataGrid;
