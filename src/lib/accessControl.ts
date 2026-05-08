import { hasSupabase, supabase } from './supabaseClient';

const demoEmail = process.env.NEXT_PUBLIC_PARTNER_DEMO_EMAIL || 'mdsalmantd5@gmail.com';
const demoAdminEmail = process.env.NEXT_PUBLIC_ADMIN_EMAIL || demoEmail;

const defaultAccess = {
  role: 'user',
  companyId: '',
  companyName: 'Abdullah Ventures',
  email: demoEmail,
};

export const getUserAccess = async (email) => {
  if (!email) {
    return null;
  }

  if (!hasSupabase) {
    return {
      ...defaultAccess,
      role: email === demoAdminEmail ? 'admin' : 'user',
      email,
    };
  }

  const { data, error } = await supabase
    .from('company_users')
    .select('role, company_id, email, companies:company_id(company_name)')
    .eq('email', email)
    .maybeSingle();

  if (error) {
    throw error;
  }

  if (!data) {
    return null;
  }

  return {
    role: data.role,
    companyId: data.company_id || '',
    companyName: data.companies?.company_name || '',
    email: data.email,
  };
};

export const canManageCompany = (access) => access?.role === 'admin' || access?.role === 'super_admin';
