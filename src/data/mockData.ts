import type { Budget, Transaction } from "../types";

export const MOCK_BUDGETS: Budget[] = [
  { id: "b1", category: "Food", limit: 600 },
  { id: "b2", category: "Housing", limit: 2000 },
  { id: "b3", category: "Transport", limit: 400 },
  { id: "b4", category: "Utilities", limit: 250 },
  { id: "b5", category: "Entertainment", limit: 300 },
];

const generateTransactions = (): Transaction[] => {
  const transactions: Transaction[] = [];
  const today = new Date();
  const day = today.getDay();

  for (let i = 0; i < 9; i++) {
    const targetMonth = new Date(today.getFullYear(), today.getMonth() - i, 1);
    const month = targetMonth.getMonth();
    const year = targetMonth.getFullYear();
    const currentMonth = i === 0;

    // Simulate fixed expenses
    transactions.push({
      id: crypto.randomUUID(),
      date: new Date(year, month, 1),
      amount: 4500,
      description: "Salary",
      category: "Income",
    });
    transactions.push({
      id: crypto.randomUUID(),
      date: new Date(year, month, 1),
      amount: Math.random() * 2000,
      description: "Side Jobs",
      category: "Income",
    });
    transactions.push({
      id: crypto.randomUUID(),
      date: new Date(year, month, 1),
      amount: -1700,
      description: "Apartment Rent",
      category: "Housing",
    });

    if (!(i === 0 && day < 15)) {
      transactions.push({
        id: crypto.randomUUID(),
        date: new Date(year, month, 15),
        amount: -(150 + Math.floor(Math.random() * 50)),
        description: "Electricity & Water",
        category: "Utilities",
      });
      // Push to over budget
      transactions.push({
        id: crypto.randomUUID(),
        date: new Date(year, month, 19),
        amount: -(300 + Math.random() * 20),
        description: "Date",
        category: "Entertainment",
      });
    }

    // Simulate variable expenses
    for (let j = 0; j < 12; j++) {
      const randomDay =
        Math.floor(Math.random() * (currentMonth ? day : 28)) + 1;
      const isWeekend = new Date(year, month, randomDay).getDay() % 6 === 0;

      if (Math.random() < 0.4) {
        transactions.push({
          id: crypto.randomUUID(),
          date: new Date(year, month, randomDay),
          amount: -(10 + Math.random() * 10),
          description: "Subway",
          category: "Transport",
        });
      }

      // Chance of a massive unexpected expense
      if (j == 0 && Math.random() < 0.4) {
        transactions.push({
          id: crypto.randomUUID(),
          date: new Date(year, month, randomDay),
          amount: -(1000 + Math.random() * 2000),
          description: "Medical Bills",
          category: "Other",
        });
      }

      if (j % 3 === 0) {
        transactions.push({
          id: crypto.randomUUID(),
          date: new Date(year, month, randomDay),
          amount: -(60 + Math.random() * 40),
          description: "Groceries",
          category: "Food",
        });
      }

      if (isWeekend && j % 2 === 0) {
        transactions.push({
          id: crypto.randomUUID(),
          date: new Date(year, month, randomDay),
          amount: -(50 + Math.random() * 50),
          description: "Restaurant / Movie",
          category: "Entertainment",
        });
      }
    }
  }
  return transactions.sort((a, b) => b.date.getTime() - a.date.getTime());
};

export const MOCK_TRANSACTIONS = generateTransactions();
