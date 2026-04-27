/* eslint-disable react-refresh/only-export-components */
/* eslint-disable @typescript-eslint/no-explicit-any */
import { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { useAuth } from '@/hooks/useAuth';

type Language = 'pt-BR' | 'en' | 'es';

export interface Translations {
  // Common
  save: string;
  cancel: string;
  close: string;
  delete: string;
  edit: string;
  add: string;
  search: string;
  loading: string;
  all: string;
  // Navigation
  home: string;
  fridge: string;
  recipes: string;
  shopping: string;
  settings: string;
  // Home Tab
  hello: string;
  yourHome: string;
  monthlyReport: string;
  monthlyReportSub: string;
  nightCheckup: string;
  nightCheckupSub: string;
  expiringSoon: string;
  items: string;
  recentlyAdded: string;
  inFridge: string;
  expiresToday: string;
  alerts: string;
  toBuy: string;
  seeAll: string;
  tagline: string;
  noItems: string;
  shoppingItems: string;
  alertsSection: string;
  fridgeSection: string;
  expiringSection: string;
  empty: string;
  searchPlaceholder: string;
  tipOfDay: string;
  tryRecipe: string;
  weeklyProgress: string;
  consumed: string;
  wasted: string;
  addItem: string;
  consumablesLow: string;
  daysLeft: string;
  addToList: string;
  goodMorning: string;
  goodAfternoon: string;
  goodEvening: string;
  greetingExpiring: string;
  greetingAlerts: string;
  greetingAllGood: string;
  payList: string;
  noResults: string;
  useExpiring: string;
  // Fridge Tab
  myFridge: string;
  addItemFridge: string;
  expiresIn: string;
  days: string;
  expired: string;
  freezer: string;
  pantry: string;
  cleaning: string;
  allStock: string;
  itemsTotal: string;
  scanner: string;
  tryAnother: string;
  addItemsBtn: string;
  consumables: string;
  select: string;
  selectAll: string;
  deleteSelected: string;
  selected: string;
  deleted: string;
  editItem: string;
  qty: string;
  location: string;
  refreeze: string;
  refrozen: string;
  lowStock: string;
  runningLow: string;
  trackConsumables: string;
  trackConsumablesDesc: string;
  // Categories
  catFruit: string;
  catVegetable: string;
  catMeat: string;
  catDairy: string;
  catCooked: string;
  catFrozen: string;
  catBeverage: string;
  catPantry: string;
  catCleaning: string;
  catHygiene: string;
  // Recipes Tab
  recipesTitle: string;
  generateRecipes: string;
  noRecipes: string;
  prepTime: string;
  servings: string;
  ingredients: string;
  instructions: string;
  // Shopping Tab
  shoppingList: string;
  share: string;
  clearCompleted: string;
  completed: string;
  // Settings
  profile: string;
  editProfile: string;
  shortcuts: string;
  notifications: string;
  appearance: string;
  language: string;
  security: string;
  history: string;
  historyDesc: string;
  garbage: string;
  garbageDesc: string;
  report: string;
  reportDesc: string;
  logout: string;
  darkMode: string;
  subscription: string;
  subscriptionDesc: string;
  memberSince: string;
  trialStatus: string;
  premiumStatus: string;
  daysRemaining: string;
  paymentHistory: string;
  lastPayment: string;
  viewSubscription: string;
  trial: string;
  premium: string;
  residents: string;
  house: string;
  apartment: string;
  madeWith: string;
  changePassword: string;
  changePasswordDesc: string;
  deleteAccount: string;
  deleteAccountDesc: string;
  faq: string;
  faqDesc: string;
  privacy: string;
  privacyDesc: string;
  helpSupport: string;
  reconfigure: string;
  reconfigureDesc: string;
  notifTitle: string;
  notifDesc: string;
  testNotif: string;
  testNotifDesc: string;
  notifSent: string;
  notifSeconds: string;
  // Settings - Notifications Options
  notifOptExpiry: string;
  notifOptExpiryDesc: string;
  notifOptShopping: string;
  notifOptShoppingDesc: string;
  notifOptRecipes: string;
  notifOptRecipesDesc: string;
  notifOptNight: string;
  notifOptNightDesc: string;
  notifOptCooking: string;
  notifOptCookingDesc: string;
  notifOptConsumables: string;
  notifOptConsumablesDesc: string;
  notifOptGarbage: string;
  notifOptGarbageDesc: string;
  notifOptAchievements: string;
  notifOptAchievementsDesc: string;
  notifOptForce: string;
  notifOptForceDesc: string;
  // Settings - App
  appTitle: string;
  updateAlerts: string;
  updateAlertsDesc: string;
  checkUpdates: string;
  checkUpdatesDesc: string;
  // Settings - Subscription inherited
  sharedPlanActive: string;
  fullAccessActive: string;
  limitedFeatures: string;
  nextPayment: string;
  // Units
  un: string;
  // Monthly Report
  savingsTitle: string;
  savingsSubtitle: string;
  efficiency: string;
  impactTitle: string;
  waterSavedDesc: string;
  co2SavedDesc: string;
  savingsExplanation: string;
  savingsMethodology: string;
  shareReport: string;
}

const translations: Record<Language, Translations> = {
  'pt-BR': {
    save: 'Salvar',
    cancel: 'Cancelar',
    close: 'Fechar',
    delete: 'Excluir',
    edit: 'Editar',
    add: 'Adicionar',
    search: 'Buscar',
    loading: 'Carregando...',
    all: 'Todos',
    home: 'Início',
    fridge: 'Geladeira',
    recipes: 'Receitas',
    shopping: 'Lista',
    settings: 'Ajustes',
    // Home
    hello: 'Olá',
    yourHome: 'Início',
    monthlyReport: 'Relatório Mensal',
    monthlyReportSub: 'Resumo do mês',
    nightCheckup: 'Check-up Noturno',
    nightCheckupSub: 'Revisão diária',
    expiringSoon: 'Vencendo em breve',
    items: 'itens',
    recentlyAdded: 'Adicionados recentemente',
    inFridge: 'Na geladeira',
    expiresToday: 'Vence hoje',
    alerts: 'Alertas',
    toBuy: 'Comprar',
    seeAll: 'Ver todos',
    tagline: 'Menos desperdício, mais economia.',
    noItems: 'Nenhum item aqui.',
    shoppingItems: 'Lista de compras',
    alertsSection: 'Alertas ativos',
    fridgeSection: 'Itens na geladeira',
    expiringSection: 'Vencendo hoje',
    empty: 'Vazio',
    searchPlaceholder: 'Buscar itens...',
    tipOfDay: 'Dica do dia',
    tryRecipe: 'Experimentar',
    weeklyProgress: 'Progresso da semana',
    consumed: 'Consumidos',
    wasted: 'Desperdiçados',
    addItem: 'Adicionar item',
    consumablesLow: 'Consumíveis acabando',
    daysLeft: 'd restantes',
    addToList: 'Adicionar à lista',
    goodMorning: 'Bom dia',
    goodAfternoon: 'Boa tarde',
    goodEvening: 'Boa noite',
    greetingExpiring: 'item(ns) vencendo hoje!',
    greetingAlerts: 'alerta(s) pendente(s)',
    greetingAllGood: 'Tudo em dia! 🎉',
    payList: 'Guardar lista',
    noResults: 'Nenhum resultado encontrado.',
    useExpiring: 'Use antes que vença:',
    // Fridge
    myFridge: 'Minha Geladeira',
    addItemFridge: 'Adicionar item',
    expiresIn: 'Vence em',
    days: 'dias',
    expired: 'Vencido',
    freezer: 'Freezer',
    pantry: 'Despensa',
    cleaning: 'Limpeza',
    allStock: 'Todo o Estoque',
    itemsTotal: 'itens no total',
    scanner: 'Scanner',
    tryAnother: 'Tente outra busca',
    addItemsBtn: 'Adicione itens usando o botão +',
    consumables: 'Consumíveis',
    select: 'Selecionar',
    selectAll: 'Todos',
    deleteSelected: 'Excluir selecionados',
    selected: 'selecionados',
    deleted: 'itens excluídos',
    editItem: 'Editar Item',
    qty: 'Quantidade',
    location: 'Local',
    refreeze: 'Recongelar',
    refrozen: 'recongelado',
    lowStock: 'Estoque baixo',
    runningLow: 'Acabando',
    trackConsumables: 'Rastrear Consumíveis',
    trackConsumablesDesc: 'Papel higiênico, detergente, etc.',
    // Categories
    catFruit: '🍎 Frutas',
    catVegetable: '🥬 Legumes e Verduras',
    catMeat: '🍖 Carnes',
    catDairy: '🥛 Laticínios',
    catCooked: '🍲 Comidas Prontas',
    catFrozen: '❄️ Congelados',
    catBeverage: '🥤 Bebidas',
    catPantry: '🏪 Dispensa',
    catCleaning: '🧹 Limpeza',
    catHygiene: '🧴 Higiene',
    // Recipes
    recipesTitle: 'Receitas',
    generateRecipes: 'Gerar receitas',
    noRecipes: 'Sem receitas',
    prepTime: 'Tempo de preparo',
    servings: 'Porções',
    ingredients: 'Ingredientes',
    instructions: 'Modo de preparo',
    // Shopping
    shoppingList: 'Lista de Compras',
    share: 'Compartilhar',
    clearCompleted: 'Limpar concluídos',
    completed: 'Concluído',
    // Settings
    profile: 'Perfil',
    editProfile: 'Editar informações pessoais',
    shortcuts: 'Atalhos Rápidos',
    notifications: 'Notificações',
    appearance: 'Aparência',
    language: 'Idioma',
    security: 'Segurança',
    history: 'Histórico',
    historyDesc: 'Atividades recentes',
    garbage: 'Lembrete do Lixo',
    garbageDesc: 'Dias de coleta',
    report: 'Relatórios',
    reportDesc: 'Consumo do mês',
    logout: 'Sair da conta',
    darkMode: 'Modo Escuro',
    subscription: 'Assinatura',
    subscriptionDesc: 'Veja os detalhes do seu plano',
    memberSince: 'Membro desde',
    trialStatus: 'Status do Trial',
    premiumStatus: 'Status Premium',
    daysRemaining: 'dias restantes',
    paymentHistory: 'Histórico de Pagamento',
    lastPayment: 'Último pagamento',
    viewSubscription: 'Visualizar Assinatura',
    trial: 'Gratuito',
    premium: 'Premium',
    residents: 'moradores',
    house: 'Casa',
    apartment: 'Apartamento',
    madeWith: 'Feito com ❤️ para sua casa',
    changePassword: 'Alterar Senha',
    changePasswordDesc: 'Atualize sua senha de acesso',
    deleteAccount: 'Excluir Conta',
    deleteAccountDesc: 'Remover permanentemente seus dados',
    faq: 'Perguntas Frequentes',
    faqDesc: 'Dúvidas sobre o app',
    privacy: 'Privacidade',
    privacyDesc: 'Política de privacidade',
    helpSupport: 'Ajuda & Suporte',
    reconfigure: 'Reconfigurar Casa',
    reconfigureDesc: 'Refazer a configuração inicial',
    notifTitle: 'Notificações',
    notifDesc: 'Escolha para que deseja ser notificado',
    testNotif: 'Testar',
    testNotifDesc: 'Enviar uma notificação de teste',
    notifSent: 'Notificação de teste agendada!',
    notifSeconds: 'segundos',
    // Notif Options
    notifOptExpiry: 'Validade',
    notifOptExpiryDesc: 'Itens prestes a vencer',
    notifOptShopping: 'Compras',
    notifOptShoppingDesc: 'Itens da lista de compras',
    notifOptRecipes: 'Receitas',
    notifOptRecipesDesc: 'Sugestões de receitas',
    notifOptNight: 'Check-up Noturno',
    notifOptNightDesc: 'Lembrete diário',
    notifOptCooking: 'Cozinhando',
    notifOptCookingDesc: 'Temporizadores de cozinha',
    notifOptConsumables: 'Consumíveis',
    notifOptConsumablesDesc: 'Reposição de itens',
    notifOptGarbage: 'Lixo',
    notifOptGarbageDesc: 'Lembretes de coleta',
    notifOptAchievements: 'Conquistas',
    notifOptAchievementsDesc: 'Progresso e metas',
    notifOptForce: 'Forçar Alertas',
    notifOptForceDesc: 'Força as notificações na casa inteira',
    // App
    appTitle: 'Aplicativo',
    updateAlerts: 'Alertas de atualização',
    updateAlertsDesc: 'Exibir notificação quando houver versão nova',
    checkUpdates: 'Verificar atualizações',
    checkUpdatesDesc: 'Baixar a última versão do Kaza',
    // Subscription Inherited
    sharedPlanActive: 'Plano compartilhado ativo',
    fullAccessActive: 'Acesso completo ativo',
    limitedFeatures: 'Recursos limitados',
    nextPayment: 'Próximo pagamento: ',
    // Units
    un: 'un',
    // Monthly Report
    savingsTitle: 'Relatório Mensal',
    savingsSubtitle: 'Resumo do mês',
    efficiency: 'Eficiência',
    impactTitle: 'Impacto Ambiental',
    waterSavedDesc: 'litros de água economizados',
    co2SavedDesc: 'kg CO₂ evitados',
    savingsExplanation: 'Estimativa baseada no valor médio de R$ 8,00 por item consumido (preço médio da cesta básica brasileira).',
    savingsMethodology: 'Método Honesto',
    shareReport: 'Compartilhar Relatório',
  },
  en: {
    save: 'Save',
    cancel: 'Cancel',
    close: 'Close',
    delete: 'Delete',
    edit: 'Edit',
    add: 'Add',
    search: 'Search',
    loading: 'Loading...',
    all: 'All',
    home: 'Home',
    fridge: 'Fridge',
    recipes: 'Recipes',
    shopping: 'List',
    settings: 'Settings',
    // Home
    hello: 'Hello',
    yourHome: 'Home',
    monthlyReport: 'Monthly Report',
    monthlyReportSub: 'Month summary',
    nightCheckup: 'Night Check-up',
    nightCheckupSub: 'Daily review',
    expiringSoon: 'Expiring soon',
    items: 'items',
    recentlyAdded: 'Recently added',
    inFridge: 'In fridge',
    expiresToday: 'Expires today',
    alerts: 'Alerts',
    toBuy: 'To buy',
    seeAll: 'See all',
    tagline: 'Less waste, more savings.',
    noItems: 'No items here.',
    shoppingItems: 'Shopping list',
    alertsSection: 'Active alerts',
    fridgeSection: 'Items in fridge',
    expiringSection: 'Expiring today',
    empty: 'Empty',
    searchPlaceholder: 'Search items...',
    tipOfDay: 'Tip of the day',
    tryRecipe: 'Try it',
    weeklyProgress: 'Weekly progress',
    consumed: 'Consumed',
    wasted: 'Wasted',
    addItem: 'Add item',
    consumablesLow: 'Low consumables',
    daysLeft: 'd left',
    addToList: 'Add to list',
    goodMorning: 'Good morning',
    goodAfternoon: 'Good afternoon',
    goodEvening: 'Good evening',
    greetingExpiring: 'item(s) expiring today!',
    greetingAlerts: 'pending alert(s)',
    greetingAllGood: 'All good! 🎉',
    payList: 'Save list',
    noResults: 'No results found.',
    useExpiring: 'Use before it expires:',
    // Fridge
    myFridge: 'My Fridge',
    addItemFridge: 'Add item',
    expiresIn: 'Expires in',
    days: 'days',
    expired: 'Expired',
    freezer: 'Freezer',
    pantry: 'Pantry',
    cleaning: 'Cleaning',
    allStock: 'All Stock',
    itemsTotal: 'total items',
    scanner: 'Scanner',
    tryAnother: 'Try another search',
    addItemsBtn: 'Add items using the + button',
    consumables: 'Consumables',
    select: 'Select',
    selectAll: 'All',
    deleteSelected: 'Delete selected',
    selected: 'selected',
    deleted: 'items deleted',
    editItem: 'Edit Item',
    qty: 'Quantity',
    location: 'Location',
    refreeze: 'Re-freeze',
    refrozen: 're-frozen',
    lowStock: 'Low stock',
    runningLow: 'Running low',
    trackConsumables: 'Track Consumables',
    trackConsumablesDesc: 'Toilet paper, detergent, etc.',
    // Categories
    catFruit: '🍎 Fruits',
    catVegetable: '🥬 Vegetables',
    catMeat: '🍖 Meat',
    catDairy: '🥛 Dairy',
    catCooked: '🍲 Prepared Foods',
    catFrozen: '❄️ Frozen',
    catBeverage: '🥤 Beverages',
    catPantry: '🏪 Pantry',
    catCleaning: '🧹 Cleaning',
    catHygiene: '🧴 Hygiene',
    // Recipes
    recipesTitle: 'Recipes',
    generateRecipes: 'Generate recipes',
    noRecipes: 'No recipes',
    prepTime: 'Prep time',
    servings: 'Servings',
    ingredients: 'Ingredients',
    instructions: 'Instructions',
    // Shopping
    shoppingList: 'Shopping List',
    share: 'Share',
    clearCompleted: 'Clear completed',
    completed: 'Completed',
    // Settings
    profile: 'Profile',
    editProfile: 'Edit personal information',
    shortcuts: 'Quick Shortcuts',
    notifications: 'Notifications',
    appearance: 'Appearance',
    language: 'Language',
    security: 'Security',
    history: 'History',
    historyDesc: 'Recent activities',
    garbage: 'Garbage Reminder',
    garbageDesc: 'Collection days',
    report: 'Reports',
    reportDesc: 'Monthly consumption',
    logout: 'Log out',
    darkMode: 'Dark Mode',
    subscription: 'Subscription',
    subscriptionDesc: 'View your plan details',
    memberSince: 'Member since',
    trialStatus: 'Trial Status',
    premiumStatus: 'Premium Status',
    daysRemaining: 'days remaining',
    paymentHistory: 'Payment History',
    lastPayment: 'Last payment',
    viewSubscription: 'View Subscription',
    trial: 'Free',
    premium: 'Premium',
    residents: 'residents',
    house: 'House',
    apartment: 'Apartment',
    madeWith: 'Made with ❤️ for your home',
    changePassword: 'Change Password',
    changePasswordDesc: 'Update your access password',
    deleteAccount: 'Delete Account',
    deleteAccountDesc: 'Permanently remove your data',
    faq: 'FAQ',
    faqDesc: 'Questions about the app',
    privacy: 'Privacy',
    privacyDesc: 'Privacy policy',
    helpSupport: 'Help & Support',
    reconfigure: 'Reconfigure Home',
    reconfigureDesc: 'Redo the initial setup',
    notifTitle: 'Notifications',
    notifDesc: 'Choose what you want to be notified about',
    testNotif: 'Test notification',
    testNotifDesc: 'Send a test notification',
    notifSent: 'Test notification scheduled!',
    notifSeconds: 'seconds',
    // Notif Options
    notifOptExpiry: 'Expiry',
    notifOptExpiryDesc: 'Items about to expire',
    notifOptShopping: 'Shopping',
    notifOptShoppingDesc: 'Shopping list items',
    notifOptRecipes: 'Recipes',
    notifOptRecipesDesc: 'Recipe suggestions',
    notifOptNight: 'Night Checkup',
    notifOptNightDesc: 'Daily reminder',
    notifOptCooking: 'Cooking',
    notifOptCookingDesc: 'Kitchen timers',
    notifOptConsumables: 'Consumables',
    notifOptConsumablesDesc: 'Item restocking',
    notifOptGarbage: 'Garbage',
    notifOptGarbageDesc: 'Collection reminders',
    notifOptAchievements: 'Achievements',
    notifOptAchievementsDesc: 'Progress and goals',
    notifOptForce: 'Force Alerts',
    notifOptForceDesc: 'Force notifications for the whole home',
    // App
    appTitle: 'App',
    updateAlerts: 'Update alerts',
    updateAlertsDesc: 'Show notification when new version is available',
    checkUpdates: 'Check for updates',
    checkUpdatesDesc: 'Download the latest Kaza version',
    // Subscription Inherited
    sharedPlanActive: 'Shared plan active',
    fullAccessActive: 'Full access active',
    limitedFeatures: 'Limited features',
    nextPayment: 'Next payment: ',
    // Units
    un: 'un',
    // Monthly Report
    savingsTitle: 'Monthly Report',
    savingsSubtitle: 'Month summary',
    efficiency: 'Efficiency',
    impactTitle: 'Environmental Impact',
    waterSavedDesc: 'liters of water saved',
    co2SavedDesc: 'kg CO₂ avoided',
    savingsExplanation: 'We base savings on an average value of R$ 8.00 per item consumed, considering the average price of a basic food basket.',
    savingsMethodology: 'Honest Method',
    shareReport: 'Share Report',
  },
  es: {
    save: 'Guardar',
    cancel: 'Cancelar',
    close: 'Cerrar',
    delete: 'Eliminar',
    edit: 'Editar',
    add: 'Agregar',
    search: 'Buscar',
    loading: 'Cargando...',
    all: 'Todos',
    home: 'Inicio',
    fridge: 'Nevera',
    recipes: 'Recetas',
    shopping: 'Lista',
    settings: 'Ajustes',
    // Home
    hello: 'Hola',
    yourHome: 'Inicio',
    monthlyReport: 'Reporte Mensual',
    monthlyReportSub: 'Resumen del mes',
    nightCheckup: 'Chequeo Nocturno',
    nightCheckupSub: 'Revisión diaria',
    expiringSoon: 'Por vencer',
    items: 'artículos',
    recentlyAdded: 'Agregados recientemente',
    inFridge: 'En nevera',
    expiresToday: 'Vence hoy',
    alerts: 'Alertas',
    toBuy: 'Comprar',
    seeAll: 'Ver todos',
    tagline: 'Menos desperdicio, más ahorro.',
    noItems: 'Ningún artículo aquí.',
    shoppingItems: 'Lista de compras',
    alertsSection: 'Alertas activas',
    fridgeSection: 'Artículos en nevera',
    expiringSection: 'Vence hoy',
    empty: 'Vacío',
    searchPlaceholder: 'Buscar artículos...',
    tipOfDay: 'Consejo del día',
    tryRecipe: 'Probar',
    weeklyProgress: 'Progresso semanal',
    consumed: 'Consumidos',
    wasted: 'Desperdiciados',
    addItem: 'Agregar artículo',
    consumablesLow: 'Consumibles bajos',
    daysLeft: 'd restantes',
    addToList: 'Agregar a la lista',
    goodMorning: 'Buenos días',
    goodAfternoon: 'Buenas tardes',
    goodEvening: 'Buenas noches',
    greetingExpiring: 'artículo(s) por vencer hoy!',
    greetingAlerts: 'alerta(s) pendiente(s)',
    greetingAllGood: '¡Todo en orden! 🎉',
    payList: 'Guardar lista',
    noResults: 'Sin resultados.',
    useExpiring: 'Usa antes de que venza:',
    // Fridge
    myFridge: 'Mi Nevera',
    addItemFridge: 'Agregar artículo',
    expiresIn: 'Vence en',
    days: 'días',
    expired: 'Vencido',
    freezer: 'Congelador',
    pantry: 'Despensa',
    cleaning: 'Limpieza',
    allStock: 'Todo el Inventario',
    itemsTotal: 'artículos en total',
    scanner: 'Escáner',
    tryAnother: 'Intenta otra búsqueda',
    addItemsBtn: 'Añade artículos usando el botón +',
    consumables: 'Consumibles',
    select: 'Seleccionar',
    selectAll: 'Todos',
    deleteSelected: 'Eliminar seleccionados',
    selected: 'seleccionados',
    deleted: 'artículos eliminados',
    editItem: 'Editar Artículo',
    qty: 'Cantidad',
    location: 'Ubicación',
    refreeze: 'Recongelar',
    refrozen: 'recongelado',
    lowStock: 'Stock bajo',
    runningLow: 'Agotándose',
    trackConsumables: 'Rastrear Consumibles',
    trackConsumablesDesc: 'Papel higiénico, detergente, etc.',
    // Categories
    catFruit: '🍎 Frutas',
    catVegetable: '🥬 Verduras',
    catMeat: '🍖 Carnes',
    catDairy: '🥛 Lácteos',
    catCooked: '🍲 Comidas Preparadas',
    catFrozen: '❄️ Congelados',
    catBeverage: '🥤 Bebidas',
    catPantry: '🏪 Despensa',
    catCleaning: '🧹 Limpieza',
    catHygiene: '🧴 Higiene',
    // Recipes
    recipesTitle: 'Recetas',
    generateRecipes: 'Generar recetas',
    noRecipes: 'Sin recetas',
    prepTime: 'Tiempo de preparación',
    servings: 'Porciones',
    ingredients: 'Ingredientes',
    instructions: 'Preparación',
    // Shopping
    shoppingList: 'Lista de Compras',
    share: 'Compartir',
    clearCompleted: 'Borrar completados',
    completed: 'Completado',
    // Settings
    profile: 'Perfil',
    editProfile: 'Editar información personal',
    shortcuts: 'Accesos Rápidos',
    notifications: 'Notificaciones',
    appearance: 'Apariencia',
    language: 'Idioma',
    security: 'Seguridad',
    history: 'Historial',
    historyDesc: 'Actividades recentes',
    garbage: 'Recordatorio de Basura',
    garbageDesc: 'Días de recolección',
    report: 'Informes',
    reportDesc: 'Consumo del mes',
    logout: 'Cerrar sesión',
    darkMode: 'Modo Escuro',
    subscription: 'Suscripción',
    subscriptionDesc: 'Ver los detalles de tu plan',
    memberSince: 'Miembro desde',
    trialStatus: 'Estado del Trial',
    premiumStatus: 'Estado Premium',
    daysRemaining: 'dias restantes',
    paymentHistory: 'Historial de Pagos',
    lastPayment: 'Último pago',
    viewSubscription: 'Ver Suscripción',
    trial: 'Gratis',
    premium: 'Premium',
    residents: 'residentes',
    house: 'Casa',
    apartment: 'Apartamento',
    madeWith: 'Hecho con ❤️ para tu hogar',
    changePassword: 'Cambiar Contraseña',
    changePasswordDesc: 'Actualiza tu contraseña de acceso',
    deleteAccount: 'Eliminar Cuenta',
    deleteAccountDesc: 'Eliminar permanentemente tus datos',
    faq: 'Preguntas Frequentes',
    faqDesc: 'Dudas sobre la app',
    privacy: 'Privacidad',
    privacyDesc: 'Política de privacidad',
    helpSupport: 'Ayuda & Soporte',
    reconfigure: 'Reconfigurar Hogar',
    reconfigureDesc: 'Rehacer la configuración inicial',
    notifTitle: 'Notificaciones',
    notifDesc: 'Elige para qué quieres ser notificado',
    testNotif: 'Probar notificación',
    testNotifDesc: 'Enviar una notificación de prueba',
    notifSent: '¡Notificación de prueba programada!',
    notifSeconds: 'segundos',
    // Notif Options
    notifOptExpiry: 'Vencimiento',
    notifOptExpiryDesc: 'Artículos por vencer',
    notifOptShopping: 'Compras',
    notifOptShoppingDesc: 'Lista de compras',
    notifOptRecipes: 'Recetas',
    notifOptRecipesDesc: 'Sugerencias de recetas',
    notifOptNight: 'Chequeo Nocturno',
    notifOptNightDesc: 'Recordatorio diario',
    notifOptCooking: 'Cocinando',
    notifOptCookingDesc: 'Temporizadores de cocina',
    notifOptConsumables: 'Consumibles',
    notifOptConsumablesDesc: 'Reposición de artículos',
    notifOptGarbage: 'Basura',
    notifOptGarbageDesc: 'Recordatorios de recolección',
    notifOptAchievements: 'Logros',
    notifOptAchievementsDesc: 'Progresso e metas',
    notifOptForce: 'Forzar Alertas',
    notifOptForceDesc: 'Fuerza las notificaciones en toda la casa',
    // App
    appTitle: 'Aplicación',
    updateAlerts: 'Alertas de actualización',
    updateAlertsDesc: 'Mostrar notificación cuando haya nueva versión',
    checkUpdates: 'Verificar actualizaciones',
    checkUpdatesDesc: 'Descargar la última versión de Kaza',
    // Subscription Inherited
    sharedPlanActive: 'Plan compartido activo',
    fullAccessActive: 'Acceso completo activo',
    limitedFeatures: 'Recursos limitados',
    nextPayment: 'Próximo pago: ',
    // Units
    un: 'un',
    // Monthly Report
    savingsTitle: 'Reporte Mensual',
    savingsSubtitle: 'Resumen del mes',
    efficiency: 'Eficiencia',
    impactTitle: 'Impacto Ambiental',
    waterSavedDesc: 'litros de agua ahorrados',
    co2SavedDesc: 'kg CO₂ evitados',
    savingsExplanation: 'Basamos el ahorro en un valor medio de R$ 8,00 por artículo consumido, considerando el precio medio de la canasta básica.',
    savingsMethodology: 'Método Honesto',
    shareReport: 'Compartir Reporte',
  },
};

interface LanguageContextType {
  language: Language;
  setLanguage: (lang: Language) => void;
  t: Translations;
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

const LS_KEY = 'Kaza-language';

export function LanguageProvider({ children }: { children: ReactNode }) {
  const { user } = useAuth();

  // Leitura inicial do localStorage — instantânea, sem flash
  const [language, setLanguageState] = useState<Language>(() => {
    return (localStorage.getItem(LS_KEY) as Language) || 'pt-BR';
  });

  // Sincroniza lang do documento
  useEffect(() => {
    document.documentElement.lang = language;
  }, [language]);

  // Sincroniza DO banco quando o usuário loga (fonte de verdade = DB)
  useEffect(() => {
    if (!user) return;
    supabase
      .from('profiles')
      .select('language_preference')
      .eq('user_id', user.id)
      .maybeSingle()
      .then(({ data }) => {
        const dbLang = (data as any)?.language_preference as Language | undefined;
        if (dbLang && dbLang !== localStorage.getItem(LS_KEY)) {
          setLanguageState(dbLang);
          localStorage.setItem(LS_KEY, dbLang);
        }
      })
      .catch(() => { /* falha silenciosa — localStorage mantém o valor */ });
  }, [user?.id]);

  const setLanguage = (lang: Language) => {
    setLanguageState(lang);
    localStorage.setItem(LS_KEY, lang);
    // Persiste no banco (best-effort)
    if (user) {
      (supabase as any)
        .from('profiles')
        .update({ language_preference: lang })
        .eq('user_id', user.id)
        .then(() => {})
        .catch(() => {});
    }
  };

  return (
    <LanguageContext.Provider value={{ language, setLanguage, t: translations[language] }}>
      {children}
    </LanguageContext.Provider>
  );
}

export function useLanguage() {
  const context = useContext(LanguageContext);
  if (!context) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return context;
}
