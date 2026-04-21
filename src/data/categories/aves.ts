import { Recipe } from "@/types/kaza";

export const receitasAves: Omit<Recipe, "id" | "usesExpiringItems">[] = [
  {
    name: "Frango Assado Inteiro de Domingo 📋", emoji: "🥣", region: "INT", estimatedCost: "low", 
    description:
      "Frango temperado com ervas e limão, assado lentamente até a pele ficar crocante",
    category: "Aves",
    type: "lunch",
    difficulty: "fácil",
    prepTime: 20,
    cookTime: 80,
    servings: 6,
    imageUrl:
      "https://images.unsplash.com/photo-1598103442097-8b74394b95c6?auto=format&fit=crop&q=80&w=600&h=400",
    ingredients: [
      "1 frango inteiro (~1,8 kg)",
      "4 colheres de manteiga amolecida",
      "4 dentes de alho amassados",
      "raspas e suco de 1 limão",
      "tomilho, alecrim e salsinha frescos",
      "sal grosso e pimenta-do-reino",
      "azeite",
      "1 cebola e 1 limão para recheio"
    ],
    instructions: [
      "Retire o frango da geladeira 1 hora antes. Seque completamente com papel toalha por dentre e por fora — pele seca = pele crocante.",
      "Prepare a manteiga temperada: misture a manteiga amolecida com alho amassado, raspas de limão, tomilho picado, sal e pimenta. Misture bem.",
      "Com os dedos, separe gentilmente a pele do peito do frango sem rasgar. Coloque a manteiga temperada diretamente sob a pele, distribuindo por todo o peito.",
      "Tempere o exterior com sal grosso, pimenta e azeite por todos os lados, incluindo dentro da cavidade.",
      "Coloque meia cebola e metade do limão dentro da cavidade para perfumar durante o assado.",
      "Pré-aqueça o forno a 220 °C. Coloque o frango com o peito para cima em assadeira. Asse por 20 min até a pele começar a dourar.",
      "Reduza para 180 °C e continue assando por 50–60 min. A cada 20 min, regue o frango com o suco da assadeira.",
      "Estará pronto quando um termômetro no ponto mais grosso da coxa marcar 74 °C, ou quando o suco que escorre ao espetar for claro (não rosado). Descanse 10 min antes de cortar."
    ],
    tips: [
      "A manteiga sob a pele é o segredo para peito suculento e pele dourada.",
      "Nunca abra o forno nos primeiros 20 min — perde temperatura e prejudica a selagem.",
      "Use os sucos da assadeira para fazer um breve molho natural."
    ]
  },
  {
    name: "Frango à Parmegiana 📋", emoji: "🥣", region: "INT", estimatedCost: "low", 
    description:
      "Filé de frango empanado com molho de tomate e queijo gratinado",
    category: "Aves",
    type: "lunch",
    difficulty: "fácil",
    prepTime: 25,
    cookTime: 25,
    servings: 4,
    imageUrl:
      "https://images.unsplash.com/photo-1604908176997-125f25cc6f3d?auto=format&fit=crop&q=80&w=600&h=400",
    ingredients: [
      "4 filés de frango (peito aberto em borboleta)",
      "2 ovos batidos",
      "200 g de farinha de rosca",
      "1 colher de orégano",
      "alho em pó",
      "400 g de molho de tomate",
      "200 g de mussarela fatiada",
      "parmesão ralado",
      "sal, pimenta, óleo"
    ],
    instructions: [
      "Abra os filés em borboleta ou bata com martelo de carne para uniformizar (~1 cm). Isso garante cozimento uniforme.",
      "Tempere com sal, pimenta e alho em pó por ambos os lados. Deixe absorver por 10 min.",
      "Monte linha de empanamento: farinha de rosca misturada com orégano → Ovo batido → Farinha de rosca novamente. Empane cada filé pressionando bem.",
      "Frite em óleo a 180 °C por 3–4 min de cada lado até dourar uniformemente. Escorra em papel absorvente.",
      "Pré-aqueça o grill do forno. Disponha os filés em assadeira ou frigideira refratária.",
      "Cubra cada filé com 2 colheres de molho de tomate. Adicione fatias de mussarela por cima cobrindo completamente.",
      "Polvilhe parmesão ralado e leve ao forno/grill por 8–10 min até o queijo derreter e dourar.",
      "Sirva imediatamente com arroz e massa ao sugo."
    ],
    tips: [
      "Para versão mais crocante: adicione parmesão na farinha de rosca.",
      "Molho de tomate caseiro faz diferença significativa.",
      "Frango não pode ficar mal passado — verifique que não haja partes rosadas."
    ]
  },
  {
    name: "Frango Xadrez 📋", emoji: "🥣", region: "BR", estimatedCost: "low", 
    description:
      "Frango em cubos salteado com pimentões coloridos e amendoim — culinária sino-brasileira",
    category: "Aves",
    type: "lunch",
    difficulty: "fácil",
    prepTime: 20,
    cookTime: 15,
    servings: 4,
    imageUrl:
      "https://images.unsplash.com/photo-1565557623262-b51c2513a641?auto=format&fit=crop&q=80&w=600&h=400",
    ingredients: [
      "600 g de frango em cubos",
      "1 pimentão vermelho, 1 amarelo, 1 verde",
      "100 g de amendoim torrado sem casca",
      "3 dentes de alho",
      "1 pedaço de gengibre ralado",
      "MOLHO: 4 colheres de shoyu, 2 de mel, 1 de amido, 1 de óleo de gergelim",
      "pimenta calabresa, cebolinha"
    ],
    instructions: [
      "Corte o frango em cubos de 2 cm. Tempere com sal, pimenta e 1 colher de shoyu por 15 min.",
      "Corte os pimentões em quadrados de 2 cm (de onde vem o nome 'xadrez').",
      "Prepare o molho: misture shoyu, mel, amido de milho dissolvido em um pouco de água, e óleo de gergelim. Reserve.",
      "Aqueça wok ou frigideira grande em fogo alto até fumegar. Adicione óleo de sabor neutro.",
      "Saltei o frango em fogo alto, sem mexer demais, por 4–5 min até dourar. Reserve.",
      "No mesmo wok, adds mais óleo levemente. Saltei alho e gengibre por 30 seg. Adicione os pimentões e salteie por 3–4 min — devem ficar crocantes, não moles.",
      "Volte o frango. Despeje o molho e mexa por 2 min até engrossar e envolver tudo. Adicione o amendoim.",
      "Finalize com cebolinha picada e pimenta calabresa. Sirva sobre arroz branco."
    ],
    tips: [
      "O segredo do sabor é o fogo bem alto e não lotar o wok.",
      "Amendoim adicionado no final mantém a crocância.",
      "Para versão mais apimentada, adicione pasta de pimenta ou sriracha."
    ]
  },
  {
    name: "Coxa e Sobrecoxa Caipira ao Molho Pardo 📋", emoji: "🥣", region: "BR", estimatedCost: "low", 
    description:
      "Frango caipira cozido no próprio sangue — prato mineiro tradicional",
    category: "Aves",
    type: "lunch",
    difficulty: "médio",
    prepTime: 20,
    cookTime: 60,
    servings: 6,
    imageUrl:
      "https://images.unsplash.com/photo-1598103442097-8b74394b95c6?auto=format&fit=crop&q=80&w=600&h=400",
    ingredients: [
      "1 frango caipira cortado em pedaços",
      "sangue do frango com vinagre (para preservar)",
      "cebola, alho, tomate",
      "louro, coentro, salsinha",
      "pimenta malagueta",
      "sal, óleo",
      "arroz e angu para servir"
    ],
    instructions: [
      "Tempere o frango com sal, alho amassado, pimenta e limão. Marine por 30 min.",
      "Em panela grande, aqueça óleo e doure os pedaços de frango por todos os lados. Reserve.",
      "Refogue cebola, tomate e alho até murcharem bem (8 min).",
      "Volte o frango, adicione água suficiente para cozinhar com tampa por 35–40 min.",
      "Quando o frango estiver macio, aqueça o sangue reservado separadamente para não talhar.",
      "Adicione lentamente o sangue aquecido ao molho do frango, mexendo para incorporar. O molho escurecerá e encorpará.",
      "Cozinhe por mais 5–8 min em fogo baixo com o louro e temperos verdes.",
      "Sirva com arroz, angu de milho (polenta brasileira), couve refogada e farofa."
    ],
    tips: [
      "Exige frango caipira abatido com coleta do sangue.",
      "O vinagre no sangue impede a coagulação.",
      "Prato típico de Minas Gerais e interior de São Paulo."
    ]
  },
  {
    name: "Frango ao Leite de Coco com Açafrão 📋", emoji: "🥣", region: "INT", estimatedCost: "low", 
    description:
      "Frango cremoso com coco e temperos aromáticos estilo Indian-Inspired",
    category: "Aves",
    type: "lunch",
    difficulty: "fácil",
    prepTime: 15,
    cookTime: 30,
    servings: 4,
    imageUrl:
      "https://images.unsplash.com/photo-1505253758473-96b7015fcd40?auto=format&fit=crop&q=80&w=600&h=400",
    ingredients: [
      "600 g de coxa desossada sem pele",
      "400 ml de leite de coco",
      "1 cebola, 3 dentes de alho, gengibre",
      "1 colher de açafrão-da-terra (cúrcuma)",
      "1 colher de cominho",
      "1 colher de coentro em pó",
      "pimenta, sal, azeite",
      "coentro fresco para servir"
    ],
    instructions: [
      "Corte o frango em cubos. Tempere com sal, pimenta, metade do açafrão e cominho. Deixe por 15 min.",
      "Em panela, aqueça azeite. Refogue cebola até amolecer (5 min). Adicione alho e gengibre ralados (1 min).",
      "Adicione o restante dos temperos secos e toste por 30 seg — libera os aromas.",
      "Adicione os cubos de frango e sele por 3–4 min.",
      "Despeje o leite de coco. Misture bem. Tampe e cozinhe em fogo médio por 20 min.",
      "Destampe e cozinhe mais 5–8 min para reduzir levemente o molho.",
      "Ajuste temperos. Finalize com coentro fresco.",
      "Sirva com arroz basmati e pão naan."
    ],
    tips: [
      "Açafrão da terra (cúrcuma) tem propriedades anti-inflamatórias.",
      "Para mais espessura, adicione 1 colher de amido de milho dissolvida.",
      "Coxa desossada é mais suculenta que o peito neste prato."
    ]
  },
  {
    name: "Peito de Frango Grelhado Perfumado 📋", emoji: "🥣", region: "INT", estimatedCost: "low", 
    description:
      "Frango grelhado suculento com pasta de ervas e alho — nunca seco",
    category: "Aves",
    type: "healthy",
    difficulty: "fácil",
    prepTime: 10,
    cookTime: 15,
    servings: 4,
    imageUrl:
      "https://images.unsplash.com/photo-1432139555190-58524dae6a55?auto=format&fit=crop&q=80&w=600&h=400",
    ingredients: [
      "4 peitos de frango (~200 g cada)",
      "3 dentes de alho amassados",
      "suco e raspa de 1 limão",
      "1 colher de orégano seco",
      "tomilho fresco",
      "azeite, sal e pimenta"
    ],
    instructions: [
      "Abra os peitos de frango ao meio (borboleta) ou bata para uniformizar a espessura (~2 cm). Espessura uniforme = cozimento uniforme.",
      "Prepare a marinada: misture alho, suco e raspa de limão, orégano, tomilho, azeite, sal e pimenta.",
      "Cubra os peitos com a marinada. Deixe por 30 min a 2 h na geladeira.",
      "Aqueça frigideira de ferro ou grill em fogo alto por 3 min.",
      "Retire o frango da geladeira 15 min antes de grelhar. Escorra o excesso de marinada (evita fumaça excessiva).",
      "Grelhe por 4–5 min de cada lado SEM MOVER, até aparecerem marcas de grelha e a superfície ficar opaca.",
      "Verifique com termômetro: 74 °C internamente. Ou corte discretamente — não deve haver partes rosadas.",
      "Descanse por 3 min antes de servir. Sirva com salada, legumes grelhados ou batata doce assada."
    ],
    tips: [
      "O limão na marinada começa a cozinhar quimicamente a carne — não marine por mais de 4 h.",
      "Frigideira muito quente = marcas bonitas e suculência interior.",
      "Para frango SEMPRE suculento: não cozinhe além de 74 °C interno."
    ]
  },
  {
    name: "Coxinha de Frango Caseira 📋", emoji: "🥣", region: "BR", estimatedCost: "low", 
    description:
      "A rainha dos salgados brasileiros — massa crocante com recheio de frango temperado",
    category: "Aves",
    type: "snack",
    difficulty: "difícil",
    prepTime: 60,
    cookTime: 25,
    servings: 30,
    imageUrl:
      "https://images.unsplash.com/photo-1627308595229-7830a5c91f9f?auto=format&fit=crop&q=80&w=600&h=400",
    ingredients: [
      "MASSA: 500 g farinha de trigo, 500 ml caldo de frango, 1 colher manteiga, sal",
      "RECHEIO: 2 peitos cozidos e desfiados, 1 cebola, alho, salsinha, creme de cebola, sal",
      "EMPANAMENTO: farinha de rosca, ovos batidos",
      "óleo para fritar"
    ],
    instructions: [
      "RECHEIO: Desfie os peitos muito bem. Refogue cebola e alho até dourar. Adicione o frango desfiado, o creme de cebola, salsinha e sal. Cozinhe por 3 min. Resfrie completamente antes de rechear.",
      "MASSA: Em panela, ferva o caldo de frango com a manteiga e sal. Quando ferver, adicione a farinha de uma vez e mexa vigorosamente até soltar do fundo — massa choux.",
      "Transfira para superfície levemente untada. Sove enquanto ainda morna por 5 min até lisa e macia.",
      "Divida em bolinhas de 40 g. Abra cada bolinha na palma da mão formando um disco de 0,5 cm.",
      "Coloque 1 colher de recheio no centro, feche unindo as bordas e modele a coxinha puxando a ponta com os dedos indicador e polegar.",
      "Passe cada coxinha no ovo batido depois na farinha de rosca. Para casca mais grossa: repita ovo e rosca.",
      "Frite em óleo a 180 °C por 4–5 min, virando, até dourar uniformemente. Nunca lote — baixa a temperatura do óleo.",
      "Escorra em papel absorvente. Sirva quente. Congeladas antes de fritar podem ser preparadas direto do congelador."
    ],
    tips: [
      "Massa quente na hora de modelar = mais fácil de trabalhar.",
      "Resfrie o recheio completamente — recheio quente derrete a massa.",
      "Para congelar: congele antes de fritar em bandeja e depois transfira para saco."
    ]
  },
  {
    name: "Galinhada Mineira 📋", emoji: "🥣", region: "INT", estimatedCost: "low", 
    description:
      "Arroz com frango e açafrão — o prato mais emblemático de Minas Gerais",
    category: "Aves",
    type: "lunch",
    difficulty: "médio",
    prepTime: 20,
    cookTime: 50,
    servings: 6,
    imageUrl:
      "https://images.unsplash.com/photo-1512058560366-cd2429555614?auto=format&fit=crop&q=80&w=600&h=400",
    ingredients: [
      "1 frango cortado em pedaços",
      "2 xícaras de arroz",
      "1 cebola grande picada",
      "4 dentes de alho",
      "1 colher de açafrão-da-terra",
      "1 pimentão amarelo picado",
      "2 tomates picados",
      "caldo de galinha ou água",
      "salsinha, coentro, sal, pimenta, óleo"
    ],
    instructions: [
      "Tempere o frango com sal, pimenta, alho e açafrão. Deixe marinar por 30 min.",
      "Em panela de fundo grosso (ou panela de barro), aqueça óleo em fogo alto. Doure cada pedaço de frango por todos os lados (3–4 min por lado). Reserve.",
      "Na mesma panela, refogue cebola e alho por 5 min. Adicione o pimentão e o tomate. Cozinhe por 3 min.",
      "Adicione o arroz cru e refogue por 2 min mexendo — o arroz absorve os sabores.",
      "Despeje caldo quente na proporção 1:2 (1 xícara arroz : 2 xícaras caldo). Adicione mais açafrão, sal e pimenta.",
      "Distribua os pedaços de frango por cima do arroz. Tampe e cozinhe em fogo médio por 10 min.",
      "Reduza para fogo baixo e cozinhe por mais 15–18 min sem abrir. O arroz deve absorver todo o caldo.",
      "Descanse tampado por 5 min. Finalize com salsinha e coentro picados. Sirva com couve refogada."
    ],
    tips: [
      "Açafrão-da-terra (cúrcuma) dá a cor amarela característica.",
      "Panela de barro conserva o calor melhor e dá sabor especial ao prato.",
      "Frango caipira dá mais sabor ao caldo, mas demora mais para amaciar."
    ]
  },
  {
    name: "Frango com Quiabo 📋", emoji: "🥣", region: "INT", estimatedCost: "low", 
    description:
      "Combinação clássica mineira — frango cozido com quiabo sem baba",
    category: "Aves",
    type: "lunch",
    difficulty: "médio",
    prepTime: 30,
    cookTime: 45,
    servings: 6,
    imageUrl:
      "https://images.unsplash.com/photo-1598103442097-8b74394b95c6?auto=format&fit=crop&q=80&w=600&h=400",
    ingredients: [
      "1 frango cortado em pedaços",
      "500 g de quiabo",
      "1 cebola grande",
      "4 dentes de alho",
      "2 tomates maduros",
      "coentro fresco",
      "óleo, sal, pimenta",
      "caldo de galinha"
    ],
    instructions: [
      "SEGREDO DO QUIABO SEM BABA: Lave, seque muito bem e corte o quiabo em rodelas grossas (1,5 cm). Frite em frigideira seca em fogo alto por 5–7 min mexendo — a baba evaporará. Reserve.",
      "Tempere o frango com sal, alho e pimenta. Doure em óleo quente por todos os lados (5 min). Reserve.",
      "Refogue a cebola até amolecer. Adicione os tomates e cozinhe por 4 min.",
      "Volte o frango, adicione caldo para cobrir parcialmente. Tampe e cozinhe por 25 min.",
      "Adicione o quiabo ao frango. Misture delicadamente e cozinhe por mais 10 min — o quiabo deve ficar macio mas não desmanchar.",
      "Ajuste temperos. Finalize com coentro fresco picado.",
      "Sirva com arroz branco e angu de milho (polenta). Prato essencialmente mineiro."
    ],
    tips: [
      "A etapa de fritar o quiabo seco é fundamental para eliminar a baba.",
      "Não tampe na hora do quiabo — o vapor aumenta a mucilagem.",
      "Frango caipira mais velho dá mais gelatin ao caldo."
    ]
  },
  {
    name: "Strogonoff de Frango 📋", emoji: "🥣", region: "BR", estimatedCost: "low", 
    description:
      "Versão brasileira clássica com frango, creme de leite e batata palha",
    category: "Aves",
    type: "lunch",
    difficulty: "fácil",
    prepTime: 15,
    cookTime: 25,
    servings: 4,
    imageUrl:
      "https://images.unsplash.com/photo-1565557623262-b51c2513a641?auto=format&fit=crop&q=80&w=600&h=400",
    ingredients: [
      "600 g de frango em cubos",
      "1 cebola, 2 dentes de alho",
      "200 g champignon fatiado",
      "2 colheres de ketchup",
      "1 colher de mostarda",
      "300 ml de creme de leite",
      "sal, pimenta, manteiga",
      "batata palha e arroz para servir"
    ],
    instructions: [
      "Tempere o frango com sal, pimenta e alho. Saltei em manteiga quente em lotes por 5 min até dourar. Reserve.",
      "Refogue a cebola por 3 min. Adicione o champignon e cozinhe por 5 min.",
      "Adicione ketchup e mostarda, misture por 1 min.",
      "Despeje o creme de leite e cozinhe por 5 min até encorpar.",
      "Volte o frango ao molho, aqueça por 2–3 min. Ajuste temperos.",
      "Sirva sobre arroz branco, polvilhado com bastante batata palha."
    ],
    tips: [
      "Batata palha adiciona textura contrastante.",
      "Use frango desossado da coxa para mais suculência."
    ]
  },
  {
    name: "Franguinho ao Molho de Ervas 📋", emoji: "🥣", region: "INT", estimatedCost: "low", 
    description: "Coxinhas de asa asssadas com crosta de ervas e limão",
    category: "Aves",
    type: "snack",
    difficulty: "fácil",
    prepTime: 10,
    cookTime: 40,
    servings: 4,
    imageUrl:
      "https://images.unsplash.com/photo-1527477396000-e27163b481c2?auto=format&fit=crop&q=80&w=600&h=400",
    ingredients: [
      "1 kg de coxinhas de asa (chicken wings)",
      "suco de 2 limões",
      "4 dentes de alho",
      "2 colheres de mel",
      "1 colher de molho inglês",
      "orégano, alecrim, páprica",
      "sal, pimenta, azeite"
    ],
    instructions: [
      "Limpe as coxinhas, seque com papel toalha. Faça pequenos cortes na carne para absorver o tempero.",
      "Misture limão, alho amassado, mel, molho inglês, orégano, alecrim, páprica, sal, pimenta e azeite.",
      "Marine as coxinhas por pelo menos 2 h (ideal: 12 h na geladeira).",
      "Pré-aqueça o forno a 220 °C. Disponha em assadeira sem sobrepor, com a pele para cima.",
      "Asse por 20 min. Vire e asse mais 15 min. Ligue o grill por 5 min para crocância final.",
      "Elas estão prontas quando a pele estiver dourada e crocante e a carne se desprender do osso facilmente.",
      "Sirva com molho buffalo, ranch ou chimichurri."
    ],
    tips: [
      "Seque bem antes de assar — umidade impede a crocância.",
      "Grelha no forno é essencial para pele crocante."
    ]
  }
];
