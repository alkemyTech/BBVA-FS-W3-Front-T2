import React from "react";
import {
  PieChart,
  Pie,
  Cell,
  ResponsiveContainer,
  Legend,
  Tooltip,
} from "recharts";

const CustomPieChart = (props) => {
  const { categoryTotals } = props;
  const existsValues = categoryTotals.some((category) => category.value > 0);
  const dataWithValues = categoryTotals.filter((entry) => entry.value > 0);
  const colors = ["#6088F6", "#A977F3", "#BF50EA"];
  const noDataColor = "#4b4d8b";

  return (
    <ResponsiveContainer width="100%" height={200}>
      <PieChart>
        <Pie
          data={
            existsValues
              ? dataWithValues
              : [{ name: "Sin movimientos", value: 1 }]
          }
          cx="50%"
          cy="50%"
          labelLine={false}
          innerRadius={40}
          outerRadius={70}
          fill="#8884d8"
          dataKey="value"
        >
          {existsValues ? (
            dataWithValues.map((entry, index) => (
              <Cell
                key={`cell-${index}`}
                fill={colors[index % colors.length]}
              />
            ))
          ) : (
            <Cell fill={noDataColor} />
          )}
        </Pie>
        <Legend
          align="center"
          verticalAlign="bottom"
          layout="horizontal"
          iconType="circle"
        />
        {existsValues && (
          <Tooltip
            formatter={(value) =>
              value.toLocaleString("es-AR", {
                style: "currency",
                currency: "ARS",
              })
            }
            labelFormatter={(name) => (name === "Sin movimientos" ? "" : name)}
          />
        )}
      </PieChart>
    </ResponsiveContainer>
  );
};

export default CustomPieChart;
