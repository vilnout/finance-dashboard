import MainLayout from "./components/layout/MainLayout";

function App() {
  const quickBoxesCss = "border-2 p-7 rounded-lg";
  return (
    <>
      <MainLayout>
        <div className="space-y-6">
          <h2 className="text-red-500">Dashboard</h2>
          <p>Overview of your Financial Health</p>
        </div>
        <div>
          <div className="my-4 grid grid-cols-2 gap-2 md:grid-cols-4">
            <div className={quickBoxesCss}>Total Balance</div>
            <div className={quickBoxesCss}>Income (Nov)</div>
            <div className={quickBoxesCss}>Expenses (Nov)</div>
            <div className={quickBoxesCss}>Savings Rate</div>
          </div>
          <div className="my-4 min-h-50 gap-3.5 rounded-lg border-2">
            Main Chart Area
          </div>
          <div className="grid-col1 grid gap-2 md:grid-cols-2">
            <div className="min-h-20 rounded-lg border-2">
              <span>Recent Activity</span>
            </div>
            <div className="min-h-20 rounded-lg border-2">
              <span>Spending by Category</span>
            </div>
          </div>
        </div>
      </MainLayout>
    </>
  );
}

export default App;
