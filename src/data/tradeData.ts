export const shipments = [
  { id: 'AV-KR-2026-102', origin: 'Busan Hub, South Korea', status: 'SHIPPED', eta: 'April 12' },
  {
    id: 'AV-PH-2026-505',
    origin: 'Manila Port, Philippines',
    status: 'IN-TRANSIT',
    eta: 'April 18',
  },
  { id: 'AV-BD-2026-090', origin: 'Chittagong, BD', status: 'CUSTOMS', eta: 'April 05' },
  { id: 'AV-IN-2026-221', origin: 'Mumbai, India', status: 'PENDING', eta: 'April 23' },
  { id: 'AV-ME-2026-333', origin: 'Dubai, UAE', status: 'SHIPPED', eta: 'April 14' },
];

export const tradeNodes = [
  { id: 'node-kr', name: 'South Korea', type: 'Tech & Medical', status: 'Active', partners: 18 },
  { id: 'node-bd', name: 'Bangladesh', type: 'Operations HQ', status: 'Active', partners: 32 },
  { id: 'node-ph', name: 'Philippines', type: 'Shipping Hub', status: 'Active', partners: 14 },
  { id: 'node-in', name: 'India', type: 'Agriculture', status: 'Maintenance', partners: 10 },
  { id: 'node-me', name: 'Middle East', type: 'Energy Network', status: 'Active', partners: 20 },
];
