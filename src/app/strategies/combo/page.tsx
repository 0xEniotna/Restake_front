'use client';

import Cyberpunk from '../../../public/cyberpunk.jpg';
import Image from 'next/image';
import Navbar, { WalletModal } from '@/components/Navbar';
import { useAccount, useBalance, useNetwork } from '@starknet-react/core';
import useDeposit, { depositProps } from '@/hooks/Deposit';
import { Configs } from '@/utils';
import configData from '@/configs.json';
import { DepositModal } from '@/components/DepositModal';
import { WithdrawModal, withdrawModalProps } from '@/components/WithdrawModal';
import useUserPosition from '@/hooks/UserPosition';
import { ethers } from 'ethers';
import { useEffect, useState } from 'react';

type Strat = {
  name: string;
  address: string;
  shareToken: string;
  underlying: string;
  userBalance: string;
  isBalanceLoading: boolean;
};

function Portfolio(portfolioProps: Strat) {
  return (
    <div className="z-10 flex flex-col w-3/4">
      <div className="items-stretch">
        <h1 className="text-4xl p-4 ">My position</h1>
        <div className="stats w-full shadow  text-primary-content ">
          <div className="stat ">
            <div className="stat-figure text-secondary">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="28"
                height="28"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                stroke-width="2"
                stroke-linecap="round"
                stroke-linejoin="round"
                className="feather feather-dollar-sign"
              >
                <line x1="12" y1="1" x2="12" y2="23"></line>
                <path d="M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6"></path>
              </svg>
            </div>

            <div className="stat-title ">Current</div>

            <div className="stat-value">
              {!portfolioProps.isBalanceLoading &&
              portfolioProps.userBalance ? (
                `${ethers
                  .formatEther(portfolioProps.userBalance.toString())
                  .toString()} NIM-EETH`
              ) : (
                <span className="loading loading-spinner text-primary"></span>
              )}
            </div>
            <div className="stat-desc">Equivalent ETH : 0.1</div>
          </div>

          <div className="stat">
            <div className="stat-figure text-secondary">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="28"
                height="28"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                stroke-width="2"
                stroke-linecap="round"
                stroke-linejoin="round"
                className="feather feather-dollar-sign"
              >
                <line x1="12" y1="1" x2="12" y2="23"></line>
                <path d="M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6"></path>
              </svg>
            </div>
            <div className="stat-title">Deposited</div>
            <div className="stat-value">5327</div>
          </div>
          <div className="stat">
            <div className="stat-title">PNL</div>
            <div className="stat-value">410</div>
            <div className="stat-desc">↗︎ 8%</div>
          </div>
        </div>
      </div>
    </div>
  );
}

function StratDetails(strat: Strat) {
  const subtitleStyle = 'text-3xl text-primary';

  const params: depositProps = {
    underlying: strat.underlying,
    stratAddress: strat.address,
    amount: '0',
  };

  const withdrawParams: withdrawModalProps = {
    shareToken: strat.shareToken,
    stratAddress: strat.address,
    userBalance: strat.userBalance,
    isBalanceLoading: strat.isBalanceLoading,
  };

  return (
    <div className="z-10 flex flex-col w-3/4">
      <div className="items-stretch">
        <h1 className="text-4xl p-4 ">Strategy</h1>
        <div className="flex flex-row px-4">
          <div className="w-1/2">
            <div className={subtitleStyle}>Description</div>
            <div className="text-lg mt-4">
              This strategy is a simple example strategy that buys and holds
              EtherFi&apos;s eETH. Holding eETH makes you earn restaking native
              APR and additional rewards such as EtherFi loyalty points or
              EigenLayer Points.
            </div>
          </div>
          <div className="w-1/2">
            <div className={subtitleStyle}>Invest</div>
            <div className="flex flex-row justify-around mt-4">
              <DepositModal {...params} />
              <WithdrawModal {...withdrawParams} />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default function Strategy() {
  const [balance, setBalance] = useState<any>('');
  const { address } = useAccount();

  const network = useNetwork();
  const configs: Configs = configData;
  const { eETHJuiceStrategy, eth, eETHJuiceStrategyToken } =
    configs[network.chain.network];

  const {
    data,
    isError,
    isLoading: isBalanceLoading,
    error,
  } = useUserPosition({
    contractAddress: eETHJuiceStrategyToken,
  });

  useEffect(() => {
    if (!isBalanceLoading && data) {
      setBalance(data.toString());
    }
  }, [data, isBalanceLoading]);

  const stratProps: Strat = {
    name: 'Combo Juice',
    address: eETHJuiceStrategy,
    shareToken: eETHJuiceStrategyToken,
    underlying: eth,
    userBalance: balance,
    isBalanceLoading: isBalanceLoading,
  };

  return (
    <>
      {address ? (
        <div className="z-10 w-full flex flex-col items-center">
          <h1 className="text-7xl font-extrabold mb-3">
            {stratProps.name.toUpperCase()}
          </h1>
          <Portfolio {...stratProps} />
          <div className="divider divider-primary w-3/4 m-auto mt-6"></div>
          <StratDetails {...stratProps} />
        </div>
      ) : (
        <div className="z-10 flex flex-col items-center">
          <div className="text-3xl mb-5">
            You are not connected. Please connect to Starknet.
          </div>
          <WalletModal />
        </div>
      )}
    </>
  );
}
