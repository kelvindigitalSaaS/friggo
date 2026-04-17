import React, { useState } from "react";
import { Link } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { 
  Check, X, Search, ShieldCheck, User, Users, Bell, Search as SearchIcon, 
  Settings, Smartphone, LayoutDashboard, Calendar, ShoppingCart, 
  ChefHat, Sparkles, Box, ListChecks, ChevronRight, Apple, AlertCircle, PlayCircle, Lock
} from "lucide-react";

import LogoImage from "@/assets/logo inicial nome.svg";

// --- INTERACTIVE MOCKUPS COMPONENTS ---

// 1. Mockup for Hero
const HeroMockup = () => {
  return (
    <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[800px] h-[600px] lg:h-[700px] flex justify-center items-end hidden md:flex pointer-events-none">
      
      {/* --- Phone 1: Left (Dark UI) --- */}
      <motion.div 
        initial={{ y: 200, opacity: 0, rotate: -15, x: 100 }}
        animate={{ y: 50, opacity: 1, rotate: -5, x: -180 }}
        transition={{ duration: 1, delay: 0.1, type: "spring", stiffness: 80 }}
        className="absolute bottom-0 w-[300px] lg:w-[340px] h-[640px] bg-[#1A1A1A] rounded-[3rem] border-[8px] border-[#2A2A2A] shadow-2xl z-10 overflow-hidden"
      >
         <div className="w-[120px] h-6 bg-[#2A2A2A] absolute top-0 left-1/2 -translate-x-1/2 rounded-b-xl z-20"></div>
         <div className="p-6 pt-12 flex flex-col gap-4 text-white">
            <h4 className="font-fraunces text-2xl font-bold text-white mb-2">Despensa</h4>
            <div className="bg-[#2A2A2A] rounded-2xl p-4 flex justify-between items-center shadow-sm">
              <span className="font-bold text-sm">Azeite Extra Virgem</span>
              <span className="text-verde-claro text-xs font-bold">1 un</span>
            </div>
            <div className="bg-[#202020] rounded-2xl p-4 flex justify-between items-center opacity-80 border border-white/5">
              <span className="font-bold text-sm">Arroz Branco</span>
              <span className="text-red-400 text-xs font-bold">Acabou</span>
            </div>
            <div className="bg-[#202020] border border-white/5 rounded-2xl p-4 shadow-sm relative mt-2 relative overflow-hidden">
               <div className="absolute -right-4 -bottom-4 w-20 h-20 bg-ambar opacity-20 blur-xl rounded-full"></div>
               <p className="text-xs uppercase tracking-widest text-[#F4A261] mb-1 font-bold">Alerta Inteligente</p>
               <h3 className="font-fraunces text-xl font-bold bg-gradient-to-r from-ambar to-orange-300 bg-clip-text text-transparent">Kaza IA te escuta</h3>
               <p className="text-xs text-white/70 mt-2">Você consome 1 litro de azeite por mês. Comprar mais hoje?</p>
            </div>
         </div>
      </motion.div>

      {/* Floating Badge Left */}
      <motion.div 
         initial={{ scale: 0, opacity: 0, x: -50 }}
         animate={{ scale: 1, opacity: 1, x: 0 }}
         transition={{ delay: 1.2, type: "spring" }}
         className="absolute bottom-[280px] left-[0px] lg:-left-[50px] bg-white rounded-2xl p-4 shadow-2xl z-30 flex gap-4 items-center border border-borda"
      >
         <div className="flex -space-x-3">
            <div className="w-10 h-10 rounded-full bg-verde-palido border-[3px] border-white flex justify-center items-center font-bold text-principal text-sm">M</div>
            <div className="w-10 h-10 rounded-full bg-ambar/20 border-[3px] border-white flex justify-center items-center font-bold text-ambar text-sm">L</div>
         </div>
         <div>
           <p className="font-bold text-xs text-texto-principal">Sessões Ativas</p>
           <p className="text-[10px] text-texto-secundario">MultiPRO conectado</p>
         </div>
      </motion.div>

      {/* --- Phone 2: Right (Light UI) --- */}
      <motion.div 
        initial={{ y: 200, opacity: 0, rotate: 15, x: -100 }}
        animate={{ y: 50, opacity: 1, rotate: 5, x: 180 }}
        transition={{ duration: 1, delay: 0.2, type: "spring", stiffness: 80 }}
        className="absolute bottom-0 w-[300px] lg:w-[340px] h-[640px] bg-fundo-claro rounded-[3rem] border-[8px] border-white shadow-xl z-10 overflow-hidden"
      >
         <div className="w-[120px] h-6 bg-white absolute top-0 left-1/2 -translate-x-1/2 rounded-b-xl z-20 shadow-[0_4px_10px_rgba(0,0,0,0.02)]"></div>
         <div className="p-6 pt-12 flex flex-col gap-4">
            <h4 className="font-fraunces text-2xl font-bold text-texto-principal mb-2">Receitas</h4>
            <div className="bg-white rounded-2xl p-4 shadow-sm border border-borda relative overflow-hidden">
              <div className="w-full h-32 bg-gradient-to-tr from-verde-palido to-verde-claro/20 rounded-xl mb-3 flex items-center justify-center text-principal">
                <ChefHat className="w-10 h-10 opacity-50"/>
              </div>
              <p className="font-bold text-sm text-texto-principal">Macarrão ao Pesto</p>
              <p className="text-xs text-texto-secundario mt-1">Todos ingredientes na geladeira</p>
              <div className="absolute top-6 right-6 bg-white rounded-full p-2 shadow-sm"><Sparkles className="w-4 h-4 text-ambar"/></div>
            </div>
         </div>
      </motion.div>

      {/* Floating Badges Right */}
      <motion.div 
         initial={{ scale: 0, opacity: 0, x: 50 }}
         animate={{ scale: 1, opacity: 1, x: 0 }}
         transition={{ delay: 1.4, type: "spring" }}
         className="absolute bottom-[350px] right-[0px] lg:-right-[50px] bg-[#7751E7] text-white rounded-2xl p-4 shadow-2xl z-30 flex items-center gap-3"
      >
         <Bell className="w-5 h-5 opacity-90"/>
         <div>
           <p className="font-bold text-[13px]">Alerta Cozinha</p>
           <p className="text-[10px] opacity-80 mt-0.5">Iogurte vence amanhã</p>
         </div>
      </motion.div>
      <motion.div 
         initial={{ scale: 0, opacity: 0, x: 50 }}
         animate={{ scale: 1, opacity: 1, x: 0 }}
         transition={{ delay: 1.6, type: "spring" }}
         className="absolute bottom-[270px] right-[-20px] lg:-right-[30px] bg-white text-texto-principal border border-borda rounded-2xl p-3 shadow-xl z-30 flex items-center gap-2"
      >
         <div className="w-2 h-2 rounded-full bg-verde-claro animate-pulse"></div>
         <p className="font-bold text-[11px]">Sincronização 24/7</p>
      </motion.div>

      {/* --- Phone 3: Center (Main UI) --- */}
      <motion.div 
        initial={{ y: 300, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 1, type: "spring", stiffness: 90 }}
        className="relative w-[340px] lg:w-[380px] h-[720px] bg-superficie rounded-[3.5rem] border-[10px] border-[#1A1A1A] shadow-[0_40px_100px_-20px_rgba(0,0,0,0.4)] z-20 overflow-hidden origin-bottom translate-y-[15%]"
      >
         {/* Dynamic Island Notch */}
         <div className="w-[120px] h-8 bg-[#1A1A1A] absolute top-2 left-1/2 -translate-x-1/2 rounded-full z-30 flex items-center justify-end px-3">
             <div className="w-2.5 h-2.5 rounded-full bg-blue-900 border border-blue-800/50"></div>
         </div>
         
         <div className="p-6 pt-16 h-full flex flex-col bg-fundo-claro">
            {/* Header */}
            <div className="flex justify-between items-center mb-6">
                <div className="flex items-center gap-3">
                    <div className="w-11 h-11 rounded-full bg-verde-palido text-principal font-bold flex items-center justify-center border border-verde-claro/30 shadow-inner text-lg">M</div>
                    <div>
                        <p className="text-xs text-texto-secundario mb-0.5">Bem-vinda de volta,</p>
                        <p className="text-sm font-bold text-texto-principal">Marina Silva</p>
                    </div>
                </div>
                <button className="w-11 h-11 rounded-full bg-white border border-borda flex items-center justify-center shadow-sm relative text-texto-principal">
                   <Bell className="w-5 h-5"/>
                   <span className="absolute top-2.5 right-2.5 w-2 h-2 bg-red-500 rounded-full border border-white"></span>
                </button>
            </div>

            {/* Smart Card */}
            <div className="bg-verde-escuro rounded-3xl p-6 text-white shadow-xl relative overflow-hidden mb-6">
               <div className="absolute -right-10 -top-10 w-40 h-40 bg-principal rounded-full blur-2xl opacity-80"></div>
               <h3 className="font-fraunces text-2xl font-bold mb-2 relative z-10 text-balance leading-tight">Resumo da Casa</h3>
               <p className="text-verde-palido text-xs max-w-[200px] mb-6 relative z-10 leading-relaxed">Você tem 4 itens próximos do vencimento e 12 itens na lista de compras.</p>
               <button className="bg-ambar text-white text-xs font-bold px-5 py-2.5 rounded-full hover:bg-orange-500 transition-colors shadow-md relative z-10 uppercase tracking-wider">Ver Detalhes</button>
            </div>

            {/* List */}
            <div className="flex justify-between items-end mb-4 px-1">
               <h4 className="font-bold text-texto-principal text-[15px]">Lista Imediata</h4>
               <span className="text-xs font-bold text-principal cursor-pointer">Ver Tudo</span>
            </div>

            <div className="flex flex-col gap-3">
               {[ {n:"Leite", st:"Vence amanhã", t:"danger", ic:"🥛"}, {n:"Detergente", st:"Acabando", t:"warn", ic:"🫧"}, {n:"Ovos", st:"Restam 2 un", t:"warn", ic:"🥚"} ].map((i,idx) => (
                  <div key={idx} className="bg-white rounded-2xl p-4 shadow-sm border border-borda/50 flex justify-between items-center hover:-translate-y-0.5 transition-transform">
                     <div className="flex items-center gap-3">
                         <div className={`w-11 h-11 rounded-xl flex items-center justify-center text-xl font-bold border border-white ${i.t==='danger'?'bg-[#FFF5F5] text-red-500':'bg-[#FFF9F0] text-ambar'}`}>
                            <span className="drop-shadow-sm">{i.ic}</span>
                         </div>
                         <div>
                            <p className="font-bold text-[13px] text-texto-principal">{i.n}</p>
                            <p className={`text-[11px] font-bold mt-0.5 ${i.t==='danger'?'text-red-500':'text-ambar'}`}>{i.st}</p>
                         </div>
                     </div>
                     <div className="w-6 h-6 rounded-full border-2 border-borda/80"></div>
                  </div>
               ))}
            </div>

         </div>
      </motion.div>

    </div>
  );
}

// 2. Mockups for Interactive Tabs (Section 5)
const DemoIndividual = () => (
  <div className="flex flex-col h-full bg-fundo-claro">
     <div className="p-6 bg-superficie border-b border-borda">
        <h4 className="font-fraunces text-xl font-bold text-verde-escuro">Meu Painel Solo</h4>
        <p className="text-texto-secundario text-xs mt-1">Tudo concentrado em uma única conta, simples, claro e direto.</p>
     </div>
     <div className="p-6 flex flex-col gap-4">
        <div className="bg-superficie border border-borda rounded-2xl p-4 flex justify-between items-center shadow-sm">
           <div className="flex items-center gap-3">
              <div className="bg-verde-palido p-2 rounded-lg text-principal"><Box className="w-5 h-5"/></div>
              <div><p className="font-bold text-sm text-texto-principal">Estoque Geral</p><p className="text-xs text-texto-secundario">142 itens controlados</p></div>
           </div>
           <ChevronRight className="w-4 h-4 text-gray-300"/>
        </div>
        <div className="bg-superficie border border-borda rounded-2xl p-4 flex justify-between items-center shadow-sm">
           <div className="flex items-center gap-3">
              <div className="bg-[#FFF9F0] p-2 rounded-lg text-ambar"><ShoppingCart className="w-5 h-5"/></div>
              <div><p className="font-bold text-sm text-texto-principal">Minha Lista</p><p className="text-xs text-texto-secundario">12 itens pendentes</p></div>
           </div>
           <ChevronRight className="w-4 h-4 text-gray-300"/>
        </div>
        <div className="bg-superficie border border-borda rounded-2xl p-4 flex justify-between items-center shadow-sm">
           <div className="flex items-center gap-3">
              <div className="bg-[#FFF5F5] p-2 rounded-lg text-red-500"><AlertCircle className="w-5 h-5"/></div>
              <div><p className="font-bold text-sm text-texto-principal">Alertas</p><p className="text-xs text-texto-secundario">2 itens vencendo</p></div>
           </div>
           <ChevronRight className="w-4 h-4 text-gray-300"/>
        </div>
     </div>
  </div>
);

const DemoMestre = () => (
  <div className="flex flex-col h-full bg-superficie relative">
     <div className="p-6 bg-verde-escuro text-white rounded-t-[1.5rem]">
        <div className="flex justify-between items-center mb-4">
           <h4 className="font-fraunces text-xl font-bold">Visão da Casa</h4>
           <div className="bg-white/20 px-3 py-1 rounded-full text-xs font-mono">CONTA MESTRE</div>
        </div>
        <p className="text-verde-palido text-xs">A conta mestre visualiza a casa inteira e controla os demais acessos.</p>
     </div>
     <div className="p-6 flex flex-col gap-4">
        <h5 className="font-bold text-sm text-texto-principal uppercase tracking-widest">Membros Conectados</h5>
        
        <div className="border border-borda rounded-2xl p-4 flex justify-between items-center relative overflow-hidden">
           <div className="absolute left-0 top-0 bottom-0 w-1 bg-principal"></div>
           <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-verde-palido flex items-center justify-center font-bold text-principal">A</div>
              <div><p className="font-bold text-sm text-texto-principal">Ana (Você)</p><p className="text-xs text-texto-secundario">Conta Mestre • Online</p></div>
           </div>
           <button className="text-xs border border-borda px-3 py-1 rounded-full text-texto-secundario bg-gray-50 cursor-default">Ativo</button>
        </div>

        <div className="border border-borda rounded-2xl p-4 flex justify-between items-center">
           <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-gray-100 flex items-center justify-center font-bold text-texto-secundario">L</div>
              <div><p className="font-bold text-sm text-texto-principal">Lucas</p><p className="text-xs text-texto-secundario">Subconta Compras • iPhone</p></div>
           </div>
           <button className="text-xs border border-red-100 bg-red-50 text-red-600 px-3 py-1 rounded-full hover:bg-red-100 transition-colors">Desconectar</button>
        </div>

        <button className="mt-2 w-full py-3 bg-fundo-claro border border-borda rounded-xl text-sm font-bold text-principal flex items-center justify-center gap-2 hover:bg-verde-palido transition-colors">
          <Settings className="w-4 h-4"/> Gerenciar Acessos
        </button>
     </div>
  </div>
);

const DemoCompras = () => (
   <div className="flex flex-col h-full bg-fundo-claro">
      <div className="p-6 bg-superficie border-b border-borda flex justify-between items-center">
         <div>
            <h4 className="font-fraunces text-xl font-bold text-verde-escuro">Compras</h4>
            <p className="text-texto-secundario text-xs mt-1">Perfil focado apenas em suprimentos.</p>
         </div>
         <div className="w-10 h-10 rounded-full bg-gray-100 flex items-center justify-center font-bold text-texto-secundario">L</div>
      </div>
      <div className="p-6 flex flex-col gap-3">
         <div className="bg-[#FFF9F0] border border-[#FFEACA] rounded-xl p-3 flex gap-3 text-ambar mb-2 shadow-sm">
            <AlertCircle className="w-5 h-5 shrink-0"/>
            <p className="text-xs font-bold">Repor Sabão em Pó e Papel Higiênico hoje.</p>
         </div>

         {[
            { n: "Leite Integral", q: "3 caixas", done: true },
            { n: "Ovos", q: "1 dúzia", done: false },
            { n: "Detergente Neutro", q: "2 unidades", done: false }
         ].map((i, idx) => (
            <div key={idx} className={`bg-superficie border border-borda rounded-xl p-4 flex items-center gap-4 shadow-sm transition-opacity ${i.done ? 'opacity-50' : 'opacity-100'}`}>
               <div className={`w-5 h-5 rounded-md border flex items-center justify-center ${i.done ? 'bg-principal border-principal' : 'border-gray-300'}`}>
                  {i.done && <Check className="w-3 h-3 text-white"/>}
               </div>
               <div>
                  <p className={`font-bold text-sm ${i.done ? 'line-through text-texto-secundario' : 'text-texto-principal'}`}>{i.n}</p>
                  <p className="text-xs text-texto-secundario">{i.q}</p>
               </div>
            </div>
         ))}
      </div>
   </div>
);

const DemoCozinha = () => (
   <div className="flex flex-col h-full bg-superficie">
      <div className="p-6 bg-verde-palido border-b border-verde-claro/30 flex justify-between items-center">
         <div>
            <h4 className="font-fraunces text-xl font-bold text-principal">Cozinha</h4>
            <p className="text-principal/80 text-xs mt-1">Receitas e planejamento.</p>
         </div>
         <div className="w-10 h-10 rounded-full bg-white flex items-center justify-center font-bold text-principal shadow-sm">M</div>
      </div>
      <div className="p-6 flex flex-col gap-4">
         <div className="bg-superficie border border-red-100 rounded-2xl overflow-hidden shadow-sm">
            <div className="bg-red-50 p-2 flex items-center gap-2 text-red-600 border-b border-red-100">
               <AlertCircle className="w-4 h-4" />
               <span className="text-xs font-bold uppercase tracking-widest">Aviso de Validade</span>
            </div>
            <div className="p-4">
               <p className="text-sm font-bold text-texto-principal">Iogurte Natural vence amanhã.</p>
               <p className="text-xs text-texto-secundario mt-1">Temos receita de Bolo de Iogurte disponível.</p>
            </div>
         </div>

         <h5 className="font-bold text-sm text-texto-principal uppercase tracking-widest mt-2">Plano de Hoje</h5>
         <div className="border border-borda rounded-xl p-4 flex items-center justify-between hover:bg-fundo-claro transition-colors cursor-pointer">
            <div className="flex items-center gap-3">
               <div className="w-10 h-10 rounded-full bg-fundo-claro flex items-center justify-center text-principal">
                  <ChefHat className="w-5 h-5"/>
               </div>
               <div>
                  <p className="text-texto-secundario text-xs">Jantar</p>
                  <p className="font-bold text-sm text-texto-principal">Risoto de Queijo</p>
               </div>
            </div>
            <ChevronRight className="w-4 h-4 text-gray-300"/>
         </div>
      </div>
   </div>
);

const DemoSessoes = () => (
   <div className="flex flex-col h-full bg-fundo-claro">
      <div className="p-6 bg-verde-escuro text-white text-center">
         <ShieldCheck className="w-8 h-8 mx-auto text-verde-palido mb-2"/>
         <h4 className="font-fraunces text-xl font-bold">Controle de Sessões</h4>
         <p className="text-verde-palido text-xs mt-1">Gerencie os acessos do MultiPRO em tempo real.</p>
      </div>
      <div className="p-6 flex flex-col gap-3">
         <div className="bg-superficie border border-principal rounded-xl p-4 shadow-sm relative overflow-hidden">
            <div className="absolute top-0 right-0 bg-principal text-white text-[10px] uppercase font-bold px-2 py-1 rounded-bl-lg">Este Aparelho</div>
            <div className="flex items-center gap-3">
               <Smartphone className="w-6 h-6 text-principal"/>
               <div><p className="font-bold text-sm text-texto-principal">iPhone 15 Pro - Ana (Mestre)</p><p className="text-xs text-verde-claro font-bold">Online agora</p></div>
            </div>
         </div>
         <div className="bg-superficie border border-borda rounded-xl p-4 shadow-sm flex items-center justify-between">
            <div className="flex items-center gap-3">
               <Smartphone className="w-6 h-6 text-texto-secundario"/>
               <div><p className="font-bold text-sm text-texto-principal">Galaxy S23 - Lucas (Compras)</p><p className="text-xs text-verde-claro font-bold">Online agora</p></div>
            </div>
            <button className="text-gray-400 hover:text-red-500 transition-colors" title="Desconectar Sessão"><X className="w-5 h-5"/></button>
         </div>
         <div className="bg-superficie border border-borda rounded-xl p-4 shadow-sm opacity-60">
            <div className="flex items-center gap-3">
               <Smartphone className="w-6 h-6 text-gray-400"/>
               <div><p className="font-bold text-sm text-gray-500">iPhone 13 - Marina (Cozinha)</p><p className="text-xs text-gray-400">Desconectado (visto há 2h)</p></div>
            </div>
         </div>
      </div>
   </div>
);


// --- MAIN PAGE COMPONENT ---

export default function SalesPage() {
  const [activeTab, setActiveTab] = useState(0);

  const tabs = [
    { id: 0, label: "IndividualPRO", subtitle: "Uso solo" },
    { id: 1, label: "Conta Mestre", subtitle: "MultiPRO" },
    { id: 2, label: "Subconta Compras", subtitle: "MultiPRO" },
    { id: 3, label: "Subconta Cozinha", subtitle: "MultiPRO" },
    { id: 4, label: "Sessões conectadas", subtitle: "Segurança" },
  ];

  return (
    <>
      {/* Global Style Injections to maintain exact visual directions */}
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=DM+Mono:ital,wght@0,300;0,400;0,500&family=DM+Sans:ital,opsz,wght@0,9..40,100..1000;1,9..40,100..1000&family=Fraunces:ital,opsz,wght@0,9..144,100..900;1,9..144,100..900&display=swap');

        .font-fraunces { font-family: 'Fraunces', serif; }
        .font-sans { font-family: 'DM Sans', sans-serif; }
        .font-mono { font-family: 'DM Mono', monospace; }

        .bg-fundo-claro { background-color: #FAF8F4; }
        .bg-superficie { background-color: #FFFFFF; }
        .bg-principal { background-color: #2D6A4F; }
        .bg-verde-claro { background-color: #52B788; }
        .bg-verde-palido { background-color: #D8F3DC; }
        .bg-verde-escuro { background-color: #1B3A2D; }
        .bg-ambar { background-color: #F4A261; }

        .text-principal { color: #2D6A4F; }
        .text-verde-claro { color: #52B788; }
        .text-verde-palido { color: #D8F3DC; }
        .text-verde-escuro { color: #1B3A2D; }
        .text-ambar { color: #F4A261; }
        .text-texto-principal { color: #1A1A1A; }
        .text-texto-secundario { color: #5A5A5A; }

        .border-borda { border-color: #E8E2D9; }
        
        body { background-color: #FAF8F4; color: #1A1A1A; }
        html.dark body { background-color: #FAF8F4; color: #1A1A1A; } /* Force light mode aesthetic */
        
        .nav-blur {
          background: rgba(250, 248, 244, 0.85);
          backdrop-filter: blur(20px);
          -webkit-backdrop-filter: blur(20px);
          border-bottom: 1px solid rgba(232, 226, 217, 0.6);
        }
      `}</style>

      <div className="min-h-screen bg-fundo-claro font-sans text-texto-principal selection:bg-verde-claro selection:text-white">
        
        {/* 1. NAVBAR */}
        <header className="fixed top-0 inset-x-0 nav-blur z-50">
          <div className="max-w-7xl mx-auto px-6 h-20 flex items-center justify-between">
            <Link to="/pagina-de-vendas" className="flex items-center outline-none focus-visible:ring-2 focus-visible:ring-principal rounded-lg">
              <img src={LogoImage} alt="KAZA Logo" className="h-[36px] object-contain" />
            </Link>
            
            <nav className="hidden md:flex items-center gap-8">
              <a href="#como-ajuda" className="text-sm font-bold text-texto-principal hover:text-principal transition-colors">Funcionalidades</a>
              <a href="#multipro" className="text-sm font-bold text-texto-principal hover:text-principal transition-colors">Como funciona</a>
              <a href="#planos" className="text-sm font-bold text-texto-principal hover:text-principal transition-colors">Planos</a>
              <a href="#" className="text-sm font-bold text-texto-secundario hover:text-principal transition-colors">Blog</a>
            </nav>

            <Link to="/auth" className="bg-principal text-white px-6 py-2.5 rounded-full text-sm font-bold hover:bg-verde-escuro transition-transform hover:scale-105 outline-none focus-visible:ring-2 focus-visible:ring-offset-2 shadow-sm">
              Começar agora
            </Link>
          </div>
        </header>

        {/* Spacer for fixed nav */}
        <div className="h-20 w-full" />

        <main className="w-full flex flex-col overflow-x-hidden">
          
          {/* 2. HERO */}
          <section className="relative pt-20 lg:pt-28 pb-0 w-full flex flex-col items-center text-center overflow-hidden min-h-[900px] lg:min-h-[1050px]">
             
             {/* Dynamic Ambient Background as seen in the Curely reference */}
             <div className="absolute inset-0 z-0 overflow-hidden pointer-events-none">
               <div className="absolute top-0 left-[-10%] w-[60%] lg:w-[40%] h-[600px] lg:h-[800px] bg-[#D4C3FD] rounded-full blur-[100px] opacity-40 mix-blend-multiply" />
               <div className="absolute top-0 right-[-10%] w-[60%] lg:w-[40%] h-[600px] lg:h-[800px] bg-[#FFE0C8] rounded-full blur-[100px] opacity-50 mix-blend-multiply" />
               <div className="absolute top-[30%] left-1/2 -translate-x-1/2 w-full h-[600px] bg-gradient-to-b from-transparent to-white z-10" />
             </div>
             
             <div className="relative z-10 px-6 max-w-4xl mx-auto flex flex-col items-center">
                <span className="inline-block px-4 py-1.5 border border-principal/20 text-principal font-bold text-[10px] rounded-full tracking-widest uppercase mb-8 shadow-sm bg-white/50 backdrop-blur-sm relative z-20">
                  Gestão doméstica inteligente
                </span>
                
                <h1 className="font-fraunces text-5xl md:text-7xl font-bold text-texto-principal leading-[1.05] mb-6 text-balance tracking-tight relative z-20">
                  A casa que se organiza com você.
                </h1>
                
                <p className="text-texto-secundario text-lg font-medium leading-relaxed max-w-2xl mb-10 text-balance relative z-20">
                  KAZA cuida do estoque, avisa o que está acabando, sugere refeições e organiza a lista de compras da casa — sozinho no IndividualPRO ou em conjunto no MultiPRO.
                </p>

                {/* Dark App Store Style Badges */}
                <div className="flex flex-col sm:flex-row items-center justify-center gap-4 w-full sm:w-auto mt-2 relative z-20">
                   <Link to="/auth" className="w-full sm:w-auto bg-[#111111] border border-[#222] text-white px-8 py-4 rounded-xl text-center hover:bg-black transition-all shadow-xl hover:-translate-y-1 flex items-center justify-center gap-3">
                      <Apple className="w-6 h-6 fill-white"/>
                      <div className="text-left leading-tight">
                         <p className="text-[10px] font-medium opacity-80 uppercase tracking-wider">Acessar App</p>
                         <p className="text-sm font-bold">Começar Agora</p>
                      </div>
                   </Link>
                   <a href="#demo" className="w-full sm:w-auto bg-[#111111] border border-[#222] text-white px-8 py-4 rounded-xl text-center hover:bg-black transition-all shadow-xl hover:-translate-y-1 flex items-center justify-center gap-3">
                      <PlayCircle className="w-6 h-6 fill-transparent stroke-white"/>
                      <div className="text-left leading-tight">
                         <p className="text-[10px] font-medium opacity-80 uppercase tracking-wider">Modo teste online</p>
                         <p className="text-sm font-bold">Ver Demonstração</p>
                      </div>
                   </a>
                </div>

                <div className="flex flex-col sm:flex-row gap-4 lg:gap-8 text-[11px] font-bold text-texto-secundario justify-center items-center mt-8 relative z-20">
                   <p>• IndividualPRO: <span className="text-texto-principal">R$19,90/mês</span></p>
                   <p>• MultiPRO: <span className="text-texto-principal">R$37,90/mês</span> <span className="bg-ambar/10 text-ambar px-2 py-0.5 rounded ml-1 border border-ambar/20 uppercase tracking-widest text-[9px]">7 Dias Grátis</span></p>
                </div>
             </div>

             {/* Right Column: Hero Mockup -> Now Center overlapping mockups */}
             <div className="relative w-full max-w-[1200px] h-[600px] lg:h-[700px] mx-auto z-10 mt-16 md:mt-10 overflow-visible">
               <HeroMockup />
               {/* Mobile fallback text since absolute positions may overflow */}
               <div className="md:hidden flex h-full items-center justify-center mt-[-100px]">
                 <div className="bg-white border border-borda rounded-2xl p-6 text-center max-w-[280px] shadow-2xl relative z-30">
                    <Smartphone className="w-10 h-10 mx-auto text-principal mb-4" />
                    <h3 className="font-fraunces font-bold text-xl mb-2">Ecossistema KAZA</h3>
                    <p className="text-sm text-texto-secundario">Pela demonstração web, use em uma tela maior para visualizar a interatividade completa.</p>
                 </div>
               </div>
             </div>
          </section>

          {/* 3. COMO O KAZA TE AJUDA (Bento Grid) */}
          <section id="como-ajuda" className="py-24 bg-white relative">
             <div className="max-w-7xl mx-auto px-6">
                <div className="text-center max-w-2xl mx-auto mb-16">
                   <h2 className="font-fraunces text-4xl md:text-5xl font-bold text-verde-escuro mb-4 tracking-tight">Tudo que sua casa precisa, em um só lugar</h2>
                   <p className="text-texto-secundario text-lg font-medium">Do que está vencendo ao que falta comprar — o KAZA reduz a carga mental da rotina.</p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                   {/* Card 1 */}
                   <div className="bg-fundo-claro border border-borda rounded-3xl p-8 hover:-translate-y-1 transition-transform group">
                      <div className="w-12 h-12 bg-white rounded-2xl shadow-sm border border-borda flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                         <Box className="w-6 h-6 text-principal"/>
                      </div>
                      <h3 className="font-bold text-xl text-texto-principal mb-3">Controle de estoque</h3>
                      <p className="text-texto-secundario font-medium leading-relaxed text-sm">Gerencie geladeira, despensa e limpeza com alertas de reposição e validade.</p>
                   </div>
                   {/* Card 2 */}
                   <div className="bg-fundo-claro border border-borda rounded-3xl p-8 hover:-translate-y-1 transition-transform group">
                      <div className="w-12 h-12 bg-white rounded-2xl shadow-sm border border-borda flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                         <ChefHat className="w-6 h-6 text-principal"/>
                      </div>
                      <h3 className="font-bold text-xl text-texto-principal mb-3">Receitas inteligentes</h3>
                      <p className="text-texto-secundario font-medium leading-relaxed text-sm">O app sugere receitas com base no que existe em casa.</p>
                   </div>
                   {/* Card 3 */}
                   <div className="bg-fundo-claro border border-borda rounded-3xl p-8 hover:-translate-y-1 transition-transform group">
                      <div className="w-12 h-12 bg-white rounded-2xl shadow-sm border border-borda flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                         <Calendar className="w-6 h-6 text-principal"/>
                      </div>
                      <h3 className="font-bold text-xl text-texto-principal mb-3">Plano de refeições</h3>
                      <p className="text-texto-secundario font-medium leading-relaxed text-sm">Monte semana ou mês com café, almoço, jantar e lanches.</p>
                   </div>
                   {/* Card 4 */}
                   <div className="bg-fundo-claro border border-borda rounded-3xl p-8 hover:-translate-y-1 transition-transform group">
                      <div className="w-12 h-12 bg-white rounded-2xl shadow-sm border border-borda flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                         <ListChecks className="w-6 h-6 text-principal"/>
                      </div>
                      <h3 className="font-bold text-xl text-texto-principal mb-3">Lista de compras</h3>
                      <p className="text-texto-secundario font-medium leading-relaxed text-sm">A lista se atualiza com o que acabou, vai vencer ou faltará em breve.</p>
                   </div>
                   {/* Card 5 */}
                   <div className="bg-verde-escuro border border-verde-escuro rounded-3xl p-8 shadow-xl hover:-translate-y-1 transition-transform group relative overflow-hidden">
                      <div className="absolute top-0 right-0 w-32 h-32 bg-white opacity-5 rounded-full blur-2xl"></div>
                      <div className="w-12 h-12 bg-white rounded-2xl shadow-sm border border-white flex items-center justify-center mb-6 group-hover:scale-110 transition-transform relative z-10">
                         <Users className="w-6 h-6 text-verde-escuro"/>
                      </div>
                      <h3 className="font-bold text-xl text-white mb-3 relative z-10">Perfis compartilhados</h3>
                      <p className="text-verde-palido/90 font-medium leading-relaxed text-sm relative z-10">No MultiPRO, até 3 acessos participam da mesma casa com organização centralizada.</p>
                   </div>
                   {/* Card 6 */}
                   <div className="bg-fundo-claro border border-borda rounded-3xl p-8 hover:-translate-y-1 transition-transform group">
                      <div className="w-12 h-12 bg-white rounded-2xl shadow-sm border border-borda flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                         <Bell className="w-6 h-6 text-principal"/>
                      </div>
                      <h3 className="font-bold text-xl text-texto-principal mb-3">Notificações por perfil</h3>
                      <p className="text-texto-secundario font-medium leading-relaxed text-sm">Cada acesso pode receber alertas específicos conforme seu papel na casa.</p>
                   </div>
                </div>
             </div>
          </section>

          {/* 4. MULTIPRO NA PRÁTICA */}
          <section id="multipro" className="py-24 bg-verde-palido/40">
             <div className="max-w-7xl mx-auto px-6">
                <div className="text-center max-w-3xl mx-auto mb-16">
                   <h2 className="font-fraunces text-4xl md:text-5xl font-bold text-verde-escuro mb-4 tracking-tight">Uma casa, até 3 acessos, cada pessoa com seu papel</h2>
                   <p className="text-texto-secundario text-lg font-medium">No MultiPRO, todos compartilham a mesma casa, mas cada perfil entra com sua própria sessão, suas permissões e suas notificações.</p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-10">
                   {/* Conta Mestre */}
                   <div className="bg-white rounded-[2rem] p-8 shadow-sm border border-borda relative">
                      <div className="absolute top-0 right-10 -translate-y-1/2 bg-verde-escuro text-white text-[10px] uppercase font-bold tracking-widest px-3 py-1 rounded-full shadow-lg">Gestão Global</div>
                      <div className="w-16 h-16 rounded-full bg-verde-escuro flex items-center justify-center text-white text-xl font-bold mb-6 shadow-sm">A</div>
                      <h3 className="font-fraunces text-xl font-bold text-texto-principal mb-1">CONTA MESTRE — ANA</h3>
                      <p className="text-sm font-mono text-verde-claro mb-6">Administração</p>
                      <ul className="space-y-3">
                         <li className="flex items-start gap-3"><Check className="w-4 h-4 text-principal shrink-0 mt-0.5"/><span className="text-sm text-texto-secundario">Controla acessos e convida perfis</span></li>
                         <li className="flex items-start gap-3"><Check className="w-4 h-4 text-principal shrink-0 mt-0.5"/><span className="text-sm text-texto-secundario">Visualiza quem está conectado</span></li>
                         <li className="flex items-start gap-3"><Check className="w-4 h-4 text-principal shrink-0 mt-0.5"/><span className="text-sm text-texto-secundario">Pode trocar de perfil livremente</span></li>
                         <li className="flex items-start gap-3"><Check className="w-4 h-4 text-principal shrink-0 mt-0.5"/><span className="text-sm text-texto-secundario">Pode desconectar outras sessões</span></li>
                      </ul>
                   </div>

                   {/* Subconta Compras */}
                   <div className="bg-white rounded-[2rem] p-8 shadow-sm border border-borda relative mt-8 md:mt-0">
                      <div className="w-16 h-16 rounded-full bg-gray-100 flex items-center justify-center text-texto-secundario text-xl font-bold mb-6 border border-borda">L</div>
                      <h3 className="font-fraunces text-xl font-bold text-texto-principal mb-1">SUBCONTA COMPRAS — LUCAS</h3>
                      <p className="text-sm font-mono text-texto-secundario mb-6">Restrito a suprimentos</p>
                      <ul className="space-y-3">
                         <li className="flex items-start gap-3"><Check className="w-4 h-4 text-texto-secundario shrink-0 mt-0.5"/><span className="text-sm text-texto-secundario">Recebe alerta apenas de mercado</span></li>
                         <li className="flex items-start gap-3"><Check className="w-4 h-4 text-texto-secundario shrink-0 mt-0.5"/><span className="text-sm text-texto-secundario">Pode marcar itens comprados</span></li>
                         <li className="flex items-start gap-3"><Check className="w-4 h-4 text-texto-secundario shrink-0 mt-0.5"/><span className="text-sm text-texto-secundario">Visualiza lista e verfica o estoque global</span></li>
                         <li className="flex items-start gap-3"><Check className="w-4 h-4 text-texto-secundario shrink-0 mt-0.5"/><span className="text-sm text-texto-secundario text-red-400 font-medium">Não vê receitas e outras áreas sem permissão</span></li>
                      </ul>
                   </div>

                   {/* Subconta Cozinha */}
                   <div className="bg-white rounded-[2rem] p-8 shadow-sm border border-borda relative mt-8 md:mt-0">
                      <div className="w-16 h-16 rounded-full bg-fundo-claro flex items-center justify-center text-principal text-xl font-bold mb-6 border border-borda">M</div>
                      <h3 className="font-fraunces text-xl font-bold text-texto-principal mb-1">SUBCONTA COZINHA — MARINA</h3>
                      <p className="text-sm font-mono text-texto-secundario mb-6">Foco nas refeições</p>
                      <ul className="space-y-3">
                         <li className="flex items-start gap-3"><Check className="w-4 h-4 text-texto-secundario shrink-0 mt-0.5"/><span className="text-sm text-texto-secundario">Recebe alertas de validade da dispensa</span></li>
                         <li className="flex items-start gap-3"><Check className="w-4 h-4 text-texto-secundario shrink-0 mt-0.5"/><span className="text-sm text-texto-secundario">Visualiza e edita o plano de refeições</span></li>
                         <li className="flex items-start gap-3"><Check className="w-4 h-4 text-texto-secundario shrink-0 mt-0.5"/><span className="text-sm text-texto-secundario">Acompanha receitas e ingredientes em uso</span></li>
                      </ul>
                   </div>
                </div>

                <div className="mt-12 text-center">
                   <p className="text-sm text-texto-secundario italic font-medium bg-white inline-block px-6 py-2 rounded-full border border-borda shadow-sm">
                     A conta mestre é criada primeiro e pode gerenciar os demais acessos quando quiser.
                   </p>
                </div>
             </div>
          </section>

          {/* 5. DEMO INTERATIVA */}
          <section id="demo" className="py-24 bg-[#11241C]">
             <div className="max-w-7xl mx-auto px-6 overflow-hidden">
                <div className="text-center max-w-2xl mx-auto mb-12">
                   <h2 className="font-fraunces text-4xl md:text-5xl font-bold text-white mb-4 tracking-tight">Veja o KAZA funcionando em modo teste</h2>
                   <p className="text-verde-palido/80 text-lg font-medium">Explore como o app se comporta no IndividualPRO e no MultiPRO.</p>
                </div>

                <div className="flex flex-col lg:flex-row gap-8 lg:gap-12 items-center lg:items-stretch">
                   
                   {/* Tabs Side */}
                   <div className="w-full lg:w-[400px] flex flex-col gap-3 z-10">
                      {tabs.map((tab, idx) => (
                         <button
                           key={idx}
                           onClick={() => setActiveTab(tab.id)}
                           className={`w-full text-left p-5 rounded-2xl transition-all border outline-none focus-visible:ring-2 focus-visible:ring-white flex items-center justify-between group ${
                              activeTab === tab.id 
                              ? 'bg-verde-escuro border-verde-claro shadow-lg scale-100' 
                              : 'bg-transparent border-white/10 hover:bg-white/5 hover:border-white/20'
                           }`}
                         >
                            <div>
                               <p className={`text-[10px] uppercase font-bold tracking-widest mb-1 ${activeTab === tab.id ? 'text-verde-claro' : 'text-gray-500'}`}>{tab.subtitle}</p>
                               <h4 className={`text-lg font-bold ${activeTab === tab.id ? 'text-white' : 'text-gray-400 group-hover:text-gray-200'}`}>{tab.label}</h4>
                            </div>
                            <ChevronRight className={`w-5 h-5 transition-transform ${activeTab === tab.id ? 'text-white translate-x-1' : 'text-gray-600'}`}/>
                         </button>
                      ))}
                   </div>

                   {/* Mockup Display Side */}
                   <div className="flex-1 flex justify-center items-center w-full min-h-[550px]">
                      <div className="w-full max-w-[360px] h-[640px] bg-white rounded-[2.5rem] p-2 shadow-2xl relative border-8 border-[#3A4A43] overflow-hidden">
                         <div className="absolute top-2 inset-x-0 h-6 bg-transparent flex justify-center z-50 pointer-events-none">
                            <div className="w-[100px] h-6 bg-[#3A4A43] rounded-b-xl"></div>
                         </div>
                         <div className="w-full h-full rounded-[2rem] overflow-hidden bg-fundo-claro relative">
                            <AnimatePresence mode="popLayout">
                               <motion.div
                                 key={activeTab}
                                 initial={{ opacity: 0, scale: 0.95, y: 10 }}
                                 animate={{ opacity: 1, scale: 1, y: 0 }}
                                 exit={{ opacity: 0, scale: 0.95, y: -10 }}
                                 transition={{ duration: 0.3 }}
                                 className="w-full h-full"
                               >
                                  {activeTab === 0 && <DemoIndividual />}
                                  {activeTab === 1 && <DemoMestre />}
                                  {activeTab === 2 && <DemoCompras />}
                                  {activeTab === 3 && <DemoCozinha />}
                                  {activeTab === 4 && <DemoSessoes />}
                               </motion.div>
                            </AnimatePresence>
                         </div>
                      </div>
                   </div>

                </div>
             </div>
          </section>

          {/* 6. PLANOS DE PREÇO */}
          <section id="planos" className="py-24 bg-white relative">
             <div className="max-w-5xl mx-auto px-6">
                <div className="text-center max-w-2xl mx-auto mb-16">
                   <h2 className="font-fraunces text-4xl md:text-5xl font-bold text-verde-escuro mb-4 tracking-tight">Escolha o plano ideal para sua casa</h2>
                   <p className="text-texto-secundario text-lg font-medium">Use sozinho com o IndividualPRO ou compartilhe a gestão da casa com até 3 acessos no MultiPRO.</p>
                </div>

                <div className="grid md:grid-cols-2 gap-8 lg:gap-12 mb-20 relative items-center">
                   
                   {/* Col 1 - Individual */}
                   <div className="bg-superficie border border-borda rounded-[3rem] p-10 lg:p-12 shadow-sm flex flex-col h-full hover:shadow-md transition-shadow">
                      <h3 className="font-fraunces text-3xl font-bold text-texto-principal mb-2">IndividualPRO</h3>
                      <p className="text-texto-secundario mb-8 font-medium">Para quem organiza a casa sozinho com total clareza.</p>
                      
                      <div className="mb-10">
                         <span className="text-5xl font-bold font-mono tracking-tighter text-texto-principal">R$19,90</span><span className="text-texto-secundario">/mês</span>
                      </div>

                      <ul className="space-y-4 mb-10 flex-1">
                         <li className="flex items-start gap-3"><Check className="text-principal shrink-0 w-5 h-5"/> <span className="font-medium text-texto-principal">1 conta principal, 1 usuário</span></li>
                         <li className="flex items-start gap-3"><Check className="text-principal shrink-0 w-5 h-5"/> <span className="font-medium text-texto-principal">Estoque completo e infinito</span></li>
                         <li className="flex items-start gap-3"><Check className="text-principal shrink-0 w-5 h-5"/> <span className="font-medium text-texto-principal">Alertas de validade e reposição</span></li>
                         <li className="flex items-start gap-3"><Check className="text-principal shrink-0 w-5 h-5"/> <span className="font-medium text-texto-principal">Lista de compras inteligente e receitas</span></li>
                         <li className="flex items-start gap-3"><Check className="text-principal shrink-0 w-5 h-5"/> <span className="font-medium text-texto-principal">Notificações da rotina geral</span></li>
                      </ul>

                      <Link to="/auth" className="bg-fundo-claro border border-borda hover:bg-gray-50 text-texto-principal font-bold py-4 rounded-full text-center transition-colors shadow-sm outline-none w-full block">
                        Escolher IndividualPRO
                      </Link>
                   </div>

                   {/* Col 2 - Multi */}
                   <div className="bg-verde-escuro border border-[#234B3B] rounded-[3rem] p-10 lg:p-12 shadow-2xl flex flex-col h-full relative overflow-hidden md:scale-105 z-10">
                      <div className="absolute top-0 right-0 w-64 h-64 bg-principal rounded-full blur-[80px] -z-10 opacity-50"></div>
                      <div className="absolute top-8 right-8 bg-ambar text-white text-[10px] uppercase font-bold tracking-widest px-3 py-1 rounded-full">Mais completo</div>
                      
                      <h3 className="font-fraunces text-3xl font-bold text-white mb-2">MultiPRO</h3>
                      <p className="text-verde-palido/80 mb-8 font-medium pr-12 text-balance leading-relaxed">Para casas com gestão compartilhada, múltiplos acessos e controle central.</p>
                      
                      <div className="mb-10 flex flex-col items-start gap-1">
                         <div className="flex items-baseline">
                           <span className="text-5xl font-bold font-mono tracking-tighter text-white">R$37,90</span><span className="text-verde-palido/60">/mês</span>
                         </div>
                      </div>

                      <ul className="space-y-4 mb-10 flex-1">
                         <li className="flex items-start gap-3"><Check className="text-ambar shrink-0 w-5 h-5"/> <span className="font-medium text-white italic">Tudo do IndividualPRO, mais:</span></li>
                         <li className="flex items-start gap-3"><Check className="text-verde-claro shrink-0 w-5 h-5"/> <span className="font-medium text-white">Até 3 acessos (Conta mestre + subcontas)</span></li>
                         <li className="flex items-start gap-3"><Check className="text-verde-claro shrink-0 w-5 h-5"/> <span className="font-medium text-white">Permissões e notificações por perfil</span></li>
                         <li className="flex items-start gap-3"><Check className="text-verde-claro shrink-0 w-5 h-5"/> <span className="font-medium text-white">Lista e estoque unificados para todos</span></li>
                         <li className="flex items-start gap-3"><Check className="text-verde-claro shrink-0 w-5 h-5"/> <span className="font-medium text-white">Visualização e controle de sessões conectadas</span></li>
                      </ul>

                      <Link to="/auth" className="bg-ambar hover:bg-orange-500 text-white font-bold py-4 rounded-full text-center transition-all shadow-[0_10px_20px_-10px_rgba(244,162,97,0.5)] outline-none w-full block hover:-translate-y-1">
                        Testar MultiPRO por 7 dias
                      </Link>
                   </div>
                </div>

                {/* Tabela de comp */}
                <div className="bg-fundo-claro border border-borda rounded-[2rem] p-8 md:p-12 shadow-sm overflow-x-auto">
                   <h4 className="font-bold text-xl text-center mb-8">Comparativo Rápido</h4>
                   <table className="w-full text-left min-w-[500px]">
                      <thead>
                         <tr className="border-b border-borda">
                            <th className="py-4 px-2 text-texto-secundario font-medium">Recurso</th>
                            <th className="py-4 px-2 font-bold text-texto-principal w-1/3 text-center">IndividualPRO</th>
                            <th className="py-4 px-2 font-bold text-verde-escuro w-1/3 text-center bg-verde-palido/20 rounded-t-xl">MultiPRO</th>
                         </tr>
                      </thead>
                      <tbody className="text-sm">
                         <tr className="border-b border-borda">
                            <td className="py-4 px-2 font-medium">Preço mensal</td>
                            <td className="py-4 px-2 text-center font-mono text-texto-secundario">R$19,90/mês</td>
                            <td className="py-4 px-2 text-center font-mono font-bold text-principal bg-verde-palido/20">R$37,90/mês</td>
                         </tr>
                         <tr className="border-b border-borda">
                            <td className="py-4 px-2 font-medium">Usuários</td>
                            <td className="py-4 px-2 text-center text-texto-secundario">1</td>
                            <td className="py-4 px-2 text-center font-bold text-principal bg-verde-palido/20">Até 3 acessos</td>
                         </tr>
                         <tr className="border-b border-borda">
                            <td className="py-4 px-2 font-medium">Conta mestre</td>
                            <td className="py-4 px-2 text-center text-gray-300">-</td>
                            <td className="py-4 px-2 text-center font-bold text-principal bg-verde-palido/20"><Check className="w-4 h-4 mx-auto"/></td>
                         </tr>
                         <tr className="border-b border-borda">
                            <td className="py-4 px-2 font-medium">Subcontas</td>
                            <td className="py-4 px-2 text-center text-gray-300">-</td>
                            <td className="py-4 px-2 text-center font-bold text-principal bg-verde-palido/20"><Check className="w-4 h-4 mx-auto"/></td>
                         </tr>
                         <tr className="border-b border-borda">
                            <td className="py-4 px-2 font-medium">Notificações por perfil</td>
                            <td className="py-4 px-2 text-center text-gray-300">-</td>
                            <td className="py-4 px-2 text-center font-bold text-principal bg-verde-palido/20"><Check className="w-4 h-4 mx-auto"/></td>
                         </tr>
                         <tr className="border-b border-borda">
                            <td className="py-4 px-2 font-medium">Sessões conectadas</td>
                            <td className="py-4 px-2 text-center text-gray-300">-</td>
                            <td className="py-4 px-2 text-center font-bold text-principal bg-verde-palido/20"><Check className="w-4 h-4 mx-auto"/></td>
                         </tr>
                         <tr className="border-b border-borda">
                            <td className="py-4 px-2 font-medium">Gestão compartilhada</td>
                            <td className="py-4 px-2 text-center text-gray-300">-</td>
                            <td className="py-4 px-2 text-center font-bold text-principal bg-verde-palido/20"><Check className="w-4 h-4 mx-auto"/></td>
                         </tr>
                         <tr>
                            <td className="py-4 px-2 font-medium">Teste Grátis</td>
                            <td className="py-4 px-2 text-center text-texto-secundario">-</td>
                            <td className="py-4 px-2 text-center font-bold text-ambar bg-verde-palido/20 rounded-b-xl">7 dias de teste</td>
                         </tr>
                      </tbody>
                   </table>
                </div>
             </div>
          </section>

          {/* 7. SECRECY / TRUST */}
          <section className="py-20 bg-fundo-claro">
             <div className="max-w-6xl mx-auto px-6">
                <div className="text-center max-w-2xl mx-auto mb-16">
                   <h2 className="font-fraunces text-3xl md:text-4xl font-bold text-texto-principal mb-4 tracking-tight">Compartilhado, mas organizado com segurança</h2>
                   <p className="text-texto-secundario font-medium leading-relaxed">O KAZA foi pensado para lares com rotinas reais. Mesmo no MultiPRO, cada acesso tem seu papel, sua sessão e seu controle.</p>
                </div>
                
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                   <div className="bg-superficie border border-borda p-6 rounded-3xl text-center shadow-sm">
                      <div className="w-12 h-12 bg-fundo-claro rounded-full flex items-center justify-center mx-auto mb-4 text-principal"><Lock className="w-5 h-5"/></div>
                      <h4 className="font-bold text-sm text-texto-principal">Permissões por perfil</h4>
                   </div>
                   <div className="bg-superficie border border-borda p-6 rounded-3xl text-center shadow-sm">
                      <div className="w-12 h-12 bg-fundo-claro rounded-full flex items-center justify-center mx-auto mb-4 text-principal"><User className="w-5 h-5"/></div>
                      <h4 className="font-bold text-sm text-texto-principal">Sessão individual por acesso</h4>
                   </div>
                   <div className="bg-superficie border border-borda p-6 rounded-3xl text-center shadow-sm">
                      <div className="w-12 h-12 bg-fundo-claro rounded-full flex items-center justify-center mx-auto mb-4 text-principal"><Settings className="w-5 h-5"/></div>
                      <h4 className="font-bold text-sm text-texto-principal">Conta mestre com gestão</h4>
                   </div>
                   <div className="bg-superficie border border-borda p-6 rounded-3xl text-center shadow-sm">
                      <div className="w-12 h-12 bg-fundo-claro rounded-full flex items-center justify-center mx-auto mb-4 text-principal"><Smartphone className="w-5 h-5"/></div>
                      <h4 className="font-bold text-sm text-texto-principal">Controle sobre conectados</h4>
                   </div>
                </div>
             </div>
          </section>

          {/* 8. CTA FINAL */}
          <section className="py-24 px-6 max-w-7xl mx-auto w-full mb-12">
             <div className="bg-verde-escuro rounded-[3rem] p-12 md:p-20 text-center relative overflow-hidden shadow-2xl border border-principal">
                <div className="absolute inset-0 opacity-20" style={{ backgroundImage: 'radial-gradient(#52B788 1px, transparent 1px)', backgroundSize: '30px 30px' }}></div>
                <div className="relative z-10 w-full max-w-3xl mx-auto">
                   <h2 className="font-fraunces text-4xl md:text-5xl font-bold text-white mb-6 text-balance leading-tight">Menos carga mental.<br/>Mais casa funcionando.</h2>
                   <p className="text-verde-palido text-lg md:text-xl font-medium mb-12 text-balance leading-relaxed">
                     Escolha o plano que combina com sua rotina: IndividualPRO por R$19,90/mês para organização solo ou MultiPRO por R$37,90/mês para até 3 acessos compartilhados.
                   </p>
                   
                   <div className="flex flex-col sm:flex-row justify-center items-center gap-4 w-full">
                      <Link to="/auth" className="w-full sm:w-auto bg-superficie text-principal hover:bg-gray-50 border border-transparent font-bold py-4 px-8 rounded-full text-center transition-all shadow-sm">
                        Escolher IndividualPRO
                      </Link>
                      <Link to="/auth" className="w-full sm:w-auto bg-ambar hover:bg-orange-500 text-white font-bold py-4 px-8 rounded-full text-center transition-all shadow-[0_10px_20px_-10px_rgba(244,162,97,0.5)] hover:-translate-y-1">
                        Testar MultiPRO por 7 dias
                      </Link>
                   </div>
                   
                   <p className="text-sm font-medium text-verde-claro mt-8">Veja a demo antes de entrar</p>
                   <p className="text-xs text-white/50 mt-2 font-mono uppercase tracking-widest">Mesma casa. Diferentes acessos. Tudo organizado.</p>
                </div>
             </div>
          </section>

        </main>

        {/* 9. FOOTER */}
        <footer className="bg-superficie border-t border-borda pt-16 pb-8">
           <div className="max-w-7xl w-full mx-auto px-6 grid grid-cols-1 md:grid-cols-12 gap-12 mb-16">
              <div className="md:col-span-4 flex flex-col">
                 <Link to="/pagina-de-vendas" className="mb-6 inline-block">
                    <img src={LogoImage} alt="KAZA Logo" className="h-[32px] object-contain" />
                 </Link>
                 <p className="text-texto-secundario text-sm leading-relaxed max-w-sm">KAZA — sua casa organizada com inteligência.</p>
              </div>
              
              <div className="md:col-span-2">
                 <h5 className="font-bold text-texto-principal mb-4 uppercase tracking-wider text-xs">Produto</h5>
                 <ul className="space-y-3">
                    <li><a href="#como-ajuda" className="text-texto-secundario hover:text-principal text-sm transition-colors">Funcionalidades</a></li>
                    <li><a href="#demo" className="text-texto-secundario hover:text-principal text-sm transition-colors">Modo Teste</a></li>
                 </ul>
              </div>
              
              <div className="md:col-span-2">
                 <h5 className="font-bold text-texto-principal mb-4 uppercase tracking-wider text-xs">Acessar</h5>
                 <ul className="space-y-3">
                    <li><a href="#planos" className="text-texto-secundario hover:text-principal text-sm transition-colors">Planos</a></li>
                    <li><Link to="/auth" className="text-texto-secundario hover:text-principal text-sm transition-colors">Criar conta</Link></li>
                 </ul>
              </div>

              <div className="md:col-span-2">
                 <h5 className="font-bold text-texto-principal mb-4 uppercase tracking-wider text-xs">Conteúdo</h5>
                 <ul className="space-y-3">
                    <li><a href="#" className="text-texto-secundario hover:text-principal text-sm transition-colors">Blog</a></li>
                    <li><a href="#" className="text-texto-secundario hover:text-principal text-sm transition-colors">Contato</a></li>
                 </ul>
              </div>

              <div className="md:col-span-2">
                 <h5 className="font-bold text-texto-principal mb-4 uppercase tracking-wider text-xs">Políticas</h5>
                 <ul className="space-y-3">
                    <li><Link to="/pagina-de-vendas/privacidade" className="text-texto-secundario hover:text-principal text-sm transition-colors">Privacidade</Link></li>
                    <li><Link to="/pagina-de-vendas/termos-de-uso" className="text-texto-secundario hover:text-principal text-sm transition-colors">Termos</Link></li>
                 </ul>
              </div>
           </div>

           <div className="w-full border-t border-borda pt-8">
              <div className="max-w-7xl mx-auto px-6 text-center md:text-left flex flex-col md:flex-row justify-between items-center gap-4">
                 <p className="text-xs font-medium text-texto-secundario">© {new Date().getFullYear()} KAZA. Todos os direitos reservados.</p>
              </div>
           </div>
        </footer>

      </div>
    </>
  );
}
