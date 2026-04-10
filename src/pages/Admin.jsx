import { useEffect, useMemo, useState } from 'react';
import { NavLink } from 'react-router-dom';
import { Pencil, Plus, Trash2 } from 'lucide-react';
import SEO from '../components/SEO';
import DashboardSidebar from '../components/dashboard/DashboardSidebar';
import { serviceCatalog, serviceStatusOptions } from '../data/serviceCatalog';
import { usePortalAccess } from '../hooks/usePortalAccess';
import { canManageCompany } from '../lib/accessControl';
import {
  createCompany,
  createPortalUser,
  createShipment,
  deleteCompany,
  deletePortalUser,
  deleteShipment,
  getAdminSnapshotForAccess,
  updateServiceRequestProgress,
  updateCompany,
  updatePortalUser,
  updateShipment,
} from '../lib/partnerPortalApi';

const emptyCompany = {
  companyName: '',
  contactName: '',
  email: '',
  region: 'Bangladesh',
  status: 'Active',
};

const emptyShipment = {
  companyId: '',
  trackingId: '',
  origin: '',
  destination: '',
  cargoType: '',
  status: 'PENDING',
  eta: '',
};

const emptyUser = {
  fullName: '',
  email: '',
  role: 'user',
  companyId: '',
};

const emptyServiceRequest = {
  requesterName: '',
  requesterEmail: '',
  companyId: '',
  serviceName: serviceCatalog[0],
  details: '',
  status: 'REQUESTED',
  progressPercent: 0,
  adminNote: '',
};

const sectionTitleMap = {
  all: 'Admin Panel',
  companies: 'Admin Panel',
  users: 'Admin Panel',
};

const Admin = ({ isSidebarOpen, setIsSidebarOpen, section = 'all' }) => {
  const { access, loading: loadingAccess } = usePortalAccess();
  const [snapshot, setSnapshot] = useState({ companies: [], shipments: [], serviceRequests: [], users: [] });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [companyForm, setCompanyForm] = useState(emptyCompany);
  const [shipmentForm, setShipmentForm] = useState(emptyShipment);
  const [userForm, setUserForm] = useState(emptyUser);
  const [serviceRequestForm, setServiceRequestForm] = useState(emptyServiceRequest);
  const [editingCompanyId, setEditingCompanyId] = useState('');
  const [editingShipmentId, setEditingShipmentId] = useState('');
  const [editingUserId, setEditingUserId] = useState('');
  const [editingServiceRequestId, setEditingServiceRequestId] = useState('');
  const [isSavingCompany, setIsSavingCompany] = useState(false);
  const [isSavingShipment, setIsSavingShipment] = useState(false);
  const [isSavingUser, setIsSavingUser] = useState(false);
  const [isSavingServiceRequest, setIsSavingServiceRequest] = useState(false);

  const companyOptions = useMemo(
    () => snapshot.companies.map((company) => ({ id: company.id, label: company.companyName })),
    [snapshot.companies]
  );

  const canManage = canManageCompany(access);
  const showCompanies = false;
  const showServices = false;
  const showShipments = false;
  const showUsers = false;

  const refreshSnapshot = async () => {
    if (!access) {
      return;
    }

    setError('');
    const nextSnapshot = await getAdminSnapshotForAccess(access);
    setSnapshot(nextSnapshot);
  };

  useEffect(() => {
    if (loadingAccess || !access) {
      return undefined;
    }

    let mounted = true;

    const load = async () => {
      setLoading(true);
      try {
        const nextSnapshot = await getAdminSnapshotForAccess(access);
        if (mounted) {
          setSnapshot(nextSnapshot);
        }
      } catch (loadError) {
        if (mounted) {
          setError(loadError.message || 'Unable to load admin data.');
        }
      } finally {
        if (mounted) {
          setLoading(false);
        }
      }
    };

    load();

    return () => {
      mounted = false;
    };
  }, [access, loadingAccess]);

  useEffect(() => {
    if (!access || access.role === 'super_admin') {
      return;
    }

    setShipmentForm((current) => ({
      ...current,
      companyId: current.companyId || access.companyId || '',
    }));

    setUserForm((current) => ({
      ...current,
      companyId: current.companyId || access.companyId || '',
    }));

    setServiceRequestForm((current) => ({
      ...current,
      requesterName: current.requesterName || access.companyName || 'Portal User',
      requesterEmail: current.requesterEmail || access.email || '',
      companyId: current.companyId || access.companyId || '',
    }));
  }, [access]);

  const handleCompanyChange = (event) => {
    const { name, value } = event.target;
    setCompanyForm((current) => ({ ...current, [name]: value }));
  };

  const handleShipmentChange = (event) => {
    const { name, value } = event.target;
    setShipmentForm((current) => ({ ...current, [name]: value }));
  };

  const handleUserChange = (event) => {
    const { name, value } = event.target;
    setUserForm((current) => ({ ...current, [name]: value }));
  };

  const handleServiceRequestChange = (event) => {
    const { name, value } = event.target;
    setServiceRequestForm((current) => ({ ...current, [name]: value }));
  };

  const handleCompanySubmit = async (event) => {
    event.preventDefault();
    setIsSavingCompany(true);
    setError('');

    try {
      if (editingCompanyId) {
        await updateCompany(editingCompanyId, companyForm, access);
      } else {
        await createCompany(companyForm, access);
      }

      await refreshSnapshot();
      setCompanyForm(emptyCompany);
      setEditingCompanyId('');
    } catch (submitError) {
      setError(submitError.message || 'Unable to save company.');
    } finally {
      setIsSavingCompany(false);
    }
  };

  const handleShipmentSubmit = async (event) => {
    event.preventDefault();
    setIsSavingShipment(true);
    setError('');

    try {
      if (editingShipmentId) {
        await updateShipment(editingShipmentId, shipmentForm, access);
      } else {
        await createShipment(shipmentForm, access);
      }

      await refreshSnapshot();
      setShipmentForm(emptyShipment);
      setEditingShipmentId('');
    } catch (submitError) {
      setError(submitError.message || 'Unable to save shipment.');
    } finally {
      setIsSavingShipment(false);
    }
  };

  const handleUserSubmit = async (event) => {
    event.preventDefault();
    setIsSavingUser(true);
    setError('');

    try {
      if (editingUserId) {
        await updatePortalUser(editingUserId, userForm, access);
      } else {
        await createPortalUser(userForm, access);
      }

      await refreshSnapshot();
      setUserForm({
        ...emptyUser,
        companyId: access?.role === 'super_admin' ? '' : access?.companyId || '',
      });
      setEditingUserId('');
    } catch (submitError) {
      setError(submitError.message || 'Unable to save user.');
    } finally {
      setIsSavingUser(false);
    }
  };

  const handleServiceRequestSubmit = async (event) => {
    event.preventDefault();

    if (!editingServiceRequestId) {
      setError('Select a request from the list to update its progress.');
      return;
    }

    setIsSavingServiceRequest(true);
    setError('');

    try {
      await updateServiceRequestProgress(
        editingServiceRequestId,
        {
          status: serviceRequestForm.status,
          progressPercent: serviceRequestForm.progressPercent,
          adminNote: serviceRequestForm.adminNote,
        },
        access
      );

      await refreshSnapshot();
      setServiceRequestForm({
        ...emptyServiceRequest,
        requesterName: access?.companyName || 'Portal User',
        requesterEmail: access?.email || '',
        companyId: access?.role === 'super_admin' ? '' : access?.companyId || '',
      });
      setEditingServiceRequestId('');
    } catch (submitError) {
      setError(submitError.message || 'Unable to save request progress.');
    } finally {
      setIsSavingServiceRequest(false);
    }
  };

  const startEditCompany = (company) => {
    setEditingCompanyId(company.id);
    setCompanyForm({
      companyName: company.companyName,
      contactName: company.contactName,
      email: company.email,
      region: company.region,
      status: company.status,
    });
  };

  const startEditShipment = (shipment) => {
    setEditingShipmentId(shipment.id);
    setShipmentForm({
      companyId: shipment.companyId || '',
      trackingId: shipment.trackingId || shipment.id,
      origin: shipment.origin,
      destination: shipment.destination || '',
      cargoType: shipment.cargoType || '',
      status: shipment.status,
      eta: shipment.eta,
    });
  };

  const startEditUser = (user) => {
    setEditingUserId(user.id);
    setUserForm({
      fullName: user.fullName || '',
      email: user.email,
      role: user.role,
      companyId: user.companyId || '',
    });
  };

  const startEditServiceRequest = (request) => {
    setEditingServiceRequestId(request.id);
    setServiceRequestForm({
      requesterName: request.requesterName,
      requesterEmail: request.requesterEmail,
      companyId: request.companyId || '',
      serviceName: request.serviceName,
      details: request.details,
      status: request.status,
      progressPercent: request.progressPercent,
      adminNote: request.adminNote || '',
    });
  };

  const handleDeleteCompany = async (companyId) => {
    setError('');
    try {
      await deleteCompany(companyId, access);
      await refreshSnapshot();
      if (editingCompanyId === companyId) {
        setEditingCompanyId('');
        setCompanyForm(emptyCompany);
      }
    } catch (deleteError) {
      setError(deleteError.message || 'Unable to delete company.');
    }
  };

  const handleDeleteShipment = async (shipmentId) => {
    setError('');
    try {
      await deleteShipment(shipmentId, access);
      await refreshSnapshot();
      if (editingShipmentId === shipmentId) {
        setEditingShipmentId('');
        setShipmentForm(emptyShipment);
      }
    } catch (deleteError) {
      setError(deleteError.message || 'Unable to delete shipment.');
    }
  };

  const handleDeleteUser = async (userId) => {
    setError('');
    try {
      await deletePortalUser(userId, access);
      await refreshSnapshot();
      if (editingUserId === userId) {
        setEditingUserId('');
        setUserForm(emptyUser);
      }
    } catch (deleteError) {
      setError(deleteError.message || 'Unable to delete user.');
    }
  };

  if (!loadingAccess && !canManage) {
    return (
      <div className="min-h-screen bg-slate-100 lg:flex font-sans">
        <SEO title="Admin Panel | Abdullah Ventures" />
        <DashboardSidebar isOpen={isSidebarOpen} setIsOpen={setIsSidebarOpen} />
        <div className="flex-1 p-4 sm:p-6 lg:p-12 text-slate-800">
          <div className="bg-white rounded-[28px] shadow-lg border border-slate-200 p-8">
            <h1 className="text-2xl font-black italic uppercase tracking-tight text-slate-900 mb-4">Access Restricted</h1>
            <p className="text-slate-500 leading-7">
              Only company admins can manage records. Standard users can view dashboard data only.
            </p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-100 lg:flex font-sans">
      <SEO title="Admin Panel | Abdullah Ventures" />
      <DashboardSidebar isOpen={isSidebarOpen} setIsOpen={setIsSidebarOpen} />

      <div className="flex-1 p-4 sm:p-6 lg:p-12 text-slate-800">
        <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-3 mb-8 sm:mb-12 border-b-2 border-blue-600 pb-4">
          <h1 className="text-2xl sm:text-3xl font-black uppercase tracking-tighter italic">{sectionTitleMap[section] || 'Admin Panel'}</h1>
          <div className="bg-slate-900 text-white px-4 py-1 rounded text-[9px] sm:text-[10px] font-black uppercase tracking-[0.2em] sm:tracking-[0.3em] w-fit">
            Request Management
          </div>
        </div>

        <div className="mb-6 flex flex-wrap gap-2">
          {[
            { to: '/admin', label: 'Overview' },
          ].map((tab) => (
            <NavLink
              key={tab.to}
              to={tab.to}
              className={({ isActive }) =>
                `rounded-full border px-4 py-2 text-[10px] font-black uppercase tracking-[0.2em] ${
                  isActive
                    ? 'border-blue-600 bg-blue-600 text-white'
                    : 'border-slate-200 bg-white text-slate-500 hover:text-slate-900'
                }`
              }
            >
              {tab.label}
            </NavLink>
          ))}
        </div>

        {error && (
          <div className="mb-6 rounded-2xl border border-rose-200 bg-rose-50 px-4 py-3 text-sm font-bold text-rose-700">
            {error}
          </div>
        )}

        <section className="bg-white rounded-[28px] shadow-lg border border-slate-200 p-6 sm:p-8 mb-8 sm:mb-12">
          <p className="text-[10px] font-black uppercase tracking-[0.35em] text-blue-600 mb-2">Requests</p>
          <h2 className="text-xl sm:text-2xl font-black italic uppercase tracking-tight text-slate-900 mb-4">
            Update Request In Tracking
          </h2>
          <p className="text-sm text-slate-500 leading-7 mb-5">
            Request creation is handled by users. Admin progress updates are now handled only from the Tracking modal.
          </p>
          <NavLink
            to="/tracking"
            className="inline-flex rounded-full bg-blue-600 px-5 py-3 text-[10px] font-black uppercase tracking-[0.2em] text-white hover:bg-slate-900"
          >
            Open Tracking
          </NavLink>
        </section>

        {(showCompanies || showShipments) && (
          <div className="grid xl:grid-cols-2 gap-6 mb-8 sm:mb-12">
            {showCompanies && access?.role === 'super_admin' && (
            <section className="bg-white rounded-[28px] shadow-lg border border-slate-200 p-6 sm:p-8">
              <div className="flex items-center justify-between gap-3 mb-6">
                <div>
                  <p className="text-[10px] font-black uppercase tracking-[0.35em] text-blue-600 mb-2">Companies</p>
                  <h2 className="text-2xl font-black italic uppercase tracking-tight text-slate-900">
                    {editingCompanyId ? 'Edit Company' : 'Add Company'}
                  </h2>
                </div>
                <button
                  type="button"
                  onClick={() => {
                    setEditingCompanyId('');
                    setCompanyForm(emptyCompany);
                  }}
                  className="inline-flex items-center gap-2 rounded-full border border-slate-200 px-4 py-2 text-[10px] font-black uppercase tracking-[0.2em] text-slate-500 hover:text-slate-900"
                >
                  <Plus size={14} /> New
                </button>
              </div>

              <form className="space-y-4" onSubmit={handleCompanySubmit}>
                <input
                  name="companyName"
                  value={companyForm.companyName}
                  onChange={handleCompanyChange}
                  placeholder="Company name"
                  className="w-full rounded-xl border border-slate-200 px-4 py-3 text-sm font-bold focus:outline-none focus:border-blue-600"
                  required
                />
                <input
                  name="contactName"
                  value={companyForm.contactName}
                  onChange={handleCompanyChange}
                  placeholder="Contact name"
                  className="w-full rounded-xl border border-slate-200 px-4 py-3 text-sm font-bold focus:outline-none focus:border-blue-600"
                  required
                />
                <input
                  name="email"
                  type="email"
                  value={companyForm.email}
                  onChange={handleCompanyChange}
                  placeholder="Business email"
                  className="w-full rounded-xl border border-slate-200 px-4 py-3 text-sm font-bold focus:outline-none focus:border-blue-600"
                  required
                />
                <div className="grid grid-cols-2 gap-4">
                  <input
                    name="region"
                    value={companyForm.region}
                    onChange={handleCompanyChange}
                    placeholder="Region"
                    className="w-full rounded-xl border border-slate-200 px-4 py-3 text-sm font-bold focus:outline-none focus:border-blue-600"
                    required
                  />
                  <select
                    name="status"
                    value={companyForm.status}
                    onChange={handleCompanyChange}
                    className="w-full rounded-xl border border-slate-200 px-4 py-3 text-sm font-bold focus:outline-none focus:border-blue-600"
                  >
                    <option>Active</option>
                    <option>Pending Review</option>
                    <option>Inactive</option>
                  </select>
                </div>

                <button
                  type="submit"
                  disabled={isSavingCompany}
                  className="w-full rounded-xl bg-blue-600 px-4 py-3 text-white text-[11px] font-black uppercase tracking-[0.2em] hover:bg-slate-900 disabled:opacity-60"
                >
                  {isSavingCompany ? 'Saving...' : editingCompanyId ? 'Update Company' : 'Add Company'}
                </button>
              </form>
            </section>
            )}

            {showCompanies && access?.role !== 'super_admin' && (
              <section className="bg-white rounded-[28px] shadow-lg border border-slate-200 p-6 sm:p-8">
                <h2 className="text-xl font-black italic uppercase tracking-tight text-slate-900 mb-4">Company Management</h2>
                <p className="text-sm text-slate-500 leading-7">Only super admins can manage global company records.</p>
              </section>
            )}

            {showShipments && (
              <section className="bg-white rounded-[28px] shadow-lg border border-slate-200 p-6 sm:p-8">
            <div className="flex items-center justify-between gap-3 mb-6">
              <div>
                  <p className="text-[10px] font-black uppercase tracking-[0.35em] text-blue-600 mb-2">Service Operations</p>
                <h2 className="text-2xl font-black italic uppercase tracking-tight text-slate-900">
                    {editingShipmentId ? 'Edit Shipment Service' : 'Add Shipment Service'}
                </h2>
              </div>
              <button
                type="button"
                onClick={() => {
                  setEditingShipmentId('');
                  setShipmentForm({
                    ...emptyShipment,
                    companyId: access?.role === 'super_admin' ? '' : access?.companyId || '',
                  });
                }}
                className="inline-flex items-center gap-2 rounded-full border border-slate-200 px-4 py-2 text-[10px] font-black uppercase tracking-[0.2em] text-slate-500 hover:text-slate-900"
              >
                <Plus size={14} /> New
              </button>
            </div>

            <form className="space-y-4" onSubmit={handleShipmentSubmit}>
              <select
                name="companyId"
                value={shipmentForm.companyId}
                onChange={handleShipmentChange}
                className="w-full rounded-xl border border-slate-200 px-4 py-3 text-sm font-bold focus:outline-none focus:border-blue-600"
                required
                disabled={access?.role !== 'super_admin'}
              >
                <option value="">Select company</option>
                {companyOptions.map((company) => (
                  <option key={company.id} value={company.id}>
                    {company.label}
                  </option>
                ))}
              </select>
              <input
                name="trackingId"
                value={shipmentForm.trackingId}
                onChange={handleShipmentChange}
                placeholder="Tracking ID"
                className="w-full rounded-xl border border-slate-200 px-4 py-3 text-sm font-bold focus:outline-none focus:border-blue-600"
                required
              />
              <div className="grid grid-cols-2 gap-4">
                <input
                  name="origin"
                  value={shipmentForm.origin}
                  onChange={handleShipmentChange}
                  placeholder="Origin"
                  className="w-full rounded-xl border border-slate-200 px-4 py-3 text-sm font-bold focus:outline-none focus:border-blue-600"
                  required
                />
                <input
                  name="destination"
                  value={shipmentForm.destination}
                  onChange={handleShipmentChange}
                  placeholder="Destination"
                  className="w-full rounded-xl border border-slate-200 px-4 py-3 text-sm font-bold focus:outline-none focus:border-blue-600"
                  required
                />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <input
                  name="cargoType"
                  value={shipmentForm.cargoType}
                  onChange={handleShipmentChange}
                  placeholder="Cargo type"
                  className="w-full rounded-xl border border-slate-200 px-4 py-3 text-sm font-bold focus:outline-none focus:border-blue-600"
                  required
                />
                <select
                  name="status"
                  value={shipmentForm.status}
                  onChange={handleShipmentChange}
                  className="w-full rounded-xl border border-slate-200 px-4 py-3 text-sm font-bold focus:outline-none focus:border-blue-600"
                >
                  <option>PENDING</option>
                  <option>SHIPPED</option>
                  <option>IN-TRANSIT</option>
                  <option>CUSTOMS</option>
                  <option>DELIVERED</option>
                </select>
              </div>
              <input
                name="eta"
                value={shipmentForm.eta}
                onChange={handleShipmentChange}
                placeholder="ETA delivery"
                className="w-full rounded-xl border border-slate-200 px-4 py-3 text-sm font-bold focus:outline-none focus:border-blue-600"
                required
              />

              <button
                type="submit"
                disabled={isSavingShipment}
                className="w-full rounded-xl bg-blue-600 px-4 py-3 text-white text-[11px] font-black uppercase tracking-[0.2em] hover:bg-slate-900 disabled:opacity-60"
              >
                {isSavingShipment ? 'Saving...' : editingShipmentId ? 'Update Shipment' : 'Add Shipment'}
              </button>
            </form>
              </section>
            )}
          </div>
        )}

        {(showCompanies || showShipments) && (
          <div className="grid xl:grid-cols-2 gap-6 mb-8 sm:mb-12">
            {showCompanies && (
              <section className="bg-white rounded-[28px] shadow-lg border border-slate-200 p-6 sm:p-8">
            <h2 className="text-xl font-black italic uppercase tracking-tight text-slate-900 mb-6">Company Records</h2>
            <div className="space-y-4">
              {loading ? (
                <p className="text-sm text-slate-500">Loading companies...</p>
              ) : snapshot.companies.length > 0 ? (
                snapshot.companies.map((company) => (
                  <div key={company.id} className="rounded-2xl border border-slate-200 bg-slate-50 p-4">
                    <div className="flex items-start justify-between gap-4">
                      <div>
                        <p className="text-sm font-black uppercase tracking-[0.12em] text-slate-900">{company.companyName}</p>
                        <p className="text-xs text-slate-500 mt-2">{company.contactName} • {company.email}</p>
                        <p className="text-[10px] font-black uppercase tracking-[0.25em] text-blue-600 mt-3">
                          {company.region} • {company.status}
                        </p>
                      </div>
                      <div className="flex items-center gap-2">
                        {access?.role === 'super_admin' && (
                          <>
                            <button
                              type="button"
                              onClick={() => startEditCompany(company)}
                              className="rounded-full border border-slate-200 p-2 text-slate-500 hover:text-blue-600"
                              aria-label="Edit company"
                            >
                              <Pencil size={14} />
                            </button>
                            <button
                              type="button"
                              onClick={() => handleDeleteCompany(company.id)}
                              className="rounded-full border border-slate-200 p-2 text-slate-500 hover:text-rose-600"
                              aria-label="Delete company"
                            >
                              <Trash2 size={14} />
                            </button>
                          </>
                        )}
                      </div>
                    </div>
                  </div>
                ))
              ) : (
                <p className="text-sm text-slate-500">No companies added yet.</p>
              )}
            </div>
              </section>
            )}

            {showShipments && (
              <section className="bg-white rounded-[28px] shadow-lg border border-slate-200 p-6 sm:p-8">
            <h2 className="text-xl font-black italic uppercase tracking-tight text-slate-900 mb-6">Shipment Service Records</h2>
            <div className="space-y-4">
              {loading ? (
                <p className="text-sm text-slate-500">Loading shipments...</p>
              ) : snapshot.shipments.length > 0 ? (
                snapshot.shipments.map((shipment) => (
                  <div key={shipment.id} className="rounded-2xl border border-slate-200 bg-slate-50 p-4">
                    <div className="flex items-start justify-between gap-4">
                      <div>
                        <p className="text-sm font-black uppercase tracking-[0.12em] text-slate-900">{shipment.trackingId}</p>
                        <p className="text-xs text-slate-500 mt-2">{shipment.origin} to {shipment.destination}</p>
                        <p className="text-xs text-slate-500 mt-1">{shipment.cargoType}</p>
                        <p className="text-[10px] font-black uppercase tracking-[0.25em] text-blue-600 mt-3">
                          {shipment.status} • {shipment.eta}
                        </p>
                      </div>
                      <div className="flex items-center gap-2">
                        <button
                          type="button"
                          onClick={() => startEditShipment(shipment)}
                          className="rounded-full border border-slate-200 p-2 text-slate-500 hover:text-blue-600"
                          aria-label="Edit shipment"
                        >
                          <Pencil size={14} />
                        </button>
                        <button
                          type="button"
                          onClick={() => handleDeleteShipment(shipment.id)}
                          className="rounded-full border border-slate-200 p-2 text-slate-500 hover:text-rose-600"
                          aria-label="Delete shipment"
                        >
                          <Trash2 size={14} />
                        </button>
                      </div>
                    </div>
                  </div>
                ))
              ) : (
                <p className="text-sm text-slate-500">No shipments added yet.</p>
              )}
            </div>
              </section>
            )}
          </div>
        )}

        {showServices && (
          <section className="bg-white rounded-[28px] shadow-lg border border-slate-200 p-6 sm:p-8 mb-8 sm:mb-12">
          <div className="grid xl:grid-cols-[0.95fr_1.05fr] gap-6">
            <div>
              <div className="flex items-center justify-between gap-3 mb-6">
                <div>
                  <p className="text-[10px] font-black uppercase tracking-[0.35em] text-blue-600 mb-2">Services</p>
                  <h2 className="text-2xl font-black italic uppercase tracking-tight text-slate-900">Update Request</h2>
                </div>
              </div>

              <form className="space-y-4" onSubmit={handleServiceRequestSubmit}>
                <input
                  name="requesterName"
                  value={serviceRequestForm.requesterName}
                  onChange={handleServiceRequestChange}
                  placeholder="Requester name"
                  className="w-full rounded-xl border border-slate-200 px-4 py-3 text-sm font-bold focus:outline-none focus:border-blue-600"
                  required
                  disabled
                />
                <input
                  name="requesterEmail"
                  type="email"
                  value={serviceRequestForm.requesterEmail}
                  onChange={handleServiceRequestChange}
                  placeholder="Requester email"
                  className="w-full rounded-xl border border-slate-200 px-4 py-3 text-sm font-bold focus:outline-none focus:border-blue-600"
                  required
                  disabled
                />
                <select
                  name="companyId"
                  value={serviceRequestForm.companyId}
                  onChange={handleServiceRequestChange}
                  className="w-full rounded-xl border border-slate-200 px-4 py-3 text-sm font-bold focus:outline-none focus:border-blue-600"
                  required
                  disabled
                >
                  <option value="">Select company</option>
                  {companyOptions.map((company) => (
                    <option key={company.id} value={company.id}>
                      {company.label}
                    </option>
                  ))}
                </select>
                <select
                  name="serviceName"
                  value={serviceRequestForm.serviceName}
                  onChange={handleServiceRequestChange}
                  className="w-full rounded-xl border border-slate-200 px-4 py-3 text-sm font-bold focus:outline-none focus:border-blue-600"
                  required
                  disabled
                >
                  {serviceCatalog.map((service) => (
                    <option key={service} value={service}>
                      {service}
                    </option>
                  ))}
                </select>
                <textarea
                  name="details"
                  value={serviceRequestForm.details}
                  onChange={handleServiceRequestChange}
                  placeholder="Request details"
                  rows={4}
                  className="w-full rounded-xl border border-slate-200 px-4 py-3 text-sm font-bold focus:outline-none focus:border-blue-600"
                  disabled
                />
                <div className="grid grid-cols-2 gap-4">
                  <select
                    name="status"
                    value={serviceRequestForm.status}
                    onChange={handleServiceRequestChange}
                    className="w-full rounded-xl border border-slate-200 px-4 py-3 text-sm font-bold focus:outline-none focus:border-blue-600"
                  >
                    {serviceStatusOptions.map((status) => (
                      <option key={status} value={status}>
                        {status.replace('_', ' ')}
                      </option>
                    ))}
                  </select>
                  <input
                    name="progressPercent"
                    type="number"
                    min={0}
                    max={100}
                    value={serviceRequestForm.progressPercent}
                    onChange={handleServiceRequestChange}
                    placeholder="Progress %"
                    className="w-full rounded-xl border border-slate-200 px-4 py-3 text-sm font-bold focus:outline-none focus:border-blue-600"
                    required
                  />
                </div>
                <textarea
                  name="adminNote"
                  value={serviceRequestForm.adminNote}
                  onChange={handleServiceRequestChange}
                  placeholder="Admin note for user"
                  rows={3}
                  className="w-full rounded-xl border border-slate-200 px-4 py-3 text-sm font-bold focus:outline-none focus:border-blue-600"
                />

                <button
                  type="submit"
                  disabled={isSavingServiceRequest || !editingServiceRequestId}
                  className="w-full rounded-xl bg-blue-600 px-4 py-3 text-white text-[11px] font-black uppercase tracking-[0.2em] hover:bg-slate-900 disabled:opacity-60"
                >
                  {isSavingServiceRequest ? 'Saving...' : 'Update Progress'}
                </button>
              </form>
            </div>

            <div>
              <h2 className="text-xl font-black italic uppercase tracking-tight text-slate-900 mb-6">User-Wise Requests</h2>
              <div className="space-y-4">
                {loading ? (
                  <p className="text-sm text-slate-500">Loading requests...</p>
                ) : snapshot.serviceRequests.length > 0 ? (
                  snapshot.serviceRequests.map((request) => (
                    <div key={request.id} className="rounded-2xl border border-slate-200 bg-slate-50 p-4">
                      <div className="flex items-start justify-between gap-4">
                        <div>
                          <p className="text-sm font-black uppercase tracking-[0.12em] text-slate-900">{request.serviceName}</p>
                          <p className="text-xs text-slate-500 mt-2">{request.requesterName} • {request.requesterEmail}</p>
                          <p className="text-xs text-slate-500 mt-1">{request.companyName || 'No Company'}</p>
                          <p className="text-[10px] font-black uppercase tracking-[0.25em] text-blue-600 mt-3">
                            {request.status.replace('_', ' ')} • {request.progressPercent}%
                          </p>
                          {request.adminNote && <p className="text-xs text-slate-500 mt-2">{request.adminNote}</p>}
                        </div>
                        <button
                          type="button"
                          onClick={() => startEditServiceRequest(request)}
                          className="rounded-full border border-slate-200 p-2 text-slate-500 hover:text-blue-600"
                          aria-label="Edit request"
                        >
                          <Pencil size={14} />
                        </button>
                      </div>
                    </div>
                  ))
                ) : (
                  <p className="text-sm text-slate-500">No service requests added yet.</p>
                )}
              </div>
            </div>
          </div>
          </section>
        )}

        {showUsers && (
          <section className="bg-white rounded-[28px] shadow-lg border border-slate-200 p-6 sm:p-8">
          <div className="grid xl:grid-cols-[0.95fr_1.05fr] gap-6">
            <div>
              <div className="flex items-center justify-between gap-3 mb-6">
                <div>
                  <p className="text-[10px] font-black uppercase tracking-[0.35em] text-blue-600 mb-2">Portal Users</p>
                  <h2 className="text-2xl font-black italic uppercase tracking-tight text-slate-900">
                    {editingUserId ? 'Edit User' : 'Add User'}
                  </h2>
                </div>
                <button
                  type="button"
                  onClick={() => {
                    setEditingUserId('');
                    setUserForm({
                      ...emptyUser,
                      companyId: access?.role === 'super_admin' ? '' : access?.companyId || '',
                    });
                  }}
                  className="inline-flex items-center gap-2 rounded-full border border-slate-200 px-4 py-2 text-[10px] font-black uppercase tracking-[0.2em] text-slate-500 hover:text-slate-900"
                >
                  <Plus size={14} /> New
                </button>
              </div>

              <form className="space-y-4" onSubmit={handleUserSubmit}>
                <input
                  name="fullName"
                  value={userForm.fullName}
                  onChange={handleUserChange}
                  placeholder="Full name"
                  className="w-full rounded-xl border border-slate-200 px-4 py-3 text-sm font-bold focus:outline-none focus:border-blue-600"
                  required
                />
                <input
                  name="email"
                  type="email"
                  value={userForm.email}
                  onChange={handleUserChange}
                  placeholder="User email"
                  className="w-full rounded-xl border border-slate-200 px-4 py-3 text-sm font-bold focus:outline-none focus:border-blue-600"
                  required
                />
                <div className="grid grid-cols-2 gap-4">
                  <select
                    name="role"
                    value={userForm.role}
                    onChange={handleUserChange}
                    className="w-full rounded-xl border border-slate-200 px-4 py-3 text-sm font-bold focus:outline-none focus:border-blue-600"
                  >
                    <option value="user">User</option>
                    <option value="admin">Company Admin</option>
                    {access?.role === 'super_admin' && <option value="super_admin">Super Admin</option>}
                  </select>
                  <select
                    name="companyId"
                    value={userForm.companyId}
                    onChange={handleUserChange}
                    className="w-full rounded-xl border border-slate-200 px-4 py-3 text-sm font-bold focus:outline-none focus:border-blue-600"
                    required={userForm.role !== 'super_admin'}
                    disabled={access?.role !== 'super_admin'}
                  >
                    <option value="">Select company</option>
                    {companyOptions.map((company) => (
                      <option key={company.id} value={company.id}>
                        {company.label}
                      </option>
                    ))}
                  </select>
                </div>

                <button
                  type="submit"
                  disabled={isSavingUser}
                  className="w-full rounded-xl bg-blue-600 px-4 py-3 text-white text-[11px] font-black uppercase tracking-[0.2em] hover:bg-slate-900 disabled:opacity-60"
                >
                  {isSavingUser ? 'Saving...' : editingUserId ? 'Update User' : 'Add User'}
                </button>
              </form>
            </div>

            <div>
              <h2 className="text-xl font-black italic uppercase tracking-tight text-slate-900 mb-6">User Access</h2>
              <div className="space-y-4">
                {loading ? (
                  <p className="text-sm text-slate-500">Loading users...</p>
                ) : snapshot.users.length > 0 ? (
                  snapshot.users.map((user) => (
                    <div key={user.id} className="rounded-2xl border border-slate-200 bg-slate-50 p-4">
                      <div className="flex items-start justify-between gap-4">
                        <div>
                          <p className="text-sm font-black uppercase tracking-[0.12em] text-slate-900">{user.fullName || user.email}</p>
                          <p className="text-xs text-slate-500 mt-2">{user.email}</p>
                          <p className="text-[10px] font-black uppercase tracking-[0.25em] text-blue-600 mt-3">
                            {user.role} • {user.companyName || 'Global'}
                          </p>
                        </div>
                        <div className="flex items-center gap-2">
                          <button
                            type="button"
                            onClick={() => startEditUser(user)}
                            className="rounded-full border border-slate-200 p-2 text-slate-500 hover:text-blue-600"
                            aria-label="Edit user"
                          >
                            <Pencil size={14} />
                          </button>
                          <button
                            type="button"
                            onClick={() => handleDeleteUser(user.id)}
                            className="rounded-full border border-slate-200 p-2 text-slate-500 hover:text-rose-600"
                            aria-label="Delete user"
                          >
                            <Trash2 size={14} />
                          </button>
                        </div>
                      </div>
                    </div>
                  ))
                ) : (
                  <p className="text-sm text-slate-500">No users added yet.</p>
                )}
              </div>
            </div>
          </div>
          </section>
        )}
      </div>
    </div>
  );
};

export default Admin;
