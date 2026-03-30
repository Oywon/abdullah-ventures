import { shipments as demoShipments } from '../data/tradeData';
import { hasSupabase, supabase } from './supabaseClient';

const demoCompany = {
  id: 'demo-company',
  companyName: 'Abdullah Ventures',
  contactName: 'Partner Operations Team',
  email: 'mdsalmantd5@gmail.com',
  region: 'Bangladesh',
  status: 'Active',
};

const mapShipments = (shipments = []) =>
  shipments.map((shipment) => ({
    id: shipment.id || shipment.tracking_id,
    trackingId: shipment.tracking_id || shipment.id,
    origin: shipment.origin_port || shipment.origin,
    destination: shipment.destination_port || shipment.destination || 'Dhaka, Bangladesh',
    cargoType: shipment.cargo_type || shipment.cargoType || 'General Cargo',
    status: shipment.status,
    eta: shipment.eta_delivery || shipment.eta,
  }));

const buildStats = (shipments = []) => {
  const activeStatuses = ['PENDING', 'IN-TRANSIT', 'CUSTOMS', 'SHIPPED'];
  const activeShipments = shipments.filter((item) => activeStatuses.includes(item.status)).length;
  const deliveredShipments = shipments.filter((item) => item.status === 'DELIVERED').length;
  const ports = new Set(shipments.flatMap((item) => [item.origin, item.destination].filter(Boolean)));

  return [
    { label: 'Active Shipments', value: `${activeShipments}` },
    { label: 'Delivered', value: `${deliveredShipments}` },
    { label: 'Trade Routes', value: `${ports.size}` },
  ];
};

const createSnapshot = (company, shipments) => {
  const mappedShipments = mapShipments(shipments);

  return {
    company,
    shipments: mappedShipments,
    stats: buildStats(mappedShipments),
  };
};

export const getPortalSnapshot = async (access) => {
  if (!hasSupabase || !access?.companyId) {
    return createSnapshot(demoCompany, demoShipments);
  }

  try {
    const { data: company } = await supabase
      .from('companies')
      .select('*')
      .eq('id', access.companyId)
      .maybeSingle();

    if (!company) {
      return createSnapshot(demoCompany, demoShipments);
    }

    const { data: shipments } = await supabase
      .from('company_shipments')
      .select('*')
      .eq('company_id', company.id)
      .order('updated_at', { ascending: false });

    return createSnapshot(
      {
        id: company.id,
        companyName: company.company_name,
        contactName: company.contact_name,
        email: company.contact_email,
        region: company.region,
        status: company.status,
      },
      shipments || []
    );
  } catch (error) {
    return createSnapshot(demoCompany, demoShipments);
  }
};

export const subscribeToCompanyData = (companyId, onChange) => {
  if (!hasSupabase || !companyId) {
    return () => {};
  }

  const channel = supabase
    .channel(`company-dashboard-${companyId}`)
    .on(
      'postgres_changes',
      { event: '*', schema: 'public', table: 'companies', filter: `id=eq.${companyId}` },
      onChange
    )
    .on(
      'postgres_changes',
      { event: '*', schema: 'public', table: 'company_shipments', filter: `company_id=eq.${companyId}` },
      onChange
    )
    .subscribe();

  return () => {
    supabase.removeChannel(channel);
  };
};

export const submitPartnerApplication = async (applicationPayload) => {
  if (!hasSupabase) {
    return { ok: true, mode: 'demo' };
  }

  const companyInsert = {
    company_name: applicationPayload.companyName,
    contact_name: `${applicationPayload.firstName} ${applicationPayload.lastName}`.trim(),
    contact_email: applicationPayload.email,
    region: applicationPayload.tradeRegion,
    status: 'Pending Review',
  };

  const { data: company, error: companyError } = await supabase
    .from('companies')
    .upsert(companyInsert, { onConflict: 'contact_email' })
    .select()
    .single();

  if (companyError) {
    throw companyError;
  }

  const { error: requestError } = await supabase.from('partnership_requests').insert({
    company_id: company.id,
    company_name: applicationPayload.companyName,
    contact_name: `${applicationPayload.firstName} ${applicationPayload.lastName}`.trim(),
    contact_email: applicationPayload.email,
    region: applicationPayload.tradeRegion,
    notes: applicationPayload.sector || 'General trade partnership request',
    status: 'Pending',
  });

  if (requestError) {
    throw requestError;
  }

  return { ok: true, mode: 'supabase', companyId: company.id };
};

export const getAdminSnapshot = async () => {
  if (!hasSupabase) {
    return {
      companies: [demoCompany],
      shipments: mapShipments(demoShipments),
      users: [
        {
          id: 'demo-user-admin',
          email: demoCompany.email,
          fullName: demoCompany.contactName,
          role: 'admin',
          companyId: demoCompany.id,
          companyName: demoCompany.companyName,
        },
      ],
    };
  }

  throw new Error('Access context is required.');
};

export const getAdminSnapshotForAccess = async (access) => {
  if (!hasSupabase) {
    return getAdminSnapshot();
  }

  const companiesQuery = supabase.from('companies').select('*').order('created_at', { ascending: false });
  const shipmentsQuery = supabase.from('company_shipments').select('*').order('updated_at', { ascending: false });
  const usersQuery = supabase
    .from('company_users')
    .select('id, email, full_name, role, company_id, companies:company_id(company_name)')
    .order('created_at', { ascending: false });

  const scopedCompaniesQuery = access?.role === 'super_admin' ? companiesQuery : companiesQuery.eq('id', access.companyId);
  const scopedShipmentsQuery =
    access?.role === 'super_admin' ? shipmentsQuery : shipmentsQuery.eq('company_id', access.companyId);
  const scopedUsersQuery = access?.role === 'super_admin' ? usersQuery : usersQuery.eq('company_id', access.companyId);

  const [{ data: companies, error: companiesError }, { data: shipments, error: shipmentsError }, { data: users, error: usersError }] =
    await Promise.all([scopedCompaniesQuery, scopedShipmentsQuery, scopedUsersQuery]);

  if (companiesError) {
    throw companiesError;
  }

  if (shipmentsError) {
    throw shipmentsError;
  }

  if (usersError) {
    throw usersError;
  }

  return {
    companies: (companies || []).map((company) => ({
      id: company.id,
      companyName: company.company_name,
      contactName: company.contact_name,
      email: company.contact_email,
      region: company.region,
      status: company.status,
    })),
    shipments: mapShipments(shipments || []).map((shipment) => ({
      ...shipment,
      companyId: (shipments || []).find((item) => item.tracking_id === shipment.trackingId)?.company_id || '',
    })),
    users: (users || []).map((user) => ({
      id: user.id,
      email: user.email,
      fullName: user.full_name,
      role: user.role,
      companyId: user.company_id || '',
      companyName: user.companies?.company_name || '',
    })),
  };
};

export const createCompany = async (payload, access) => {
  if (!hasSupabase) {
    return { ok: true, mode: 'demo' };
  }

  if (access?.role !== 'super_admin') {
    throw new Error('Only super admins can create new companies.');
  }

  const { data, error } = await supabase
    .from('companies')
    .insert({
      company_name: payload.companyName,
      contact_name: payload.contactName,
      contact_email: payload.email,
      region: payload.region,
      status: payload.status,
    })
    .select()
    .single();

  if (error) {
    throw error;
  }

  return data;
};

export const updateCompany = async (companyId, payload, access) => {
  if (!hasSupabase) {
    return { ok: true, mode: 'demo' };
  }

  if (access?.role !== 'super_admin' && access?.companyId !== companyId) {
    throw new Error('You can only update your own company.');
  }

  const { data, error } = await supabase
    .from('companies')
    .update({
      company_name: payload.companyName,
      contact_name: payload.contactName,
      contact_email: payload.email,
      region: payload.region,
      status: payload.status,
    })
    .eq('id', companyId)
    .select()
    .single();

  if (error) {
    throw error;
  }

  return data;
};

export const deleteCompany = async (companyId, access) => {
  if (!hasSupabase) {
    return { ok: true, mode: 'demo' };
  }

  if (access?.role !== 'super_admin') {
    throw new Error('Only super admins can delete companies.');
  }

  const { error } = await supabase.from('companies').delete().eq('id', companyId);

  if (error) {
    throw error;
  }
};

export const createShipment = async (payload, access) => {
  if (!hasSupabase) {
    return { ok: true, mode: 'demo' };
  }

  if (access?.role !== 'super_admin' && access?.companyId !== payload.companyId) {
    throw new Error('You can only create shipments for your own company.');
  }

  const { data, error } = await supabase
    .from('company_shipments')
    .insert({
      company_id: payload.companyId,
      tracking_id: payload.trackingId,
      origin_port: payload.origin,
      destination_port: payload.destination,
      cargo_type: payload.cargoType,
      status: payload.status,
      eta_delivery: payload.eta,
    })
    .select()
    .single();

  if (error) {
    throw error;
  }

  return data;
};

export const updateShipment = async (shipmentId, payload, access) => {
  if (!hasSupabase) {
    return { ok: true, mode: 'demo' };
  }

  if (access?.role !== 'super_admin' && access?.companyId !== payload.companyId) {
    throw new Error('You can only update shipments for your own company.');
  }

  const { data, error } = await supabase
    .from('company_shipments')
    .update({
      company_id: payload.companyId,
      tracking_id: payload.trackingId,
      origin_port: payload.origin,
      destination_port: payload.destination,
      cargo_type: payload.cargoType,
      status: payload.status,
      eta_delivery: payload.eta,
    })
    .eq('id', shipmentId)
    .select()
    .single();

  if (error) {
    throw error;
  }

  return data;
};

export const deleteShipment = async (shipmentId, access) => {
  if (!hasSupabase) {
    return { ok: true, mode: 'demo' };
  }

  if (access?.role !== 'super_admin' && !access?.companyId) {
    throw new Error('You do not have permission to delete shipments.');
  }

  let query = supabase.from('company_shipments').delete().eq('id', shipmentId);

  if (access?.role !== 'super_admin') {
    query = query.eq('company_id', access.companyId);
  }

  const { error } = await query;

  if (error) {
    throw error;
  }
};

export const createPortalUser = async (payload, access) => {
  if (!hasSupabase) {
    return { ok: true, mode: 'demo' };
  }

  if (access?.role !== 'super_admin' && access?.companyId !== payload.companyId) {
    throw new Error('You can only create users for your own company.');
  }

  const { data, error } = await supabase
    .from('company_users')
    .insert({
      full_name: payload.fullName,
      email: payload.email,
      role: payload.role,
      company_id: payload.companyId,
    })
    .select()
    .single();

  if (error) {
    throw error;
  }

  return data;
};

export const updatePortalUser = async (userId, payload, access) => {
  if (!hasSupabase) {
    return { ok: true, mode: 'demo' };
  }

  if (access?.role !== 'super_admin' && access?.companyId !== payload.companyId) {
    throw new Error('You can only update users for your own company.');
  }

  const { data, error } = await supabase
    .from('company_users')
    .update({
      full_name: payload.fullName,
      email: payload.email,
      role: payload.role,
      company_id: payload.companyId,
    })
    .eq('id', userId)
    .select()
    .single();

  if (error) {
    throw error;
  }

  return data;
};

export const deletePortalUser = async (userId, access) => {
  if (!hasSupabase) {
    return { ok: true, mode: 'demo' };
  }

  if (access?.role !== 'super_admin' && !access?.companyId) {
    throw new Error('You do not have permission to delete users.');
  }

  let query = supabase.from('company_users').delete().eq('id', userId);

  if (access?.role !== 'super_admin') {
    query = query.eq('company_id', access.companyId);
  }

  const { error } = await query;

  if (error) {
    throw error;
  }
};
