import { checkUser } from "@lib/checkUser";
import Guest from "./components/Guest";
import AddTransaction from "./components/AddTransaction";
import Balance from "./components/Balance";
import IncomeExpense from "./components/IncomeExpense";
import TransactionList from "./components/TransactionList";

const HomePage = async () => {
  const user = await checkUser();
  if (!user) return <Guest />;

  return (
    <main>
      <h2>Welcome {user.firstName}</h2>
      <Balance />
      <IncomeExpense />
      <AddTransaction />
      <TransactionList />
    </main>
  );
};

export default HomePage;
