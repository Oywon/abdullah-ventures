import { useMemo, useState } from 'react';
import SEO from '../components/SEO';
import DashboardSidebar from '../components/dashboard/DashboardSidebar';
import ShipmentsTable from '../components/dashboard/ShipmentsTable';
import { shipments } from '../data/tradeData';

const Tracking = ({ isSidebarOpen, setIsSidebarOpen }) => {
  const [searchTerm, setSearchTerm] = useState('');

  const filteredShipments = useMemo(() => {
    const normalized = searchTerm.trim().toLowerCase();

    if (!normalized) {
      return shipments;
    }

    return shipments.filter(
      (ship) =>
        ship.id.toLowerCase().includes(normalized) ||
        ship.origin.toLowerCase().includes(normalized) ||
        ship.status.toLowerCase().includes(normalized) ||
        ship.eta.toLowerCase().includes(normalized)
    );
  }, [searchTerm]);

  return (
    <div className="min-h-screen bg-slate-100 lg:flex font-sans">
      <SEO title="Tracking | Abdullah Ventures" />
      <DashboardSidebar isOpen={isSidebarOpen} setIsOpen={setIsSidebarOpen} />

      <div className="flex-1 p-4 sm:p-6 lg:p-12 text-slate-800">
        <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-3 mb-8 sm:mb-12 border-b-2 border-blue-600 pb-4">
          <h1 className="text-2xl sm:text-3xl font-black uppercase tracking-tighter italic">Tracking Center</h1>
          <div className="bg-slate-800 text-white px-4 py-1 rounded text-[9px] sm:text-[10px] font-black uppercase tracking-[0.2em] sm:tracking-[0.3em] w-fit">
            Live Tracking
          </div>
        </div>

        <ShipmentsTable
          shipments={filteredShipments}
          searchTerm={searchTerm}
          onSearchChange={setSearchTerm}
          tableLabel="Shipment Tracking"
        />
      </div>
    </div>
  );
};

export default Tracking;
