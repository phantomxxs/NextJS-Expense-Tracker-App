'use client';
import { formatCurrency } from '@/lib/utils';
import { Transaction } from '@/types/Transaction';
import { toast } from 'react-toastify';
import deleteTransaction from '@actions/deleteTransaction';

const TransactionItem = ({ transaction }: { transaction: Transaction }) => {
  const sign = transaction.amount < 0 ? '-' : '+';

  const handleDeleteTransaction = async (transactionId: string) => {
    const confirmation = window.confirm(
      'Are you sure you want to delete this transaction?'
    );

    if (!confirmation) return;

    const { message, error } = await deleteTransaction(transactionId);

    if (error) {
      return toast.error(error);
    }

    toast.success(message);
  };

  return (
    <li className={transaction.amount < 0 ? 'minus' : 'plus'}>
      {transaction.description}{' '}
      <span>
        {sign}
        {formatCurrency(Math.abs(transaction.amount))}
      </span>
      <button
        className='delete-btn'
        onClick={() => handleDeleteTransaction(transaction.id)}
      >
        x
      </button>
    </li>
  );
};

export default TransactionItem;
