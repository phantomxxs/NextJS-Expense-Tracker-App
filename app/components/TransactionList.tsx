
import { Transaction } from '@/types/Transaction';
import getTransactions from '../actions/getTransactions';
import TransactionItem from './TransctionItem';

const TransactionList = async () => {
  const { transactions, error } = await getTransactions();

  if (error) {
    return <div className='error'>{error}</div>;
  }
  return (
    <>
      <h3>History</h3>
      <ul className='list'>
        {transactions &&
          transactions.map((transaction: Transaction) => (
            <TransactionItem key={transaction.id} transaction={transaction} />
          ))}
      </ul>
    </>
  );
};

export default TransactionList;
