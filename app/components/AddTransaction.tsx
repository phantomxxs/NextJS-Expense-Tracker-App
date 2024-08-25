'use client';

import addTransaction from '@actions/addTransaction';
import { useRef } from 'react';
import { toast } from 'react-toastify';


const AddTransaction = () => {
  const transactionFormRef = useRef<HTMLFormElement>(null);
  const clientAction = async (formData: FormData) => {
    const { data, error } = await addTransaction(formData);

    if (error) {
      toast.error(error);
    } else {
      toast.success('Transaction added successfully');
      transactionFormRef.current?.reset();
    }
  };
  return (
    <>
      <h3>Add Transaction</h3>
      <form action={clientAction} ref={transactionFormRef}>
        <div className='form-control'>
          <label htmlFor='description'>Description</label>
          <input
            name='description'
            type='text'
            id='description'
            placeholder='Enter description...'
          />
        </div>
        <div className='form-control'>
          <label htmlFor='amount'>
            Amount <br />
            ("negative - expense, positive - income")
          </label>
          <input
            name='amount'
            type='number'
            id='amount'
            placeholder='Enter amount...'
            step={0.01}
          />
        </div>
        <button className='btn'>Add Transaction</button>
      </form>
    </>
  );
};

export default AddTransaction;
