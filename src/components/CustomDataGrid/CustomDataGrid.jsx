import { DataGrid } from '@mui/x-data-grid';
import Moment from 'moment';

const formatCurrency = (amount) => {
  return amount.toLocaleString('en-US', {
    style: 'currency',
    currency: 'USD',
  });
};

const CustomDataGrid = ({ transactions }) => {
  const formattedTransactions = transactions.map((transaction) => ({
    ...transaction,
    date: Moment(transaction.creationDate.toString()).format('YYYY-MM-DD HH:mm:ss'),
    amount: transaction.amount.toLocaleString("es-AR", {
        style: "currency",
        currency: "ARS",
      })   
  }));

  const columns = [
    { field: 'id', headerName: 'ID', width: 100 },
    { field: 'date', headerName: 'Fecha', width: 200 },
    { field: 'description', headerName: 'Descripción', width: 300 },
    { field: 'amount', headerName: 'Monto', width: 150 },
  ];

  return (
    <div style={{ height: 400, width: '100%' }}>
      <DataGrid
        sx={{ backgroundColor: '#fff' }}
        rows={formattedTransactions}
        columns={columns}
        autoPageSize
      />
    </div>
  );
};

export default CustomDataGrid;
