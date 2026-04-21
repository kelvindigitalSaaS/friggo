import { Recipe } from "@/types/kaza";

export const receitasSopas: Omit<Recipe, "id" | "usesExpiringItems">[] = [
  {
    name: "Caldo Verde Português 📋", emoji: "🥣", region: "INT", estimatedCost: "low", 
    description:
      "A sopa mais clássica de Portugal — caldo de batata com couve e linguiça",
    category: "Sopas e Caldos",
    type: "lunch",
    difficulty: "fácil",
    prepTime: 15,
    cookTime: 30,
    servings: 6,
    imageUrl:
      "https://images.unsplash.com/photo-1547592166-23ac45744acd?auto=format&fit=crop&q=80&w=600&h=400",
    ingredients: [
      "6 batatas médias",
      "1 linguiça calabresa ou chouriço",
      "2 maços de couve-manteiga",
      "1 cebola grande",
      "3 dentes de alho",
      "azeite extra virgem",
      "sal e pimenta-do-reino"
    ],
    instructions: [
      "Descasque as batatas e corte em pedaços. Refogue cebola e alho em azeite por 3 min.",
      "Adicione as batatas e cubra completamente com água. Cozinhe em fogo médio por 20 min até bem macias.",
      "Enquanto isso, corte a linguiça em rodelas e frite em frigideira seca por 5 min. Reserve.",
      "Lave a couve, empilhe as folhas, enrole como charuto e corte em tiras MUITO FINAS (5 mm). Quanto mais fina, mais bonito.",
      "Quando as batatas estiverem macias, use mixer ou liquidificador e processe até obter caldo liso e cremoso.",
      "Leve o caldo de volta ao fogo. Para consistência: se muito grosso, adicione água. Se ralo, cozinhe mais.",
      "Adicione a couve e cozinhe por apenas 5 min — deve ficar verde vibrante, não murchinha.",
      "Sirva em tigelas com as rodelas de linguiça por cima e um fio generoso de azeite. Acompanhe com pão broa."
    ],
    tips: [
      "Couve adicionada no final preserva a cor verde e os nutrientes.",
      "Caldo liso é característico — liquidificador de imersão direto na panela facilita.",
      "Azeite de qualidade por cima ao servir faz toda a diferença."
    ]
  },
  {
    name: "Canja de Galinha brasileira 📋", emoji: "🥣", region: "BR", estimatedCost: "low", 
    description:
      "Caldo reconfortante de frango com arroz — remédio das avós para dias frios e gripes",
    category: "Sopas e Caldos",
    type: "lunch",
    difficulty: "fácil",
    prepTime: 10,
    cookTime: 45,
    servings: 6,
    imageUrl:
      "https://images.unsplash.com/photo-1547592166-23ac45744acd?auto=format&fit=crop&q=80&w=600&h=400",
    ingredients: [
      "2 coxas e 2 sobrecoxas com osso",
      "1 xícara de arroz",
      "1 cebola inteira com 2 cravos espetados",
      "2 cenouras em rodelas",
      "2 ramos de salsão",
      "4 dentes de alho",
      "louro, pimenta em grão",
      "salsinha e cebolinha frescos",
      "sal"
    ],
    instructions: [
      "Coloque o frango em panela grande. Cubra com 2 litros de água fria.",
      "Adicione cebola com cravo, cenouras, salsão, alho, louro e pimenta em grão.",
      "Leve ao fogo. Quando ferver, reduza para o mínimo e cozinhe 30–35 min. Retire a espuma (albumina) que se forma.",
      "Retire o frango do caldo. Coe o caldo. Desfie o frango descartando pele e ossos.",
      "Volte o caldo coado para a panela. Adicione as cenouras reservadas e o arroz.",
      "Cozinhe por 15–18 min. O arroz ficará bem macio no caldo.",
      "Adicione o frango desfiado e aqueça por 2 min.",
      "Finalize com salsinha e cebolinha. Sirva bem quente, com torrada ou pão."
    ],
    tips: [
      "Frango com osso dá muito mais sabor ao caldo.",
      "Espuma inicial deve ser retirada — é albumina que turvaria o caldo.",
      "Para caldo ainda mais claro: coe em pano fino."
    ]
  },
  {
    name: "Sopa de Cebola Gratinada Francesa 📋", emoji: "🥣", region: "INT", estimatedCost: "low", 
    description:
      "Soupe à l'oignon — cebolas caramelizadas em caldo rico, com pão e gruyère derretido",
    category: "Sopas e Caldos",
    type: "lunch",
    difficulty: "médio",
    prepTime: 15,
    cookTime: 70,
    servings: 4,
    imageUrl:
      "https://images.unsplash.com/photo-1547592166-23ac45744acd?auto=format&fit=crop&q=80&w=600&h=400",
    ingredients: [
      "1 kg de cebolas fatiadas em meias-luas finas",
      "50 g de manteiga + azeite",
      "1 colher de açúcar",
      "1 colher de farinha de trigo",
      "150 ml de vinho branco seco",
      "1 litro de caldo de carne",
      "tomilho, louro",
      "4 fatias de pão baguete",
      "150 g de queijo gruyère ou suíço ralado"
    ],
    instructions: [
      "Derreta a manteiga com azeite em panela grossa. Adicione TODAS as cebolas e o açúcar. Cozinhe em fogo baixo por 45–60 min, mexendo a cada 5 min.",
      "As cebolas devem caramelizar até ficarem cor de chocolate (douradas profundas). Este processo é lento e necessário — não acelere.",
      "Adicione a farinha e misture por 2 min para cozinhar o sabor cru.",
      "Adicione o vinho branco e raspe o fundo da panela — os açúcares grudados dão sabor (deglaçage).",
      "Adicione o caldo de carne quente, tomilho e louro. Cozinhe por 15 min.",
      "Toste as fatias de baguete no forno a 180 °C por 8 min.",
      "Distribua a sopa em tigelas refratárias individuais. Coloque 1 fatia de pão por cima. Cubra generosamente com gruyère.",
      "Leve ao grill do forno por 5–8 min até o queijo borbulhar e gratinar. Sirva imediatamente."
    ],
    tips: [
      "O longo cozimento das cebolas é INSUBSTITUÍVEL — é o que cria o sabor profundo.",
      "Tigelas devem ser refratárias para aguentar o grill.",
      "Caldo de carne caseiro torna a sopa extraordinária."
    ]
  },
  {
    name: "Sopa de Lentilha com Linguiça 📋", emoji: "🥣", region: "INT", estimatedCost: "low", 
    description:
      "Sopa grossa reconfortante com lentilhas, linguiça defumada e espinafre",
    category: "Sopas e Caldos",
    type: "lunch",
    difficulty: "fácil",
    prepTime: 10,
    cookTime: 35,
    servings: 6,
    imageUrl:
      "https://images.unsplash.com/photo-1547592166-23ac45744acd?auto=format&fit=crop&q=80&w=600&h=400",
    ingredients: [
      "300 g de lentilha vermelha ou verde",
      "200 g de linguiça defumada em rodelas",
      "1 cebola, 3 dentes de alho",
      "2 cenouras picadas",
      "1 talo salsão",
      "400 g de tomate pelado",
      "1 maço espinafre",
      "cúrcuma, cominho, páprica defumada",
      "caldo de legumes, sal, pimenta"
    ],
    instructions: [
      "Lave e escorra as lentilhas. As vermelhas não precisam de molho prévio; as verdes, deixe de molho 1 h.",
      "Frite as rodelas de linguiça em fio de azeite por 5 min. Reserve, mantendo a gordura na panela.",
      "Refogue cebola, cenoura e salsão na gordura por 6 min. Adicione alho, cúrcuma, cominho e páprica. Toste os temperos por 30 seg.",
      "Adicione lentilhas, tomates pelados amassados e caldo de legumes. Cubra com bastante líquido.",
      "Cozinhe em fogo médio por 20–25 min até as lentilhas ficarem bem macias.",
      "Para consistência mais espessa: bata parte da sopa com mixer e misture de volta.",
      "Adicione o espinafre e a linguiça reservada. Cozinhe 2 min.",
      "Sirva com limão espremido por cima e pão integral."
    ],
    tips: [
      "Limão ao servir equilibra o sabor terroso das lentilhas.",
      "Lentilha vermelha se desfaz e engrossa o caldo naturalmente.",
      "Excelente para fazer grandes quantidades e congelar."
    ]
  },
  {
    name: "Sopa de Feijão com Bacon e Linguiça 📋", emoji: "🥣", region: "BR", estimatedCost: "low", 
    description: "Feijão caldo grosso e fumado — alma brasileira em uma tigela",
    category: "Sopas e Caldos",
    type: "lunch",
    difficulty: "fácil",
    prepTime: 15,
    cookTime: 60,
    servings: 8,
    imageUrl:
      "https://images.unsplash.com/photo-1547592166-23ac45744acd?auto=format&fit=crop&q=80&w=600&h=400",
    ingredients: [
      "400 g de feijão carioca",
      "200 g de bacon em cubos",
      "200 g de linguiça paio",
      "1 cebola grande, 4 dentes de alho",
      "louro, alecrim",
      "sal, pimenta e cominho"
    ],
    instructions: [
      "Deixe o feijão de molho por 8–12 h. Escorra e enxague.",
      "Frite o bacon em fogo médio até crocante e a gordura ser extraída. Reserve o bacon, mantenha a gordura.",
      "Doure a linguiça fatiada na gordura do bacon. Reserve.",
      "Refogue cebola e alho na gordura. Adicione o feijão escorrido, louro e cominho.",
      "Cubra com água (o triplo do volume do feijão). Cozinhe na pressão por 25–30 min ou por 60 min em panela comum.",
      "Retire metade do feijão cozido e bata no liquidificador com parte do caldo até obter pasta grossa.",
      "Misture de volta para a panela — fica um caldo espesso e aveludado.",
      "Adicione bacon e linguiça. Ajuste sal. Finalize com coentro, para quem gosta."
    ],
    tips: [
      "Feijão cremoso = a técnica de bater metade.",
      "Molho da linguiça paio enriquece o sabor do caldo.",
      "Sirva com arroz branco e farofa."
    ]
  },
  {
    name: "Gazpacho Andaluz 📋", emoji: "🥣", region: "INT", estimatedCost: "low", 
    description:
      "Sopa fria de tomate espanhola — refrescante, sem aquecimento, nutritiva",
    category: "Sopas e Caldos",
    type: "healthy",
    difficulty: "fácil",
    prepTime: 20,
    cookTime: 0,
    servings: 4,
    imageUrl:
      "https://images.unsplash.com/photo-1547592166-23ac45744acd?auto=format&fit=crop&q=80&w=600&h=400",
    ingredients: [
      "1 kg de tomates maduros vermelhos",
      "1 pepino médio sem sementes",
      "1 pimentão vermelho",
      "2 dentes de alho",
      "50 ml de azeite extra virgem",
      "30 ml de vinagre de xerez (ou vermelho)",
      "2 fatias de pão branco amanhecido",
      "sal grosso"
    ],
    instructions: [
      "Mergulhe o pão em água por 5 min. Esprema para retirar excesso.",
      "Corte grosseiramente tomates, pepino, pimentão. Coloque tudo no liquidificador.",
      "Adicione alho, pão amolecido, azeite, vinagre e sal.",
      "Processe por 2–3 min até totalmente homogêneo e liso.",
      "Passe por peneira fina para textura sedosa. Pressione bem para extrair todo o líquido.",
      "Ajuste tempero: mais vinagre para acidez, mais sal, mais azeite.",
      "Gelado por pelo menos 2 h até bem frio.",
      "Sirva em copos altos ou tigelas com bruschetta ou cubinhos de tomate, pepino e pimentão por cima."
    ],
    tips: [
      "Tomates muito maduros e saborosos são a base de tudo — não substitua por tomates sem sabor.",
      "Pão amanhecido engrossa e dá suavidade.",
      "Gazpacho melhora no dia seguinte — sabores se integram."
    ]
  },
  {
    name: "Caldo de Mocotó 📋", emoji: "🥣", region: "BR", estimatedCost: "low", 
    description:
      "Caldo gelatinoso de tutano — petisco brasileiro noturno icônico",
    category: "Sopas e Caldos",
    type: "lunch",
    difficulty: "médio",
    prepTime: 30,
    cookTime: 120,
    servings: 8,
    imageUrl:
      "https://images.unsplash.com/photo-1547592166-23ac45744acd?auto=format&fit=crop&q=80&w=600&h=400",
    ingredients: [
      "1 kg de mocotó (pata bovina)",
      "1 cebola grande",
      "4 dentes de alho",
      "1 pimentão verde",
      "100 g bacon em cubos",
      "coentro, salsinha, cebolinha",
      "pimenta malagueta",
      "sal, pimenta-do-reino"
    ],
    instructions: [
      "Lave bem o mocotó, esfregue com limão. Cubra com água fria e leve para ferver — descarte esta água (técnica de escaldagem para tirar impurezas).",
      "Coloque o mocotó em panela de pressão com 2 litros de água fresca, cebola, alho, sal e pimenta. Cozinhe por 90–120 min na pressão.",
      "Separe os pedaços de mocotó do caldo. O caldo esfriado formará gelatina natural (colágeno).",
      "Retire a carne do osso quando possível. Refogue bacon, cebola e alho em panela.",
      "Adicione o caldo coado e os pedaços de carne. Cozinhe por 10 min para integrar.",
      "Ajuste temperos. Adicione pimenta malagueta ao gosto.",
      "Sirva bem quente com coentro, cebolinha e torradas.",
      "O caldo fica gelatinoso — normal e sinal de qualidade."
    ],
    tips: [
      "Escaldagem inicial é fundamental para limpar e reduzir o cheiro forte.",
      "Panela de pressão reduz de 6 h para 2 h de cozimento.",
      "Rico em colágeno — proteína para pele e articulações."
    ]
  },
  {
    name: "Tom Kha Gai — Sopa Thai de Coco 📋", emoji: "🥣", region: "INT", estimatedCost: "low", 
    description:
      "Sopa tailandesa de frango com leite de coco, galanga e capim-limão",
    category: "Sopas e Caldos",
    type: "lunch",
    difficulty: "médio",
    prepTime: 15,
    cookTime: 20,
    servings: 4,
    imageUrl:
      "https://images.unsplash.com/photo-1547592166-23ac45744acd?auto=format&fit=crop&q=80&w=600&h=400",
    ingredients: [
      "400 g de frango em tiras",
      "400 ml de leite de coco",
      "300 ml de caldo de galinha",
      "2 talos de capim-limão",
      "3 fatias de galanga (ou gengibre)",
      "folhas de limão kaffir (ou lima-da-pérsia)",
      "cogumelos shimeji ou paris",
      "molho de peixe (nam pla)",
      "suco de lima da pérsia",
      "pimenta tailandesa, coentro"
    ],
    instructions: [
      "Amasse levemente o capim-limão com as costas da faca para liberar o óleo. Corte em pedaços.",
      "Ferva o caldo de galinha com capim-limão, galanga e folhas de kaffir por 5 min para infusão.",
      "Adicione o leite de coco e o frango. Cozinhe em fogo médio por 10 min.",
      "Adicione os cogumelos. Cozinhe mais 3 min.",
      "Tempere com molho de peixe (2–3 colheres), suco de lima e pimenta. Ajuste o equilíbrio ácido/salgado.",
      "Não deixe ferver muito forte após o coco — pode separar.",
      "Sirva em tigelas com coentro fresco. Os pedaços de capim-limão e galanga não se comem."
    ],
    tips: [
      "Capim-limão, galanga e kaffir formam a trindade aromática da culinária tailandesa.",
      "Molho de peixe substitui o sal — use com moderação.",
      "Para versão vegana: caldo de cogumelos + tofu."
    ]
  },
  {
    name: "Minestrone Italiano 📋", emoji: "🥣", region: "INT", estimatedCost: "low", 
    description:
      "Sopa robusta italiana de legumes, feijão e massa — nutritiva e completa",
    category: "Sopas e Caldos",
    type: "healthy",
    difficulty: "fácil",
    prepTime: 20,
    cookTime: 40,
    servings: 6,
    imageUrl:
      "https://images.unsplash.com/photo-1547592166-23ac45744acd?auto=format&fit=crop&q=80&w=600&h=400",
    ingredients: [
      "2 cenouras, 2 talos salsão, 1 cebola",
      "1 abobrinha, 1 maço espinafre",
      "1 lata de feijão branco",
      "400 g de tomate pelado",
      "100 g de massa pequena (ditalini ou cotovelo)",
      "4 dentes de alho",
      "100 g de pancetta ou bacon (opcional)",
      "alecrim, tomilho, louro",
      "parmesão para servir",
      "azeite, sal, pimenta"
    ],
    instructions: [
      "Soffritto: refogue em azeite a cebola, cenoura e salsão picados finos até amolecerem bem (10 min). Este é o base de toda a sopa italiana.",
      "Adicione alho e pancetta. Cozinhe por 3 min.",
      "Adicione tomates pelados e amasse. Cozinhe por 5 min.",
      "Despeje 1,5 litro de caldo de legumes ou água. Adicione feijão, alecrim e louro. Cozinhe 15 min.",
      "Adicione abobrinha em cubos e a massa crua. Cozinhe pelo tempo indicado na embalagem.",
      "No último minuto, adicione o espinafre — murchará em 1 min.",
      "Ajuste temperos. Sirva com parmesão ralado na hora e azeite. Pão rústico italiano acompanha bem."
    ],
    tips: [
      "Soffritto bem cozido é a fundação do sabor — não apresse.",
      "Massa fica melhor cozida diretamente na sopa — absorve o sabor.",
      "Minestrone melhora no dia seguinte — ideal para fazer antes."
    ]
  },
  {
    name: "Sopa de Mandioca com Carne Seca 📋", emoji: "🥣", region: "INT", estimatedCost: "low", 
    description:
      "Caldo cremoso de mandioca com carne seca desfiada — sabor nordestino",
    category: "Sopas e Caldos",
    type: "lunch",
    difficulty: "fácil",
    prepTime: 20,
    cookTime: 35,
    servings: 6,
    imageUrl:
      "https://images.unsplash.com/photo-1547592166-23ac45744acd?auto=format&fit=crop&q=80&w=600&h=400",
    ingredients: [
      "600 g de mandioca em pedaços",
      "300 g de carne seca dessalgada",
      "1 cebola, 4 dentes de alho",
      "200 ml de leite de coco (opcional)",
      "coentro fresco",
      "azeite, sal, pimenta",
      "pimenta dedo-de-moça"
    ],
    instructions: [
      "CARNE SECA: Dessalgar por 24 h, trocando a água de 8 em 8 h. Cozinhe na pressão por 20 min. Desfie. Reserve.",
      "Cozinhe a mandioca descascada em água com sal por 25 min até bem macia. Escorra, retire o fio central.",
      "Bata a mandioca no liquidificador com parte da água do cozimento até caldo cremoso liso.",
      "Refogue cebola e alho em azeite. Adicione a carne desfiada e refogue 3 min.",
      "Despeje o caldo de mandioca sobre o refogado. Mexa.",
      "Adicione leite de coco para mais cremosidade. Cozinhe 5 min.",
      "Ajuste sal e adicione pimenta. Finalize com coentro fresco.",
      "Sirva com arroz e farofa de manteiga."
    ],
    tips: [
      "Retire sempre o fio fibroso no centro da mandioca.",
      "Leite de coco é opcional — deixa mais rico e cremoso.",
      "Carne seca bem dessalgada é fundamental."
    ]
  }
];
