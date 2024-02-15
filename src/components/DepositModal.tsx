import useDeposit, { depositProps } from '@/hooks/Deposit';
import { useAccount, useBalance, useExplorer } from '@starknet-react/core';
import { useEffect, useState } from 'react';

const Toast = ({ message, onClose }: any) => {
  const explorer = useExplorer();

  return (
    <div className="toast toast-end mt-36">
      <div className="alert bg-neutral border-none relative  rounded-lg">
        <span className="text-white">
          {message == 'Transaction failed!' ? (
            message
          ) : (
            <div className="flex flex-row p-1 justify-center">
              <p className="text-lg mr-2">Transaction sent:</p>
              <a
                href={explorer.transaction(message)}
                target="_blank"
                rel="noopener noreferrer"
                className="text-secondary"
              >
                <svg
                  viewBox="0 0 1024 1024"
                  fill="currentColor"
                  height="2em"
                  width="2em"
                >
                  <path d="M574 665.4a8.03 8.03 0 00-11.3 0L446.5 781.6c-53.8 53.8-144.6 59.5-204 0-59.5-59.5-53.8-150.2 0-204l116.2-116.2c3.1-3.1 3.1-8.2 0-11.3l-39.8-39.8a8.03 8.03 0 00-11.3 0L191.4 526.5c-84.6 84.6-84.6 221.5 0 306s221.5 84.6 306 0l116.2-116.2c3.1-3.1 3.1-8.2 0-11.3L574 665.4zm258.6-474c-84.6-84.6-221.5-84.6-306 0L410.3 307.6a8.03 8.03 0 000 11.3l39.7 39.7c3.1 3.1 8.2 3.1 11.3 0l116.2-116.2c53.8-53.8 144.6-59.5 204 0 59.5 59.5 53.8 150.2 0 204L665.3 562.6a8.03 8.03 0 000 11.3l39.8 39.8c3.1 3.1 8.2 3.1 11.3 0l116.2-116.2c84.5-84.6 84.5-221.5 0-306.1zM610.1 372.3a8.03 8.03 0 00-11.3 0L372.3 598.7a8.03 8.03 0 000 11.3l39.6 39.6c3.1 3.1 8.2 3.1 11.3 0l226.4-226.4c3.1-3.1 3.1-8.2 0-11.3l-39.5-39.6z" />
                </svg>
              </a>
            </div>
          )}
        </span>
        <button onClick={onClose} className="absolute top-0 right-0 p-1">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-4 w-4 text-white"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M6 18L18 6M6 6l12 12"
            />
          </svg>
        </button>
      </div>
    </div>
  );
};

export function DepositModal(depositProps: depositProps) {
  const [amount, setAmount] = useState('0');
  const [transactionResponse, setTransactionResponse] = useState<any>(null);
  const [toastMessage, setToastMessage] = useState('');

  const [showToast, setShowToast] = useState(false);

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
    if (!amount || amount === '0') {
      console.error('No amount specified for deposit');
      return;
    }

    try {
      const txResponse = await writeAsync();
      setTransactionResponse(txResponse);
      setToastMessage(`${txResponse.transaction_hash}`);
      setShowToast(true);
    } catch (error) {
      console.error('Transaction failed:', error);
      setToastMessage('Transaction failed!');
      setShowToast(true);
    }
  };

  const closeToast = () => {
    setShowToast(false);
  };

  const maxDeposit = () => {
    if (bal) {
      setAmount(bal.formatted.toString());
    }
  };

  return (
    <>
      <button
        className="btn  text-xl w-1/2  bg-primary text-secondary"
        onClick={showModal}
      >
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
                    <div onClick={maxDeposit} className="hover:cursor-pointer">
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
      {showToast && <Toast message={toastMessage} onClose={closeToast} />}
    </>
  );
}
