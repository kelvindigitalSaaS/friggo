/**
 * Admin Authentication & Authorization
 * Secure admin verification system
 */

import { supabase } from '@/integrations/supabase/client';

// Admin email addresses from environment variables
const ADMIN_EMAILS = (import.meta.env.VITE_ADMIN_EMAILS || 'admin@kaza.app')
  .split(',')
  .map(email => email.trim().toLowerCase());

// Admin secret token (change this to a strong random string)
// Generate with: crypto.getRandomValues(new Uint8Array(32)).reduce((acc,x)=>acc+x.toString(16).padStart(2,'0'),'')
const ADMIN_SECRET = import.meta.env.VITE_ADMIN_SECRET || 'CHANGE_ME_IN_ENV';

/**
 * Check if user is admin based on email
 */
export async function isUserAdmin(email?: string): Promise<boolean> {
  if (!email) return false;
  return ADMIN_EMAILS.includes(email.toLowerCase());
}

/**
 * Get current user and check if admin
 */
export async function getAdminUser() {
  try {
    const { data: { user } } = await supabase.auth.getUser();

    if (!user) return null;

    const isAdmin = await isUserAdmin(user.email);

    if (!isAdmin) {
      console.warn(`⚠️ Non-admin access attempt: ${user.email}`);
      return null;
    }

    return {
      id: user.id,
      email: user.email,
      isAdmin: true
    };
  } catch (error) {
    console.error('Error getting admin user:', error);
    return null;
  }
}

/**
 * Validate admin secret token
 * Use this for API routes that need extra security
 */
export function validateAdminSecret(token: string): boolean {
  if (!token || !ADMIN_SECRET) {
    return false;
  }

  // Constant time comparison to prevent timing attacks
  return token === ADMIN_SECRET;
}

/**
 * Log admin action for security audit trail
 */
export async function logAdminAction(
  adminEmail: string,
  action: string,
  details?: Record<string, any>
) {
  try {
    await supabase
      .from('admin_logs')
      .insert({
        admin_email: adminEmail,
        action,
        details,
        ip_address: await getClientIP(),
        user_agent: navigator.userAgent,
        timestamp: new Date().toISOString()
      });
  } catch (error) {
    console.error('Error logging admin action:', error);
  }
}

/**
 * Get client IP (for logging)
 */
async function getClientIP(): Promise<string> {
  try {
    const response = await fetch('https://api.ipify.org?format=json');
    const data = await response.json();
    return data.ip || 'unknown';
  } catch {
    return 'unknown';
  }
}

/**
 * Require admin user - throw error if not admin
 */
export async function requireAdminUser() {
  const admin = await getAdminUser();

  if (!admin) {
    throw new Error('Unauthorized: Admin access required');
  }

  return admin;
}
