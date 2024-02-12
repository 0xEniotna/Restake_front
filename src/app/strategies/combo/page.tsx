'use client';

import Cyberpunk from '../../../public/cyberpunk.jpg';
import Image from 'next/image';
import Navbar, { WalletModal } from '@/components/Navbar';
import { useAccount } from '@starknet-react/core';

type Strat = {
  name: string;
};

function Portfolio(strat: Strat) {
  return (
    <div className="z-10 flex flex-col w-3/4">
      <div className="items-stretch">
        <h1 className="text-4xl p-4 ">My position</h1>
        <div className="stats w-full shadow  text-primary-content ">
          <div className="stat ">
            <div className="stat-figure text-secondary">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
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
            <div className="stat-title ">Value</div>
            <div className="stat-value">31K</div>
          </div>

          <div className="stat">
            <div className="stat-title">PNL</div>
            <div className="stat-value">4,200</div>
            <div className="stat-desc">↗︎ 400 (12%)</div>
          </div>

          <div className="stat">
            <div className="stat-title">New Registers</div>
            <div className="stat-value">1,200</div>
            <div className="stat-desc">↘︎ 90 (14%)</div>
          </div>
        </div>
      </div>
    </div>
  );
}

function StratDetails(strat: Strat) {
  const subtitleStyle = 'text-3xl text-primary';

  return (
    <div className="z-10 flex flex-col w-3/4">
      <div className="items-stretch">
        <h1 className="text-4xl p-4 ">Strategy</h1>
        <div className="flex flex-row px-4">
          <div className="w-1/2">
            <div className={subtitleStyle}>Description</div>
            <div className="text-lg mt-4">lorem ipsum dolor sit amet</div>
          </div>
          <div className="w-1/2">
            <div className={subtitleStyle}>Invest</div>
            <div className="flex flex-row justify-around mt-4">
              <button className="btn w-1/3 text-lg">Deposit</button>
              <button className="btn w-1/3 text-lg">Withdraw</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default function Strategy(strat: Strat) {
  const { address } = useAccount();

  const defaultStratProps: Strat = {
    name: 'Example Strategy',
  };
  const combined = { ...defaultStratProps, ...strat };
  return (
    <>
      {address ? (
        <div className="z-10 w-full flex flex-col items-center">
          <h1 className="text-7xl font-extrabold mb-3">COMBO JUICE</h1>
          <Portfolio {...combined} />
          <div className="divider divider-primary w-3/4 m-auto mt-6"></div>
          <StratDetails {...combined} />
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
