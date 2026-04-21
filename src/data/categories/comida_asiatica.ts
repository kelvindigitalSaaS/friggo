import { Recipe } from "@/types/kaza";

export const receitasCozinhaAsiatica: Recipe[] = [
  {
    id: "asiatica-001",
    name: "Frango Teriyaki 📋", emoji: "🥣", region: "INT", estimatedCost: "low", 
    description: "Frango glaceado no molho teriyaki japonês, doce e brilhante",
    category: "Cozinha Asiática",
    type: "dinner",
    prepTime: 10,
    cookTime: 20,
    difficulty: "fácil",
    servings: 4,
    ingredients: [
      "800g de coxa de frango sem osso",
      "4 colheres de sopa de shoyu",
      "2 colheres de sopa de mel",
      "2 colheres de sopa de saquê (ou vinho branco)",
      "1 colher de sopa de açúcar",
      "1 colher de chá de amido de milho",
      "Gengibre ralado",
      "Alho",
      "Cebolinha para decorar"
    ],
    steps: [
      "Misture shoyu, mel, saquê, açúcar, gengibre e alho para o molho",
      "Marine o frango no molho por 20 min",
      "Aqueça uma frigideira em fogo alto",
      "Grelhe o frango 5-6 min cada lado até caramelizar",
      "Retire o frango e adicione o molho da marinada na frigideira",
      "Dissolva o amido em um pouco de água e adicione ao molho",
      "Cozinhe até engrossar e despeje sobre o frango",
      "Decore com cebolinha fatiada"
    ],
    tips: [
      "Coxa de frango fica mais macia e saborosa que o peito",
      "O molho deve ficar brilhante e levemente espesso"
    ]
  },
  {
    id: "asiatica-002",
    name: "Pad Thai de Camarão 📋", emoji: "🐟", region: "INT", estimatedCost: "low", 
    description: "Macarrão tailandês salteado em wok com camarão e amendoim",
    category: "Cozinha Asiática",
    type: "dinner",
    prepTime: 20,
    cookTime: 15,
    difficulty: "médio",
    servings: 2,
    ingredients: [
      "200g de macarrão de arroz",
      "200g de camarão descascado",
      "2 ovos",
      "2 colheres de molho de peixe",
      "1 colher de tamarindo ou limão",
      "1 colher de açúcar de palma ou mascavo",
      "Broto de feijão",
      "Cebolinha",
      "Amendoim torrado",
      "Pimenta seca e limão para servir"
    ],
    steps: [
      "Deixe o macarrão em água fria por 30 min, escorra",
      "Em wok muito quente, frite os camarões rapidamente, reserve",
      "Quebre os ovos no wok e mexa como mexido",
      "Adicione o macarrão e frite por 3 min",
      "Misture molho de peixe, tamarindo e açúcar, adicione ao wok",
      "Adicione os camarões e broto de feijão",
      "Salteie por mais 2 min",
      "Sirva com amendoim, cebolinha e limão"
    ],
    tips: [
      "Wok muito quente é essencial para o sabor defumado (wok hei)",
      "Macarrão deve estar apenas hidratado, não cozido"
    ]
  },
  {
    id: "asiatica-003",
    name: "Rolinho Primavera Vietnamita (Gỏi cuốn) 📋", emoji: "🍤", region: "INT", estimatedCost: "low", 
    description: "Rolinho fresco de papel de arroz com camarão e ervas",
    category: "Cozinha Asiática",
    type: "snack",
    prepTime: 30,
    cookTime: 5,
    difficulty: "médio",
    servings: 4,
    ingredients: [
      "8 folhas de papel de arroz vietnamita",
      "200g de camarão cozido",
      "Vermicelli de arroz cozido",
      "Alface",
      "Hortelã vietnamita e coentro",
      "Cenoura ralada",
      "Pepino em julienne",
      "Molho hoisin com amendoim"
    ],
    steps: [
      "Prepare todos os ingredientes em pequenas tigelas",
      "Mergulhe a folha de papel de arroz em água morna por 5 segundos",
      "Coloque sobre superfície limpa e distribua os ingredientes no centro-baixo",
      "Dobre os lados e enrole firmemente como burrito",
      "Sirva com molho de amendoim hoisin"
    ],
    tips: [
      "O papel de arroz continua amolecendo fora da água, não deixe muito tempo",
      "Montagem rápida e firme é a chave"
    ]
  },
  {
    id: "asiatica-004",
    name: "Ramen Tonkotsu Simplificado 📋", emoji: "🥣", region: "US", estimatedCost: "low", 
    description: "Caldo cremoso de osso de porco com macarrão japonês",
    category: "Cozinha Asiática",
    type: "dinner",
    prepTime: 20,
    cookTime: 120,
    difficulty: "difícil",
    servings: 4,
    ingredients: [
      "1kg de osso de porco",
      "400g de macarrão ramen",
      "4 ovos cozidos marinados no shoyu",
      "200g de chashu (barriga de porco)",
      "Cebolinha",
      "Nori (alga)",
      "Shoyu",
      "Alho e gengibre"
    ],
    steps: [
      "Branqueie os ossos em água fervente por 10 min, descarte a água",
      "Cozinhe os ossos com alho e gengibre em 2L de água por 4-6 horas",
      "Para atalho: use panela de pressão por 2 horas",
      "Coe o caldo e tempere com sal e shoyu",
      "Cozinhe o macarrão conforme instrução",
      "Monte o bowl: macarrão, caldo quente, chashu, ovo, cebolinha e nori"
    ],
    tips: [
      "O caldo deve ficar leitoso de tanto cozinhar o osso",
      "Pode usar caldo pronto para simplificar"
    ]
  },
  {
    id: "asiatica-005",
    name: "Gyoza (Dumpling Japonês) 📋", emoji: "🥩", region: "INT", estimatedCost: "low", 
    description:
      "Pastéis japoneses fritos e cozidos no vapor, crocantes embaixo",
    category: "Cozinha Asiática",
    type: "snack",
    prepTime: 45,
    cookTime: 15,
    difficulty: "médio",
    servings: 4,
    ingredients: [
      "200g de carne de porco moída",
      "100g de repolho picado",
      "Cebolinha",
      "Gengibre ralado",
      "Shoyu",
      "Óleo de gergelim",
      "20-24 discos de massa de gyoza",
      "Óleo e água para cozinhar"
    ],
    steps: [
      "Misture a carne com repolho, cebolinha, gengibre, shoyu e gergelim",
      "Coloque uma colher de recheio no centro de cada disco",
      "Molhe as bordas, dobre ao meio fazendo franzidos",
      "Aqueça óleo em frigideira, arrume os gyozas",
      "Frite por 2 min até a base dourar",
      "Adicione 1/4 xícara de água, tampe imediatamente",
      "Cozinhe no vapor por 5-6 min até secar"
    ],
    tips: [
      "O franzido segura os gyozas fechados",
      "Base crocante e topo macio é a textura ideal"
    ]
  },
  {
    id: "asiatica-006",
    name: "Curry Thai Verde de Frango 📋", emoji: "🍗", region: "INT", estimatedCost: "low", 
    description: "Curry aromático tailandês com leite de coco e ervas frescas",
    category: "Cozinha Asiática",
    type: "dinner",
    prepTime: 15,
    cookTime: 25,
    difficulty: "médio",
    servings: 4,
    ingredients: [
      "600g de frango em cubos",
      "1 lata de leite de coco",
      "2 colheres de pasta de curry verde",
      "Berinjela tailandesa",
      "Pimentão",
      "Manjericão tailandês",
      "Molho de peixe",
      "Açúcar de palma",
      "Arroz jasmim para acompanhar"
    ],
    steps: [
      "Frite a pasta de curry no óleo por 2 min até aromatizar",
      "Sele o frango em pedaços",
      "Adicione o leite de coco e 1/2 copo de água",
      "Cozinhe por 10 min",
      "Adicione a berinjela e pimentão",
      "Tempere com molho de peixe e açúcar",
      "Finalize com manjericão fresco",
      "Sirva sobre arroz jasmim"
    ],
    tips: [
      "Pasta de curry pronta funciona muito bem",
      "Leite de coco integral deixa o curry mais cremoso"
    ]
  },
  {
    id: "asiatica-007",
    name: "Arroz Frito Yangzhou 📋", emoji: "🍚", region: "INT", estimatedCost: "low", 
    description: "O clássico arroz frito chinês com ovos, cenoura e ervilha",
    category: "Cozinha Asiática",
    type: "lunch",
    prepTime: 10,
    cookTime: 10,
    difficulty: "fácil",
    servings: 4,
    ingredients: [
      "3 xícaras de arroz cozido do dia anterior",
      "3 ovos",
      "1 xícara de cenoura em cubinhos",
      "1 xícara de ervilha fresca ou congelada",
      "Cebolinha",
      "2 colheres de shoyu",
      "Óleo de gergelim",
      "Óleo e sal"
    ],
    steps: [
      "Certifique que o arroz está frio e solto (arroz novo empapa)",
      "Em wok quente, frite os ovos mexidos rapidamente",
      "Adicione a cenoura e ervilha, refogue 2 min",
      "Adicione o arroz e misture bem",
      "Regue com shoyu e óleo de gergelim",
      "Salteie por 3-4 min misturando sempre",
      "Finalize com cebolinha"
    ],
    tips: [
      "Arroz de um dia antes é fundamental para a textura correta",
      "Fogo alto durante todo o processo"
    ]
  },
  {
    id: "asiatica-008",
    name: "Sushi Roll Califórnia Caseiro 📋", emoji: "🍚", region: "INT", estimatedCost: "low", 
    description: "O roll de sushi mais famoso do mundo, feito em casa",
    category: "Cozinha Asiática",
    type: "lunch",
    prepTime: 45,
    cookTime: 20,
    difficulty: "médio",
    servings: 4,
    ingredients: [
      "2 xícaras de arroz japonês",
      "Vinagre de arroz",
      "Folhas de nori",
      "Kani kama",
      "Abacate",
      "Pepino",
      "Maionese",
      "Gergelim",
      "Wasabi e shoyu para servir"
    ],
    steps: [
      "Cozinhe o arroz japonês e tempere com vinagre de arroz, açúcar e sal",
      "Deixe esfriar completamente",
      "Sobre a esteira de bambu, estique o nori",
      "Espalhe o arroz sobre o nori",
      "Vire o nori (arroz para baixo sobre plástico)",
      "Coloque o recheio no centro: kani, abacate e pepino",
      "Enrole firmemente com a esteira",
      "Passe gergelim por fora",
      "Corte com faca molhada em 8 partes"
    ],
    tips: [
      "Faca molhada corta sem esmagar o roll",
      "Arroz frio é mais fácil de trabalhar"
    ]
  },
  {
    id: "asiatica-009",
    name: "Mapo Tofu Sichuanês 📋", emoji: "🥣", region: "INT", estimatedCost: "low", 
    description:
      "Prato apimentado de tofu com carne moída em molho de doubanjiang",
    category: "Cozinha Asiática",
    type: "dinner",
    prepTime: 10,
    cookTime: 20,
    difficulty: "médio",
    servings: 3,
    ingredients: [
      "400g de tofu mole",
      "200g de carne de porco moída",
      "2 colheres de pasta doubanjiang",
      "Alho e gengibre",
      "Shoyu",
      "Óleo de pimenta sichuanesa",
      "Amido de milho",
      "Cebolinha"
    ],
    steps: [
      "Corte o tofu em cubos e ferva suavemente em água salgada",
      "Refogue a carne de porco até secar",
      "Adicione a pasta doubanjiang, alho e gengibre",
      "Refogue até aromatizar bem",
      "Adicione 1 copo de água ou caldo",
      "Escorra o tofu e adicione cuidadosamente",
      "Engrosse com amido de milho dissolvido",
      "Finalize com óleo de pimenta e cebolinha"
    ],
    tips: [
      "Pimenta sichuanesa dá o característico adormecimento na boca",
      "Tofu mole absorve os sabores do molho"
    ]
  },
  {
    id: "asiatica-010",
    name: "Bibimbap Coreano 📋", emoji: "🥩", region: "INT", estimatedCost: "low", 
    description:
      "Bowl coreano colorido com arroz, legumes variados e ovo frito",
    category: "Cozinha Asiática",
    type: "lunch",
    prepTime: 30,
    cookTime: 20,
    difficulty: "médio",
    servings: 2,
    ingredients: [
      "2 xícaras de arroz japonês",
      "Espinafre branqueado",
      "Cenoura em julienne",
      "Broto de feijão",
      "Cogumelos shiitake",
      "Carne bovina em tiras finas",
      "2 ovos",
      "Pasta gochujang",
      "Óleo de gergelim e shoyu"
    ],
    steps: [
      "Cozinhe o arroz",
      "Prepare cada vegetal separado com tempero de gergelim e shoyu",
      "Salteie a carne com shoyu e açúcar",
      "Frite os ovos com gema ainda mole",
      "Monte o bowl: arroz no fundo, legumes em setores coloridos ao redor",
      "Coloque o ovo no centro e carne por cima",
      "Adicione gochujang e óleo de gergelim",
      "Misture tudo antes de comer"
    ],
    tips: [
      "Apresentação colorida é parte da tradição",
      "Gochujang é o molho picante de fermentado coreano, pode ajustar a quantidade"
    ]
  },
  {
    id: "asiatica-011",
    name: "Dim Sum de Camarão (Har Gow) 📋", emoji: "🍤", region: "INT", estimatedCost: "low", 
    description: "Dumpling cantonense clássico com camarão e massa translúcida",
    category: "Cozinha Asiática",
    type: "snack",
    prepTime: 45,
    cookTime: 10,
    difficulty: "difícil",
    servings: 4,
    ingredients: [
      "300g de camarão descascado e picado",
      "1 xícara de farinha de trigo",
      "1/2 xícara de amido de milho",
      "Água quente",
      "Óleo de gergelim",
      "Sal",
      "Gengibre e cebolinha"
    ],
    steps: [
      "Misture farinha e amido, escalde com água quente e óleo",
      "Sove até formar massa lisa e transparente",
      "Misture o camarão picado com temperos",
      "Abra discos finos de massa",
      "Recheie e feche franzindo com os dedos",
      "Cozinhe no vapor por 8-10 min"
    ],
    tips: [
      "Massa deve ser fina o suficiente para ver o recheio",
      "Culinária de paciência, vale cada detalhe"
    ]
  },
  {
    id: "asiatica-012",
    name: "Pho Bo (Sopa Vietnamita de Carne) 📋", emoji: "🥣", region: "INT", estimatedCost: "low", 
    description:
      "Sopa aromática com caldo de osso perfumado com estrela de anis",
    category: "Cozinha Asiática",
    type: "dinner",
    prepTime: 20,
    cookTime: 180,
    difficulty: "difícil",
    servings: 4,
    ingredients: [
      "1kg de osso buco bovino",
      "300g de filé mignon fatiado fino",
      "400g de macarrão de arroz plano",
      "Estrela de anis",
      "Canela em pau",
      "Cebola e gengibre char",
      "Molho de peixe",
      "Broto de feijão, manjericão, limão para servir"
    ],
    steps: [
      "Queime a cebola e o gengibre na chama ou forno",
      "Blanqueie o osso e descarte a água",
      "Cozinhe o osso com anise, canela, cebola e gengibre char em 3L de água por 3h",
      "Coe e tempere com molho de peixe e sal",
      "Cozinhe o macarrão e distribua nas tigelas",
      "Coloque o filé cru fatiado",
      "Despeje o caldo muito quente que vai cuzinhar a carne",
      "Sirva com acompanhamentos frescos"
    ],
    tips: [
      "O caldo deve ser limpo e translúcido",
      "Carne não deve sozer — o calor do caldo é suficiente"
    ]
  },
  {
    id: "asiatica-013",
    name: "Frango General Tso 📋", emoji: "🍗", region: "US", estimatedCost: "low", 
    description:
      "Frango crocante em molho agridoce picante da cozinha americano-chinesa",
    category: "Cozinha Asiática",
    type: "dinner",
    prepTime: 20,
    cookTime: 20,
    difficulty: "médio",
    servings: 4,
    ingredients: [
      "700g de frango em cubos",
      "Amido de milho para empanar",
      "Shoyu",
      "Vinagre de arroz",
      "Açúcar",
      "Ketchup",
      "Pimenta seca",
      "Alho e gengibre",
      "Cebolinha"
    ],
    steps: [
      "Empane os cubos de frango no amido e frite até crocante",
      "Prepare o molho: misture shoyu, açúcar, vinagre, ketchup e amido",
      "Na mesma frigideira, frite alho, gengibre e pimenta seca",
      "Adicione o molho e mexa até engrossar",
      "Adicione o frango crocante e misture rapidamente",
      "Sirva sobre arroz com cebolinha"
    ],
    tips: [
      "Fritar duas vezes deixa o frango mais crocante",
      "O molho deve ser adicionado logo antes de servir"
    ]
  },
  {
    id: "asiatica-014",
    name: "Tom Kha Gai (Sopa Tailandesa de Coco) 📋", emoji: "🥣", region: "INT", estimatedCost: "low", 
    description:
      "Sopa tailandesa aromática com galangal, limoncillo e leite de coco",
    category: "Cozinha Asiática",
    type: "dinner",
    prepTime: 15,
    cookTime: 20,
    difficulty: "médio",
    servings: 4,
    ingredients: [
      "500g de frango em tiras",
      "1 lata de leite de coco integral",
      "500ml de caldo de frango",
      "2 talos de lemongrass",
      "3 fatias de galangal ou gengibre",
      "Folhas de kafir lime",
      "Cogumelos",
      "Molho de peixe",
      "Açúcar e limão"
    ],
    steps: [
      "Leve o caldo com lemongrass, galangal e kafir lime à fervura",
      "Infundir por 5 min, então adicione o leite de coco",
      "Adicione o frango e os cogumelos",
      "Cozinhe por 8-10 min",
      "Tempere com molho de peixe, açúcar e limão",
      "Finalize com coentro fresco",
      "Sirva com arroz à parte"
    ],
    tips: [
      "Não ferva vigorosamente após adicionar o leite de coco",
      "Galangal não pode ser mastigado - apenas para perfumar"
    ]
  },
  {
    id: "asiatica-015",
    name: "Nasi Goreng Indonésio 📋", emoji: "🍤", region: "INT", estimatedCost: "low", 
    description: "Arroz frito indonésio com camarão seco e pasta de pimenta",
    category: "Cozinha Asiática",
    type: "lunch",
    prepTime: 15,
    cookTime: 15,
    difficulty: "médio",
    servings: 2,
    ingredients: [
      "2 xícaras de arroz cozido frio",
      "2 ovos",
      "100g de camarão descascado",
      "2 colheres de pasta sambal",
      "Shoyu kecap manis (ou shoyu + mel)",
      "Cebola roxa",
      "Alho",
      "Cebolinha"
    ],
    steps: [
      "Em wok quente, frite ovo mexido, reserve",
      "Frite cebola, alho e pasta sambal",
      "Adicione os camarões e salteie 2 min",
      "Adicione o arroz frio e misture tudo",
      "Regue com kecap manis e sal",
      "Adicione os ovos de volta",
      "Sirva com ovo frito por cima e pepino fresco"
    ],
    tips: [
      "Kecap manis é shoyu doce indonésio, pode simular com shoyu + mel",
      "Adicione anchovas ao sambal para mais profundidade"
    ]
  },
  {
    id: "asiatica-016",
    name: "Bulgogi Coreano 📋", emoji: "🥩", region: "INT", estimatedCost: "low", 
    description:
      "Carne bovina marinada adocicada grelhada — a estrela da culinária coreana",
    category: "Cozinha Asiática",
    type: "dinner",
    prepTime: 20,
    cookTime: 10,
    difficulty: "fácil",
    servings: 4,
    ingredients: [
      "600g de carne bovina em fatias finas (alcatra ou filé)",
      "4 colheres de shoyu",
      "2 colheres de açúcar",
      "1 colher de óleo de gergelim",
      "3 dentes de alho",
      "Pera ou maçã ralada para amaciante",
      "Cebolinha",
      "Gergelim"
    ],
    steps: [
      "Misture shoyu, açúcar, gergelim, alho, cebolinha e pera ralada",
      "Marine a carne por pelo menos 30 min (melhor: overnight)",
      "Grelhe em frigideira muito quente ou churrasco",
      "Cozinhe rápido, 2-3 min de cada lado",
      "Sirva com arroz, alface e pasta gochujang"
    ],
    tips: [
      "Pera ou kiwi contêm enzimas que amaciam a carne naturalmente",
      "Corte a carne contra as fibras para mais maciez"
    ]
  },
  {
    id: "asiatica-017",
    name: "Miso Shiru (Sopa de Missô) 📋", emoji: "🥣", region: "INT", estimatedCost: "low", 
    description: "Sopa japonesa reconfortante com missô, tofu e wakame",
    category: "Cozinha Asiática",
    type: "snack",
    prepTime: 5,
    cookTime: 10,
    difficulty: "fácil",
    servings: 4,
    ingredients: [
      "4 xícaras de caldo dashi (ou água com hondashi)",
      "3 colheres de sopa de pasta de missô",
      "100g de tofu mole em cubos",
      "Alga wakame hidratada",
      "Cebolinha fatiada"
    ],
    steps: [
      "Aqueça o caldo dashi sem ferver",
      "Dissolva o missô no caldo (nunca ferva o missô)",
      "Adicione o tofu delicadamente",
      "Adicione a wakame hidratada",
      "Sirva imediatamente com cebolinha"
    ],
    tips: [
      "Nunca ferva o missô, perde os probióticos",
      "Use diferentes tipos de missô para variar o sabor"
    ]
  },
  {
    id: "asiatica-018",
    name: "Rendang Indonésio (Curto de Carne) 📋", emoji: "🥩", region: "INT", estimatedCost: "low", 
    description:
      "Curry seco e apimentado de Java, cozido lentamente em leite de coco",
    category: "Cozinha Asiática",
    type: "dinner",
    prepTime: 20,
    cookTime: 120,
    difficulty: "difícil",
    servings: 6,
    ingredients: [
      "1kg de paleta bovina em cubos",
      "2 latas de leite de coco",
      "Pasta de rendang ou curry vermelho",
      "Lemongrass",
      "Galangal",
      "Kaffir lime",
      "Tomate",
      "Sal"
    ],
    steps: [
      "Frite a pasta de temperos em óleo até aromatizar",
      "Adicione a carne e sele bem",
      "Adicione o leite de coco, lemongrass, galangal e kafir lime",
      "Cozinhe em fogo médio por 1-2 com quando o leite secar",
      "Continue cozinhando enquanto a gordura do coco se separa",
      "Deixe a carne fritar levemente na gordura do coco",
      "Está pronto quando ficou escuro e seco mas rico"
    ],
    tips: [
      "Rendang é melhor no dia seguinte",
      "A carne fica muito macia com o cozimento longo"
    ]
  },
  {
    id: "asiatica-019",
    name: "Yakitori (Espetinho Japonês) 📋", emoji: "🍗", region: "INT", estimatedCost: "low", 
    description:
      "Espetinhos japoneses de frango grelhados no carvão com molho tare",
    category: "Cozinha Asiática",
    type: "snack",
    prepTime: 20,
    cookTime: 15,
    difficulty: "médio",
    servings: 4,
    ingredients: [
      "600g de coxa de frango em cubos",
      "Cebolinha verde em rodelas",
      "4 colheres de shoyu",
      "2 colheres de mirin",
      "1 colher de saquê",
      "1 colher de açúcar",
      "Espetos de bambu"
    ],
    steps: [
      "Premeditação o molho tare: misture shoyu, mirin, saquê e açúcar",
      "Cozinhe o molho até reduzir e engrossar levemente",
      "Montante os espetos alternando frango e cebolinha",
      "Grelhe no carvão ou frigideira grelhada por 3-4 min",
      "Pincele com molho tare várias vezes durante a grelha",
      "Sirva com sal para os espetos shio ou com molho para os tare"
    ],
    tips: [
      "Deixe os espetos de bambu de molho em água para não queimar",
      "Repetidas pinceladas do molho criam o glaceado perfeito"
    ]
  },
  {
    id: "asiatica-020",
    name: "Chow Mein de Legumes 📋", emoji: "🍝", region: "INT", estimatedCost: "low", 
    description: "Macarrão chinês salteado em wok com vegetais crocantes",
    category: "Cozinha Asiática",
    type: "lunch",
    prepTime: 15,
    cookTime: 12,
    difficulty: "fácil",
    servings: 3,
    ingredients: [
      "300g de macarrão noodle",
      "Repolho",
      "Cenoura",
      "Broto de feijão",
      "Pimentão verde",
      "Cebolinha",
      "Shoyu",
      "Óleo de gergelim e amido de milho"
    ],
    steps: [
      "Cozinhe o macarrão al dente, escorra e tempere com óleo",
      "Prepare todos os vegetais cortados",
      "Em wok muito quente, frite a cebola",
      "Adicione os vegetais mais duros primeiro, depois os macios",
      "Adicione o macarrão e misture",
      "Tempere com shoyu e gergelim",
      "Sirva imediatamente"
    ],
    tips: [
      "Wok muito quente é a chave do 'wok taste'",
      "Não adicione muita água para legumes ficarem crocantes"
    ]
  },
  {
    id: "asiatica-021",
    name: "Laksa Malaio de Frango 📋", emoji: "🥣", region: "INT", estimatedCost: "low", 
    description: "Sopa picante malaio com leite de coco e macarrão",
    category: "Cozinha Asiática",
    type: "dinner",
    prepTime: 15,
    cookTime: 25,
    difficulty: "médio",
    servings: 4,
    ingredients: [
      "500g de frango em cubos",
      "1 lata de leite de coco",
      "500ml de caldo de frango",
      "2 colheres de pasta de laksa (ou curry vermelho)",
      "Macarrão de arroz",
      "Broto de feijão",
      "Cebolinha e coentro",
      "Camarão seco (opcional)"
    ],
    steps: [
      "Frite a pasta em óleo por 2 min",
      "Adicione o frango e sele",
      "Despeje o caldo e leite de coco",
      "Cozinhe por 15 min",
      "Cozinhe o macarrão separado",
      "Monte as tigelas com macarrão, frango e caldo",
      "Decore com broto, cebolinha e coentro"
    ],
    tips: [
      "Pasta de laksa pronta funciona muito bem",
      "O caldo deve ser coeso — coco e caldo equilibrado"
    ]
  },
  {
    id: "asiatica-022",
    name: "Tempurá Crocante 📋", emoji: "🍤", region: "INT", estimatedCost: "low", 
    description:
      "Massa japonesa leve e crocante para fritar frutos do mar e legumes",
    category: "Cozinha Asiática",
    type: "snack",
    prepTime: 20,
    cookTime: 15,
    difficulty: "médio",
    servings: 4,
    ingredients: [
      "300g de camarão limpo e borboleta",
      "Abobrinha e berinjela em rodelas",
      "1 xícara de farinha de trigo gelada",
      "1 gema",
      "200ml de água gelada",
      "Óleo para fritar",
      "Molho tentsuyu (dashi, mirin, shoyu)"
    ],
    steps: [
      "Prepare a massa: misture gema e água gelada, adicione a farinha",
      "Misture levemente - pode ter grumos, é normal",
      "Mantenha a massa gelada em banho de gelo",
      "Frite em óleo a 180°C por 2-3 min",
      "Escorra em papel toalha",
      "Sirva com molho tentsuyu e daikon ralado"
    ],
    tips: [
      "Massa gelada é o segredo da textura crocante",
      "Nunca misture a massa demais - desenvolve glúten e fica pesada"
    ]
  },
  {
    id: "asiatica-023",
    name: "Poke Bowl Havaiano 📋", emoji: "🍚", region: "INT", estimatedCost: "low", 
    description: "Bowl colorido com atum marinado ao estilo havaiano",
    category: "Cozinha Asiática",
    type: "lunch",
    prepTime: 20,
    cookTime: 15,
    difficulty: "médio",
    servings: 2,
    ingredients: [
      "300g de atum de qualidade sashimi",
      "2 xícaras de arroz japonês cozido",
      "Pepino",
      "Abacate",
      "Cenoura",
      "Edamame",
      "Shoyu",
      "Óleo de gergelim",
      "Cebola roxa",
      "Gergelim"
    ],
    steps: [
      "Corte o atum em cubos de 1,5cm",
      "Marine no shoyu, gergelim e uma pitada de sal por 15 min",
      "Prepare todos os vegetais cortados",
      "Monte os bowls: arroz na base, atum marinado e vegetais em setores",
      "Regue com shoyu, gergelim e o molho da marinada",
      "Polvilhe gergelim e cebolinha"
    ],
    tips: [
      "Use atum sushi-grade de fornecedor confiável",
      "Abacate maduro mas firme é ideal"
    ]
  },
  {
    id: "asiatica-024",
    name: "Samosa Indianos Assados 📋", emoji: "🍝", region: "INT", estimatedCost: "low", 
    description:
      "Pastéis triangulares indianos com recheio de batata e especiarias",
    category: "Cozinha Asiática",
    type: "snack",
    prepTime: 45,
    cookTime: 25,
    difficulty: "médio",
    servings: 12,
    ingredients: [
      "3 batatas cozidas e amassadas",
      "Ervilha cozida",
      "Cebola",
      "Coentro",
      "Cominho",
      "Garam masala",
      "Massa de pastel",
      "Azeite"
    ],
    steps: [
      "Refogue cebola, adicione as especiarias",
      "Misture com batata amassada e ervilha",
      "Tempere bem com coentro, sal e garam masala",
      "Corte a massa em triângulos",
      "Recheie e feche formando cones triangulares",
      "Pincele com azeite e asse a 180°C por 20-25 min"
    ],
    tips: [
      "Garam masala é a mistura de especiarias indiana essencial",
      "Pode fritar para versão mais tradicional"
    ]
  },
  {
    id: "asiatica-025",
    name: "Kimchi Caseiro Básico 📋", emoji: "🐟", region: "INT", estimatedCost: "low", 
    description:
      "Fermentado coreano de repolho apimentado, saboroso e probiótico",
    category: "Cozinha Asiática",
    type: "snack",
    prepTime: 60,
    cookTime: 0,
    difficulty: "médio",
    servings: 20,
    ingredients: [
      "1 repolho coreano (napa) ou repolho comum",
      "Sal grosso",
      "2 colheres de pasta gochugaru (pimenta coreana)",
      "Molho de peixe",
      "Alho",
      "Gengibre",
      "Cebolinha verde"
    ],
    steps: [
      "Corte e sale o repolho, deixe por 2 horas para desidratar",
      "Enxague bem e esprema o excesso de água",
      "Misture gochugaru, alho, gengibre e molho de peixe",
      "Incorpore a pasta ao repolho e cebolinha",
      "Embase em pote fechado à temperatur ambiente por 1-2 dias",
      "Leve à geladeira após a fermentação inicial"
    ],
    tips: [
      "Óculos ao misturar pimenta, ela mancha",
      "Kimchi melhora e fica mais azedo com o tempo na geladeira"
    ]
  },
  {
    id: "asiatica-026",
    name: "Chicken Tikka Masala 📋", emoji: "🍗", region: "INT", estimatedCost: "low", 
    description: "Curry cremoso indiano que conquistou o mundo inteiro",
    category: "Cozinha Asiática",
    type: "dinner",
    prepTime: 30,
    cookTime: 40,
    difficulty: "médio",
    servings: 4,
    ingredients: [
      "700g de frango em cubos",
      "Iogurte",
      "Pasta de tanoor (garam masala, cominho, cúrcuma)",
      "Tomate pelado",
      "Creme de leite",
      "Cebola",
      "Alho e gengibre",
      "Páprica e coentro",
      "Arroz basmati"
    ],
    steps: [
      "Marine o frango no iogurte com especiarias por 2h ou overnight",
      "Grelhe ou frite o frango marinado até charrar levemente",
      "Refogue cebola, alho e gengibre no azeite",
      "Adicione as especiarias e mexa 1 min",
      "Adicione o tomate e cozinhe por 15 min",
      "Adicione o frango grelhado e o creme",
      "Simmer por 10 min",
      "Sirva com arroz basmati e naan"
    ],
    tips: [
      "A marinada é fundamental para sabor profundo",
      "Creme de leite pode ser substituído por leite de coco"
    ]
  },
  {
    id: "asiatica-027",
    name: "Onigiri de Atum e Maionese 📋", emoji: "🍚", region: "INT", estimatedCost: "low", 
    description: "Bolinho de arroz japonês recheado, prático para levar",
    category: "Cozinha Asiática",
    type: "snack",
    prepTime: 20,
    cookTime: 20,
    difficulty: "fácil",
    servings: 8,
    ingredients: [
      "2 xícaras de arroz japonês",
      "1 lata de atum escorrido",
      "2 colheres de maionese",
      "Alga nori cortada em tiras",
      "Sal"
    ],
    steps: [
      "Cozinhe e tempere o arroz japonês com sal",
      "Misture o atum com maionese",
      "Com as mãos levemente úmidas e salgadas, pegue uma porção de arroz",
      "Crie um buraco no centro, coloque o recheio",
      "Feche o arroz moldando em formato triangular",
      "Embrulhe com uma tira de nori na base"
    ],
    tips: [
      "Arroz deve estar morno, nunca frio, para modelar",
      "Mãos úmidas e salgadas evitam que grude"
    ]
  },
  {
    id: "asiatica-028",
    name: "Curry de Lentilha Dal 📋", emoji: "🍚", region: "INT", estimatedCost: "low", 
    description: "Curry vegano indiano de lentilhas aromático e reconfortante",
    category: "Cozinha Asiática",
    type: "dinner",
    prepTime: 10,
    cookTime: 35,
    difficulty: "fácil",
    servings: 4,
    ingredients: [
      "2 xícaras de lentilha vermelha",
      "1 lata de tomate pelado",
      "1 cebola",
      "3 dentes de alho",
      "1 colher de gengibre ralado",
      "1 colher de cominho",
      "1 colher de cúrcuma",
      "1 colher de garam masala",
      "Coentro e suco de limão"
    ],
    steps: [
      "Refogue cebola até amolecer",
      "Adicione alho, gengibre e especiarias",
      "Frite por 1 min até aromatizar",
      "Adicione tomate e refogue 5 min",
      "Adicione lentilha e 3 xícaras de água",
      "Cozinhe por 25-30 min até lentilha desmanche",
      "Finalize com coentro e limão"
    ],
    tips: [
      "Lentilha vermelha cozinha muito mais rápido",
      "Ótimo com arroz basmati e pão naan"
    ]
  },
  {
    id: "asiatica-029",
    name: "Edamame no Vapor com Sal 📋", emoji: "🌱", region: "INT", estimatedCost: "low", 
    description: "Aperitivo japonês saudável, simples e viciante",
    category: "Cozinha Asiática",
    type: "snack",
    prepTime: 2,
    cookTime: 8,
    difficulty: "fácil",
    servings: 4,
    ingredients: ["400g de edamame congelado na vagem", "Sal grosso", "Água"],
    steps: [
      "Cozinhe o edamame em água salgada fervente por 5 min",
      "Escorra bem",
      "Polvilhe sal grosso generoso",
      "Sirva quente ou frio"
    ],
    tips: [
      "Come-se apertando a vagem para extrair os grãos",
      "Simples e nutritivo: rico em proteína vegetal"
    ]
  },
  {
    id: "asiatica-030",
    name: "Frango Xadrez ao Estilo Chinês 📋", emoji: "🍗", region: "INT", estimatedCost: "low", 
    description:
      "Frango em cubos com amendoim, pimenta seca e vegetais crocantes",
    category: "Cozinha Asiática",
    type: "lunch",
    prepTime: 15,
    cookTime: 15,
    difficulty: "médio",
    servings: 3,
    ingredients: [
      "500g de peito de frango em cubos",
      "Pimentão vermelho e verde",
      "Amendoim torrado sem sal",
      "Pimenta seca",
      "Alho e gengibre",
      "Shoyu",
      "Vinagre de arroz",
      "Amido de milho",
      "Cebolinha"
    ],
    steps: [
      "Marine o frango com shoyu e amido",
      "Frite o frango até dourar, reserve",
      "Na mesma frigideira, frite alho, gengibre e pimenta seca",
      "Adicione o pimentão",
      "Prepare molho: shoyu, vinagre, açúcar, amido",
      "Adicione frango, amendoim e molho",
      "Salteie por 2 min",
      "Sirva com arroz"
    ],
    tips: [
      "O amendoim adiciona textura e gordura no ponto certo",
      "Pimenta seca é o elemento defumado característico"
    ]
  },
  {
    id: "asiatica-031",
    name: "Banh Mi Vietnamita 📋", emoji: "🍗", region: "INT", estimatedCost: "low", 
    description:
      "Sándwich vietnamita com pão francês, carne e pickles de vegetais",
    category: "Cozinha Asiática",
    type: "lunch",
    prepTime: 20,
    cookTime: 10,
    difficulty: "médio",
    servings: 2,
    ingredients: [
      "2 baguetes pequenas ou pão francês",
      "200g de carne de porco ou frango marinado",
      "Cenoura e nabo em conserva (pickle)",
      "Pepino",
      "Coentro fresco",
      "Pimenta jalapeño",
      "Maionese",
      "Molho de peixe"
    ],
    steps: [
      "Para o pickle: misture cenoura e nabo ralados com vinagre, açúcar e sal",
      "Deixe marinar por 30 min",
      "Grelhe a carne marinada",
      "Monte o sanduíche: maionese no pão, carne, pickle, pepino, pimenta e coentro"
    ],
    tips: [
      "O pickle de cenoura e nabo equilibra o rico sabor da carne",
      "Pão crocante é essencial para o banh mi"
    ]
  },
  {
    id: "asiatica-032",
    name: "Sopa Tom Yum de Camarão 📋", emoji: "🥣", region: "INT", estimatedCost: "low", 
    description: "Sopa tailandesa ácida e picante com camarão e cogumelos",
    category: "Cozinha Asiática",
    type: "dinner",
    prepTime: 10,
    cookTime: 15,
    difficulty: "médio",
    servings: 3,
    ingredients: [
      "300g de camarão",
      "750ml de caldo de frango",
      "Lemongrass",
      "Galangal",
      "Kaffir lime",
      "Cogumelos straw ou shimeji",
      "Pimenta Thai",
      "Molho de peixe",
      "Suco de lima",
      "Coentro"
    ],
    steps: [
      "Ferva o caldo com lemongrass, galangal e kafir lime por 5 min",
      "Adicione os cogumelos e camarão",
      "Cozinhe por 3-4 min",
      "Adicione a pimenta Thai",
      "Tempere com molho de peixe, limão e sal",
      "Finalize com coentro"
    ],
    tips: [
      "Tom Yum deve ser picante, azedo e salgado simultaneamente",
      "Não coma o lemongrass ou galangal - são apenas para perfumar"
    ]
  },
  {
    id: "asiatica-033",
    name: "Sundubu Jjigae (Tofu Mole Coreano) 📋", emoji: "🥣", region: "INT", estimatedCost: "low", 
    description: "Ensopado coreano de tofu mole em caldo apimentado",
    category: "Cozinha Asiática",
    type: "dinner",
    prepTime: 10,
    cookTime: 15,
    difficulty: "fácil",
    servings: 2,
    ingredients: [
      "2 tubos de tofu mole (sundubu)",
      "100g de camarão ou mariscos",
      "2 colheres de pasta gochugaru",
      "Cebolinha",
      "Alho",
      "Óleo de gergelim",
      "Caldo de anchovas ou água",
      "1 ovo"
    ],
    steps: [
      "Refogue cebolinha e alho em óleo de gergelim",
      "Adicione o gochugaru e frite por 1 min",
      "Despeje o caldo e ferva",
      "Coloque o tofu em pedaços e os frutos do mar",
      "Cozinhe por 5-7 min",
      "Quebre um ovo no centro antes de servir"
    ],
    tips: [
      "Sundubu traduz como tofu sedoso ou mole",
      "Sirva fervendo diretamente no recipiente de cerâmica para manter o calor"
    ]
  },
  {
    id: "asiatica-034",
    name: "Curry Japonês (Japanese Curry) 📋", emoji: "🥣", region: "INT", estimatedCost: "low", 
    description: "Curry suave japonês espesso com batata, cenoura e carne",
    category: "Cozinha Asiática",
    type: "dinner",
    prepTime: 15,
    cookTime: 40,
    difficulty: "fácil",
    servings: 4,
    ingredients: [
      "500g de carne bovina ou frango",
      "3 batatas médias",
      "2 cenouras",
      "1 cebola grande",
      "1 bloco de curry japonês Vermont Curry",
      "1L de água",
      "Azeite"
    ],
    steps: [
      "Refogue a cebola em azeite",
      "Adicione a carne e sele",
      "Acrescente cenoura e batata em cubos",
      "Cubra com água e cozinhe por 20 min",
      "Quebre o tablete de curry no caldo",
      "Mexa até dissolver completamente",
      "Simmer por mais 10 min até engrossar"
    ],
    tips: [
      "Vermont Curry é o tablete mais popular no Japão",
      "Sirva sobre arroz branco abundante"
    ]
  },
  {
    id: "asiatica-035",
    name: "Wonton Soup 📋", emoji: "🥣", region: "INT", estimatedCost: "low", 
    description: "Sopa cantonense com wonton recheado de camarão e porco",
    category: "Cozinha Asiática",
    type: "lunch",
    prepTime: 30,
    cookTime: 15,
    difficulty: "médio",
    servings: 4,
    ingredients: [
      "Massa wonton (comprada pronta)",
      "150g de camarão picado",
      "100g de carne de porco moída",
      "Cebolinha",
      "Gengibre",
      "Shoyu",
      "Óleo de gergelim",
      "1L de caldo de frango claro"
    ],
    steps: [
      "Misture camarão, porco, cebolinha, gengibre e shoyu",
      "Coloque 1 colher pequena no centro de cada massa wonton",
      "Dobre e feche pressionando as bordas",
      "Cozinhe os wontons em água fervente por 3-4 min",
      "Aqueça o caldo com sal e shoyu",
      "Distribua wontons em tigelas e cubra com caldo quente",
      "Decore com cebolinha e chili oil"
    ],
    tips: [
      "Wontons cozidos devem flutuar na superfície",
      "Pode congelar os wontons crus por 2 meses"
    ]
  },
  {
    id: "asiatica-036",
    name: "Matcha Latte Caseiro 📋", emoji: "🥣", region: "INT", estimatedCost: "low", 
    description: "Bebida japonesa cremosa e zen com pó de matcha premium",
    category: "Cozinha Asiática",
    type: "snack",
    prepTime: 5,
    cookTime: 5,
    difficulty: "fácil",
    servings: 1,
    ingredients: [
      "1 colher de chá de matcha em pó",
      "2 colheres de sopa de água quente (não fervente)",
      "200ml de leite integral",
      "Mel ou adoçante a gosto"
    ],
    steps: [
      "Dissolva o matcha na água quente (70°C) com um fouet",
      "Misture vigorosamente até ficar homogêneo e sem grumos",
      "Aqueça o leite e bata espuma",
      "Despeje o leite no matcha preparado",
      "Adoce a gosto"
    ],
    tips: [
      "Água muito quente amarga o matcha",
      "Matcha cerimônia tem sabor mais refinado que o culinário"
    ]
  },
  {
    id: "asiatica-037",
    name: "Teriyaki Salmon Bowl 📋", emoji: "🐟", region: "INT", estimatedCost: "low", 
    description: "Salmão lacado em teriyaki sobre arroz japonês",
    category: "Cozinha Asiática",
    type: "dinner",
    prepTime: 10,
    cookTime: 15,
    difficulty: "fácil",
    servings: 2,
    ingredients: [
      "2 filés de salmão",
      "2 xícaras arroz japonês cozido",
      "3 colheres de shoyu",
      "2 colheres de mel",
      "1 colher de mirin",
      "Gergelim",
      "Abacate fatiado",
      "Cebolinha"
    ],
    steps: [
      "Misture shoyu, mel e mirin para o glaze",
      "Grelhe o salmão por 3-4 min cada lado",
      "Pincele o glaze nos últimos 2 min de cada lado",
      "Monte: arroz, salmão glaceado, abacate",
      "Regue com o restante do molho",
      "Polvilhe gergelim e cebolinha"
    ],
    tips: [
      "Salmão deve ter pele crocante e centre rosado",
      "Sirva imediatamente para aproveitar o glaze brilhante"
    ]
  },
  {
    id: "asiatica-038",
    name: "Dumplings ao Vapor Chineses 📋", emoji: "🥩", region: "INT", estimatedCost: "low", 
    description: "Jiaozi cozidos no vapor com recheio de porco e vegetais",
    category: "Cozinha Asiática",
    type: "snack",
    prepTime: 45,
    cookTime: 15,
    difficulty: "médio",
    servings: 4,
    ingredients: [
      "Massa de dumpling comprada",
      "300g de carne de porco moída",
      "200g de repolho napa picado e salgado",
      "Cebolinha e gengibre",
      "Shoyu e óleo de gergelim",
      "Molho de peixe"
    ],
    steps: [
      "Sale o repolho picado para desidratar, esprema bem",
      "Misture todos os ingredientes do recheio",
      "Coloque 1 colher no centro de cada disco",
      "Molhe as bordas e plasme com franzidos",
      "Cozinhe no vapor por 10-12 min"
    ],
    tips: [
      "Repolho bem escorrido evita recheio aguado",
      "Molho de shoyu, vinagre e chili oil é o molho clássico"
    ]
  },
  {
    id: "asiatica-039",
    name: "Arroz com Leite de Coco ao Estilo Tailandês 📋", emoji: "🍚", region: "INT", estimatedCost: "low", 
    description: "Sobremesa aconchegante tailandesa com manga fresca",
    category: "Cozinha Asiática",
    type: "snack",
    prepTime: 5,
    cookTime: 30,
    difficulty: "fácil",
    servings: 4,
    ingredients: [
      "1 xícara de arroz glutinoso",
      "1 lata de leite de coco",
      "3 colheres de açúcar",
      "1/2 colher de sal",
      "2 mangas maduras"
    ],
    steps: [
      "Cozinhe o arroz glutinoso no vapor por 25 min",
      "Misture leite de coco, açúcar e sal, aqueça até dissolver",
      "Regue o arroz com 3/4 do molho de coco quente",
      "Deixe absorver por 10 min",
      "Sirva com manga fresca fatiada e o molho restante"
    ],
    tips: [
      "Arroz glutinoso é diferente do arroz japonês comum",
      "Use manga Haden ou Palmer bem madura"
    ]
  },
  {
    id: "asiatica-040",
    name: "Mochi de Baunilha 📋", emoji: "🍝", region: "INT", estimatedCost: "low", 
    description: "Bolinho macio japonês de arroz glutinoso recheado com creme",
    category: "Cozinha Asiática",
    type: "snack",
    prepTime: 20,
    cookTime: 5,
    difficulty: "médio",
    servings: 8,
    ingredients: [
      "1 xícara de farinha de arroz glutinoso (mochiko)",
      "1/2 xícara de açúcar",
      "100ml de água",
      "Amido de milho para polvilhar",
      "Sorvete de baunilha ou pasta de feijão branco"
    ],
    steps: [
      "Misture farinha de arroz, açúcar e água",
      "Cozinhe no micro-ondas por 3 min, mexendo a cada 1 min",
      "Polvilhe superfície com amido de milho",
      "Abra a massa ainda quente com as mãos polvilhadas",
      "Corte discos e envolva porções de sorvete",
      "Feche bem e sirva ou congele"
    ],
    tips: [
      "Trabalhe rapidamente pois a massa esfria e endurece",
      "Mochi tem textura de chiclete - é sua característica"
    ]
  }
];
