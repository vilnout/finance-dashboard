import { memo } from "react";
import {
  Area,
  AreaChart,
  CartesianGrid,
  Legend,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";
import type { Currency } from "../../types";
import {
  formatMoney,
  type GroupedTransactions,
} from "../../utils/transactions";
import { currencyConfig } from "../transaction/currencyConfig";

type TrendChartProps = {
  data: GroupedTransactions[];
  currency: Currency;
};

export const TrendChart = memo(({ data, currency }: TrendChartProps) => {
  const hasData = data && data.length > 0;
  const incomeColor = "#22c55e";
  const expenseColor = "#dc2626";
  const currencySymbol = currencyConfig[currency].symbol;
  const itemSorter = (item) => {
    if (item.dataKey === "income") return -1;
    if (item.dataKey === "expenses") return 1;
    return 0;
  };

  const chartData: GroupedTransactions[] = hasData
    ? data
    : [{ date: "", balance: 0, income: 0, expenses: 0 }];
  return (
    <div className="relative h-[400px] rounded-lg border border-slate-800">
      <h3 className="p-3 text-lg font-semibold">Cash Flow Trend</h3>
      <ResponsiveContainer width="99%" height="80%">
        <AreaChart data={chartData}>
          <defs>
            <linearGradient id="income" x1="0" y1="0" x2="0" y2="1">
              <stop offset="5%" stopColor={incomeColor} stopOpacity={0.3} />
              <stop offset="95%" stopColor={incomeColor} stopOpacity={0} />
            </linearGradient>
            <linearGradient id="expenses" x1="0" y1="0" x2="0" y2="1">
              <stop offset="5%" stopColor={expenseColor} stopOpacity={0.5} />
              <stop offset="95%" stopColor={expenseColor} stopOpacity={0} />
            </linearGradient>
          </defs>
          <CartesianGrid
            strokeDasharray="3 3"
            stroke="#1e293b"
            vertical={false}
          />
          <YAxis
            stroke="#64748b"
            fontSize={12}
            tickLine={false}
            axisLine={false}
            tickFormatter={(value) => `${currencySymbol}${value}`}
          />
          <XAxis
            dataKey="date"
            stroke="#64748b"
            fontSize={12}
            tickLine={false}
            axisLine={false}
          />
          <Tooltip
            contentStyle={{
              backgroundColor: "#0f172a",
              border: "1px solid #1e29eb",
              borderRadius: "8px",
            }}
            formatter={(value, name) => {
              let color: string;
              let fValue;
              if (name === "income") {
                color = incomeColor;
              } else if (name == "expenses") {
                color = expenseColor;
              } else {
                color = "#3b82f6";
              }
              if (typeof value === "number") {
                fValue = formatMoney(value, currency);
              } else {
                fValue = value;
              }
              return [fValue, name, color];
            }}
            itemSorter={itemSorter}
          />
          <Legend
            verticalAlign="top"
            align="center"
            height={36}
            iconType="circle"
            wrapperStyle={{
              fontSize: "12px",
              color: "#94a3b8",
            }}
            itemSorter={itemSorter}
          />

          {hasData ? (
            <>
              <Area
                type="monotone"
                dataKey="expenses"
                name="Expenses"
                stroke={expenseColor}
                strokeWidth={2}
                fillOpacity={1}
                fill="url(#expenses)"
              />
              <Area
                type="monotone"
                dataKey="income"
                name="Income"
                stroke={incomeColor}
                strokeWidth={2}
                fillOpacity={1}
                fill="url(#income)"
              />
            </>
          ) : (
            <text
              x="50%"
              y="50%"
              dominantBaseline="middle"
              textAnchor="middle"
              fill="#94a3b8"
              fontSize={16}
            >
              No data to display
            </text>
          )}
        </AreaChart>
      </ResponsiveContainer>
    </div>
  );
});
