import {
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
  Legend,
  Tooltip,
} from "recharts";
import { useFinanceStore } from "../../store/useFinanceStore";

const COLORS = [
  "#0ea5e9",
  "#22c55e",
  "#eab308",
  "#f97316",
  "#ef4444",
  "#a855f7",
];

export const CategoryChart = () => {
  const transactions = useFinanceStore((state) => state.transactions);
  const expenses = transactions.filter((tnx) => tnx.amount < 0);
  const categoryTotals = expenses.reduce(
    (acc, curr) => {
      const category = curr.category;
      const amount = Math.abs(curr.amount);

      if (!acc[category]) {
        acc[category] = 0;
      }
      acc[category] += amount;
      return acc;
    },
    {} as Record<string, number>,
  );

  const data = Object.keys(categoryTotals)
    .map((category) => ({
      name: category,
      value: categoryTotals[category],
    }))
    .sort((a, b) => b.value - a.value);

  return (
    <div>
      <h3>Spending by Category</h3>
      <div className="h-[300px] w-full">
        <ResponsiveContainer width="100%" height="100%">
          <PieChart>
            <Pie
              data={data}
              cx="50%"
              cy="50%"
              innerRadius={60}
              outerRadius={80}
              paddingAngle={5}
              dataKey="value"
            >
              {data.map((entry, index) => (
                <Cell
                  key={`cell-${index}`}
                  fill={COLORS[index % COLORS.length]}
                  stroke="none"
                />
              ))}
            </Pie>
            <Tooltip
              formatter={(value: number) => `$${value}`}
              contentStyle={{
                backgroundColor: `#0f172a`,
                border: "1px solid #1e293b",
                borderRadius: "8px",
                color: "#fff",
              }}
              itemStyle={{ color: "#fff" }}
            />
            <Legend verticalAlign="bottom" height={36} iconType="circle" />
          </PieChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};
