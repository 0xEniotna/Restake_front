'use client';

export default function Nimbora() {
  return (
    <div className="z-1 backdrop-blur-sm w-3/4 p-6 mt-12 flex flex-col items-center">
      <div className="flex flex-row">
        <div className="flex text-3xl">Powered by</div>
        <a
          className="flex text-3xl ml-2 mr-44 transition ease-in-out delay-100  hover:-translate-y-1 hover:scale-110 hover:text-primary"
          href="https://www.nimbora.io/"
        >
          NIMBORA
        </a>
      </div>
      <div className="flex text-3xl ml-36">
        Starknet&apos;s DeFi Pooling protocol
      </div>
    </div>
  );
}
