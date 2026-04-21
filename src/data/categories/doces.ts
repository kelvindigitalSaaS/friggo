import { Recipe } from "@/types/kaza";

export const receitasDoces: Omit<Recipe, "id" | "usesExpiringItems">[] = [
  {
    name: "Brigadeiro Clássico 📋", emoji: "🥣", region: "BR", estimatedCost: "low", 
    description:
      "O docinho brasileiro mais amado do mundo — cremoso e irresistível",
    category: "Doces",
    type: "snack",
    difficulty: "fácil",
    prepTime: 5,
    cookTime: 15,
    servings: 30,
    imageUrl:
      "https://images.unsplash.com/photo-1578985545062-69928b1d9587?auto=format&fit=crop&q=80&w=600&h=400",
    ingredients: [
      "1 lata leite condensado",
      "3 colheres de cacau em pó (sem açúcar)",
      "1 colher de manteiga",
      "chocolate granulado para enrolar"
    ],
    instructions: [
      "Em panela antiaderente de fundo grosso, misture leite condensado, cacau e manteiga.",
      "Cozinhe em fogo MÉDIO-BAIXO mexendo CONSTANTEMENTE, raspando fundo e laterais.",
      "O ponto certo é quando ao passar a colher no fundo, forma um caminho que demora 2–3 segundos para fechar.",
      "Tire do fogo e despeje em prato untado com manteiga. Espalhe.",
      "Deixe esfriar completamente em temperatura ambiente (1–2 h). Não acelere na geladeira — fica duro demais.",
      "Unte as mãos com manteiga. Pegue porções de 15 g e rolle entre as palmas até esferas.",
      "Passe no granulado. Coloque em forminhas.",
      "Geladeira aumenta a firmeza — mas sirva em temperatura ambiente para sabor e textura ideais."
    ],
    tips: [
      "Fogo médio-baixo e mexer sempre = ponto perfeito sem queimar.",
      "Ponto de enrolar: massa desgruda do fundo e lados completamente.",
      "Para brigadeiro gourmet: substitua cacau por chocolate belga 70% derretido."
    ]
  },
  {
    name: "Mousse de Chocolate Belga 📋", emoji: "🥣", region: "INT", estimatedCost: "low", 
    description: "Mousse leve e aerada com chocolate amargo de qualidade",
    category: "Doces",
    type: "snack",
    difficulty: "médio",
    prepTime: 30,
    cookTime: 0,
    servings: 6,
    imageUrl:
      "https://images.unsplash.com/photo-1541795795328-f073b763494e?auto=format&fit=crop&q=80&w=600&h=400",
    ingredients: [
      "200 g chocolate amargo 70%",
      "4 ovos (separados)",
      "50 g açúcar",
      "40 g manteiga",
      "200 ml creme de leite fresco"
    ],
    instructions: [
      "Derreta o chocolate em banho-maria com a manteiga. Mexa até liso. Espere esfriar a ~35 °C.",
      "Bata as gemas com metade do açúcar até cremoso e pálido (5 min na batedeira).",
      "Bata o creme de leite fresco gelado em chantilly cremoso (não rígido).",
      "Bata as claras em neve. Quando espumosas, adicione o restante do açúcar. Bata até picos firmes.",
      "TÉCNICA: Misture as gemas no chocolate. Depois incorpore o chantilly com movimentos suaves.",
      "Por último, adicione as claras em neve em 3 partes, com movimentos amplos de baixo para o topo — não deflate.",
      "Distribua em taças. Refrigere por mínimo 3 h.",
      "Sirva com raspas de chocolate e chantilly."
    ],
    tips: [
      "Chocolate a 35 °C: mais frio, solidifica ao contato com as claras. Mais quente, cozinha os ovos.",
      "Movimentos suaves ao incorporar as claras preservam o ar — é o que cria a leveza.",
      "Mousse melhora no dia seguinte — mínimo 8 h de geladeira."
    ]
  },
  {
    name: "Pudim de Leite Condensado 📋", emoji: "🥣", region: "BR", estimatedCost: "low", 
    description:
      "Pudim brasileiro sedoso e brilhante — a sobremesa das festas de família",
    category: "Doces",
    type: "snack",
    difficulty: "médio",
    prepTime: 20,
    cookTime: 50,
    servings: 10,
    imageUrl:
      "https://images.unsplash.com/photo-1519869325930-281384150729?auto=format&fit=crop&q=80&w=600&h=400",
    ingredients: [
      "1 lata leite condensado",
      "a mesma medida de leite integral",
      "3 ovos inteiros",
      "CALDA: 1 xícara açúcar, 1/2 xícara água"
    ],
    instructions: [
      "CALDA: Em fogo médio, derreta o açúcar SEM MEXER até caramelizar dourado. Adicione a água aquecida com cuidado (vai borbulhar). Mexa até dissolver. Despeje na forma e espalhe girando. Reserve.",
      "No liquidificador: bata leite condensado, leite e ovos por 2 min. Para bolhas: deixe a mistura repousar 15 min.",
      "Coe a mistura sobre o caramelo na forma.",
      "BANHO-MARIA: Coloque a forma dentro de assadeira maior com água na metade.",
      "Asse a 160 °C por 45–50 min. O pudim estará pronto quando ao espetar palito sair limpo.",
      "Não abra o forno durante o cozimento.",
      "Resfrie na geladeira por mínimo 4 h. Ideal: 12 h — ficará mais firme.",
      "Para desenformar: passe faca nas bordas e inverta em prato fundo (para o caramelo escorrer)."
    ],
    tips: [
      "Não mexer o caramelo enquanto derrete evita a cristalização.",
      "Coe a mistura para remover eventuais fios de clara.",
      "Mais ovos = pudim mais firme. Menos ovos = mais cremoso."
    ]
  },
  {
    name: "Torta de Limão Aerada 📋", emoji: "🥣", region: "INT", estimatedCost: "low", 
    description:
      "Base crocante de biscoito com creme azedo de limão coberto de merengue",
    category: "Doces",
    type: "snack",
    difficulty: "médio",
    prepTime: 40,
    cookTime: 15,
    servings: 10,
    imageUrl:
      "https://images.unsplash.com/photo-1464305795204-6f5bbfc7fb81?auto=format&fit=crop&q=80&w=600&h=400",
    ingredients: [
      "MASSA: 200 g biscoito maisena, 100 g manteiga derretida",
      "CREME: 1 lata leite condensado, suco 4 limões sicilianos, 3 gemas",
      "MERENGUE: 4 claras, 200 g açúcar, pitada sal"
    ],
    instructions: [
      "MASSA: Processe biscoitos até farofa fina. Misture com manteiga derretida. Pressione na forma de fundo removível. Asse a 180 °C por 10 min.",
      "CREME: Bata gemas com leite condensado por 2 min. Adicione suco de limão — a acidez engrossa o creme imediatamente. Despeje sobre a massa.",
      "Asse a 170 °C por 15 min até o creme firmar levemente. Resfrie.",
      "MERENGUE ITALIANO: Ferva o açúcar com 50 ml de água até 118 °C (ponto de bola mole). Enquanto isso, bata as claras em neve.",
      "Despeje a calda quente nas claras em fio fino, batendo sempre, até merengue brilhoso e firme.",
      "Cubra a torta com o merengue formando picos com espátula ou colher.",
      "Queime o merengue com maçarico ou rapidamente no grill do forno."
    ],
    tips: [
      "Limão siciliano dá creme mais amarelo e sabor mais intenso.",
      "Merengue italiano é estável e não chorar — ideal para tortas.",
      "Maçarico de cozinha garante cor uniforme no merengue."
    ]
  },
  {
    name: "Brownie Americano Fudgy 📋", emoji: "🥣", region: "US", estimatedCost: "low", 
    description:
      "Brownie denso, muito chocolate, centro levemente cru — o americano autêntico",
    category: "Doces",
    type: "snack",
    difficulty: "fácil",
    prepTime: 15,
    cookTime: 25,
    servings: 16,
    imageUrl:
      "https://images.unsplash.com/photo-1564355808539-22fda35bed7e?auto=format&fit=crop&q=80&w=600&h=400",
    ingredients: [
      "200 g chocolate amargo 70%",
      "180 g manteiga",
      "300 g açúcar",
      "3 ovos",
      "1 colher baunilha",
      "120 g farinha",
      "30 g cacau em pó",
      "pitada de sal"
    ],
    instructions: [
      "Pré-aqueça o forno a 170 °C. Unte forma 20x20 cm e forre com papel manteiga.",
      "Derreta chocolate e manteiga em banho-maria ou micro-ondas (intervalos de 30 seg). Misture até liso. Espere esfriar.",
      "Adicione o açúcar e misture bem. Adicione os ovos um a um. Adicione a baunilha.",
      "Peneire farinha, cacau e sal. Incorpore na mistura de chocolate com movimentos suaves — não bata.",
      "TÉCNICA: misturar pouco = glúten reduzido = brownie macio. Mistura excessiva cria bolo.",
      "Despeje na forma. Alise.",
      "Asse 22–25 min. Palito deve sair com algumas migalhas úmidas — NÃO limpo. Se sair limpo, passou do ponto.",
      "Deixe esfriar 1 h antes de cortar — cortado quente, desmancha."
    ],
    tips: [
      "Palito com migalhas úmidas = ponto fudgy ideal.",
      "Refriar completamente é obrigatório — o glúten ainda está ativo no calor.",
      "Mais gordura (manteiga) = mais fudgy. Menos gordura = mais cakelike."
    ]
  },
  {
    name: "Crème Brûlée 📋", emoji: "🥣", region: "INT", estimatedCost: "low", 
    description:
      "Creme de baunilha francês com crosta de açúcar caramelizado na hora",
    category: "Doces",
    type: "snack",
    difficulty: "médio",
    prepTime: 20,
    cookTime: 45,
    servings: 6,
    imageUrl:
      "https://images.unsplash.com/photo-1470124182917-cc6e71b22ecc?auto=format&fit=crop&q=80&w=600&h=400",
    ingredients: [
      "500 ml creme de leite fresco",
      "6 gemas",
      "100 g açúcar",
      "1 fava de baunilha",
      "açúcar refinado extra para caramelizar"
    ],
    instructions: [
      "Abra a fava de baunilha ao meio. Raspe as sementes. Ferva o creme com a fava por 5 min. Retire a fava.",
      "Bata as gemas com o açúcar até pálido. Adicione o creme quente aos poucos, mexendo — não adicione tudo de uma vez.",
      "Coe a mistura. Remova a espuma com colher.",
      "Distribua em ramequins. Leve ao banho-maria no forno a 150 °C por 35–40 min.",
      "Quando firmar nas bordas mas ainda tremer no centro como gelatina: pronto. Resfrie.",
      "Geladeira por mínimo 3 h.",
      "Para servir: polvilhe açúcar refinado fino e uniforme. Queime com maçarico até caramelizar dourado.",
      "Sirva imediatamente — a crosta crocante dura apenas 5–10 min."
    ],
    tips: [
      "Banho-maria suaviza o calor — sem ele, as gemas talhariam.",
      "A crosta deve ser fina e uniforme — espessa endurece e dificulta quebrar.",
      "Maçarico controlado evita queimar o açúcar em preto."
    ]
  }
];
