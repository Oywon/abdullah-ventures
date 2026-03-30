import { shipments } from './tradeData';

export const demoPortalSnapshot = {
  partner: {
    companyName: 'Abdullah Ventures Strategic Desk',
    contactName: 'Partner Operations Team',
    email: 'mdsalmantd5@gmail.com',
    region: 'South Asia - Middle East Corridor',
    tier: 'Strategic Partner',
    accessLevel: 'Verified Access',
    onboardingStage: 'Operational',
    nextReview: '18 April 2026',
  },
  application: {
    status: 'Pending Compliance Review',
    reference: 'APP-AV-2048',
    submittedAt: '14 March 2026',
    requestedLimit: '$750K Quarterly',
    sector: 'Cross-Border Commodities',
  },
  stats: [
    { label: 'Open Shipments', value: '18 Units' },
    { label: 'Credit Window', value: '$750K USD' },
    { label: 'Verified Documents', value: '06 Files' },
  ],
  documents: [
    { id: 'doc-1', name: 'Trade License', status: 'Verified', expiresOn: '12 Jan 2027', owner: 'Company Admin' },
    { id: 'doc-2', name: 'KYC Pack', status: 'Pending Review', expiresOn: 'Awaiting approval', owner: 'Compliance Desk' },
    { id: 'doc-3', name: 'Bank Letter', status: 'Verified', expiresOn: '28 Nov 2026', owner: 'Finance Contact' },
  ],
  alerts: [
    {
      id: 'alert-1',
      title: 'Compliance Desk Requested Updated KYC Attachment',
      description: 'Upload the current board resolution and tax certificate before 2 April to avoid review delays.',
      priority: 'High',
    },
    {
      id: 'alert-2',
      title: 'Busan Shipment Requires Port Arrival Confirmation',
      description: 'Tracking record AV-KR-2026-102 is awaiting final arrival confirmation from the local clearing agent.',
      priority: 'Medium',
    },
  ],
  activities: [
    {
      id: 'activity-1',
      title: 'Application Assigned To Regional Compliance Lead',
      description: 'Your partnership application is now under review by the South Asia corridor team.',
      at: 'Today • 09:40 UTC+6',
    },
    {
      id: 'activity-2',
      title: 'Credit Assessment Packet Synced',
      description: 'Financial statements and banking references were copied into the underwriting workspace.',
      at: '29 March 2026 • 18:10 UTC+6',
    },
    {
      id: 'activity-3',
      title: 'Shipment Tracker Refreshed',
      description: 'Operational milestones were updated for active cargo units linked to this account.',
      at: '29 March 2026 • 12:25 UTC+6',
    },
  ],
  shipments,
};
