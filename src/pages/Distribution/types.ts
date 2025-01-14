export interface Offer {
  title: string;
  description: string;
  rewardAmount: string;
  duration: string;
  maxParticipants: string;
  requirements?: string[];
  active: boolean;
  startDate: string;
  endDate: string;
  type: 'standard' | 'premium' | 'exclusive';
}

export interface StakingPool {
  id: string;
  name: string;
  totalStaked: number;
  apy: number;
  minStakeAmount: number;
  lockPeriod: number;
  active: boolean;
  startDate: string;
  endDate: string;
}

export interface UserStake {
  userId: string;
  poolId: string;
  amount: number;
  startDate: string;
  endDate: string;
  rewards: number;
  status: 'active' | 'completed' | 'withdrawn';
}

export interface Reward {
  userId: string;
  type: 'staking' | 'offer' | 'referral';
  amount: number;
  timestamp: string;
  status: 'pending' | 'claimed';
  sourceId: string; // poolId or offerId
}