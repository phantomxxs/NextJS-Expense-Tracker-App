'use server';

import { db } from '@/lib/db';
import { auth } from '@clerk/nextjs/server';

export default async function getUserBalance(): Promise<{
  balance?: number;
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

    const balance = userTransctions.reduce((acc, transaction) => {
      return acc + transaction.amount;
    }, 0);

    return { balance };
  } catch (error) {
    return { error: 'Failed to get balance' };
  }
}
