'use client';
import { useAccount, useConnect, useDisconnect } from '@starknet-react/core';
import { useMemo } from 'react';

function WalletConnected() {
  const { address } = useAccount();
  const { disconnect } = useDisconnect();

  const shortenedAddress = useMemo(() => {
    if (!address) return '';
    return `${address.slice(0, 6)}...${address.slice(-4)}`;
  }, [address]);

  return (
    <div className="tooltip tooltip-bottom" data-tip="Disconnect">
      <button
        className="btn flex flex-row items-center"
        onClick={() => disconnect()}
      >
        <div className="flex flex-row items-center gap-2 text-xl">
          <svg
            aria-hidden="true"
            focusable="false"
            data-prefix="fal"
            data-icon="wallet"
            className="svg-inline--fa fa-wallet w-4 h-4" // Adjust the size as needed
            role="img"
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 512 512"
            style={{ fontSize: '16px' }} // It's better to control the size with width and height in the class
          >
            <path
              fill="currentColor"
              d="M80 32C35.8 32 0 67.8 0 112V400c0 44.2 35.8 80 80 80H432c44.2 0 80-35.8 80-80V176c0-44.2-35.8-80-80-80H112c-8.8 0-16 7.2-16 16s7.2 16 16 16H432c26.5 0 48 21.5 48 48V400c0 26.5-21.5 48-48 48H80c-26.5 0-48-21.5-48-48V112c0-26.5 21.5-48 48-48H464c8.8 0 16-7.2 16-16s-7.2-16-16-16H80zM384 312a24 24 0 1 0 0-48 24 24 0 1 0 0 48z"
            ></path>
          </svg>
          {/* If you have text or another element to go next to the icon, insert it here */}
          <p className="flex items-center ">{shortenedAddress}</p>
        </div>
      </button>
    </div>
  );
}

function ConnectWallet() {
  const { connectors, connect } = useConnect();

  return (
    <div className="text-center text-2xl">
      <span className="block font-semibold mb-4">Choose a wallet:</span>
      <div className="flex flex-col gap-2 w-64 mx-auto ">
        {connectors.map((connector) => (
          <button
            key={connector.id}
            onClick={() => connect({ connector })}
            className="flex hover:bg-secondary hover:text-primary justify-center items-center text-center gap-x-2 bg-primary text-secondary font-bold py-2 px-4 rounded transition duration-150 ease-in-out w-full"
          >
            {connector.id.charAt(0).toUpperCase() + connector.id.slice(1)}
          </button>
        ))}
      </div>
    </div>
  );
}

function WalletModal() {
  return (
    <div>
      <button
        className="btn bg-primary text-xl w-32 hover:bg-secondary hover:text-primary text-secondary"
        onClick={() => document.getElementById('my_modal').showModal()}
      >
        Connect
      </button>
      <dialog id="my_modal" className="modal absolute top-0 right-0">
        <div className="modal-box bg-opacity-90 bg-neutral">
          <ConnectWallet />
        </div>
        <form method="dialog" className="modal-backdrop">
          <button>close</button>
        </form>
      </dialog>
    </div>
  );
}
export default function Navbar() {
  const { address } = useAccount();

  return (
    <div className="navbar z-1 backdrop-blur-md h-18">
      <div className="flex-1">
        <a className="btn btn-ghost text-5xl">ReSta(r)ke</a>
      </div>
      <div className="flex-none mr-6">
        {address ? <WalletConnected /> : <WalletModal />}
      </div>
    </div>
  );
}
