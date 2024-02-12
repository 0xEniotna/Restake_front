'use client';
import { useAccount, useConnect, useDisconnect } from '@starknet-react/core';
import { useMemo, useRef } from 'react';
import Image from 'next/image';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChevronDown } from '@fortawesome/free-solid-svg-icons';
import { useRouter } from 'next/navigation';

type YieldProps = {
  protocol: string;
  baseApy: number;
  ELPoints: number;
  protoPoints: number;
};

function YieldObject({
  protocol = 'Default',
  baseApy = 3,
  ELPoints = 3000,
  protoPoints = 100000,
}: YieldProps) {
  const style = 'px-4 text-2xl';
  const styleNumber = 'p-4 text-4xl font-bold text-primary';

  return (
    <div className="flex flex-row justify-between">
      <div>
        <div className={style}>Base APY </div>
        <div className={styleNumber}>{baseApy}%</div>
      </div>
      <div className="text-4xl">+</div>

      <div>
        <div className={style}>EL Points</div>
        <div className={styleNumber}>{ELPoints}</div>
      </div>
      <div className=" text-4xl">+</div>
      <div>
        <div className={style}>Protocol Points</div>
        <div className={styleNumber}>{protoPoints}</div>
      </div>
    </div>
  );
}

export default function Yield() {
  const defaultYieldProps: YieldProps = {
    protocol: 'Example Protocol',
    baseApy: 5.5,
    ELPoints: 100,
    protoPoints: 200,
  };

  const etherFiYieldProps = {
    ...defaultYieldProps, // Spread default props
    protocol: 'EtherFi', // Override specific properties
    baseApy: 3.19,
  };

  const kelpDAoYieldProps = {
    ...defaultYieldProps, // Spread default props
    protocol: 'KelpDAO', // Override specific properties
    baseApy: 2.867,
  };

  const nextSectionRef = useRef<HTMLDivElement>(null);

  const scrollToNextSection = () => {
    if (nextSectionRef.current) {
      nextSectionRef.current?.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const router = useRouter();

  const subTitleStyle = 'text-5xl font-extrabold text-left font-roboto ml-4';

  return (
    <div className="w-3/4 ">
      <div className="flex flex-col  justify-center text-center">
        <div className="hero h-screen">
          <div className="hero-content text-center">
            <div className="max-w-3xl">
              <h1 className="text-7xl font-extrabold px-12 py-6 text-center text-white">
                Access juicy L1 restaking yield from Starknet
              </h1>
              <p className="py-6">
                Deposit ETH and invest in your favourite restaking protocols.
              </p>
              <button
                className="btn bg-primary hover:bg-secondary hover:text-primary text-secondary"
                onClick={scrollToNextSection}
              >
                <FontAwesomeIcon icon={faChevronDown} className="" />
              </button>
            </div>
          </div>
        </div>
        <div
          className="flex flex-col mt-12 "
          ref={nextSectionRef}
          id="nextSection"
        >
          <button
            type="button"
            onClick={() => router.push('/strategies/combo')}
            className="backdrop-blur-sm mt-6 transition ease-in-out delay-100  hover:-translate-y-1 hover:scale-110 border border-primary rounded-xl p-3"
            disabled
          >
            <div className={subTitleStyle}>Combo Juice 🤝</div>
            <div className="divider"></div>

            <div>
              <YieldObject {...defaultYieldProps} />
            </div>
          </button>
          {/* <div className="divider divider-primary"></div> */}

          <div className="flex flex-row justify-between">
            <button
              type="button"
              onClick={() => router.push('/strategies/etherfi')}
              className="backdrop-blur-sm mt-6 transition ease-in-out delay-100  hover:-translate-y-1 hover:scale-110 border border-primary rounded-xl p-3"
            >
              <div className="flex flex-row items-center ml-2">
                <Image
                  src="https://raw.githubusercontent.com/etherfi-protocol/.github/27afd23376008f849a997fca3257031fe2e01d56/etherfi-logo.svg"
                  alt="etherFi"
                  width={50}
                  height={50}
                />
                <div className={subTitleStyle}>
                  <p>EtherFi Juice</p>
                </div>
              </div>
              <div className="divider"></div>
              <div>
                {/* Correctly pass custom props */}
                <YieldObject {...etherFiYieldProps} />
              </div>
            </button>

            <button
              type="button"
              onClick={() => router.push('/strategies/kelp')}
              className="backdrop-blur-sm mt-6 transition ease-in-out delay-100  hover:-translate-y-1 hover:scale-110 border border-primary rounded-xl p-3"
              disabled
            >
              {' '}
              <div className="flex flex-row content-center">
                <div className={subTitleStyle}>
                  <p>KelpDAO Juice</p>
                </div>
              </div>
              <div className="divider"></div>
              <div>
                {/* Correctly pass custom props */}
                <YieldObject {...kelpDAoYieldProps} />
              </div>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
