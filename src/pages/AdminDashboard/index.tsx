import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft, Download, RefreshCw, Eye, EyeOff, LogOut } from 'lucide-react';
import { toast } from 'sonner';
import { PageTransition } from '@/components/PageTransition';
import { Button } from '@/components/ui/button';
import {
  getSubscriptionStats,
  getSubscriptionDetails,
  getChurnMetrics,
  exportSubscriptionsCSV,
  SubscriptionStats,
  SubscriptionDetail
} from '@/lib/adminQueries';
import { getAdminUser, logAdminAction } from '@/lib/adminAuth';
import { supabase } from '@/integrations/supabase/client';

interface ChurnMetrics {
  activeSubscriptions: number;
  cancelledSubscriptions: number;
  totalSubscriptions: number;
  churnRate: number;
  retentionRate: string;
}

export default function AdminDashboard() {
  const navigate = useNavigate();
  const [adminUser, setAdminUser] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);
  const [stats, setStats] = useState<SubscriptionStats | null>(null);
  const [churn, setChurn] = useState<ChurnMetrics | null>(null);
  const [details, setDetails] = useState<SubscriptionDetail[]>([]);
  const [showDetails, setShowDetails] = useState(false);
  const [selectedFilter, setSelectedFilter] = useState<'active' | 'cancelled' | 'refunded' | 'trial' | null>(null);

  // Verify admin access on mount
  useEffect(() => {
    const verifyAdmin = async () => {
      try {
        const admin = await getAdminUser();

        if (!admin) {
          console.warn('⚠️ Unauthorized admin access attempt');
          toast.error('Acesso negado. Você não é administrador.');
          setTimeout(() => navigate('/app/home'), 2000);
          return;
        }

        setAdminUser(admin);
        logAdminAction(admin.email, 'ADMIN_DASHBOARD_ACCESSED');

        // Load data
        await loadData();
      } catch (error) {
        console.error('Admin verification error:', error);
        toast.error('Erro ao verificar acesso de admin');
        navigate('/app/home');
      }
    };

    verifyAdmin();
  }, [navigate]);

  const loadData = async () => {
    try {
      setRefreshing(true);
      const [statsData, churnData, detailsData] = await Promise.all([
        getSubscriptionStats(),
        getChurnMetrics(),
        getSubscriptionDetails()
      ]);

      setStats(statsData);
      setChurn(churnData);
      setDetails(detailsData);
    } catch (error) {
      console.error('Error loading dashboard data:', error);
      toast.error('Erro ao carregar dados');
    } finally {
      setRefreshing(false);
      setLoading(false);
    }
  };

  const handleExport = async () => {
    try {
      const csv = await exportSubscriptionsCSV();
      const blob = new Blob([csv], { type: 'text/csv;charset=utf-8;' });
      const link = document.createElement('a');
      const url = URL.createObjectURL(blob);

      link.setAttribute('href', url);
      link.setAttribute('download', `subscriptions_${new Date().toISOString().split('T')[0]}.csv`);
      link.style.visibility = 'hidden';

      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);

      if (adminUser) {
        logAdminAction(adminUser.email, 'EXPORTED_SUBSCRIPTIONS_CSV');
      }

      toast.success('Dados exportados com sucesso');
    } catch (error) {
      console.error('Export error:', error);
      toast.error('Erro ao exportar dados');
    }
  };

  const handleLogout = async () => {
    try {
      if (adminUser) {
        logAdminAction(adminUser.email, 'ADMIN_LOGOUT');
      }

      await supabase.auth.signOut();
      navigate('/auth');
      toast.success('Desconectado');
    } catch (error) {
      console.error('Logout error:', error);
      toast.error('Erro ao desconectar');
    }
  };

  if (loading) {
    return (
      <PageTransition className="min-h-[100dvh] flex items-center justify-center bg-[#fafafa] dark:bg-[#091f1c]">
        <div className="text-center">
          <RefreshCw className="h-8 w-8 animate-spin mx-auto mb-4 text-primary" />
          <p className="text-muted-foreground">Carregando dashboard...</p>
        </div>
      </PageTransition>
    );
  }

  if (!adminUser) {
    return null;
  }

  const filteredDetails = selectedFilter
    ? details.filter(d => d.status === selectedFilter)
    : details;

  return (
    <PageTransition direction="right" className="min-h-[100dvh] bg-[#fafafa] dark:bg-[#091f1c] pb-20">
      {/* Header */}
      <header className="sticky top-0 z-50 flex items-center gap-3 bg-[#fafafa]/80 dark:bg-[#091f1c]/80 px-4 py-3 backdrop-blur-2xl border-b border-black/[0.02] dark:border-white/[0.02]">
        <button
          onClick={() => navigate('/app/home')}
          className="flex h-9 w-9 items-center justify-center rounded-xl text-foreground active:scale-[0.97] transition-all bg-white/80 dark:bg-white/10 shadow-sm border border-black/[0.03] dark:border-white/[0.03] backdrop-blur-xl"
        >
          <ArrowLeft className="h-5 w-5" />
        </button>
        <h1 className="text-lg font-bold text-foreground flex-1">Admin Dashboard 🔐</h1>
        <button
          onClick={handleLogout}
          className="flex h-9 w-9 items-center justify-center rounded-xl text-red-600 active:scale-[0.97] transition-all bg-red-50 dark:bg-red-500/20 shadow-sm border border-red-200 dark:border-red-500/30 hover:bg-red-100 dark:hover:bg-red-500/30"
          title="Logout"
        >
          <LogOut className="h-5 w-5" />
        </button>
      </header>

      <main className="mx-auto max-w-2xl px-4 py-6 space-y-6">
        {/* Admin Info */}
        <div className="rounded-2xl bg-blue-50 dark:bg-blue-500/10 border border-blue-200 dark:border-blue-500/30 p-4">
          <p className="text-sm font-semibold text-blue-900 dark:text-blue-200">
            👤 Conectado como: <span className="font-mono text-xs">{adminUser.email}</span>
          </p>
          <p className="text-xs text-blue-800 dark:text-blue-300 mt-1">
            Último acesso: {new Date().toLocaleString('pt-BR')}
          </p>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-2 gap-3">
          {/* Active Subscriptions */}
          <div className="rounded-2xl bg-emerald-50 dark:bg-emerald-500/10 border border-emerald-200 dark:border-emerald-500/30 p-4">
            <p className="text-xs font-bold text-emerald-700 dark:text-emerald-300 uppercase tracking-wider">
              ✅ Ativas
            </p>
            <p className="text-3xl font-black text-emerald-600 dark:text-emerald-400 mt-2">
              {stats?.activeCount || 0}
            </p>
            <p className="text-[10px] text-emerald-600 dark:text-emerald-400 mt-1">
              Assinaturas ativas
            </p>
          </div>

          {/* Cancelled Subscriptions */}
          <div className="rounded-2xl bg-orange-50 dark:bg-orange-500/10 border border-orange-200 dark:border-orange-500/30 p-4">
            <p className="text-xs font-bold text-orange-700 dark:text-orange-300 uppercase tracking-wider">
              ❌ Canceladas
            </p>
            <p className="text-3xl font-black text-orange-600 dark:text-orange-400 mt-2">
              {stats?.cancelledCount || 0}
            </p>
            <p className="text-[10px] text-orange-600 dark:text-orange-400 mt-1">
              Assinaturas canceladas
            </p>
          </div>

          {/* Refunded Subscriptions */}
          <div className="rounded-2xl bg-red-50 dark:bg-red-500/10 border border-red-200 dark:border-red-500/30 p-4">
            <p className="text-xs font-bold text-red-700 dark:text-red-300 uppercase tracking-wider">
              💸 Reembolsadas
            </p>
            <p className="text-3xl font-black text-red-600 dark:text-red-400 mt-2">
              {stats?.refundedCount || 0}
            </p>
            <p className="text-[10px] text-red-600 dark:text-red-400 mt-1">
              Assinaturas reembolsadas
            </p>
          </div>

          {/* Trial Count */}
          <div className="rounded-2xl bg-purple-50 dark:bg-purple-500/10 border border-purple-200 dark:border-purple-500/30 p-4">
            <p className="text-xs font-bold text-purple-700 dark:text-purple-300 uppercase tracking-wider">
              ⭐ Trials
            </p>
            <p className="text-3xl font-black text-purple-600 dark:text-purple-400 mt-2">
              {stats?.trialCount || 0}
            </p>
            <p className="text-[10px] text-purple-600 dark:text-purple-400 mt-1">
              Período de teste
            </p>
          </div>

          {/* Total Revenue */}
          <div className="rounded-2xl bg-green-50 dark:bg-green-500/10 border border-green-200 dark:border-green-500/30 p-4 col-span-2">
            <p className="text-xs font-bold text-green-700 dark:text-green-300 uppercase tracking-wider">
              💰 Receita Total
            </p>
            <p className="text-3xl font-black text-green-600 dark:text-green-400 mt-2">
              R$ {(stats?.totalRevenue || 0).toFixed(2).replace('.', ',')}
            </p>
            <p className="text-[10px] text-green-600 dark:text-green-400 mt-1">
              Assinaturas ativas
            </p>
          </div>
        </div>

        {/* Churn Metrics */}
        {churn && (
          <div className="rounded-2xl bg-white dark:bg-[#11302c] border border-[#E2E1DC] dark:border-white/10 p-4">
            <h3 className="font-bold text-[#2C2C2A] dark:text-white mb-3">📊 Métricas de Retenção</h3>
            <div className="space-y-2 text-sm">
              <div className="flex justify-between">
                <span className="text-[#7A7A72] dark:text-white/60">Taxa de Churn:</span>
                <span className="font-semibold text-red-600">{churn.churnRate}%</span>
              </div>
              <div className="flex justify-between">
                <span className="text-[#7A7A72] dark:text-white/60">Taxa de Retenção:</span>
                <span className="font-semibold text-emerald-600">{churn.retentionRate}%</span>
              </div>
              <div className="flex justify-between">
                <span className="text-[#7A7A72] dark:text-white/60">Total de Assinantes:</span>
                <span className="font-semibold">{churn.totalSubscriptions}</span>
              </div>
            </div>
          </div>
        )}

        {/* Action Buttons */}
        <div className="flex gap-2">
          <button
            onClick={() => {
              setShowDetails(!showDetails);
              setSelectedFilter(null);
            }}
            className="flex-1 flex items-center justify-center gap-2 rounded-xl bg-[#3D6B55] dark:bg-emerald-600 text-white py-3 font-semibold active:scale-[0.97] transition-all"
          >
            {showDetails ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
            {showDetails ? 'Ocultar Detalhes' : 'Ver Detalhes'}
          </button>

          <button
            onClick={handleExport}
            className="flex items-center justify-center gap-2 rounded-xl bg-[#F0EFE8] dark:bg-white/10 text-[#3D3D3A] dark:text-white py-3 px-4 font-semibold active:scale-[0.97] transition-all border border-[#E2E1DC] dark:border-white/10"
          >
            <Download className="h-4 w-4" />
            CSV
          </button>

          <button
            onClick={loadData}
            disabled={refreshing}
            className="flex items-center justify-center gap-2 rounded-xl bg-[#F0EFE8] dark:bg-white/10 text-[#3D3D3A] dark:text-white py-3 px-4 font-semibold active:scale-[0.97] transition-all border border-[#E2E1DC] dark:border-white/10 disabled:opacity-50"
          >
            <RefreshCw className={`h-4 w-4 ${refreshing ? 'animate-spin' : ''}`} />
          </button>
        </div>

        {/* Detailed View */}
        {showDetails && (
          <div className="space-y-3 animate-in fade-in">
            {/* Filter Buttons */}
            <div className="flex gap-2 overflow-x-auto pb-2">
              <button
                onClick={() => setSelectedFilter(null)}
                className={`px-3 py-1.5 rounded-lg text-xs font-semibold whitespace-nowrap transition-all ${
                  selectedFilter === null
                    ? 'bg-[#3D6B55] text-white'
                    : 'bg-[#F0EFE8] dark:bg-white/10 text-[#3D3D3A] dark:text-white'
                }`}
              >
                Todas ({details.length})
              </button>
              {(['active', 'cancelled', 'refunded', 'trial'] as const).map(status => {
                const count = details.filter(d => d.status === status).length;
                const labels = {
                  active: '✅ Ativas',
                  cancelled: '❌ Canceladas',
                  refunded: '💸 Reembolsadas',
                  trial: '⭐ Trial'
                };

                return (
                  <button
                    key={status}
                    onClick={() => setSelectedFilter(status)}
                    className={`px-3 py-1.5 rounded-lg text-xs font-semibold whitespace-nowrap transition-all ${
                      selectedFilter === status
                        ? 'bg-[#3D6B55] text-white'
                        : 'bg-[#F0EFE8] dark:bg-white/10 text-[#3D3D3A] dark:text-white'
                    }`}
                  >
                    {labels[status]} ({count})
                  </button>
                );
              })}
            </div>

            {/* Subscription List */}
            <div className="max-h-96 overflow-y-auto space-y-2">
              {filteredDetails.map(sub => (
                <div
                  key={sub.id}
                  className="rounded-lg bg-white dark:bg-[#11302c] border border-[#E2E1DC] dark:border-white/10 p-3 text-xs"
                >
                  <div className="flex justify-between items-start mb-1.5">
                    <div>
                      <p className="font-bold text-[#2C2C2A] dark:text-white">
                        {sub.userName || 'Unknown'}
                      </p>
                      <p className="text-[10px] text-[#7A7A72] dark:text-white/60 font-mono">
                        {sub.userEmail}
                      </p>
                    </div>
                    <span className={`px-2 py-1 rounded text-[10px] font-bold ${
                      sub.status === 'active'
                        ? 'bg-emerald-100 dark:bg-emerald-500/20 text-emerald-700 dark:text-emerald-300'
                        : sub.status === 'cancelled'
                          ? 'bg-orange-100 dark:bg-orange-500/20 text-orange-700 dark:text-orange-300'
                          : sub.status === 'refunded'
                            ? 'bg-red-100 dark:bg-red-500/20 text-red-700 dark:text-red-300'
                            : 'bg-purple-100 dark:bg-purple-500/20 text-purple-700 dark:text-purple-300'
                    }`}>
                      {sub.status.toUpperCase()}
                    </span>
                  </div>

                  <div className="grid grid-cols-2 gap-2 text-[10px] text-[#7A7A72] dark:text-white/60">
                    <div>
                      <p className="font-semibold">Plano</p>
                      <p>{sub.planTier}</p>
                    </div>
                    <div>
                      <p className="font-semibold">Valor</p>
                      <p>R$ {sub.amount.toFixed(2)}</p>
                    </div>
                    <div>
                      <p className="font-semibold">Início</p>
                      <p>{new Date(sub.startDate).toLocaleDateString('pt-BR')}</p>
                    </div>
                    <div>
                      <p className="font-semibold">
                        {sub.status === 'cancelled' ? 'Cancelado' : sub.status === 'refunded' ? 'Reembolso' : 'Fim'}
                      </p>
                      <p>
                        {sub.cancelledDate
                          ? new Date(sub.cancelledDate).toLocaleDateString('pt-BR')
                          : sub.refundedDate
                            ? new Date(sub.refundedDate).toLocaleDateString('pt-BR')
                            : sub.endDate
                              ? new Date(sub.endDate).toLocaleDateString('pt-BR')
                              : '-'}
                      </p>
                    </div>
                  </div>
                </div>
              ))}

              {filteredDetails.length === 0 && (
                <p className="text-center text-sm text-[#7A7A72] dark:text-white/60 py-4">
                  Nenhuma assinatura encontrada
                </p>
              )}
            </div>
          </div>
        )}

        {/* Footer */}
        <div className="text-center text-xs text-[#7A7A72] dark:text-white/40 p-4 border-t border-[#E2E1DC] dark:border-white/10">
          <p>Dashboard Admin Seguro</p>
          <p className="mt-1">Última atualização: {stats?.lastUpdated ? new Date(stats.lastUpdated).toLocaleString('pt-BR') : '-'}</p>
        </div>
      </main>
    </PageTransition>
  );
}
