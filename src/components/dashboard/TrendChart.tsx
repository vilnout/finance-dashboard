import { memo } from "react";
import {
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Area,
  AreaChart,
} from "recharts";
import type { GroupedTransactions } from "../../utils/transactions";

type TrendChartProps = {
  data: GroupedTransactions[];
};

export const TrendChart = memo(({ data }: TrendChartProps) => {
  const hasData = data && data.length > 0;

  const chartData: GroupedTransactions[] = hasData
    ? data
    : [{ date: "", balance: 0, income: 0, expenses: 0 }];
  return (
    <div className="h-[400px] rounded-lg border border-slate-800">
      <h3 className="p-3 text-lg font-semibold">Cash Flow Trend</h3>
      <ResponsiveContainer width="99%" height="80%">
        <AreaChart data={chartData}>
          <defs>
            <linearGradient id="colorAmount" x1="0" y1="0" x2="0" y2="1">
              <stop offset="5%" stopColor="#3b82f6" stopOpacity={0.3} />
              <stop offset="95%" stopColor="#3b82f6" stopOpacity={0} />
            </linearGradient>
          </defs>
          <CartesianGrid
            strokeDasharray="3 3"
            stroke="#1e293b"
            vertical={false}
          />
          <XAxis
            dataKey="date"
            stroke="#64748b"
            fontSize={12}
            tickLine={false}
            axisLine={false}
          />
          <YAxis
            stroke="#64748b"
            fontSize={12}
            tickLine={false}
            axisLine={false}
            tickFormatter={(value) => `$${value}`}
          />
          <Tooltip
            contentStyle={{
              backgroundColor: "#0f172a",
              border: "1px solid #1e29eb",
              borderRadius: "8px",
            }}
            itemStyle={{ color: "#3b82f6" }}
          />
          {hasData ? (
            <Area
              type="monotone"
              dataKey="balance"
              stroke="#3b82f6"
              strokeWidth={3}
              fillOpacity={1}
              fill="url(#colorAmount)"
            />
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
