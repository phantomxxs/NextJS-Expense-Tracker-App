import { formatCurrency } from '@/lib/utils';
import getUserBalance from '@actions/getUserBalance';

const Balance = async () => {
  const { balance: userBalance } = await getUserBalance();
  return (
    <>
      <h4>Your Balance</h4>
      <h1>${formatCurrency(userBalance ?? 0)}</h1>
    </>
  );
};

export default Balance;
