import { useEffect, useMemo, useState } from 'react';
import SEO from '../components/SEO';
import CompanyOverview from '../components/dashboard/CompanyOverview';
import DashboardSidebar from '../components/dashboard/DashboardSidebar';
import ShipmentsTable from '../components/dashboard/ShipmentsTable';
import StatsCards from '../components/dashboard/StatsCards';
import { usePortalAccess } from '../hooks/usePortalAccess';
import { getPortalSnapshot, subscribeToCompanyData } from '../lib/partnerPortalApi';

const emptySnapshot = {
  company: {
    id: '',
    companyName: 'Abdullah Ventures',
    contactName: 'Partner Operations Team',
    email: import.meta.env.VITE_PARTNER_DEMO_EMAIL || 'mdsalmantd5@gmail.com',
    region: 'Bangladesh',
    status: 'Active',
  },
  shipments: [],
  stats: [
    { label: 'Active Shipments', value: '0' },
    { label: 'Delivered', value: '0' },
    { label: 'Trade Routes', value: '0' },
  ],
};

const PortalDashboard = ({ isSidebarOpen, setIsSidebarOpen }) => {
  const { access, loading: loadingAccess } = usePortalAccess();
  const [searchTerm, setSearchTerm] = useState('');
  const [portalSnapshot, setPortalSnapshot] = useState(emptySnapshot);
  const [isLoadingSnapshot, setIsLoadingSnapshot] = useState(true);

  const filteredShipments = useMemo(() => {
    const normalized = searchTerm.trim().toLowerCase();
    const shipments = portalSnapshot.shipments || [];

    if (!normalized) {
      return shipments;
    }

    return shipments.filter(
      (ship) =>
        (ship.trackingId || ship.id).toLowerCase().includes(normalized) ||
        ship.origin.toLowerCase().includes(normalized) ||
        (ship.destination || '').toLowerCase().includes(normalized) ||
        ship.status.toLowerCase().includes(normalized) ||
        (ship.cargoType || '').toLowerCase().includes(normalized)
    );
  }, [portalSnapshot.shipments, searchTerm]);

  useEffect(() => {
    if (loadingAccess) {
      return undefined;
    }

    let isMounted = true;
    let unsubscribe = () => {};

    const loadSnapshot = async () => {
      setIsLoadingSnapshot(true);

      const snapshot = await getPortalSnapshot(access);

      if (!isMounted) {
        return;
      }

      setPortalSnapshot(snapshot);
      setIsLoadingSnapshot(false);

      unsubscribe = subscribeToCompanyData(snapshot.company.id, async () => {
        const nextSnapshot = await getPortalSnapshot(access);

        if (isMounted) {
          setPortalSnapshot(nextSnapshot);
        }
      });
    };

    loadSnapshot();

    return () => {
      isMounted = false;
      unsubscribe();
    };
  }, [access, loadingAccess]);

  return (
    <div className="min-h-screen bg-slate-100 lg:flex font-sans">
      <SEO title="Partner Portal | Abdullah Ventures" />
      <DashboardSidebar isOpen={isSidebarOpen} setIsOpen={setIsSidebarOpen} />

      <div className="flex-1 p-4 sm:p-6 lg:p-12 text-slate-800">
        <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-3 mb-8 sm:mb-12 border-b-2 border-blue-600 pb-4">
          <h1 className="text-2xl sm:text-3xl font-black uppercase tracking-tighter italic">Partner Dashboard</h1>
          <div className="bg-blue-600 text-white px-4 py-1 rounded text-[9px] sm:text-[10px] font-black uppercase tracking-[0.2em] sm:tracking-[0.3em] w-fit">
            Real-Time Sync
          </div>
        </div>

        <CompanyOverview company={portalSnapshot.company} />
        <StatsCards stats={portalSnapshot.stats} />

        <ShipmentsTable
          shipments={filteredShipments}
          searchTerm={searchTerm}
          onSearchChange={setSearchTerm}
          tableLabel="Live Shipment Tracker"
        />

        {(loadingAccess || isLoadingSnapshot) && (
          <p className="mt-6 text-[10px] font-black uppercase tracking-[0.3em] text-slate-400">
            Loading company data...
          </p>
        )}
      </div>
    </div>
  );
};

const Dashboard = (props) => <PortalDashboard {...props} />;

export default Dashboard;
