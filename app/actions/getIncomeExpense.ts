"use server";
import { db } from '@/lib/db';
import { auth } from '@clerk/nextjs/server';

export default async function getIncomeExpense(): Promise<{
  data?: {
    income: number;
    expense: number;
  };
  error?: string;
}> {
  const { userId } = auth();

  if (!userId) {
    return { error: 'User not found' };
  }

  try {
    const userTransctions = await db.transaction.findMany({
      where: {
        userId,
      },
    });

    const income = userTransctions
      .filter((transaction) => transaction.amount > 0)
      .reduce((acc, transaction) => {
        return acc + transaction.amount;
      }, 0);

    const expense = userTransctions
      .filter((transaction) => transaction.amount < 0)
      .reduce((acc, transaction) => {
        return acc + transaction.amount;
      }, 0);

    return { data: { income, expense: Math.abs(expense) } };
  } catch (error) {
    return { error: 'Failed to get user income and expense' };
  }
}
