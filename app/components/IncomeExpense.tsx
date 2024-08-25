import { formatCurrency } from "@/lib/utils";
import getIncomeExpense from "../actions/getIncomeExpense";

const IncomeExpense = async () => {
  const { data, error } = await getIncomeExpense();
  
  return (
    <div className='inc-exp-container'>
      <div>
        <h4>Income</h4>
        <p className='money plus'>${formatCurrency(data?.income ?? 0)}</p>
      </div>
      <div>
        <h4>Expense</h4>
        <p className='money minus'>${formatCurrency(data?.expense ?? 0)}</p>
      </div>
    </div>
  );
};

export default IncomeExpense;
