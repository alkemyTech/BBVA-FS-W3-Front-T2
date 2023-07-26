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
  }));

  const columns = [
    { field: "id", headerName: "ID", width: 100 },
    { field: "date", headerName: "Fecha", width: 200 },
    { field: "description", headerName: "Descripción", width: 300 },
    { field: "amount", headerName: "Monto", width: 150 },
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
