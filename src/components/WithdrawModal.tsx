import useUserPosition from '@/hooks/UserPosition';
import {
  usePendingRequests,
  useWithdraw,
  withdrawProps,
} from '@/hooks/Withdraw';
import { useAccount, useBalance, useExplorer } from '@starknet-react/core';
import { ethers } from 'ethers';
import { useEffect, useState } from 'react';

export type withdrawModalProps = {
  shareToken: string;
  stratAddress: string;
  userBalance: string;
  isBalanceLoading: boolean;
};

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

function renderUserInfoData(userInfoData: any) {
  if (!userInfoData) return null;

  const { shares, claimed } = userInfoData;

  const handleWithdraw = async () => {};
  return (
    <div className="flex flex-row w-full">
      <div className="flex flex-col w-1/2">
        <div className="uppercase  text-sm  font-semibold text-secondary">
          Shares
        </div>
        <p className="block mt-1 text-lg  font-medium text-white">
          {`${ethers.formatEther(shares.toString()).toString()} NIM-EETH`}
        </p>
      </div>

      <button
        className="btn text-black text-xl font-bold rounded w-1/2"
        onClick={handleWithdraw}
        // disabled
      >
        Claim assets
      </button>
    </div>
  );
}

export function WithdrawModal(withdrawProps: withdrawModalProps) {
  const [amount, setAmount] = useState('0');
  const [transactionResponse, setTransactionResponse] = useState<any>(null);
  const [toastMessage, setToastMessage] = useState('');

  const [showToast, setShowToast] = useState(false);

  const showModal = () => {
    const modal = document.getElementById('withdrawModal');
    if (modal instanceof HTMLDialogElement) {
      modal.showModal();
    } else {
      console.error('The modal element was not found');
    }
  };
  const closeModal = () => {
    const modal = document.getElementById('withdrawModal');
    if (modal instanceof HTMLDialogElement) {
      modal.close();
    }
  };

  const { address } = useAccount();

  const { writeAsync, data, isPending } = useWithdraw({
    shareToken: withdrawProps.shareToken,
    stratAddress: withdrawProps.stratAddress,
    amount: amount,
  });

  const handleWithdraw = async () => {
    if (!amount) {
      console.error('No amount specified for withdrawal');
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

  const { userInfoData, isUserInfoLoading } = usePendingRequests({
    shareToken: withdrawProps.shareToken,
    stratAddress: withdrawProps.stratAddress,
    amount: amount,
  });

  const withdrawMax = () => {
    if (withdrawProps.userBalance) {
      setAmount(ethers.formatEther(withdrawProps.userBalance.toString()));
    }
  };

  return (
    <>
      <button
        className="btn  text-xl w-1/2  bg-primary text-secondary"
        onClick={showModal}
      >
        Withdraw
      </button>
      <dialog id="withdrawModal" className="modal">
        <div className="modal-box  bg-neutral">
          <div className="text-3xl mb-3 text-primary">Withdraw assets</div>
          <div className="text-lg mb-3 ">
            The withdrawal on Juice Fountain is a two-step withdrawal. You first
            have to send a withdrawal request to the protocol and only then you
            can complete the withdrawal.
          </div>
          <div className="divider divider-primary w-3/4 m-auto"></div>
          <div className="text-xl mb-3 text-primary">My pending requests</div>
          <div className="flex flex-row justify-between mb-2">
            {isUserInfoLoading ? (
              <span className="loading loading-spinner text-primary"></span>
            ) : (
              renderUserInfoData(userInfoData)
            )}
          </div>
          <div className="divider divider-primary w-3/4 m-auto"></div>
          <div className="text-xl mb-3 text-primary">New withdrawal</div>

          <div className="form-control w-full ">
            <div className="flex flex-row justify-between mb-2">
              <span className="label-text text-secondary">
                Amount to Withdraw
              </span>
              <div
                className="label-text text-secondary hover:cursor-pointer"
                onClick={withdrawMax}
              >
                {!withdrawProps.isBalanceLoading &&
                withdrawProps.userBalance ? (
                  `${ethers
                    .formatEther(withdrawProps.userBalance.toString())
                    .toString()} NIM-EETH`
                ) : (
                  <span className="loading loading-spinner text-primary"></span>
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
              onClick={() => handleWithdraw()}
            >
              {isPending ? (
                <span className="loading loading-spinner text-primary"></span>
              ) : (
                'Withdraw'
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
