'use server';
import { db } from '@/lib/db';
import { auth } from '@clerk/nextjs/server';
import { revalidatePath } from 'next/cache';

interface TransactionData {
  description: string;
  amount: number;
}

interface TransactionResponse {
  data?: TransactionData;
  error?: string;
}

export default async function addTransaction(
  formData: FormData
): Promise<TransactionResponse> {
  const descriptionValue = formData.get('description');
  const amountValue = formData.get('amount');

  // Check for input values
  if (!descriptionValue || descriptionValue === '' || !amountValue) {
    return { error: 'Text or amount is missing' };
  }

  const description: string = descriptionValue.toString(); // Ensure text is a string
  const amount: number = parseFloat(amountValue.toString()); // Parse amount as number

  // Get logged in user
  const { userId } = auth();

  // Check for user
  if (!userId) {
    return { error: 'User not found' };
  }

  try {
    const transactionData: TransactionData = await db.transaction.create({
      data: {
        description,
        amount,
        userId,
      },
    });

    revalidatePath('/');

    return { data: transactionData };
  } catch (error) {
    return { error: 'Transaction not added' };
  }
}
