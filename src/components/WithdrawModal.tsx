import useUserPosition from '@/hooks/UserPosition';
import {
  usePendingRequests,
  useWithdraw,
  withdrawProps,
} from '@/hooks/Withdraw';
import { useAccount, useBalance } from '@starknet-react/core';
import { ethers } from 'ethers';
import { useEffect, useState } from 'react';

export type withdrawModalProps = {
  shareToken: string;
  stratAddress: string;
  userBalance: string;
  isBalanceLoading: boolean;
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
      console.error('No amount specified for deposit');
      return;
    }
    writeAsync();
  };

  const { userInfoData, isUserInfoLoading } = usePendingRequests({
    shareToken: withdrawProps.shareToken,
    stratAddress: withdrawProps.stratAddress,
    amount: amount,
  });

  return (
    <>
      <button className="btn  text-xl w-1/3 " onClick={showModal}>
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
              <div className="label-text text-secondary">
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
    </>
  );
}
