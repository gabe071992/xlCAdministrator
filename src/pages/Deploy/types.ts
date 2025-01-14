export interface ContractTemplate {
  id: string;
  name: string;
  description: string;
  category: 'token' | 'defi' | 'governance' | 'utility';
  version: string;
  parameters: ContractParameter[];
  source: string;
  abi: any[];
}

export interface ContractParameter {
  name: string;
  type: 'string' | 'number' | 'boolean' | 'address' | 'array';
  description: string;
  required: boolean;
  default?: any;
  validation?: {
    min?: number;
    max?: number;
    pattern?: string;
  };
}

export interface DeploymentStatus {
  id: string;
  contractName: string;
  status: 'pending' | 'deploying' | 'success' | 'failed';
  address?: string;
  txHash?: string;
  timestamp: string;
  error?: string;
}

export interface ContractRegistry {
  id: string;
  name: string;
  address: string;
  network: string;
  version: string;
  deployedAt: string;
  features: string[];
  verified: boolean;
  audited: boolean;
}

export interface SecurityControl {
  id: string;
  type: 'access' | 'approval' | 'emergency' | 'audit';
  name: string;
  description: string;
  enabled: boolean;
  lastUpdated: string;
  updatedBy: string;
}

export interface TokenConfig {
  name: string;
  symbol: string;
  decimals: number;
  totalSupply: string;
  features: {
    burnable: boolean;
    mintable: boolean;
    pausable: boolean;
    upgradeable: boolean;
    accessControl: boolean;
  };
  distribution: {
    team: number;
    advisors: number;
    publicSale: number;
    liquidity: number;
    marketing: number;
  };
}