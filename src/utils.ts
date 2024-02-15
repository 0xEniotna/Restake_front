interface NetworkConfig {
  eth: string;
  l2PoolingManager: string;
  factory: string;
  ethBridge: string;
  l2EthBridge: string;
  POOLING_MANAGER_CLASS_HASH: string;
  eETHJuiceStrategy: string;
  eETHJuiceStrategyToken: string;
}

export interface Configs {
  [key: string]: NetworkConfig;
}
