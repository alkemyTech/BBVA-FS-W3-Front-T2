import dayjs from "dayjs";

export function getTodaysDate() {
  return dayjs().format("DD-MM-YYYY");
}

export function formatCurrencyToArs(amount){
    return amount.toLocaleString("es-AR", {
        style: "currency",
        currency: "ARS",
      })
}
