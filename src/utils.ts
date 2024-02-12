interface NetworkConfig {
  dai: string;
  eth: string;
  l2PoolingManager: string;
  factory: string;
  l2DaiBridge: string;
  l1DaiBridge: string;
  ethBridge: string;
  l2EthBridge: string;
  POOLING_MANAGER_CLASS_HASH: string;
  lstETHStrategy: string;
  lstETHStrategyToken: string;
}

export interface Configs {
  [key: string]: NetworkConfig;
}
