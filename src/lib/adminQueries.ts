/**
 * Admin Dashboard Queries
 * Fetch subscription data from Supabase
 */

import { supabase } from '@/integrations/supabase/client';

export interface SubscriptionStats {
  activeCount: number;
  cancelledCount: number;
  refundedCount: number;
  totalRevenue: number;
  trialCount: number;
  lastUpdated: string;
}

export interface SubscriptionDetail {
  id: string;
  userId: string;
  userEmail: string;
  userName: string;
  status: 'active' | 'cancelled' | 'refunded' | 'trial';
  planTier: string;
  startDate: string;
  endDate: string | null;
  cancelledDate: string | null;
  refundedDate: string | null;
  amount: number;
  createdAt: string;
}

/**
 * Get subscription statistics
 */
export async function getSubscriptionStats(): Promise<SubscriptionStats> {
  try {
    const { data: subscriptions, error } = await supabase
      .from('subscriptions')
      .select('*', { count: 'exact' });

    if (error) throw error;

    if (!subscriptions) {
      return {
        activeCount: 0,
        cancelledCount: 0,
        refundedCount: 0,
        totalRevenue: 0,
        trialCount: 0,
        lastUpdated: new Date().toISOString()
      };
    }

    // Calculate stats
    const activeCount = subscriptions.filter(s => s.status === 'active').length;
    const cancelledCount = subscriptions.filter(s => s.status === 'cancelled').length;
    const refundedCount = subscriptions.filter(s => s.status === 'refunded').length;
    const trialCount = subscriptions.filter(s => s.status === 'trial').length;

    const totalRevenue = subscriptions
      .filter(s => s.status === 'active')
      .reduce((sum, s) => sum + (s.amount || 0), 0);

    return {
      activeCount,
      cancelledCount,
      refundedCount,
      totalRevenue,
      trialCount,
      lastUpdated: new Date().toISOString()
    };
  } catch (error) {
    console.error('Error fetching subscription stats:', error);
    throw error;
  }
}

/**
 * Get detailed subscription list
 */
export async function getSubscriptionDetails(
  filter?: 'active' | 'cancelled' | 'refunded' | 'trial'
): Promise<SubscriptionDetail[]> {
  try {
    let query = supabase
      .from('subscriptions')
      .select(`
        id,
        user_id,
        status,
        plan_tier,
        start_date,
        end_date,
        cancelled_date,
        refunded_date,
        amount,
        created_at,
        profiles(name, email)
      `);

    if (filter) {
      query = query.eq('status', filter);
    }

    const { data, error } = await query
      .order('created_at', { ascending: false });

    if (error) throw error;

    return (data || []).map(sub => ({
      id: sub.id,
      userId: sub.user_id,
      userEmail: (sub.profiles as any)?.email || 'unknown',
      userName: (sub.profiles as any)?.name || 'Unknown User',
      status: sub.status,
      planTier: sub.plan_tier,
      startDate: sub.start_date,
      endDate: sub.end_date,
      cancelledDate: sub.cancelled_date,
      refundedDate: sub.refunded_date,
      amount: sub.amount || 0,
      createdAt: sub.created_at
    }));
  } catch (error) {
    console.error('Error fetching subscription details:', error);
    throw error;
  }
}

/**
 * Get revenue data by time period
 */
export async function getRevenueData(
  period: 'week' | 'month' | 'year' = 'month'
): Promise<{ date: string; revenue: number }[]> {
  try {
    const { data: subscriptions, error } = await supabase
      .from('subscriptions')
      .select('created_at, amount, status')
      .eq('status', 'active');

    if (error) throw error;

    // Group by date based on period
    const grouped: Record<string, number> = {};

    (subscriptions || []).forEach(sub => {
      const date = new Date(sub.created_at);
      let key: string;

      if (period === 'week') {
        const weekStart = new Date(date);
        weekStart.setDate(date.getDate() - date.getDay());
        key = weekStart.toISOString().split('T')[0];
      } else if (period === 'month') {
        key = date.toISOString().split('T')[0].slice(0, 7);
      } else {
        key = date.toISOString().split('T')[0].slice(0, 4);
      }

      grouped[key] = (grouped[key] || 0) + (sub.amount || 0);
    });

    return Object.entries(grouped)
      .map(([date, revenue]) => ({ date, revenue }))
      .sort((a, b) => a.date.localeCompare(b.date));
  } catch (error) {
    console.error('Error fetching revenue data:', error);
    throw error;
  }
}

/**
 * Get churn metrics
 */
export async function getChurnMetrics() {
  try {
    const { data: subscriptions, error } = await supabase
      .from('subscriptions')
      .select('status, created_at, cancelled_date');

    if (error) throw error;

    const active = subscriptions?.filter(s => s.status === 'active').length || 0;
    const cancelled = subscriptions?.filter(s => s.status === 'cancelled').length || 0;
    const total = active + cancelled;

    const churnRate = total > 0 ? ((cancelled / total) * 100).toFixed(2) : '0.00';

    return {
      activeSubscriptions: active,
      cancelledSubscriptions: cancelled,
      totalSubscriptions: total,
      churnRate: parseFloat(churnRate),
      retentionRate: (100 - parseFloat(churnRate)).toFixed(2)
    };
  } catch (error) {
    console.error('Error fetching churn metrics:', error);
    throw error;
  }
}

/**
 * Export data as CSV
 */
export async function exportSubscriptionsCSV(): Promise<string> {
  try {
    const subscriptions = await getSubscriptionDetails();

    const csv = [
      ['ID', 'Email', 'Nome', 'Status', 'Plano', 'Valor', 'Data Início', 'Data Cancelamento'].join(','),
      ...subscriptions.map(s =>
        [
          s.id,
          `"${s.userEmail}"`,
          `"${s.userName}"`,
          s.status,
          s.planTier,
          s.amount.toFixed(2),
          new Date(s.startDate).toLocaleDateString('pt-BR'),
          s.cancelledDate ? new Date(s.cancelledDate).toLocaleDateString('pt-BR') : ''
        ].join(',')
      )
    ].join('\n');

    return csv;
  } catch (error) {
    console.error('Error exporting CSV:', error);
    throw error;
  }
}
