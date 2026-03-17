export type Network = 'MTN' | 'Airtel' | 'Glo' | '9mobile';
export type CableProvider = 'DSTV' | 'GOTV' | 'Startimes';

export interface DataPlan {
  id: string;
  network: Network;
  name: string;
  price: number;
  validity: string;
  type: 'SME' | 'CG' | 'Gifting';
}

export interface CablePackage {
  id: string;
  provider: CableProvider;
  name: string;
  price: number;
}

export interface Transaction {
  id: string;
  type: 'Data' | 'Airtime' | 'Cable' | 'Electricity' | 'Education' | 'SMS' | 'Funding';
  amount: number;
  status: 'Success' | 'Pending' | 'Failed';
  date: string;
  details: string;
}

export interface User {
  name: string;
  email: string;
  phone: string;
  balance: number;
  referralBalance: number;
  referralCode: string;
  referralCount: number;
  isLoggedIn: boolean;
}
