import useDeposit, { depositProps } from '@/hooks/Deposit';
import { useAccount, useBalance } from '@starknet-react/core';
import { useEffect, useState } from 'react';

export function DepositModal(depositProps: depositProps) {
  const [amount, setAmount] = useState('0');

  const showModal = () => {
    const modal = document.getElementById('depositModal');
    if (modal instanceof HTMLDialogElement) {
      modal.showModal();
    } else {
      console.error('The modal element was not found');
    }
  };
  const closeModal = () => {
    const modal = document.getElementById('depositModal');
    if (modal instanceof HTMLDialogElement) {
      modal.close();
    }
  };

  const { address } = useAccount();

  const { isLoading: isBalanceLoading, data: bal } = useBalance({
    address,
    watch: true,
  });

  const { writeAsync, data, isPending } = useDeposit({
    ...depositProps,
    amount,
  });

  const handleDeposit = async () => {
    if (!amount) {
      console.error('No amount specified for deposit');
      return;
    }
    return writeAsync();
  };

  return (
    <>
      <button className="btn  text-xl w-1/3 " onClick={showModal}>
        Deposit
      </button>
      <dialog id="depositModal" className="modal">
        <div className="modal-box  bg-neutral">
          <div className="text-xl mb-3 text-primary">Deposit</div>

          <div className="form-control w-full ">
            <div className="flex flex-row justify-between mb-2">
              <span className="label-text text-secondary">
                Amount to deposit
              </span>
              <div className="label-text text-secondary">
                {isBalanceLoading ? (
                  <span className="loading loading-spinner text-primary"></span>
                ) : (
                  bal && (
                    <div>
                      Balance: {bal.formatted.toString().slice(0, 7)}
                      {bal.symbol}
                    </div>
                  )
                )}
              </div>
            </div>
            <input
              type="text"
              placeholder="Type here"
              className="input input-bordered w-full text-black"
              value={amount}
              onChange={(e) => setAmount(e.target.value)}
            />
          </div>
          <div className="flex justify-center">
            <button
              className="btn mt-6 w-2/3 text-lg "
              onClick={() => handleDeposit()}
            >
              {isPending ? (
                <span className="loading loading-spinner text-primary"></span>
              ) : (
                'Deposit'
              )}
            </button>
          </div>
        </div>
        <form method="dialog" className="modal-backdrop">
          <button type="button" onClick={() => closeModal()}>
            close
          </button>
        </form>
      </dialog>
    </>
  );
}
