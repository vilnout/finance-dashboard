import { memo } from "react";
import { useFinanceStore } from "../../store/useFinanceStore";
import {
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Area,
  AreaChart,
} from "recharts";

export const TrendChart = memo(() => {
  const transactions = useFinanceStore((state) => state.transactions);
  const data = transactions.map((tnx) => ({
    name: tnx.date.toLocaleDateString("en-US", {
      month: "short",
      day: "numeric",
    }),
    amount: tnx.amount,
  }));
  return (
    <div className="h-[400px] rounded-lg border">
      <h3 className="p-3 text-lg font-semibold">Cash Flow Trend</h3>
      <ResponsiveContainer width="99%" height="80%">
        <AreaChart data={data}>
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
            dataKey="name"
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
          <Area
            type="monotone"
            dataKey="amount"
            stroke="#3b82f6"
            strokeWidth={3}
            fillOpacity={1}
            fill="url(#colorAmount)"
          />
        </AreaChart>
      </ResponsiveContainer>
    </div>
  );
});
