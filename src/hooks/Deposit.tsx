'use client';
import { useAccount, useContractWrite } from '@starknet-react/core';
import { CallData, cairo, Call } from 'starknet';
import { useEffect, useMemo, useState } from 'react';
import { ethers } from 'ethers';

export type depositProps = {
  underlying: string;
  stratAddress: string;
  amount: string;
};

const usePrepareCalls = (
  account: string | undefined,
  strategy: string,
  underlying: string,
  amount: string
) => {
  if (!account || !strategy || !underlying) return [];

  const calls: Call[] = [
    {
      contractAddress: underlying,
      entrypoint: 'approve',
      calldata: CallData.compile({
        spender: strategy,
        amount: cairo.uint256(amount),
      }),
    },
    {
      contractAddress: strategy,
      entrypoint: 'deposit',
      calldata: CallData.compile({
        assets: cairo.uint256(amount),
        receiver: account,
        referal: process.env.NEXT_PUBLIC_OWNER as string,
      }),
    },
  ];

  return calls;
};

export default function useDeposit(params: depositProps) {
  const { address } = useAccount();
  const [formattedNumber, setFormattedNumber] = useState('');

  useEffect(() => {
    const safeAmount = params.amount === '' ? '0' : params.amount;
    const number = ethers.parseUnits(safeAmount, 'ether').toString();
    setFormattedNumber(number);
  }, [params, formattedNumber]);

  const calls = usePrepareCalls(
    address,
    params.stratAddress as string,
    params.underlying as string,
    formattedNumber
  );

  const { writeAsync, data, isPending } = useContractWrite({
    calls,
  });

  return { writeAsync, data, isPending };
}
