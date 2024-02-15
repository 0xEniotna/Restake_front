'use client';

import { WalletModal } from '@/components/Navbar';
import { useAccount, useBalance, useNetwork } from '@starknet-react/core';

function Portfolio() {
  const { address } = useAccount();
  const { isLoading, isError, error, data } = useBalance({
    address,
    watch: true,
  });

  const { chain } = useNetwork();

  if (isLoading) return <div>Loading ...</div>;
  if (isError || !data) return <div>{error?.message}</div>;

  return (
    <div className="z-10 flex flex-col w-3/4">
      <div className="items-stretch">
        <h1 className="text-4xl p-4 ">My portfolio</h1>
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
            <div className="stat-value">
              {data.formatted.toString().slice(0, 7)}
              {data.symbol}
            </div>
            <div className="stat-desc">USD VALUE</div>
          </div>

          <div className="stat">
            <div className="stat-title">PNL</div>
            <div className="stat-value">4,200</div>
            <div className="stat-desc">↗︎ 400 (12%)</div>
          </div>

          <div className="stat">
            <div className="stat-title">Deposited assets</div>
            <div className="stat-value">8,200</div>
            <div className="stat-desc">↗Eth equivalent 3.2 ETH</div>
          </div>
        </div>
      </div>
    </div>
  );
}

function StratList() {
  return (
    <div className="z-10 flex flex-col w-3/4">
      <div className="items-stretch">
        <h1 className="text-4xl pl-4">My strategies</h1>
        <table className="table">
          {/* head */}
          <thead>
            <tr className="text-xl text-white">
              <th>Name</th>
              <th>Amount</th>
              <th>Current Yield</th>
              <th>Rewards</th>
            </tr>
          </thead>
          <tbody className="text-3xl">
            <tr className="">
              <td>EtherFi Juice</td>
              <td>2.4 ETH</td>
              <td>2.5 %</td>
              <td>0.26 ETH</td>
            </tr>
            <tr className="">
              <td>Combo Juice</td>
              <td>1.3 ETH</td>
              <td>4 %</td>
              <td>0.2 ETH</td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default function Dashboard() {
  const { address } = useAccount();
  return (
    <>
      {address ? (
        <div className="z-10 w-full flex flex-col items-center">
          <Portfolio />
          <div className="divider divider-primary z-40 w-3/4 m-auto my-12"></div>

          <StratList />
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
