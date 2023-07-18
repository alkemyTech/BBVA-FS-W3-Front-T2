import HomeIcon from "@mui/icons-material/Home";
import MoneyIcon from "@mui/icons-material/Money";
import CurrencyExchangeIcon from "@mui/icons-material/CurrencyExchange";
import SavingsIcon from "@mui/icons-material/Savings";

const navLinks = [
  {
    title: "Inicio",
    path: "/",
    icon: <HomeIcon />,
  },
  {
    title: "Depositar",
    path: "/depositar",
    icon: <MoneyIcon />,
  },
  {
    title: "Transferir",
    path: "/transferir",
    icon: <CurrencyExchangeIcon />,
  },
  {
    title: "Plazo Fijo",
    path: "/plazo-fijo",
    icon: <SavingsIcon />,
  },
];

export default navLinks;
