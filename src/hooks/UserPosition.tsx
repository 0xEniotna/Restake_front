'use client';
import { useAccount, useContract, useContractRead } from '@starknet-react/core';

import compiledContract from './abis/nimbora_yields_Token.contract_class.json';

export type userPosistionProps = {
  contractAddress: string;
};

export default function useUserPosition(params: userPosistionProps) {
  const { address } = useAccount();

  const { data, isError, isLoading, error } = useContractRead({
    functionName: 'balance_of',
    args: [address as string],
    abi: compiledContract.abi,
    address: params.contractAddress,
    watch: true,
  });

  return { data, isError, isLoading, error };
}
