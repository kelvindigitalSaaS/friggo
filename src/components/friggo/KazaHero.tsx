import React from 'react';
import { motion } from 'framer-motion';
import prodImg from '../../../prototipo/desing mobile 2.webp';

export default function KazaHero() {
  return (
    <div className="mt-4 flex items-center justify-center">
      <motion.div
        initial={{ opacity: 0, y: 8 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
        className="w-full max-w-3xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-3 items-start"
      >
        {/* Small product carousel / preview */}
        <div className="rounded-2xl p-3 bg-white/90 dark:bg-white/5 backdrop-blur-md border border-black/[0.04] dark:border-white/[0.04] shadow-card">
          <div className="flex items-center justify-between mb-3">
            <div>
              <p className="text-xs text-muted-foreground font-semibold">Você pode precisar</p>
              <p className="text-sm font-bold text-foreground">Sugestões rápidas</p>
            </div>
            <button className="text-xs text-primary font-semibold">Ver mais</button>
          </div>

          <div className="flex gap-3 overflow-x-auto pb-1">
            <div className="flex-shrink-0 w-28 rounded-xl bg-white p-3 border border-black/[0.03] dark:bg-white/3">
              <div className="h-14 w-full mb-2 rounded-lg bg-gradient-to-br from-emerald-100 to-emerald-50 flex items-center justify-center text-emerald-700 font-semibold">Bet</div>
              <p className="text-[12px] font-semibold text-foreground">Beterraba</p>
              <p className="text-xs text-muted-foreground">500 g</p>
            </div>

            <div className="flex-shrink-0 w-28 rounded-xl bg-white p-3 border border-black/[0.03] dark:bg-white/3">
              <div className="h-14 w-full mb-2 rounded-lg bg-gradient-to-br from-yellow-100 to-yellow-50 flex items-center justify-center text-amber-700 font-semibold">Avo</div>
              <p className="text-[12px] font-semibold text-foreground">Abacate</p>
              <p className="text-xs text-muted-foreground">450 g</p>
            </div>

            <div className="flex-shrink-0 w-28 rounded-xl bg-white p-3 border border-black/[0.03] dark:bg-white/3">
              <div className="h-14 w-full mb-2 rounded-lg bg-gradient-to-br from-rose-100 to-rose-50 flex items-center justify-center text-rose-700 font-semibold">Car</div>
              <p className="text-[12px] font-semibold text-foreground">Cenoura</p>
              <p className="text-xs text-muted-foreground">1 kg</p>
            </div>
          </div>

          <div className="mt-3 flex items-center gap-3">
            <button className="flex-1 h-9 rounded-xl bg-primary/10 text-primary text-sm font-semibold">Ir à lista</button>
            <button className="h-9 w-9 rounded-lg bg-white border border-black/[0.04] flex items-center justify-center">+</button>
          </div>
        </div>

        {/* Product detail preview */}
        <motion.div
          initial={{ scale: 0.98, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
          className="rounded-2xl p-4 bg-white/95 dark:bg-white/6 border border-black/[0.04] dark:border-white/[0.06] shadow-card"
        >
          <div className="flex flex-col md:flex-row items-center gap-4">
            <motion.div
              className="w-full md:w-36 h-36 md:h-36 rounded-2xl bg-gradient-to-br from-primary/10 to-primary/5 flex items-center justify-center overflow-hidden"
              animate={{ y: [0, -6, 0] }}
              transition={{ duration: 3.6, repeat: Infinity, ease: 'easeInOut' }}
            >
              <img src={prodImg} alt="produto destaque" className="w-full h-full object-cover" />
            </motion.div>

            <div className="flex-1 w-full">
              <h3 className="text-base font-bold text-foreground leading-snug">Beef Mixed Cut Bone</h3>
              <p className="text-xs text-muted-foreground mt-1">1000 g · Fresh</p>

              <div className="mt-3 flex items-center gap-3">
                <div className="text-2xl font-extrabold text-foreground">R$ 23,<span className="text-sm font-medium">46</span></div>
                <div className="flex items-center gap-1 text-xs text-muted-foreground">
                  <svg width="12" height="12" viewBox="0 0 24 24" fill="none" className="text-amber-400"><path d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z" fill="currentColor"/></svg>
                  <span className="font-semibold">4.5</span>
                </div>
              </div>

              <p className="text-sm text-muted-foreground mt-3 line-clamp-3">100% satisfaction guarantee. If you experience any of the following issues, missing or poor item, late arrival, unprofessional service... Read more</p>

              <div className="mt-4 flex items-center gap-3">
                <div className="flex items-center gap-1 bg-white/50 border border-black/[0.04] rounded-full px-2 py-1">
                  <button className="text-lg text-muted-foreground">−</button>
                  <span className="px-2 text-sm font-semibold">1</span>
                  <button className="text-lg text-muted-foreground">+</button>
                </div>
                <button className="flex-1 h-10 rounded-xl bg-emerald-500 text-white font-bold">Adicionar ao carrinho</button>
              </div>
            </div>
          </div>
        </motion.div>
      </motion.div>
    </div>
  );
}
