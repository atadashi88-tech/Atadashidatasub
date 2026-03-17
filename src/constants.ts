import { Network, DataPlan, CablePackage } from './types';

export const DATA_PLANS: DataPlan[] = [
  { id: 'm1', network: 'MTN', name: '500MB', price: 150, validity: '30 Days', type: 'SME' },
  { id: 'm2', network: 'MTN', name: '1GB', price: 280, validity: '30 Days', type: 'SME' },
  { id: 'm3', network: 'MTN', name: '2GB', price: 560, validity: '30 Days', type: 'SME' },
  { id: 'm4', network: 'MTN', name: '5GB', price: 1400, validity: '30 Days', type: 'SME' },
  { id: 'a1', network: 'Airtel', name: '1GB', price: 300, validity: '30 Days', type: 'CG' },
  { id: 'a2', network: 'Airtel', name: '2GB', price: 600, validity: '30 Days', type: 'CG' },
  { id: 'g1', network: 'Glo', name: '1GB', price: 250, validity: '30 Days', type: 'CG' },
  { id: 'n1', network: '9mobile', name: '1GB', price: 200, validity: '30 Days', type: 'SME' },
];

export const CABLE_PACKAGES: CablePackage[] = [
  { id: 'd1', provider: 'DSTV', name: 'Padi', price: 2950 },
  { id: 'd2', provider: 'DSTV', name: 'Yanga', price: 4200 },
  { id: 'd3', provider: 'DSTV', name: 'Confam', price: 7400 },
  { id: 'd4', provider: 'DSTV', name: 'Compact', price: 12500 },
  { id: 'g1', provider: 'GOTV', name: 'Lite', price: 1300 },
  { id: 'g2', provider: 'GOTV', name: 'Jolli', price: 3950 },
  { id: 'g3', provider: 'GOTV', name: 'Max', price: 5700 },
  { id: 'g4', provider: 'GOTV', name: 'Supa', price: 7600 },
  { id: 's1', provider: 'Startimes', name: 'Nova', price: 1500 },
  { id: 's2', provider: 'Startimes', name: 'Basic', price: 3300 },
  { id: 's3', provider: 'Startimes', name: 'Smart', price: 4700 },
  { id: 's4', provider: 'Startimes', name: 'Super', price: 7700 },
];

export const TESTIMONIALS = [
  { name: 'Chinedu O.', text: 'Best VTU site ever. My data delivery is always instant!', location: 'Lagos' },
  { name: 'Amina B.', text: 'I save so much money buying from atadashidatasub. Highly recommended.', location: 'Kano' },
  { name: 'Oluwaseun T.', text: 'Customer support is top-notch. They resolved my issue in minutes.', location: 'Ibadan' },
];
