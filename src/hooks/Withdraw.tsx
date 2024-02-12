'use client';
import {
  useAccount,
  useContractRead,
  useContractWrite,
} from '@starknet-react/core';
import { CallData, cairo, Call } from 'starknet';
import { useEffect, useMemo, useState } from 'react';
import { ethers } from 'ethers';

import compiledContract from './abis/nimbora_yields_TokenManager.contract_class.json';

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

export function useWithdraw(params: withdrawProps) {
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

export function usePendingRequests(params: withdrawProps) {
  const { address } = useAccount();
  const [withdrawLen, setWithdrawLen] = useState('');

  const { data: withdrawLenData, isLoading: isPendingWithdrawLen } =
    useContractRead({
      functionName: 'user_withdrawal_len',
      args: [address as string],
      abi: compiledContract.abi,
      address: params.stratAddress,
      watch: true,
    });

  useEffect(() => {
    if (withdrawLenData !== undefined) {
      setWithdrawLen(withdrawLenData.toString());
    }
  }, [withdrawLenData]);

  const args = withdrawLen ? [address as string, withdrawLen] : [];
  // console.log('args:', args);

  const { data: userInfoData, isLoading: isUserInfoLoading } = useContractRead({
    functionName: 'withdrawal_info',
    args: args,
    abi: compiledContract.abi,
    address: params.stratAddress,
    watch: true,
  });

  return { userInfoData, isUserInfoLoading };
}

export function useClaimWithdrawal(params: withdrawProps) {
  const { address } = useAccount();
  const [formattedNumber, setFormattedNumber] = useState('');

  useEffect(() => {
    const safeAmount = params.amount === '' ? '0' : params.amount;
    const number = ethers.parseUnits(safeAmount, 'ether').toString();
    setFormattedNumber(number);
  }, [params, formattedNumber]);

  const calls: Call[] = [
    {
      contractAddress: params.stratAddress,
      entrypoint: 'claim_withdrawal',
      calldata: CallData.compile({
        id: cairo.uint256(formattedNumber),
      }),
    },
  ];

  const { writeAsync, data, isPending } = useContractWrite({
    calls,
  });

  return { writeAsync, data, isPending };
}
