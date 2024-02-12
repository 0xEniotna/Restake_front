'use client';
import { useAccount, useContractWrite } from '@starknet-react/core';
import { CallData, cairo, Call } from 'starknet';
import { useEffect, useMemo, useState } from 'react';
import { ethers } from 'ethers';

export type withdrawProps = {
  shareToken: string;
  stratAddress: string;
  amount: string;
};

const usePrepareCalls = (
  account: string | undefined,
  strategy: string,
  shareToken: string,
  amount: string
) => {
  if (!account || !strategy || !shareToken) return [];

  const calls: Call[] = [
    {
      contractAddress: shareToken,
      entrypoint: 'approve',
      calldata: CallData.compile({
        spender: strategy,
        amount: cairo.uint256(amount),
      }),
    },
    {
      contractAddress: strategy,
      entrypoint: 'request_withdrawal',
      calldata: CallData.compile({
        shares: cairo.uint256(amount),
      }),
    },
  ];

  return calls;
};

export default function useWithdraw(params: withdrawProps) {
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
    params.shareToken as string,
    formattedNumber
  );

  const { writeAsync, data, isPending } = useContractWrite({
    calls,
  });

  return { writeAsync, data, isPending };
}
